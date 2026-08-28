import { chromium } from "playwright-core";
const URL = process.env.QA_URL ?? "http://localhost:3000";
const b = await chromium.launch({ channel: "chrome" });
const out = {};

// Desktop: composición del hero
{
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  const h1 = p.locator("#top h1");
  out.titulo = (await h1.innerText()).replace(/\s+/g, " ");
  out.colorTitulo = await h1.evaluate((e) => getComputedStyle(e).color);
  const caja = await p.locator("#top h1").boundingBox();
  out.textoEmpiezaEnX = Math.round(caja.x);
  out.mitadDerecha = caja.x > 640;
  out.botones = await p.locator("#top a").count();
  out.textoBoton = (await p.locator("#top a").allInnerTexts()).join(" | ");
  out.destinos = (await p.locator("#top a").evaluateAll((as) => as.map((a) => a.getAttribute("href")))).join(" | ");
  await p.locator("#top").screenshot({ path: ".preview/hero-nuevo.png" });
  await p.close();
}

// Móvil: tocar un artista no debe mover la página ni cambiar la URL
{
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await p.goto(URL, { waitUntil: "networkidle" });
  // Coloco una tarjeta en pantalla YO, para que el clic no obligue a
  // Playwright a desplazar y ensuciar la medición.
  await p.evaluate(() => {
    const li = document.querySelectorAll("#artistas li")[2];
    li.scrollIntoView({ block: "center", behavior: "instant" });
  });
  await p.waitForTimeout(1500);
  const antes = await p.evaluate(() => ({ y: Math.round(scrollY), hash: location.hash }));
  const caja = await p.locator("#artistas li").nth(2).boundingBox();
  await p.mouse.click(caja.x + caja.width / 2, caja.y + caja.height / 2);
  await p.waitForTimeout(1200);
  const despues = await p.evaluate(() => ({ y: Math.round(scrollY), hash: location.hash }));
  out.scrollAntes = antes.y;
  out.scrollDespues = despues.y;
  out.hashAntes = antes.hash || "(vacío)";
  out.hashDespues = despues.hash || "(vacío)";
  out.seQuedaEnSitio = Math.abs(antes.y - despues.y) < 10;
  out.enlacesEnTarjetas = await p.locator("#artistas li a").count();

  // tipografía del input
  const inp = p.locator("#email");
  await inp.scrollIntoViewIfNeeded();
  out.fuenteInput = await inp.evaluate((e) => getComputedStyle(e).fontFamily.split(",")[0]);
  await p.close();
}
await b.close();
console.log(JSON.stringify(out, null, 1));
