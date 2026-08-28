/**
 * Envuelve el texto de una campaña en la plantilla de BROCHA.
 *
 * Quien escribe la campaña solo pone título y texto: el diseño lo pone la
 * plantilla. Esa es justamente la ventaja frente al editor genérico de Resend
 * — no se puede mandar algo que se vea fuera de marca.
 */

const VIOLETA = "#7454e8";
const MORADO = "#371d90";
const AMARILLO = "#fdff84";
const SITIO = "https://www.brocha.art";

function escapar(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Líneas en blanco separan párrafos; los saltos simples se respetan. */
function parrafos(cuerpo: string): string {
  return cuerpo
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">${escapar(p).replace(/\n/g, "<br>")}</p>`,
    )
    .join("");
}

export function campanaHtml(titulo: string, cuerpo: string): string {
  return `<!doctype html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapar(titulo)}</title></head>
<body style="margin:0;padding:32px 16px;background-color:#f0ecfd;font-family:Montserrat,Helvetica,Arial,sans-serif;color:#303030;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:20px;overflow:hidden;">
  <tr><td style="background-color:${VIOLETA};padding:28px 32px;">
    <p style="margin:0;font-size:22px;font-weight:700;letter-spacing:2px;color:#ffffff;">BROCHA</p>
  </td></tr>
  <tr><td style="padding:36px 32px 12px;">
    <h1 style="margin:0 0 20px;font-size:26px;line-height:1.25;font-weight:800;color:${MORADO};">${escapar(titulo)}</h1>
    ${parrafos(cuerpo)}
  </td></tr>
  <tr><td style="padding:16px 32px 36px;">
    <a href="${SITIO}" style="display:inline-block;padding:13px 26px;border-radius:20px;background-color:${AMARILLO};color:#000000;font-size:12px;font-weight:600;text-transform:uppercase;text-decoration:none;">Ir a BROCHA</a>
  </td></tr>
  <tr><td style="background-color:${MORADO};padding:20px 32px;">
    <p style="margin:0 0 8px;font-size:13px;color:${VIOLETA};">Somos el arte de conectar.</p>
    <p style="margin:0;font-size:11px;color:#8f7ae0;">
      Recibes esto porque te suscribiste en brocha.art.
      <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#8f7ae0;">Darse de baja</a>.
    </p>
  </td></tr>
</table>
</body>
</html>`;
}

/** Versión en texto plano: mejora la entregabilidad y el puntaje de spam. */
export function campanaTexto(titulo: string, cuerpo: string): string {
  return `${titulo}\n\n${cuerpo.trim()}\n\nIr a BROCHA: ${SITIO}\n\nSomos el arte de conectar.\nRecibes esto porque te suscribiste en brocha.art.\nDarse de baja: {{{RESEND_UNSUBSCRIBE_URL}}}`;
}
