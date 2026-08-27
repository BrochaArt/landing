import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
await p.locator("#artistas").scrollIntoViewIfNeeded();
await p.waitForTimeout(2000);
const r = await p.evaluate(() => {
  const lis = [...document.querySelectorAll("#artistas li")];
  return {
    total: lis.length,
    alturas: lis.map((l) => Math.round(l.getBoundingClientRect().height)),
    conBio: lis.filter((l) => l.querySelector("p")).length,
    conBandera: lis.filter((l) => l.querySelectorAll("img").length > 1).length,
  };
});
console.log(JSON.stringify(r, null, 1));
await p.locator("#artistas").screenshot({ path: ".preview/artistas.png" });
await b.close();
