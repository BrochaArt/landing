import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await p.goto(process.env.QA_URL ?? "http://localhost:3000", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
await p.locator("#top").screenshot({ path: ".preview/hero-movil.png" });
// contraste aproximado del titular sobre su fondo
const r = await p.evaluate(() => {
  const h = document.querySelector("#top h1");
  const c = h.getBoundingClientRect();
  return { alto: Math.round(document.querySelector("#top").getBoundingClientRect().height), tituloY: Math.round(c.y) };
});
console.log(JSON.stringify(r));
await b.close();
