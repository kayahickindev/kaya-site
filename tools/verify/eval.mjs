// node eval.mjs <url> <width> <height> "<expression>" [wait=5000]
import { spawn } from "node:child_process";
const [url, w = "1440", h = "900", expr = "1", waitMs = "5000"] = process.argv.slice(2);
const port = 9800 + Math.floor(Math.random() * 150);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${port}`, "--no-first-run", "--hide-scrollbars", `--user-data-dir=/tmp/kh-eval-${port}`, `--window-size=${w},${h}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map();
for (let i = 0; i < 60 && !ws; i++) { try { const l = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json()); const p = l.find((t) => t.type === "page"); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch { } if (!ws) await sleep(250); }
await new Promise((r) => (ws.onopen = r));
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
try {
  await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 2, mobile: +w < 700 });
  await send("Page.enable"); await send("Page.navigate", { url }); await sleep(+waitMs);
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  console.log(JSON.stringify(r.result.result.value ?? r.result, null, 1));
} finally { chrome.kill("SIGKILL"); }
