import { NextResponse } from "next/server";
import { exigirSesion } from "@/lib/admin-guard";
import { campanaHtml } from "@/lib/email-campana";

/** Devuelve el correo renderizado, para mostrarlo en la vista previa. */
export async function POST(request: Request) {
  const bloqueo = await exigirSesion();
  if (bloqueo) return bloqueo;

  const { titulo, cuerpo } = (await request.json().catch(() => ({}))) as {
    titulo?: string;
    cuerpo?: string;
  };
  if (!titulo?.trim() || !cuerpo?.trim()) {
    return NextResponse.json({ error: "Falta contenido." }, { status: 400 });
  }

  // En la previa el marcador de baja no aplica; se apunta al sitio.
  const html = campanaHtml(titulo.trim(), cuerpo).replaceAll(
    "{{{RESEND_UNSUBSCRIBE_URL}}}",
    "https://www.brocha.art",
  );
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
