/**
 * Correo de bienvenida, como HTML.
 *
 * Se genera con una plantilla de texto y no con React a propósito: el
 * parámetro `react` del SDK de Resend exige `@react-email/render`, y aquí lo
 * único que hace falta es un string estático. Menos dependencias y un modo de
 * fallo menos.
 *
 * Estilos en línea y estructura de tablas porque esto es HTML de correo:
 * Outlook no soporta flexbox ni grid.
 */

const VIOLETA = "#7454e8";
const MORADO = "#371d90";
const AMARILLO = "#fdff84";
const SITIO = "https://brocha-landing.vercel.app";

/** Escapa el correo antes de incrustarlo: viene de un formulario público. */
function escapar(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function bienvenidaHtml(email: string): string {
  const e = escapar(email);
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ya estás en la lista de BROCHA</title>
</head>
<body style="margin:0;padding:32px 16px;background-color:#f0ecfd;font-family:Montserrat,Helvetica,Arial,sans-serif;color:#303030;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:20px;overflow:hidden;">
  <tr>
    <td style="background-color:${VIOLETA};padding:28px 32px;">
      <p style="margin:0;font-size:22px;font-weight:700;letter-spacing:2px;color:#ffffff;">BROCHA</p>
    </td>
  </tr>
  <tr>
    <td style="padding:36px 32px 8px;">
      <h1 style="margin:0;font-size:26px;line-height:1.2;font-weight:800;color:${MORADO};">Ya estás en la lista.</h1>
      <p style="margin:18px 0 0;font-size:15px;line-height:1.6;">
        Gracias por sumarte. Apenas abramos el acceso a la plataforma te escribimos
        a <strong>${e}</strong> antes que a nadie, junto con las invitaciones a
        nuestros eventos en vivo.
      </p>
      <p style="margin:18px 0 0;font-size:15px;line-height:1.6;">
        Mientras tanto: Brocha reúne la obra de cada artista latinoamericano, su
        historia, sus eventos y sus productos en un solo lugar, con certificados
        de autenticidad en blockchain.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:28px 32px 36px;">
      <a href="${SITIO}" style="display:inline-block;padding:13px 26px;border-radius:20px;background-color:${AMARILLO};color:#000000;font-size:12px;font-weight:600;text-transform:uppercase;text-decoration:none;">Descubre Brocha</a>
    </td>
  </tr>
  <tr>
    <td style="background-color:${MORADO};padding:20px 32px;">
      <p style="margin:0;font-size:13px;color:${VIOLETA};">Somos el arte de conectar.</p>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** Alternativa en texto plano: mejora la entregabilidad y el puntaje de spam. */
export function bienvenidaTexto(email: string): string {
  return [
    "BROCHA — Ya estás en la lista.",
    "",
    `Gracias por sumarte. Apenas abramos el acceso a la plataforma te escribimos a ${email} antes que a nadie, junto con las invitaciones a nuestros eventos en vivo.`,
    "",
    "Brocha reúne la obra de cada artista latinoamericano, su historia, sus eventos y sus productos en un solo lugar, con certificados de autenticidad en blockchain.",
    "",
    `Descubre Brocha: ${SITIO}`,
    "",
    "Somos el arte de conectar.",
  ].join("\n");
}
