// Headless Chrome screenshots over the DevTools protocol, no dependencies.
// usage: node shot.mjs <url> <out.png> [width=1440] [height=900] [scheme=light] [full=0] [scrollTo=] [wait=5000] [rm=0]
// NOJS=1 in the environment disables script execution before navigation.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const [url, out, w = "1440", h = "900", scheme = "light", full = "0", scrollSel = "", waitMs = "5000", rm = "0"] = process.argv.slice(2);
const port = 9333 + Math.floor(Math.random() * 400);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", `--remote-debugging-port=${port}`, "--no-first-run", "--no-default-browser-check",
  "--hide-scrollbars", "--disable-gpu", `--user-data-dir=/tmp/kh-shot-${port}`, `--window-size=${w},${h}`, "about:blank",
], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map();
async function connect() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
      const page = list.find((t) => t.type === "page");
      if (page) { ws = new WebSocket(page.webSocketDebuggerUrl); break; }
    } catch { }
    await sleep(250);
  }
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
}
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
try {
  await connect();
  await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 2, mobile: +w < 700 });
  const features = [{ name: "prefers-color-scheme", value: scheme }];
  if (rm === "1") features.push({ name: "prefers-reduced-motion", value: "reduce" });
  await send("Emulation.setEmulatedMedia", { features });
  await send("Page.enable");
  if (process.env.NOJS === "1") await send("Emulation.setScriptExecutionDisabled", { value: true });
  // The site's theme is a class set by next-themes from localStorage, not the media query.
  await send("Page.addScriptToEvaluateOnNewDocument", { source: `try{localStorage.setItem('theme',${JSON.stringify(scheme)})}catch{}` });
  await send("Page.navigate", { url });
  await sleep(+waitMs);
  if (scrollSel) {
    await send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(scrollSel)})?.scrollIntoView({behavior:'instant',block:'start'})` });
    await sleep(1800);
  }
  const overflow = await send("Runtime.evaluate", { expression: "document.documentElement.scrollWidth + 'x' + document.documentElement.clientWidth", returnByValue: true });
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: full === "1", ...(full === "1" ? { clip: { x: 0, y: 0, width: +w, height: (await send("Runtime.evaluate", { expression: "document.documentElement.scrollHeight", returnByValue: true })).result.result.value, scale: 1 } } : {}) });
  writeFileSync(out, Buffer.from(shot.result.data, "base64"));
  console.log(out, "scrollWidth x clientWidth =", overflow.result.result.value);
} finally {
  chrome.kill("SIGKILL");
}
