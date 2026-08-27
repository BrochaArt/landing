"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { carouselCards, queEsBrocha } from "@/lib/content";

export function QueEsBrocha() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.clientWidth + 20 : 380;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="que-es-brocha" className="bg-white py-20 lg:py-[100px]">
      <Container>
        <p className="text-[18px] font-medium text-black lg:text-[25px]">
          {queEsBrocha.eyebrow}
        </p>
        <h2 className="mt-[10px] text-[32px] font-bold leading-[1.05] text-brocha-deep sm:text-[40px] lg:text-[50px] lg:leading-[50px]">
          {queEsBrocha.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-4 max-w-[560px] text-[16px] font-medium text-black">
          {queEsBrocha.body}
          <strong className="font-bold">{queEsBrocha.bodyStrong}</strong>
        </p>
      </Container>

      <div className="relative mt-12 lg:mt-[60px]">
        {/* En xl las flechas viven en los márgenes (como en el Figma), así
            que el riel se estrecha para no quedar debajo de ellas. */}
        <Container className="relative xl:px-[110px]">
          <ul
            ref={trackRef}
            onScroll={sync}
            className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {carouselCards.map((card) => (
              <li
                key={card.id}
                className="flex min-h-[270px] w-[280px] shrink-0 snap-start flex-col items-center justify-start rounded-[20px] bg-brocha-violet px-6 pb-8 pt-[44px] text-center transition-colors duration-200 hover:bg-brocha-deep sm:w-[320px] lg:w-[360px]"
              >
                <div className="flex h-[60px] items-end justify-center">
                  <Image
                    src={card.icon}
                    alt=""
                    width={card.iconWidth}
                    height={card.iconHeight}
                    className="block"
                  />
                </div>
                <h3 className="mt-[26px] font-[family-name:var(--font-display)] text-[22px] font-bold text-white lg:text-[25px]">
                  {card.title}
                </h3>
                <p className="mt-3 w-full max-w-[319px] text-[15px] font-medium text-white lg:text-[16px]">
                  {card.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>

        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label="Tarjeta anterior"
          className="absolute left-0 top-1/2 hidden h-[290px] w-[92px] -translate-y-1/2 transition-opacity disabled:opacity-25 xl:block"
        >
          {/* El SVG del Figma apunta a la derecha en los dos lados; este se
              voltea para que la flecha izquierda sea realmente "<". */}
          <Image
            src="/icons/chevron-left.svg"
            alt=""
            width={92}
            height={290}
            className="scale-x-[-1]"
          />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label="Tarjeta siguiente"
          className="absolute right-0 top-1/2 hidden h-[290px] w-[105px] -translate-y-1/2 transition-opacity disabled:opacity-25 xl:block"
        >
          <Image src="/icons/chevron-right.svg" alt="" width={105} height={290} />
        </button>
      </div>
    </section>
  );
}
