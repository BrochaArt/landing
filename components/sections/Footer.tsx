import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { footer } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-brocha-deep py-8 lg:h-[116px] lg:py-0">
      <Container className="flex h-full flex-col items-center justify-between gap-4 lg:flex-row">
        <Image
          src="/icons/wordmark.svg"
          alt="BROCHA"
          width={171}
          height={25}
          className="block"
        />
        <p className="text-[16px] font-light text-brocha-violet lg:text-[20px]">
          {footer.tagline}
        </p>
      </Container>
    </footer>
  );
}
