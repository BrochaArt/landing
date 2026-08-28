import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Envíos — BROCHA",
  // Fuera de los buscadores: es una herramienta interna.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
