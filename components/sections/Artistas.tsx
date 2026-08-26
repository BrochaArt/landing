import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { artistas } from "@/lib/content";

export function Artistas() {
  return (
    <section id="artistas" className="bg-brocha-violet py-20 lg:py-[100px]">
      <Container>
        <p className="text-[18px] font-medium text-white lg:text-[25px]">
          {artistas.eyebrow}
        </p>
        <h2 className="mt-[10px] text-[32px] font-bold leading-[1.05] text-brocha-yellow sm:text-[40px] lg:text-[50px] lg:leading-[50px]">
          {artistas.title}
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-[75px] lg:grid-cols-4">
          {artistas.items.map((artista) => (
            <li key={artista.name}>
              <div className="relative aspect-[265/301] w-full overflow-hidden">
                <Image
                  src={artista.photo}
                  alt={`Retrato de ${artista.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 265px"
                  className="object-cover grayscale"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/55 px-3 py-2 backdrop-blur-[2px]">
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
              </div>
              <h3 className="mt-4 text-[20px] font-bold text-brocha-yellow">
                {artista.name}
              </h3>
              <p className="mt-1 text-[14px] font-light text-white">
                {artista.bio}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
