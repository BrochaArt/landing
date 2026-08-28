import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "brocha_admin";
const DURACION_HORAS = 8;

/**
 * Autenticación del módulo de envíos.
 *
 * Es un secreto compartido, no cuentas por persona: sirve para que quien lleva
 * marketing pueda enviar campañas sin tener acceso al panel de Resend (donde
 * podría tocar dominios, webhooks y API keys). No registra quién envió qué; si
 * eso hiciera falta, habría que pasar a un proveedor de autenticación.
 *
 * La sesión es una cookie httpOnly firmada con HMAC derivado de la propia
 * contraseña: cambiarla invalida todas las sesiones abiertas.
 */
function clave(): string | null {
  const p = process.env.ADMIN_PASSWORD;
  return p && p.length >= 12 ? p : null;
}

/** Compara sin filtrar información por el tiempo de respuesta. */
function igualSeguro(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) {
    // Se compara igual contra sí mismo para no acortar el tiempo cuando
    // las longitudes difieren.
    timingSafeEqual(ba, ba);
    return false;
  }
  return timingSafeEqual(ba, bb);
}

export function passwordValida(entrada: unknown): boolean {
  const k = clave();
  if (!k || typeof entrada !== "string") return false;
  return igualSeguro(entrada, k);
}

function firmar(payload: string, k: string): string {
  return createHmac("sha256", k).update(payload).digest("hex");
}

export function crearToken(): string | null {
  const k = clave();
  if (!k) return null;
  const expira = String(Date.now() + DURACION_HORAS * 3600_000);
  return `${expira}.${firmar(expira, k)}`;
}

export function tokenValido(token: string | undefined): boolean {
  const k = clave();
  if (!k || !token) return false;

  const [expira, firma] = token.split(".");
  if (!expira || !firma) return false;
  if (!igualSeguro(firma, firmar(expira, k))) return false;

  const ts = Number(expira);
  return Number.isFinite(ts) && ts > Date.now();
}

export const COOKIE_ADMIN = COOKIE;
export const COOKIE_OPCIONES = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: DURACION_HORAS * 3600,
};

/** ¿Está configurado el módulo? Sin contraseña queda deshabilitado por completo. */
export function adminHabilitado(): boolean {
  return clave() !== null;
}
