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

        <ul className="mt-12 flex flex-nowrap items-start justify-center gap-10 sm:gap-20 lg:mt-[80px] lg:gap-[190px]">
          {latam.items.map((item) => (
            <li key={item.country} className="flex flex-col items-center">
              <span className="relative block h-[88px] w-[88px] overflow-hidden rounded-full sm:h-[120px] sm:w-[120px] lg:h-[150px] lg:w-[150px]">
                <Image
                  src={item.flag}
                  alt={`Bandera de ${item.country}`}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </span>
              <span className="mt-4 text-[14px] font-medium text-white sm:text-[18px] lg:text-[20px]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
