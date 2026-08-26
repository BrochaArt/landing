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
        alt="Artistas trabajando en un taller compartido"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Degradado del Figma: morado sólido a la izquierda, foto visible a la derecha */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#38098e] from-0% via-[rgba(74,12,188,0.9)] via-[20%] to-[rgba(59,42,79,0)]" />

      <Container className="py-16 lg:py-0">
        <div className="max-w-[498px]">
          <h1 className="text-[36px] font-extrabold uppercase leading-[1.1] sm:text-[44px] lg:text-[50px] lg:leading-[55px]">
            <span className="block text-brocha-yellow">{hero.titleTop}</span>
            <span className="block text-white">{hero.titleBottom}</span>
          </h1>

          <p className="mt-7 text-[16px] font-medium text-white">
            {hero.leadPlain}
            <strong className="font-extrabold">{hero.leadStrong}</strong>
          </p>
          <p className="mt-6 text-[16px] font-medium text-white">{hero.body}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="#acceso" className="w-full sm:w-[240px]">
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink
              href="#que-es-brocha"
              variant="secondary"
              className="w-full sm:w-[240px]"
            >
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
