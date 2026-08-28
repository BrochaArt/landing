import { after, NextResponse } from "next/server";
import { bienvenidaHtml, bienvenidaTexto } from "@/lib/email-bienvenida";
import { REMITENTE, getResend } from "@/lib/email";
import { registrarContacto } from "@/lib/resend-contacto";
import { getSupabase } from "@/lib/supabase";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const email =
    typeof payload === "object" && payload !== null && "email" in payload
      ? (payload as { email: unknown }).email
      : undefined;

  if (typeof email !== "string") {
    return NextResponse.json({ error: "Escribe tu correo." }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();

  if (normalized.length > 254 || !EMAIL.test(normalized)) {
    return NextResponse.json(
      { error: "Ese correo no parece válido. Revísalo." },
      { status: 400 },
    );
  }

  const supabase = getSupabase();

  if (!supabase) {
    console.error(
      "[subscribe] Faltan SUPABASE_URL o SUPABASE_PUBLISHABLE_KEY en el entorno.",
    );
    return NextResponse.json(
      { error: "El registro no está disponible ahora mismo." },
      { status: 503 },
    );
  }

  const { error } = await supabase
    .from("subscribers")
    .insert({ email: normalized, source: "landing" });

  if (error) {
    // 23505 = unique_violation. Ya estaba en la lista; para quien se suscribe
    // eso es un éxito, no un error.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    console.error("[subscribe] Error al guardar:", error.code, error.message);
    return NextResponse.json(
      { error: "No pudimos guardar tu correo. Intenta de nuevo." },
      { status: 500 },
    );
  }

  // El correo se envía después de responder: quien se suscribe ve la
  // confirmación de inmediato y un fallo de envío nunca rompe el alta.
  after(async () => {
    const resend = getResend();
    if (!resend) {
      console.warn("[subscribe] Sin RESEND_API_KEY: no se envía bienvenida.");
      return;
    }

    // Alta en la lista de Resend, para poder mandarle campañas después.
    await registrarContacto(normalized);

    try {
      const { error: errorCorreo } = await resend.emails.send({
        from: REMITENTE,
        to: [normalized],
        subject: "Ya estás en la lista de BROCHA",
        html: bienvenidaHtml(normalized),
        text: bienvenidaTexto(normalized),
      });
      if (errorCorreo) {
        console.error("[subscribe] Resend rechazó el envío:", errorCorreo);
      }
    } catch (e) {
      console.error("[subscribe] Falló el envío de bienvenida:", e);
    }
  });

  return NextResponse.json({ ok: true });
}
