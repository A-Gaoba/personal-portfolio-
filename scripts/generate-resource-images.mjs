// Generates the card / Open Graph image of every resource in content/resources.ts, one per site language:
// public/resources/<slug>/og-<locale>.png (1200×630). Real Chrome renders them so Arabic is shaped correctly
// (same approach and GAOBA Editorial tokens as scripts/generate-og-images.mjs). Run after adding a resource:
//
//   node --experimental-strip-types scripts/generate-resource-images.mjs
//   CHROME_PATH="/path/to/chrome" node --experimental-strip-types scripts/generate-resource-images.mjs
//
// Texts come only from the resource entry (title, ogTagline, source author/license); nothing is added here.
import { spawn } from "node:child_process"
import { mkdirSync, mkdtempSync, writeFileSync, existsSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { resources } from "../content/resources.ts"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const CHROME = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean).find((p) => existsSync(p))
if (!CHROME) throw new Error("Chrome not found; set CHROME_PATH")

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const labels = {
  en: { dir: "ltr", kicker: "GAOBA AI · RESOURCES", type: { guide: "Guide", template: "Template", tool: "Tool", checklist: "Checklist" }, source: (s) => `Original project by ${s.author}${s.license ? ` · ${s.license} license` : ""}`, pages: (n) => `PDF · ${n} pages` },
  ar: { dir: "rtl", kicker: "GAOBA AI · الموارد", type: { guide: "دليل", template: "قالب", tool: "أداة", checklist: "قائمة تحقق" }, source: (s) => `المشروع الأصلي: ${s.author}${s.license ? ` · رخصة ${s.license}` : ""}`, pages: (n) => `${n} صفحات · PDF` },
}

const html = (r, locale) => {
  const L = labels[locale]
  const t = r.text[locale]
  const rtl = L.dir === "rtl"
  return `<!doctype html><html dir="${L.dir}" lang="${locale}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;600;700&family=Martian+Mono:wght@500;600&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
body{background:#ECE8DF;color:#141414;font-family:"Readex Pro",sans-serif;padding:72px 88px;display:flex;flex-direction:column;justify-content:space-between;
  background-image:linear-gradient(to right,rgba(20,20,20,.06) 1px,transparent 1px);background-size:200px 100%}
.top{display:flex;align-items:center;justify-content:space-between}
.k{display:flex;align-items:center;gap:18px}
.ag{width:60px;height:60px;border-radius:50%;background:#141414;color:#ECE8DF;display:grid;place-items:center;font-weight:700;font-size:22px;direction:ltr}
.kicker{font-family:${rtl ? '"Readex Pro"' : '"Martian Mono"'},monospace;font-size:${rtl ? 26 : 20}px;color:#6B655B;${rtl ? "" : "letter-spacing:3px"}}
.chip{border:2px solid #141414;border-radius:999px;padding:8px 22px;font-size:24px;font-weight:600}
h1{font-size:92px;font-weight:700;line-height:1.05;letter-spacing:-2px;direction:ltr;text-align:${rtl ? "right" : "left"}}
.bar{width:200px;height:12px;background:#FF4A1C;border-radius:3px;margin-top:26px;${rtl ? "margin-inline-start:auto;margin-left:auto;margin-right:0" : ""}}
.tag{font-size:40px;color:#4A463F;margin-top:26px}
.foot{display:flex;justify-content:space-between;align-items:flex-end;font-size:24px;color:#4A463F}
.mono{font-family:${rtl ? '"Readex Pro"' : '"Martian Mono"'},monospace;font-size:${rtl ? 24 : 21}px;color:#6B655B}
</style></head><body>
<div class="top"><div class="k"><div class="ag">AG</div><div class="kicker">${esc(L.kicker)}</div></div><div class="chip">${esc(L.type[r.category])}</div></div>
<div><h1>${esc(t.title)}</h1><div class="bar"></div><div class="tag">${esc(t.ogTagline)}</div></div>
<div class="foot"><div>${esc(L.source(r.source))}</div><div class="mono">${esc(L.pages(r.file.pages))}</div></div>
</body></html>`
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const port = 9400 + Math.floor(Math.random() * 400)
const profile = mkdtempSync(join(tmpdir(), "og-"))
const proc = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" })
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

await send("Page.enable")
await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false })
for (const r of resources) {
  for (const locale of Object.keys(labels)) {
    const file = join(tmpdir(), `res-${r.slug}-${locale}-${Date.now()}.html`)
    writeFileSync(file, html(r, locale))
    await send("Page.navigate", { url: "file:///" + file.replace(/\\/g, "/") })
    await sleep(2500)
    await send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true })
    await sleep(300)
    const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } })
    const out = join(ROOT, "public", r.image[locale])
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, Buffer.from(shot.result.data, "base64"))
    rmSync(file, { force: true })
    console.log("wrote", r.image[locale])
  }
}
ws.close()
proc.kill()
// Remove the temporary Chrome profile and HTML files (they add up to hundreds of MB over many runs).
await sleep(800)
rmSync(profile, { recursive: true, force: true })
