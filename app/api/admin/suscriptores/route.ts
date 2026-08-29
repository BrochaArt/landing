import { NextResponse } from "next/server";
import { exigirSesion } from "@/lib/admin-guard";
import { getResend } from "@/lib/email";

/**
 * Lista de suscriptores, leída de los contactos de Resend.
 *
 * No sale de Supabase a propósito. La tabla `subscribers` es de solo-INSERT
 * (ver la migración): leerla desde el servidor obligaría a meter en el
 * despliegue una clave con permiso total sobre la base de datos. Los contactos
 * de Resend, en cambio, ya se leen con la clave que el módulo usa para enviar,
 * y son la lista que de verdad importa aquí: a quién le llega una campaña y
 * quién se dio de baja.
 */

const POR_PAGINA = 100;

/**
 * Tope de páginas. Con 2000 contactos la vista sigue siendo cómoda; a partir
 * de ahí conviene exportar desde Resend en vez de traerlo todo en cada carga.
 * El corte se avisa en la respuesta, nunca se silencia.
 */
const MAX_PAGINAS = 20;

type Suscriptor = { email: string; alta: string; dadoDeBaja: boolean };

/** Recorre las páginas de Resend hasta agotarlas o llegar al tope. */
async function traerContactos(
  segmentId: string | null,
): Promise<{ suscriptores: Suscriptor[]; truncado: boolean } | { error: string }> {
  const resend = getResend();
  if (!resend) return { error: "Resend no está configurado." };

  const suscriptores: Suscriptor[] = [];
  const vistos = new Set<string>();
  let cursor: string | undefined;

  for (let pagina = 0; pagina < MAX_PAGINAS; pagina++) {
    const { data, error } = await resend.contacts.list({
      limit: POR_PAGINA,
      // `after` es el id del último contacto de la página anterior, no un
      // token opaco: https://resend.com/docs/api-reference/contacts/list-contacts
      ...(cursor ? { after: cursor } : {}),
      ...(segmentId ? { segmentId } : {}),
    });

    if (error) {
      console.error("[admin] Resend no devolvió los contactos:", error);
      return { error: "No se pudo cargar la lista." };
    }

    const lote = data?.data ?? [];
    let nuevos = 0;
    for (const c of lote) {
      if (vistos.has(c.id)) continue;
      vistos.add(c.id);
      nuevos++;
      suscriptores.push({
        email: c.email,
        alta: c.created_at,
        dadoDeBaja: c.unsubscribed,
      });
    }

    // Se corta con `has_more`, pero también si una página no aportó a nadie
    // nuevo: si el cursor dejara de avanzar, repetiríamos la misma página
    // hasta el tope y la lista saldría llena de duplicados.
    if (!data?.has_more || nuevos === 0) {
      return { suscriptores, truncado: false };
    }
    cursor = lote[lote.length - 1].id;
  }

  return { suscriptores, truncado: true };
}

/**
 * Escapa un campo para CSV.
 *
 * El prefijo con comilla en `= + - @` es contra la inyección de fórmulas: sin
 * él, Excel abre `=1+1` como una fórmula en vez de como texto.
 */
function celda(valor: string): string {
  const seguro = /^[=+\-@]/.test(valor) ? `'${valor}` : valor;
  return `"${seguro.replace(/"/g, '""')}"`;
}

function comoCsv(suscriptores: Suscriptor[]): string {
  const filas = suscriptores.map((s) =>
    [celda(s.email), celda(s.alta), celda(s.dadoDeBaja ? "baja" : "activo")].join(","),
  );
  return ["correo,alta,estado", ...filas].join("\r\n");
}

export async function GET(request: Request) {
  const bloqueo = await exigirSesion();
  if (bloqueo) return bloqueo;

  const url = new URL(request.url);
  const segmentId = url.searchParams.get("segmentId");
  const resultado = await traerContactos(segmentId);

  if ("error" in resultado) {
    return NextResponse.json({ error: resultado.error }, { status: 502 });
  }

  if (url.searchParams.get("formato") === "csv") {
    return new Response(comoCsv(resultado.suscriptores), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="suscriptores-brocha.csv"',
      },
    });
  }

  return NextResponse.json(resultado);
}
