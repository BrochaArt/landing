import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Cliente de Supabase para uso EXCLUSIVO en el servidor.
 *
 * Las variables no llevan el prefijo NEXT_PUBLIC_ a propósito: así la clave
 * nunca llega al navegador y solo el route handler puede insertar. La tabla
 * además tiene RLS con una política de solo-INSERT, de modo que ni siquiera
 * con la clave en mano se puede leer la lista de correos.
 *
 * Se inicializa de forma perezosa para que `next build` no falle cuando las
 * variables todavía no están configuradas.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  if (!client) {
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}
