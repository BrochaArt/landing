import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { eventos } from "@/lib/content";

export function Eventos() {
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
          {eventos.items.map((item) => (
            <li key={item.title} className="relative aspect-[560/446]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="rounded-[20px] object-cover"
              />
              <div className="absolute inset-x-[22.5%] inset-y-[42.6%] flex items-center justify-center rounded-[20px] bg-black/60">
                <span className="font-[family-name:var(--font-display)] text-[20px] font-bold text-brocha-yellow">
                  {item.title}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
