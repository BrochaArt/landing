import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";

/**
 * `uppercase` NO va aquí: Tailwind resuelve los choques entre utilidades por
 * el orden del CSS, no por el orden en el atributo, así que un `normal-case`
 * puesto en la llamada perdía contra un `uppercase` puesto en la base. Se
 * controla con la prop `mayusculas`, que es explícita y no depende del orden.
 */
const base =
  "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-[20px] px-5 text-center text-[12px] font-medium leading-none transition-transform duration-150 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-brocha-yellow text-black",
  secondary: "bg-white text-black",
};

type Comun = { variant?: Variant; mayusculas?: boolean };

function clases({ variant = "primary", mayusculas = true }: Comun, extra: string) {
  return `${base} ${variants[variant]} ${mayusculas ? "uppercase" : ""} ${extra}`;
}

export function Button({
  variant,
  mayusculas,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"button"> & Comun) {
  return <button className={clases({ variant, mayusculas }, className)} {...props} />;
}

export function ButtonLink({
  variant,
  mayusculas,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"a"> & Comun) {
  return <a className={clases({ variant, mayusculas }, className)} {...props} />;
}
