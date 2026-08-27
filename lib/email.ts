import { Resend } from "resend";

let cliente: Resend | null = null;

/**
 * Cliente de Resend, inicializado de forma perezosa.
 *
 * Devuelve null cuando falta RESEND_API_KEY, para que `next build` no falle y
 * para que la landing siga guardando suscripciones aunque el envío no esté
 * configurado todavía: registrarse nunca debe romperse porque el correo falle.
 */
export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!cliente) cliente = new Resend(key);
  return cliente;
}

/**
 * Remitente. Mientras `brocha.art` no esté verificado en Resend hay que usar
 * onboarding@resend.dev, que SOLO entrega al correo dueño de la cuenta.
 */
export const REMITENTE = process.env.RESEND_FROM ?? "BROCHA <onboarding@resend.dev>";
