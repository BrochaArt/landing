import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { perfiles } from "@/lib/content";

export function Perfiles() {
  return (
    <section className="relative isolate bg-brocha-violet py-20 lg:py-[100px]">
      <Image
        src="/images/perfiles.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-brocha-violet/85" />

      <Container>
        <p className="text-[18px] font-medium text-white lg:text-[25px]">
          {perfiles.eyebrow}
        </p>
        <h2 className="mt-[10px] text-[32px] font-bold leading-[1.05] text-brocha-yellow sm:text-[40px] lg:text-[50px] lg:leading-[50px]">
          {perfiles.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Móvil: carrusel deslizable con el contenido centrado, igual que la
            sección "Qué es Brocha". Desktop: los tres en una fila. */}
        <ul className="-mx-6 mt-12 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-[70px] lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {perfiles.items.map((item) => (
            <li
              key={item.title}
              className="flex min-h-[300px] w-[280px] shrink-0 snap-start flex-col items-center rounded-[20px] bg-brocha-lav-soft p-[30px] text-center sm:w-[320px] lg:w-auto lg:items-start lg:text-left"
            >
              <div className="flex h-[120px] items-center">
                <Image
                  src={item.icon}
                  alt=""
                  width={item.iconWidth}
                  height={item.iconHeight}
                  className="block h-[96px] w-auto lg:h-[120px]"
                />
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-[20px] font-bold text-brocha-deep">
                {item.title}
              </h3>
              <p className="mt-[15px] text-[14px] font-light text-black">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
