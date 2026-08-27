"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Lightbox } from "@/components/ui/Lightbox";
import { eventos } from "@/lib/content";

export function Eventos() {
  const [abierto, setAbierto] = useState<number | null>(null);
  const evento = abierto === null ? null : eventos.items[abierto];

  return (
    <section id="eventos" className="bg-brocha-lav py-20 lg:py-[100px]">
      <Container>
        <p className="text-[18px] font-medium text-black lg:text-[25px]">
          {eventos.eyebrow}
        </p>
        <h2 className="mt-[10px] text-[32px] font-bold leading-[1.05] text-brocha-deep sm:text-[40px] lg:text-[50px] lg:leading-[50px]">
          {eventos.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <ul className="mt-12 grid gap-10 lg:mt-[75px] lg:grid-cols-2 lg:gap-[60px]">
          {eventos.items.map((item, i) => (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => setAbierto(i)}
                aria-label={`Ver galería de ${item.title} (${item.photos.length} ${item.photos.length === 1 ? "foto" : "fotos"})`}
                className="group relative block aspect-[560/446] w-full cursor-pointer overflow-hidden rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brocha-deep"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-x-[22.5%] inset-y-[42.6%] flex flex-col items-center justify-center rounded-[20px] bg-black/60 transition-colors group-hover:bg-black/75">
                  <span className="font-[family-name:var(--font-display)] text-[20px] font-bold text-brocha-yellow">
                    {item.title}
                  </span>
                  <span className="mt-1 text-[12px] font-medium text-white/80">
                    {item.photos.length > 1
                      ? `Ver ${item.photos.length} fotos`
                      : "Ver foto"}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Container>

      {evento ? (
        <Lightbox
          title={evento.title}
          photos={evento.photos}
          onClose={() => setAbierto(null)}
        />
      ) : null}
    </section>
  );
}
