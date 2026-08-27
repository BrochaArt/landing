import type { Metadata } from "next";
import { Lexend, Montserrat, Syne } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

export const viewport = {
  colorScheme: "only light" as const,
  themeColor: "#7454e8",
};

export const metadata: Metadata = {
  title: "BROCHA — Somos el arte de conectar",
  description:
    "Le devolvemos el poder al artista latinoamericano con estudios, tienda, eventos y certificados de autenticidad en blockchain.",
  openGraph: {
    title: "BROCHA — Somos el arte de conectar",
    description:
      "Le devolvemos el poder al artista latinoamericano con estudios, tienda, eventos y certificados de autenticidad en blockchain.",
    type: "website",
    locale: "es_LA",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${syne.variable} ${lexend.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}
