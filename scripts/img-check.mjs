import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
// baja despacio para que el lazy-loading dispare
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 250));
  }
});
await p.waitForTimeout(2500);
const r = await p.evaluate(() => {
  const imgs = [...document.images];
  return {
    total: imgs.length,
    cargadas: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
    rotas: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src.slice(-45)),
    pendientes: imgs.filter((i) => !i.complete).map((i) => i.src.slice(-45)),
    lazy: imgs.filter((i) => i.loading === "lazy").length,
  };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
