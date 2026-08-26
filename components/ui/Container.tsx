import type { ReactNode } from "react";

/** Ancho del artboard del Figma (1280px) con el gutter de 50px del diseño. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-[50px] ${className}`}
    >
      {children}
    </div>
  );
}
