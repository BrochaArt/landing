import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
const peticiones = [];
p.on("request", (r) => r.url().includes("/api/admin/previa") && peticiones.push(Date.now()));

await p.goto("http://localhost:3000/admin", { waitUntil: "networkidle" });
await p.fill('input[type=password]', process.env.PW);
await p.click('button[type=submit]');
await p.waitForTimeout(1500);

// Escribe sin tocar ningún botón
await p.fill('input[placeholder="Nuevos artistas en BROCHA"]', "Brocha SubPop vuelve a Lima");
await p.locator('textarea').type("Segunda edición de la subasta popular.\n\nEntradas limitadas.", { delay: 25 });
await p.waitForTimeout(2500);

const html = await p.frameLocator("iframe").locator("body").innerText().catch(() => "");
console.log(JSON.stringify({
  peticionesDePrevia: peticiones.length,
  previaTieneContenido: html.includes("Brocha SubPop vuelve a Lima"),
  hayBotonManual: await p.locator('button:has-text("Actualizar vista previa")').count(),
}, null, 1));
await p.screenshot({ path: ".preview/admin-auto.png" });
await b.close();
