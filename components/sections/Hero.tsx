import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[560px] items-center pt-[76px] lg:h-[740px] lg:min-h-0 lg:pt-[102px]"
    >
      <Image
        src="/images/hero.webp"
        alt="Visitantes observando una obra en una galería"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center lg:object-left"
      />
      {/* Paradas explícitas en vez de from/via/to: la foto queda limpia hasta el
          42%, el violeta entra entre 42% y 68%, y de ahí a la derecha es sólido
          para que el texto se lea. En móvil el degradado es vertical y más
          denso, porque ahí el texto va encima de la imagen. */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#4a17b4_0%,rgba(74,23,180,0.92)_38%,rgba(60,30,120,0.45)_70%,rgba(40,20,90,0.25)_100%)] lg:bg-[linear-gradient(to_right,transparent_0%,transparent_42%,rgba(90,47,214,0.86)_60%,#5a2fd6_74%,#5a2fd6_100%)]" />

      <Container className="py-16 lg:py-0">
        <div className="ml-auto max-w-[520px] text-center lg:text-left">
          <h1 className="text-[34px] font-bold leading-[1.1] text-white sm:text-[42px] lg:text-[50px] lg:leading-[1.08]">
            {hero.title}
          </h1>
          <p className="mt-5 text-[15px] font-medium text-white/90 lg:mt-6 lg:text-[16px]">
            {hero.subtitle}
          </p>
          {/* El amarillo es el CTA de suscripción en todo el sitio (navbar y
              cierre), así que va primero y "Descubre BROCHA" pasa a blanco:
              dos botones amarillos competirían y ninguno leería como principal. */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:mt-9 lg:justify-start">
            <ButtonLink
              href="#acceso"
              mayusculas={false}
              className="h-[42px] w-full px-7 text-[14px] sm:w-auto"
            >
              {hero.ctaPrimario}
            </ButtonLink>
            <ButtonLink
              href="#que-es-brocha"
              variant="secondary"
              mayusculas={false}
              className="h-[42px] w-full px-7 text-[14px] sm:w-auto"
            >
              {hero.ctaSecundario}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
