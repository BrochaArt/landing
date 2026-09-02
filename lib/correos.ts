/**
 * Lectura de una lista de correos pegada a mano.
 *
 * Lo que llega puede venir de un Excel, de un "para:" de Gmail o de un bloc de
 * notas, así que se acepta cualquier mezcla de saltos de línea, comas, puntos
 * y comas y espacios, y se limpian los <corchetes> y las comillas que arrastra
 * el formato "Nombre <correo@ejemplo.com>".
 */

/**
 * A propósito laxa: sirve para descartar basura evidente —líneas de texto,
 * nombres sueltos, encabezados de columna— no para decidir qué direcciones
 * existen de verdad. Eso lo dicen los rebotes, no una expresión regular.
 */
const CORREO = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/;

export type ListaCorreos = {
  validos: string[];
  /** Llevan arroba pero están mal: casi siempre erratas que conviene ver. */
  sospechosos: string[];
  /** Ni arroba tienen: nombres, encabezados de columna. Solo se cuentan. */
  ignorados: number;
  repetidos: number;
};

export function analizarCorreos(texto: string): ListaCorreos {
  const trozos = texto
    .split(/[\s,;]+/)
    .map((t) => t.trim().replace(/^[<"'(]+|[>"')]+$/g, ""))
    .filter(Boolean);

  const vistos = new Set<string>();
  const validos: string[] = [];
  const sospechosos: string[] = [];
  let ignorados = 0;
  let repetidos = 0;

  for (const trozo of trozos) {
    // Se comparan y se guardan en minúsculas, igual que hace el alta de la
    // landing, para que "Ana@x.com" y "ana@x.com" no entren como dos personas.
    const correo = trozo.toLowerCase();
    if (!CORREO.test(correo)) {
      // Pegar desde Gmail arrastra los nombres ("Ana Pérez <ana@x.com>") y
      // desde Excel el encabezado de la columna. Avisar de esos como errores
      // asusta sin motivo, así que solo se señalan los que llevan arroba:
      // esos sí suelen ser una errata que alguien querrá corregir.
      if (trozo.includes("@")) sospechosos.push(trozo);
      else ignorados++;
      continue;
    }
    if (vistos.has(correo)) {
      repetidos++;
      continue;
    }
    vistos.add(correo);
    validos.push(correo);
  }

  return { validos, sospechosos, ignorados, repetidos };
}
