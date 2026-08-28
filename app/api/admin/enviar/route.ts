import { NextResponse } from "next/server";
import { exigirSesion } from "@/lib/admin-guard";
import { REMITENTE, getResend } from "@/lib/email";
import { campanaHtml, campanaTexto } from "@/lib/email-campana";

/**
 * Envía la campaña a un segmento completo.
 *
 * Va por Broadcasts y no por envíos sueltos en bucle: Broadcasts inserta el
 * enlace de baja y lleva el registro de quién se dio de baja. Mandar en bucle
 * sin eso deja el envío fuera de norma y dispara los reportes de spam.
 */
export async function POST(request: Request) {
  const bloqueo = await exigirSesion();
  if (bloqueo) return bloqueo;

  const { titulo, cuerpo, segmentId, confirmacion } = (await request
    .json()
    .catch(() => ({}))) as {
    titulo?: string;
    cuerpo?: string;
    segmentId?: string;
    confirmacion?: string;
  };

  if (!titulo?.trim() || !cuerpo?.trim()) {
    return NextResponse.json({ error: "Falta el título o el texto." }, { status: 400 });
  }
  if (!segmentId) {
    return NextResponse.json({ error: "Elige a quién enviar." }, { status: 400 });
  }
  // Segunda barrera además del diálogo del navegador: un clic accidental no
  // debe poder disparar un envío masivo.
  if (confirmacion !== "ENVIAR") {
    return NextResponse.json({ error: "Falta confirmar el envío." }, { status: 400 });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: "Resend no está configurado." }, { status: 503 });
  }

  const { data, error } = await resend.broadcasts.create({
    name: titulo.trim(),
    from: REMITENTE,
    subject: titulo.trim(),
    segmentId,
    html: campanaHtml(titulo.trim(), cuerpo),
    text: campanaTexto(titulo.trim(), cuerpo),
    send: true,
  });

  if (error) {
    console.error("[admin] Resend rechazó la campaña:", error);
    return NextResponse.json({ error: error.message ?? "No se pudo enviar." }, { status: 502 });
  }

  console.log("[admin] Campaña enviada:", data?.id, "-", titulo.trim());
  return NextResponse.json({ ok: true, id: data?.id });
}
