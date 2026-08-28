import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1280, height: 1000 } });
await p.goto("https://brocha-landing.vercel.app", { waitUntil: "networkidle" });
await p.locator("#artistas").scrollIntoViewIfNeeded();
await p.waitForTimeout(2500);
const r = await p.evaluate(() => {
  const lis = [...document.querySelectorAll("#artistas li")];
  return {
    total: lis.length,
    nombres: lis.map((l) => l.querySelector("h3")?.textContent.trim()),
    conBio: lis.filter((l) => l.querySelector("p")).length,
    banderas: lis.map((l) => l.querySelectorAll("img")[1]?.currentSrc.match(/(co|pe)\.webp/)?.[1]).filter(Boolean),
    rotas: [...document.querySelectorAll("#artistas img")].filter((i) => i.complete && i.naturalWidth === 0).length,
  };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
