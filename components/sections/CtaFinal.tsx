import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SubscribeForm } from "@/components/ui/SubscribeForm";
import { ctaFinal } from "@/lib/content";

export function CtaFinal() {
  return (
    <section
      id="acceso"
      className="relative isolate flex items-center overflow-hidden bg-brocha-violet py-20 lg:h-[476px] lg:py-0"
    >
      {/* Foto a la derecha, espejada horizontalmente y con esquina superior
          izquierda elíptica (74x143px), tal como está en el Figma. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[39%] overflow-hidden rounded-tl-[74px_143px] lg:block">
        <Image
          src="/images/cta.webp"
          alt=""
          fill
          sizes="40vw"
          className="scale-x-[-1] object-cover object-[93%_top]"
        />
      </div>

      <Container className="w-full">
        <div className="max-w-[640px]">
          <h2 className="text-center text-[34px] font-medium leading-[1.08] text-brocha-yellow sm:text-[46px] lg:text-[60px] lg:leading-[60px]">
            <span className="block">{ctaFinal.titleLine1}</span>
            <span className="block">
              {ctaFinal.titleLine2Plain}
              <strong className="font-extrabold">
                {ctaFinal.titleLine2Accent}
              </strong>
            </span>
          </h2>
          <p className="mt-6 text-center font-[family-name:var(--font-display)] text-[16px] font-bold text-white lg:text-[20px]">
            {ctaFinal.subtitle}
          </p>
          <div className="mt-10">
            <SubscribeForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
