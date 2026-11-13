// Dependency-free Chrome DevTools audit. Run against `next start`, never next dev.
// Usage: node scripts/performance-audit.mjs before [http://localhost:3100]
// HOME_ONLY=1 measures /ar and /en; labels starting with motion-check verify retained animations.
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const label = process.argv[2] || 'audit'
const base = process.argv[3] || 'http://localhost:3100'
const output = path.resolve('node_modules/.cache/performance', label)
await mkdir(output, { recursive: true })
const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--remote-debugging-port=9333', `--user-data-dir=${output}/chrome`,
  '--no-first-run', '--no-default-browser-check', '--disable-extensions', 'about:blank',
], { windowsHide: true, stdio: 'ignore' })
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
let socket
try {
  let targets
  for (let i = 0; i < 60; i++) {
    try { targets = await (await fetch('http://localhost:9333/json')).json(); break } catch { await sleep(500) }
  }
  if (!targets) throw new Error('Chrome debugging endpoint unavailable')
  socket = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl)
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }))
  let id = 0
  const pending = new Map()
  let requests = new Map(), errors = []
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data)
    if (message.id) {
      const task = pending.get(message.id)
      if (!task) return
      clearTimeout(task.timeout)
      pending.delete(message.id)
      if (message.error) task.reject(new Error(JSON.stringify(message.error)))
      else task.resolve(message.result)
    }
    const p = message.params
    if (message.method === 'Network.responseReceived') requests.set(p.requestId, { url: p.response.url, type: p.type, status: p.response.status, bytes: 0, cacheControl: p.response.headers['Cache-Control'] })
    if (message.method === 'Network.loadingFinished' && requests.has(p.requestId)) requests.get(p.requestId).bytes = p.encodedDataLength
    if (message.method === 'Runtime.exceptionThrown') errors.push(p.exceptionDetails.text + ': ' + (p.exceptionDetails.exception?.description || ''))
  })
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const key = ++id
    const timeout = setTimeout(() => { pending.delete(key); reject(new Error('CDP timeout: ' + method)) }, 30000)
    pending.set(key, { resolve, reject, timeout }); socket.send(JSON.stringify({ id: key, method, params }))
  })
  const evaluate = async expression => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable')
  await send('Network.setCacheDisabled', { cacheDisabled: true })
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.audit = { lcp: 0, cls: 0, blocking: 0, shifts: [], longTasks: [] };
    new PerformanceObserver(l => { for (const e of l.getEntries()) { window.audit.lcp = e.startTime; window.audit.lcpElement = e.element?.tagName + '.' + e.element?.className; } }).observe({type:'largest-contentful-paint', buffered:true});
    new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.audit.cls += e.value; window.audit.shifts.push({time:e.startTime,value:e.value,sources:e.sources.map(s=>({node:s.node?.outerHTML?.slice(0,250),before:s.previousRect,after:s.currentRect}))}); } }).observe({type:'layout-shift', buffered:true});
    new PerformanceObserver(l => { for (const e of l.getEntries()) { window.audit.blocking += Math.max(0,e.duration-50); window.audit.longTasks.push({time:e.startTime,duration:e.duration}); } }).observe({type:'longtask', buffered:true});
  ` })
  const results = []
  if (label.startsWith('motion-check')) {
    const assert = (condition, message) => { if (!condition) throw new Error(message) }
    await send('Emulation.setDeviceMetricsOverride', {width:1440,height:900,deviceScaleFactor:1,mobile:false})
    for (const locale of ['ar','en']) {
      await send('Network.setBlockedURLs', {urls:['*.woff2']})
      await send('Page.navigate', {url:base+'/'+locale}); await sleep(1300)
      const fallbackHeight = await evaluate(`document.querySelector('h1').offsetHeight`)
      await send('Network.setBlockedURLs', {urls:[]})
      await send('Page.navigate', {url:base+'/'+locale}); await sleep(1300)
      assert(await evaluate(`document.querySelector('h1').offsetHeight`) === fallbackHeight, 'Heading height changes on font swap: '+locale)
      let nativeTransforms = 0
      for (const id of ['about','projects','skills','services','contact']) {
        await evaluate(`document.querySelector('#${id}').scrollIntoView({behavior:'instant'})`); await sleep(150)
        nativeTransforms += await evaluate(`document.getAnimations().filter(a=>a.effect?.getKeyframes().some(k=>k.transform?.includes('translateY'))).length`)
        await sleep(1300)
        assert(await evaluate(`getComputedStyle(document.querySelector('#${id} h2')).opacity === '1'`), 'Section heading stayed hidden: '+id)
        const shot = await send('Page.captureScreenshot', {format:'png'})
        await writeFile(`${output}/${locale}-${id}.png`, Buffer.from(shot.data,'base64'))
      }
      assert(nativeTransforms > 0, 'Native transform animations did not run')
      await evaluate(`document.querySelector('#skills .grid > div').scrollIntoView({behavior:'instant',block:'center'})`); await sleep(1600)
      const card = await evaluate(`(()=>{const e=document.querySelector('#skills .grid > div'),r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,transition:getComputedStyle(e).transitionProperty}})()`)
      assert(!card.transition.includes('transform') && card.transition !== 'all', 'CSS competes with Motion')
      await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:card.x,y:card.y}); await sleep(800)
      assert(await evaluate(`Math.abs(new DOMMatrix(getComputedStyle(document.querySelector('#skills .grid > div')).transform).m42 + 4) < .2`), 'Hover lift failed')
      await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0}); await sleep(800)
      assert(await evaluate(`Math.abs(new DOMMatrix(getComputedStyle(document.querySelector('#skills .grid > div')).transform).m42) < .2`), 'Hover did not restore')
      results.push({locale,fallbackHeight,nativeTransforms,hover:true})
    }
    await writeFile(`${output}/results.json`,JSON.stringify(results,null,2))
    console.log('PASS: font-swap heading geometry, native entrance animations, section visibility and spring hover in both languages')
  } else if (label.startsWith('smoke')) {
    const assert = (condition, message) => { if (!condition) throw new Error(message) }
    await send('Browser.grantPermissions', { origin: base, permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] })
    await send('Emulation.setCPUThrottlingRate', { rate: 1 })
    for (const width of [390, 1440]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width === 390 })
      for (const locale of ['ar', 'en']) {
        for (const suffix of ['', '/resources', '/resources/ai-agent-rules', '/resources/ram-local-models', '/resources/instagram-agent-skills']) {
          errors = []
          await send('Page.navigate', { url: `${base}/${locale}${suffix}` }); await sleep(1600)
          const state = await evaluate(`({lang:document.documentElement.lang,dir:document.documentElement.dir,h1:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth,canonical:document.querySelector('link[rel=canonical]')?.href,alternates:document.querySelectorAll('link[hreflang]').length,downloads:[...document.querySelectorAll('a[download]')].map(a=>a.href),jsonld:[...document.querySelectorAll('script[type="application/ld+json"]')].every(s=>{try{JSON.parse(s.textContent);return true}catch{return false}})})`)
          assert(state.lang === locale && state.dir === (locale === 'ar' ? 'rtl' : 'ltr'), 'Locale mismatch')
          assert(state.h1 && !state.overflow && state.canonical && state.alternates >= 2 && state.jsonld, 'Layout/SEO failure: ' + JSON.stringify(state))
          for (const url of new Set(state.downloads)) {
            const response = await fetch(url)
            assert(response.ok, `Download failed: ${url}`)
            if (url.endsWith('.pdf')) assert(Buffer.from(await response.arrayBuffer()).subarray(0,5).toString() === '%PDF-', 'Invalid PDF')
          }
          assert(!errors.length, errors.join('\n'))
          if (suffix === '/resources/ai-agent-rules' && locale === 'en') {
            await evaluate(`document.querySelector('main button[aria-label]').click()`); await sleep(100)
            assert(await evaluate(`navigator.clipboard.readText().then(text=>text.length>20)`), 'Copy button failed')
          }
          await evaluate(`window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'})`); await sleep(900)
          const loaded = await evaluate(`[...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight && i.getBoundingClientRect().bottom>0).every(i=>i.complete && i.naturalWidth>0)`)
          assert(loaded, 'Visible image failed')
          await evaluate(`window.scrollTo({top:0,behavior:'instant'})`); await sleep(150)
          const shot = await send('Page.captureScreenshot', { format: 'png' })
          await writeFile(`${output}/${width}-${locale}${suffix.replaceAll('/', '-')}.png`, Buffer.from(shot.data, 'base64'))
          results.push({width,route:`/${locale}${suffix}`,passed:true})
        }
        // Exercise hydration, theme, mobile navigation, language switching, and copy.
        if (width === 390) {
          await evaluate(`document.querySelector('button[aria-controls="mobile-menu"]').click()`)
          assert(await evaluate(`!document.querySelector('#mobile-menu').hidden`), 'Menu did not open')
          await send('Input.dispatchKeyEvent', {type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27})
          await sleep(100)
          assert(await evaluate(`document.querySelector('#mobile-menu').hidden`), 'Escape did not close menu')
        }
        await evaluate(`document.querySelector('nav button[title]').click()`); await sleep(100)
        assert(await evaluate(`document.documentElement.classList.contains('dark')`), 'Theme toggle failed')
        await evaluate(`document.querySelector('nav button[title]').click()`)
        const other = locale === 'ar' ? 'en' : 'ar'
        await evaluate(`document.querySelector('a[hreflang="${other}"]').click()`); await sleep(900)
        assert(await evaluate(`document.documentElement.lang === '${other}' && location.pathname.endsWith('/resources/instagram-agent-skills')`), 'Language switch lost route')
      }
    }
    // Native and JS fallback progress both reach the end; route changes reset the fallback.
    for (const fallback of [false, true]) {
      if (fallback) await send('Page.addScriptToEvaluateOnNewDocument', {source:`const originalSupports=CSS.supports.bind(CSS); CSS.supports=(...args)=>args[0]==='animation-timeline'?false:originalSupports(...args);`})
      await send('Page.navigate', {url:base+'/en/resources/ai-agent-rules'}); await sleep(1200)
      if (fallback) await evaluate(`document.head.appendChild(Object.assign(document.createElement('style'),{textContent:'.scroll-progress{animation:none!important}'}))`)
      await evaluate(`window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'})`); await sleep(300)
      assert(await evaluate(`Number(getComputedStyle(document.querySelector('.scroll-progress')).transform.split('(')[1].split(',')[0]) > .99`), 'Progress did not reach end')
    }
    await writeFile(`${output}/results.json`, JSON.stringify(results,null,2))
    console.log(`PASS: ${results.length} responsive route checks, PDF downloads, SEO, themes, menus, language switches and scroll progress`)
  } else {
  for (const mobile of [true, false]) {
    await send('Emulation.setDeviceMetricsOverride', { width: mobile ? 390 : 1440, height: mobile ? 844 : 900, deviceScaleFactor: mobile ? 2 : 1, mobile })
    await send('Emulation.setCPUThrottlingRate', { rate: mobile ? 4 : 1 })
    await send('Network.emulateNetworkConditions', { offline: false, latency: mobile ? 150 : 40, downloadThroughput: (mobile ? 1.6 : 10) * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 })
    for (const route of (process.env.HOME_ONLY ? ['/ar', '/en'] : ['/ar', '/ar/resources', '/ar/resources/ai-agent-rules'])) {
      for (const origin of (process.env.COMPARE_BASE ? [process.env.COMPARE_BASE, base] : [base])) {
      await send('Page.navigate', { url: 'about:blank' }); await sleep(200)
      requests = new Map(); errors = []
      await send('Network.clearBrowserCache')
      await send('Page.navigate', { url: origin + route })
      await sleep(mobile ? 15000 : 7000)
      const vitals = await evaluate(`({...window.audit, fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime, domReady: performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd, lang: document.documentElement.lang, dir: document.documentElement.dir, overflow: document.documentElement.scrollWidth > innerWidth, images: [...document.images].map(i=>({src:i.currentSrc,loaded:i.complete && i.naturalWidth>0})), fonts: document.fonts.status})`)
      const initial = [...requests.values()]
      const shot = await send('Page.captureScreenshot', { format: 'png' })
      const name = `${mobile ? 'mobile' : 'desktop'}${route.replaceAll('/', '-')}${process.env.COMPARE_BASE ? '-' + new URL(origin).port : ''}`
      await writeFile(`${output}/${name}.png`, Buffer.from(shot.data, 'base64'))
      const scroll = await evaluate(`new Promise(resolve => { let frames=[], last=performance.now(), start=last; const end=document.documentElement.scrollHeight-innerHeight; function step(now) { frames.push(now-last); last=now; window.scrollTo({top:end*Math.min(1,(now-start)/2000),behavior:'instant'}); if(now-start<2000) requestAnimationFrame(step); else resolve({frames:frames.length,over50ms:frames.filter(x=>x>50).length,maxFrameMs:Math.max(...frames)}); } requestAnimationFrame(step); })`)
      await sleep(1500)
      const row = { origin, route, device: mobile ? 'mobile' : 'desktop', ...vitals, bytes: initial.reduce((n,r)=>n+r.bytes,0), jsBytes: initial.filter(r=>r.type==='Script').reduce((n,r)=>n+r.bytes,0), requests: initial.length, scroll, errors, network: initial }
      results.push(row)
      await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2))
      console.log(JSON.stringify({ ...row, network: undefined, images: undefined, shifts: undefined, longTasks: undefined }))
      }
    }
  }
  }
  await send('Browser.close')
} finally { socket?.close(); chrome.kill() }
