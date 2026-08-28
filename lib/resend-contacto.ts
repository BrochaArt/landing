import { getResend } from "@/lib/email";

/**
 * Registra al suscriptor como contacto en Resend, para poder enviarle
 * campañas (Broadcasts) sin exportar la lista a mano desde Supabase.
 *
 * Los contactos en Resend son globales: no hace falta configurar nada para
 * que aparezcan. `RESEND_SEGMENT_ID` es opcional y solo sirve si se quiere
 * que las altas caigan además en un segmento concreto.
 *
 * Nunca lanza. Guardar la suscripción es lo que no puede fallar; que Resend
 * no responda no debe convertirse en un error para quien se suscribe.
 */
export async function registrarContacto(email: string): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const segmento = process.env.RESEND_SEGMENT_ID;

  try {
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      ...(segmento ? { segments: [{ id: segmento }] } : {}),
    });

    // Que ya exista no es un fallo: significa que se suscribió antes.
    if (error && !/already exists/i.test(error.message ?? "")) {
      console.error("[subscribe] Resend no registró el contacto:", error);
    }
  } catch (e) {
    console.error("[subscribe] Falló el registro de contacto en Resend:", e);
  }
}
