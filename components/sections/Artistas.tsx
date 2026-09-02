"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { artistas } from "@/lib/content";

export function Artistas() {
  const [expandido, setExpandido] = useState(false);
  const visibles = artistas.visiblePorDefecto;
  const ocultos = artistas.items.length - visibles;

  return (
    <section id="artistas" className="bg-brocha-violet py-20 lg:py-[100px]">
      <Container>
        <p className="text-[18px] font-medium text-white lg:text-[25px]">
          {artistas.eyebrow}
        </p>
        <h2 className="mt-[10px] text-[32px] font-bold leading-[1.05] text-brocha-yellow sm:text-[40px] lg:text-[50px] lg:leading-[50px]">
          {artistas.title}
        </h2>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:mt-[75px] lg:grid-cols-4 lg:gap-x-10 lg:gap-y-12">
          {artistas.items.map((artista, i) => (
            <li
              key={artista.name}
              // En pantallas chicas solo se ven los primeros; en desktop caben
              // todos y el botón sobra.
              className={
                i >= visibles && !expandido ? "hidden lg:block" : undefined
              }
            >
              {/* Sin <a>: no hay ficha de artista todavía, y un href="#artistas"
                  hacía que al tocar una tarjeta en móvil la página saltara al
                  inicio de la sección. Cuando existan las fichas, esto vuelve
                  a ser un enlace. */}
              <div className="group">
                <div className="relative aspect-[265/301] w-full overflow-hidden rounded-[15px]">
                  {/* En reposo van en blanco y negro, como el Figma; al pasar
                      el cursor recuperan el color. Sustituye al oscurecido de
                      antes: el color ya es la señal de que la tarjeta responde,
                      y hacer las dos cosas a la vez la ensuciaba. */}
                  <Image
                    src={artista.photo}
                    alt={`Retrato de ${artista.name}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 265px"
                    className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                  />
                  {artista.country && artista.flag ? (
                    <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/55 px-3 py-2">
                      <span className="relative block h-[18px] w-[18px] shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={artista.flag}
                          alt=""
                          fill
                          sizes="18px"
                          className="object-cover"
                        />
                      </span>
                      <span className="text-[12px] font-bold text-white">
                        {artista.country}
                      </span>
                    </div>
                  ) : null}
                </div>
                <h3 className="mt-3 text-[16px] font-bold text-brocha-yellow lg:mt-4 lg:text-[20px]">
                  {artista.name}
                </h3>
                {artista.bio ? (
                  <p className="mt-1 text-[13px] font-light text-white lg:text-[14px]">
                    {artista.bio}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        {ocultos > 0 && !expandido ? (
          <div className="mt-8 flex justify-center lg:hidden">
            <button
              type="button"
              onClick={() => setExpandido(true)}
              className="text-[14px] font-bold text-brocha-yellow underline underline-offset-4"
            >
              Cargar más ({ocultos})
            </button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
