import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_ADMIN, COOKIE_OPCIONES } from "@/lib/admin-auth";

export async function POST() {
  (await cookies()).set(COOKIE_ADMIN, "", { ...COOKIE_OPCIONES, maxAge: 0 });
  return NextResponse.json({ ok: true });
}
