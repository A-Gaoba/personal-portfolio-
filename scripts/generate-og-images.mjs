// Generates the per-language Open Graph images: public/og/en.png and public/og/ar.png (1200×630).
//
// Why not next/og (Satori)? Satori does not shape Arabic (letters render unjoined, right-to-left order is not
// applied), so the Arabic card is rendered by real Chrome instead. Run after changing the texts below:
//
//   node scripts/generate-og-images.mjs            (needs Google Chrome and internet for the Google Fonts)
//   CHROME_PATH="/path/to/chrome" node scripts/generate-og-images.mjs
//
// Texts restate the site's own metadata (messages/*.ts); no claims. Colours are the GAOBA Editorial tokens.
import { spawn } from "node:child_process"
import { mkdirSync, mkdtempSync, writeFileSync, existsSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT = join(ROOT, "public", "og")
const CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean)
const CHROME = CANDIDATES.find((p) => existsSync(p))
if (!CHROME) throw new Error("Chrome not found; set CHROME_PATH")

const cards = {
  en: {
    dir: "ltr",
    kicker: "PORTFOLIO",
    name: "Abdulrahman Gaoba",
    role: "Full Stack Developer &amp; UI/UX Designer",
  },
  ar: {
    dir: "rtl",
    kicker: "معرض الأعمال",
    name: "عبد الرحمن قوبع",
    role: "مطور Full Stack ومصمم UI/UX",
  },
}

const html = (c) => `<!doctype html><html dir="${c.dir}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;600;700&family=Martian+Mono:wght@500&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
body{background:#ECE8DF;color:#141414;font-family:"Readex Pro",sans-serif;padding:80px 96px;display:flex;flex-direction:column;justify-content:space-between;
  background-image:linear-gradient(to right,rgba(20,20,20,.06) 1px,transparent 1px);background-size:200px 100%}
.top{display:flex;align-items:center;gap:20px}
.ag{width:64px;height:64px;border-radius:50%;background:#141414;color:#ECE8DF;display:grid;place-items:center;font-weight:700;font-size:24px;direction:ltr}
.kicker{font-family:"Martian Mono","Readex Pro",monospace;font-size:22px;color:#6B655B;${c.dir === "ltr" ? "letter-spacing:4px" : "font-family:'Readex Pro';font-size:26px"}}
h1{font-size:${c.dir === "rtl" ? 104 : 92}px;font-weight:700;line-height:1.1;${c.dir === "ltr" ? "letter-spacing:-2px" : ""}}
.bar{width:220px;height:12px;background:#FF4A1C;border-radius:3px;margin-top:24px}
.role{font-size:40px;color:#4A463F;margin-top:30px}
.url{font-family:"Martian Mono",monospace;font-size:24px;color:#6B655B;direction:ltr;text-align:${c.dir === "rtl" ? "right" : "left"}}
</style></head><body>
<div class="top"><div class="ag">AG</div><div class="kicker">${c.kicker}</div></div>
<div><h1>${c.name}</h1><div class="bar"></div><div class="role">${c.role}</div></div>
<div class="url">gaoba.vercel.app</div>
</body></html>`

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const port = 9400 + Math.floor(Math.random() * 400)
const proc = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "og-"))}`, "about:blank"], { stdio: "ignore" })
let wsUrl
for (let i = 0; i < 60 && !wsUrl; i++) {
  await sleep(200)
  try { wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page")?.webSocketDebuggerUrl } catch {}
}
const ws = new WebSocket(wsUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id) } }
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })

mkdirSync(OUT, { recursive: true })
await send("Page.enable")
await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false })
for (const [locale, card] of Object.entries(cards)) {
  const file = join(tmpdir(), `og-${locale}-${Date.now()}.html`)
  writeFileSync(file, html(card))
  await send("Page.navigate", { url: "file:///" + file.replace(/\\/g, "/") })
  await sleep(2500)
  await send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true })
  await sleep(300)
  const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } })
  writeFileSync(join(OUT, `${locale}.png`), Buffer.from(shot.result.data, "base64"))
  console.log("wrote", join("public", "og", `${locale}.png`))
}
ws.close()
proc.kill()
