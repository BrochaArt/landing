import { Container } from "@/components/ui/Container";
import { comoElegimos } from "@/lib/content";

export function ComoElegimos() {
  return (
    <section className="bg-gradient-to-b from-brocha-violet to-brocha-deep py-16 lg:py-[100px]">
      <Container>
        <div className="mx-auto max-w-[1020px] rounded-[20px] bg-brocha-yellow px-6 py-12 text-center lg:px-16 lg:py-[70px]">
          <p className="text-[18px] font-medium text-brocha-deep lg:text-[25px]">
            {comoElegimos.eyebrow}
          </p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-[1.08] text-brocha-deep sm:text-[38px] lg:text-[50px] lg:leading-[50px]">
            {comoElegimos.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-7 text-[16px] font-medium text-brocha-deep">
            {comoElegimos.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <ul className="mx-auto mt-8 grid max-w-[1020px] gap-5 sm:grid-cols-2 lg:mt-[30px] lg:grid-cols-3">
          {comoElegimos.pills.map((pill) => (
            <li
              key={pill.title}
              className="flex h-[100px] flex-col items-center justify-center rounded-[20px] border border-white/45 px-4 text-center"
            >
              <p className="text-[28px] font-bold text-brocha-yellow lg:text-[35px]">
                {pill.title}
              </p>
              <p className="mt-1 text-[16px] font-medium text-white">
                {pill.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
