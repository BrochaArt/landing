import { chromium } from "playwright-core";
const PW = process.env.PW;
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });

await p.goto("http://localhost:3000/admin", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
await p.screenshot({ path: ".preview/admin-login.png" });

await p.fill('input[type=password]', PW);
await p.click('button[type=submit]');
await p.waitForTimeout(1500);
await p.fill('input[placeholder="Nuevos artistas en BROCHA"]', "Nuevos artistas en BROCHA");
await p.fill('textarea', "Esta semana suman tres artistas a la selección: Xomatok, Tamiki y Pésimo.\n\nEntra a conocer su obra y su historia.");
await p.click('button:has-text("Actualizar vista previa")');
await p.waitForTimeout(1500);
await p.screenshot({ path: ".preview/admin-compositor.png" });
console.log("capturas listas");
await b.close();
