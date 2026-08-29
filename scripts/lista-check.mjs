import { chromium } from "playwright-core";
const PW = process.env.PW;
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1280, height: 1000 } });

const peticiones = [];
p.on("response", (r) => {
  if (r.url().includes("/api/admin/suscriptores")) peticiones.push([r.status(), r.url()]);
});

await p.goto("http://localhost:3000/admin", { waitUntil: "networkidle" });
await p.fill("input[type=password]", PW);
await p.click('button[type=submit]');
await p.waitForTimeout(1500);

// Abre la pestaña de suscriptores
await p.click('button:has-text("Suscriptores")');
await p.waitForTimeout(3000);
await p.screenshot({ path: ".preview/admin-lista.png", fullPage: true });

const filas = await p.$$eval("tbody tr", (rs) =>
  rs.map((r) => [...r.querySelectorAll("td")].map((td) => td.textContent.trim())),
);
const resumen = await p.$eval("table", () => document.body.innerText.match(/\d+ activos?.*/)?.[0] ?? "");
const contador = await p.$eval('button:has-text("Suscriptores") span', (s) => s.textContent).catch(() => null);

// Búsqueda
if (filas.length > 0 && filas[0][0]) {
  await p.fill('input[placeholder="Buscar correo…"]', filas[0][0].slice(0, 4));
  await p.waitForTimeout(400);
}
const trasBuscar = await p.$$eval("tbody tr", (rs) => rs.length);

// CSV directo por la API, con la cookie de sesión ya puesta
const csv = await p.evaluate(async () => {
  const r = await fetch("/api/admin/suscriptores?formato=csv");
  return { status: r.status, tipo: r.headers.get("content-type"), cuerpo: (await r.text()).slice(0, 300) };
});

console.log(JSON.stringify({ peticiones, filas, resumen, contador, trasBuscar, csv }, null, 2));
await b.close();
