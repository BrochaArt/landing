import { chromium } from "playwright-core";

const URL = process.env.QA_URL ?? "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome" });
const out = {};

// ---------- Desktop ----------
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errores = [];
  page.on("pageerror", (e) => errores.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errores.push(m.text()));
  await page.goto(URL, { waitUntil: "networkidle" });

  // ¿hidrata? el riel del carrusel solo se mueve si React tomó el control
  {
    const riel = page.locator("#que-es-brocha ul");
    const antes = await riel.evaluate((e) => e.scrollLeft);
    await page.getByLabel("Tarjeta siguiente").click();
    await page.waitForTimeout(700);
    out.hidrata = (await riel.evaluate((e) => e.scrollLeft)) > antes;
    await page.getByLabel("Tarjeta anterior").click();
    await page.waitForTimeout(700);
  }

  // Galería
  await page.locator("#eventos button").nth(1).click();
  const dlg = page.locator('[role="dialog"]');
  out.galeriaAbre = await dlg.isVisible().catch(() => false);
  if (out.galeriaAbre) {
    out.galeriaLabel = await dlg.getAttribute("aria-label");
    out.contadorInicial = (await dlg.locator("p").first().innerText()).replace(/\s+/g, " ").trim();
    await dlg.getByLabel("Foto siguiente").click();
    out.contadorTrasSiguiente = (await dlg.locator("p").first().innerText()).replace(/\s+/g, " ").trim();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    out.galeriaCierraConEsc = !(await dlg.isVisible().catch(() => false));
  }

  out.overflowXDesktop = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  out.altoDesktop = await page.evaluate(() => document.documentElement.scrollHeight);
  out.erroresDesktop = errores;
  await page.close();
}

// ---------- Móvil ----------
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const errores = [];
  page.on("pageerror", (e) => errores.push(String(e)));
  await page.goto(URL, { waitUntil: "networkidle" });

  out.overflowXMovil = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  out.altoMovil = await page.evaluate(() => document.documentElement.scrollHeight);
  out.colorScheme = await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme);

  // Artistas: 6 visibles y "Cargar más"
  const visibles = () => page.locator("#artistas li:visible").count();
  out.artistasVisibles = await visibles();
  const cargar = page.getByRole("button", { name: /Cargar más/ });
  out.hayCargarMas = await cargar.isVisible().catch(() => false);
  if (out.hayCargarMas) {
    await cargar.click();
    await page.waitForTimeout(300);
    out.artistasTrasCargar = await visibles();
  }

  // ¿el título de 360° cabe en 2 líneas?
  out.lineasTitulo360 = await page.evaluate(() => {
    const h = [...document.querySelectorAll("h2")].find((e) => e.textContent.includes("Vemos al artista"));
    if (!h) return null;
    const lh = parseFloat(getComputedStyle(h).lineHeight);
    return Math.round(h.getBoundingClientRect().height / lh);
  });

  // Perfiles debe ser carrusel (desplazable) en móvil
  out.perfilesEsCarrusel = await page.evaluate(() => {
    const ul = document.querySelectorAll("main ul");
    for (const u of ul) if (u.textContent.includes("Aprendices")) return u.scrollWidth > u.clientWidth + 5;
    return null;
  });

  // Banderas lado a lado
  out.banderasLadoALado = await page.evaluate(() => {
    const s = document.getElementById("paises");
    const lis = s ? [...s.querySelectorAll("li")] : [];
    if (lis.length < 2) return null;
    return Math.abs(lis[0].getBoundingClientRect().top - lis[1].getBoundingClientRect().top) < 10;
  });

  out.erroresMovil = errores;
  await page.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 1));
