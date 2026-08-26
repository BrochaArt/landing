import { Artistas } from "@/components/sections/Artistas";
import { ComoElegimos } from "@/components/sections/ComoElegimos";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Eventos } from "@/components/sections/Eventos";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Latam } from "@/components/sections/Latam";
import { Navbar } from "@/components/sections/Navbar";
import { Perfiles } from "@/components/sections/Perfiles";
import { QueEsBrocha } from "@/components/sections/QueEsBrocha";
import { QueVer } from "@/components/sections/QueVer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <QueEsBrocha />
        <ComoElegimos />
        <Artistas />
        <QueVer />
        <Perfiles />
        <Eventos />
        <Latam />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
