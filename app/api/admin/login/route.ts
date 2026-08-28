import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  COOKIE_ADMIN,
  COOKIE_OPCIONES,
  adminHabilitado,
  crearToken,
  passwordValida,
} from "@/lib/admin-auth";

/**
 * Intentos fallidos por instancia. No es un límite estricto —las funciones se
 * reciclan— pero encarece lo suficiente un ataque por fuerza bruta, que junto
 * al retardo fijo por fallo hace inviable probar contraseñas a ritmo útil.
 */
const fallos = new Map<string, { n: number; hasta: number }>();
const MAX_INTENTOS = 8;
const BLOQUEO_MS = 10 * 60_000;

export async function POST(request: Request) {
  if (!adminHabilitado()) {
    return NextResponse.json(
      { error: "El módulo de envíos no está configurado." },
      { status: 503 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
  const estado = fallos.get(ip);
  if (estado && estado.n >= MAX_INTENTOS && Date.now() < estado.hasta) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera unos minutos." },
      { status: 429 },
    );
  }

  let password: unknown;
  try {
    ({ password } = (await request.json()) as { password?: unknown });
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  if (!passwordValida(password)) {
    // Retardo fijo: no depende del motivo del fallo, así no se filtra nada.
    await new Promise((r) => setTimeout(r, 700));
    const n = (estado?.n ?? 0) + 1;
    fallos.set(ip, { n, hasta: Date.now() + BLOQUEO_MS });
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  fallos.delete(ip);
  const token = crearToken();
  if (!token) {
    return NextResponse.json({ error: "No se pudo iniciar sesión." }, { status: 500 });
  }
  (await cookies()).set(COOKIE_ADMIN, token, COOKIE_OPCIONES);
  return NextResponse.json({ ok: true });
}
