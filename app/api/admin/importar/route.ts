import { NextResponse } from "next/server";
import { exigirSesion } from "@/lib/admin-guard";
import { getResend } from "@/lib/email";
import { analizarCorreos } from "@/lib/correos";

/**
 * Importa una lista de correos pegada a mano al segmento elegido.
 *
 * Va por `contacts.imports`, que sube un CSV entero en una sola petición y lo
 * procesa Resend por su cuenta. La alternativa —un `contacts.create` por
 * correo— choca contra el límite de peticiones por segundo: doscientos
 * contactos tardarían minutos y se pasarían del tiempo máximo de la función.
 *
 * Como el proceso es asíncrono, este endpoint devuelve un id y el cliente
 * pregunta por el resultado con GET.
 */

/** Tope por tanda. Existe para que un pegado accidental de medio archivo no
 *  se cuele entero; Resend aguanta mucho más. */
const MAX_CORREOS = 5000;

export async function POST(request: Request) {
  const bloqueo = await exigirSesion();
  if (bloqueo) return bloqueo;

  const { correos, segmentId } = (await request.json().catch(() => ({}))) as {
    correos?: string;
    segmentId?: string;
  };

  if (!correos?.trim()) {
    return NextResponse.json({ error: "Pega al menos un correo." }, { status: 400 });
  }
  if (!segmentId) {
    return NextResponse.json({ error: "Elige a qué segmento importar." }, { status: 400 });
  }

  const { validos, sospechosos, ignorados, repetidos } = analizarCorreos(correos);

  if (validos.length === 0) {
    return NextResponse.json(
      { error: "Ninguno de esos textos parece un correo." },
      { status: 400 },
    );
  }
  if (validos.length > MAX_CORREOS) {
    return NextResponse.json(
      { error: `Son ${validos.length} correos y el tope por tanda es ${MAX_CORREOS}.` },
      { status: 400 },
    );
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: "Resend no está configurado." }, { status: 503 });
  }

  const csv = ["email", ...validos].join("\n");
  const { data, error } = await resend.contacts.imports.create({
    file: new Blob([csv], { type: "text/csv" }),
    columnMap: { email: "email" },
    // 'skip' y no 'upsert' a propósito: si alguien de la lista ya se dio de
    // baja, machacar su contacto lo volvería a suscribir. Volver a meter por
    // la puerta de atrás a quien pidió salir es justo lo que no se puede hacer.
    onConflict: "skip",
    segments: [{ id: segmentId }],
  });

  if (error) {
    console.error("[admin] Resend rechazó la importación:", error);
    return NextResponse.json(
      { error: error.message ?? "No se pudo importar la lista." },
      { status: 502 },
    );
  }

  console.log("[admin] Importación creada:", data?.id, "-", validos.length, "correos");
  return NextResponse.json({
    id: data?.id,
    enviados: validos.length,
    repetidos,
    ignorados,
    sospechosos: sospechosos.slice(0, 10),
    totalSospechosos: sospechosos.length,
  });
}

/** Estado de una importación en curso; el cliente pregunta hasta que termina. */
export async function GET(request: Request) {
  const bloqueo = await exigirSesion();
  if (bloqueo) return bloqueo;

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Falta el id." }, { status: 400 });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: "Resend no está configurado." }, { status: 503 });
  }

  const { data, error } = await resend.contacts.imports.get(id);
  if (error) {
    console.error("[admin] No se pudo consultar la importación:", error);
    return NextResponse.json({ error: "No se pudo consultar el estado." }, { status: 502 });
  }

  return NextResponse.json({ estado: data?.status, cuentas: data?.counts });
}
