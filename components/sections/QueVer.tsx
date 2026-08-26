import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { queVer } from "@/lib/content";

export function QueVer() {
  return (
    <section id="que-ver" className="bg-brocha-deep py-20 lg:py-[100px]">
      <Container>
        <p className="text-[18px] font-medium text-brocha-violet lg:text-[25px]">
          {queVer.eyebrow}
        </p>
        <h2 className="mt-[10px] max-w-[467px] text-[32px] font-bold leading-[1.05] text-brocha-yellow sm:text-[40px] lg:text-[50px] lg:leading-[50px]">
          {queVer.title}
        </h2>

        <ul className="mt-12 grid gap-8 lg:mt-[75px] lg:grid-cols-3 lg:gap-5">
          {queVer.items.map((item) => (
            <li key={item.id} className="relative aspect-[360/409]">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="rounded-[20px] object-cover"
              />
              <div className="absolute inset-x-[7.22%] bottom-[5.62%] rounded-[15px] bg-brocha-panel p-5">
                <div className="flex items-center gap-[10px]">
                  {item.badgeComposed ? (
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-brocha-violet">
                      <Image
                        src={item.badge}
                        alt=""
                        width={23}
                        height={26}
                        className="block"
                      />
                    </span>
                  ) : (
                    <Image
                      src={item.badge}
                      alt=""
                      width={40}
                      height={40}
                      className="block shrink-0"
                    />
                  )}
                  <h3 className="font-[family-name:var(--font-display)] text-[20px] font-bold text-brocha-violet">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-[15px] text-[14px] font-light text-brocha-ink">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
