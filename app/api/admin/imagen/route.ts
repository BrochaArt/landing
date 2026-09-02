import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { exigirSesion } from "@/lib/admin-guard";

/**
 * Sube la imagen de cabecera de una campaña y devuelve su URL pública.
 *
 * Tiene que ser pública y de larga duración: un correo se abre semanas después
 * de enviarse, y ninguna imagen firmada que caduque sirve. Por eso no vale
 * guardarla en Supabase Storage con la clave publishable —haría falta abrir el
 * bucket a escritura para cualquiera que tenga esa clave— y sí Vercel Blob,
 * cuyo token es un secreto de servidor de verdad.
 *
 * La imagen llega ya reducida desde el navegador. Aquí solo se comprueba.
 */

const TIPOS = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/** Holgado: el navegador manda ~1120px de ancho, muy por debajo de esto. */
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  const bloqueo = await exigirSesion();
  if (bloqueo) return bloqueo;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Falta conectar el almacenamiento de imágenes." },
      { status: 503 },
    );
  }

  const form = await request.formData().catch(() => null);
  const archivo = form?.get("archivo");

  if (!(archivo instanceof File)) {
    return NextResponse.json({ error: "No llegó ninguna imagen." }, { status: 400 });
  }
  if (!TIPOS.includes(archivo.type)) {
    return NextResponse.json(
      { error: "Solo JPG, PNG, WebP o GIF." },
      { status: 400 },
    );
  }
  if (archivo.size > MAX_BYTES) {
    return NextResponse.json({ error: "La imagen pesa demasiado." }, { status: 400 });
  }

  try {
    const extension = archivo.type.split("/")[1].replace("jpeg", "jpg");
    const blob = await put(`campanas/imagen.${extension}`, archivo, {
      access: "public",
      // Sufijo aleatorio: sin él, subir una segunda imagen chocaría con la
      // anterior, y sobrescribirla rompería los correos ya enviados que
      // todavía apuntan a esa URL.
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    console.error("[admin] No se pudo subir la imagen:", e);
    return NextResponse.json({ error: "No se pudo subir la imagen." }, { status: 502 });
  }
}
