import { NextResponse } from "next/server";
import { exigirSesion } from "@/lib/admin-guard";
import { getResend } from "@/lib/email";

/**
 * Arranque del panel: los segmentos a los que se puede enviar y si la subida
 * de imágenes está disponible. Va junto para no encadenar dos peticiones
 * antes de poder pintar nada.
 */
export async function GET() {
  const bloqueo = await exigirSesion();
  if (bloqueo) return bloqueo;

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: "Resend no está configurado." }, { status: 503 });
  }

  // Sin store de Blob conectado, el campo de imagen se oculta en vez de
  // dejar que Sara elija un archivo para toparse con un error.
  const imagenes = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  const { data, error } = await resend.segments.list();
  if (error) {
    console.error("[admin] No se pudieron listar los segmentos:", error);
    return NextResponse.json(
      { error: "No se pudieron cargar los segmentos.", imagenes },
      { status: 502 },
    );
  }

  const segmentos = (data?.data ?? []).map((s) => ({ id: s.id, nombre: s.name }));
  return NextResponse.json({ segmentos, imagenes });
}
