import { chromium } from "playwright-core";
const URL = process.env.QA_URL ?? "http://localhost:3000";
const b = await chromium.launch({ channel: "chrome" });
for (const [name, vp, mobile] of [
  ["desktop", { width: 1280, height: 900 }, false],
  ["movil", { width: 390, height: 844 }, true],
]) {
  const p = await b.newPage({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
  await p.goto(URL, { waitUntil: "networkidle" });
  // Baja despacio para disparar el lazy-loading y espera a que todo cargue.
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForFunction(
    () => [...document.images].filter((i) => !i.complete).length <= 6,
    null,
    { timeout: 30000 },
  ).catch(() => {});
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `.preview/qa-${name}.png`, fullPage: true });
  const pend = await p.evaluate(() => [...document.images].filter((i) => !i.complete).length);
  console.log(`.preview/qa-${name}.png  (imágenes pendientes al capturar: ${pend})`);
  await p.close();
}
await b.close();
