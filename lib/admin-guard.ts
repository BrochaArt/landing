import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_ADMIN, adminHabilitado, tokenValido } from "@/lib/admin-auth";

/**
 * Guardia de las rutas de administración. Devuelve una respuesta de error
 * cuando no hay sesión válida, o null cuando puede seguir.
 */
export async function exigirSesion(): Promise<NextResponse | null> {
  if (!adminHabilitado()) {
    return NextResponse.json(
      { error: "El módulo de envíos no está configurado." },
      { status: 503 },
    );
  }
  const token = (await cookies()).get(COOKIE_ADMIN)?.value;
  if (!tokenValido(token)) {
    return NextResponse.json({ error: "Sesión no válida." }, { status: 401 });
  }
  return null;
}
