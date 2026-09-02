/**
 * Reduce una imagen en el navegador antes de subirla.
 *
 * Una foto de teléfono son 4000px y varios megas; la plantilla del correo mide
 * 560px, así que 1120 basta para verse nítida en pantallas retina. Subir el
 * original sería tirar ancho de banda y espacio de almacenamiento para que el
 * servidor mande exactamente lo mismo.
 *
 * Los GIF se devuelven tal cual: pasarlos por un canvas se quedaría con el
 * primer fotograma y perdería la animación, que es justo lo que se quiere de
 * un GIF.
 */

const ANCHO_MAXIMO = 1120;
const CALIDAD = 0.85;

export async function reducirImagen(archivo: File): Promise<File> {
  if (archivo.type === "image/gif") return archivo;

  const bitmap = await createImageBitmap(archivo).catch(() => null);
  if (!bitmap) return archivo;

  if (bitmap.width <= ANCHO_MAXIMO) {
    bitmap.close();
    return archivo;
  }

  const alto = Math.round((bitmap.height * ANCHO_MAXIMO) / bitmap.width);
  const lienzo = document.createElement("canvas");
  lienzo.width = ANCHO_MAXIMO;
  lienzo.height = alto;

  const ctx = lienzo.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return archivo;
  }
  ctx.drawImage(bitmap, 0, 0, ANCHO_MAXIMO, alto);
  bitmap.close();

  // Se pasa todo a JPEG salvo el PNG, que puede traer transparencia.
  const salida = archivo.type === "image/png" ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob | null>((res) =>
    lienzo.toBlob(res, salida, CALIDAD),
  );
  if (!blob) return archivo;

  const nombre = archivo.name.replace(/\.[^.]+$/, "") + (salida === "image/png" ? ".png" : ".jpg");
  return new File([blob], nombre, { type: salida });
}
