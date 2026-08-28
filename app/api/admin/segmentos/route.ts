import { NextResponse } from "next/server";
import { exigirSesion } from "@/lib/admin-guard";
import { getResend } from "@/lib/email";

/** Lista los segmentos de Resend, para elegir a quién va la campaña. */
export async function GET() {
  const bloqueo = await exigirSesion();
  if (bloqueo) return bloqueo;

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: "Resend no está configurado." }, { status: 503 });
  }

  const { data, error } = await resend.segments.list();
  if (error) {
    console.error("[admin] No se pudieron listar los segmentos:", error);
    return NextResponse.json(
      { error: "No se pudieron cargar los segmentos." },
      { status: 502 },
    );
  }

  const segmentos = (data?.data ?? []).map((s) => ({ id: s.id, nombre: s.name }));
  return NextResponse.json({ segmentos });
}
