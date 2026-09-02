import { NextResponse } from "next/server";
import { exigirSesion } from "@/lib/admin-guard";
import { REMITENTE, getResend } from "@/lib/email";
import { campanaHtml, campanaTexto } from "@/lib/email-campana";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Solo se acepta https: la URL sale de nuestra subida, pero no cuesta cerrarlo. */
function imagenValida(v: unknown): string | undefined {
  return typeof v === "string" && v.startsWith("https://") ? v : undefined;
}

/** Envía la campaña a UNA dirección, para revisarla antes de mandarla a todos. */
export async function POST(request: Request) {
  const bloqueo = await exigirSesion();
  if (bloqueo) return bloqueo;

  const { titulo, cuerpo, destino, imagen } = (await request.json().catch(() => ({}))) as {
    titulo?: string;
    cuerpo?: string;
    destino?: string;
    imagen?: string;
  };

  if (!titulo?.trim() || !cuerpo?.trim()) {
    return NextResponse.json({ error: "Falta el título o el texto." }, { status: 400 });
  }
  if (!destino || !EMAIL.test(destino.trim())) {
    return NextResponse.json({ error: "Correo de prueba inválido." }, { status: 400 });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: "Resend no está configurado." }, { status: 503 });
  }

  // En la prueba el marcador de baja no se sustituye (eso lo hace Broadcasts),
  // así que se reemplaza por el sitio para que el enlace no quede roto.
  const limpiar = (s: string) => s.replaceAll("{{{RESEND_UNSUBSCRIBE_URL}}}", "https://www.brocha.art");

  const { error } = await resend.emails.send({
    from: REMITENTE,
    to: [destino.trim()],
    subject: `[PRUEBA] ${titulo.trim()}`,
    html: limpiar(campanaHtml(titulo.trim(), cuerpo, imagenValida(imagen))),
    text: limpiar(campanaTexto(titulo.trim(), cuerpo)),
  });

  if (error) {
    console.error("[admin] Resend rechazó la prueba:", error);
    return NextResponse.json({ error: error.message ?? "No se pudo enviar." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
