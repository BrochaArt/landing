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
  // Base absoluta: sin esto Next no puede resolver la URL de la imagen social,
  // y las vistas previas al compartir salen sin imagen.
  metadataBase: new URL("https://www.brocha.art"),
  title: "BROCHA — Sello de Arte Latinoamericano Independiente",
  description:
    "Conecta, aprende y colecciona directamente de los mejores artistas latinoamericanos.",
  openGraph: {
    title: "BROCHA — Sello de Arte Latinoamericano Independiente",
    description:
      "Conecta, aprende y colecciona directamente de los mejores artistas latinoamericanos.",
    url: "https://www.brocha.art",
    siteName: "BROCHA",
    type: "website",
    locale: "es_LA",
  },
  twitter: {
    card: "summary_large_image",
    title: "BROCHA — Sello de Arte Latinoamericano Independiente",
    description:
      "Conecta, aprende y colecciona directamente de los mejores artistas latinoamericanos.",
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
