import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { latam } from "@/lib/content";

export function Latam() {
  return (
    <section id="paises" className="bg-brocha-deep py-20 text-center lg:py-[100px]">
      <Container>
        <p className="text-[18px] font-bold text-white lg:text-[20px]">
          {latam.eyebrow}
        </p>
        <h2 className="mx-auto mt-6 max-w-[760px] text-[32px] font-bold leading-[1.08] text-brocha-yellow sm:text-[40px] lg:text-[50px] lg:leading-[55px]">
          {latam.titleTop}{" "}
          <span className="whitespace-nowrap">
            {latam.titleBottomPlain}
            <span className="text-white">{latam.titleBottomAccent}</span>.
          </span>
        </h2>

        <ul className="mt-14 flex flex-wrap items-start justify-center gap-16 lg:mt-[80px] lg:gap-[190px]">
          {latam.items.map((item) => (
            <li key={item.country} className="flex flex-col items-center">
              <span className="relative block h-[120px] w-[120px] overflow-hidden rounded-full lg:h-[150px] lg:w-[150px]">
                <Image
                  src={item.flag}
                  alt={`Bandera de ${item.country}`}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </span>
              <span className="mt-6 text-[18px] font-medium text-white lg:text-[20px]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
