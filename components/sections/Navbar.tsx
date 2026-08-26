"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { nav } from "@/lib/content";

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-brocha-violet">
      <Container className="flex h-[76px] items-center justify-between lg:h-[102px]">
        <a href="#top" className="relative block h-[28px] w-[100px] lg:h-9 lg:w-[128px]">
          <Image
            src="/icons/logo.svg"
            alt="BROCHA"
            fill
            priority
            className="object-contain object-left"
          />
        </a>

        <nav className="hidden items-center gap-[38px] lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-[family-name:var(--font-nav)] text-[16px] font-light text-white transition-colors hover:text-brocha-yellow"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Envuelto: el `inline-flex` de las clases base del botón le ganaría
            a un `hidden` puesto directamente sobre él. */}
        <div className="hidden lg:block">
          <ButtonLink href="#acceso" className="w-[182px] text-brocha-ink">
            Acceso Anticipado
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-[2px] w-6 bg-white transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </Container>

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-white/15 bg-brocha-violet lg:hidden"
      >
        <Container className="flex flex-col gap-1 py-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 font-[family-name:var(--font-nav)] text-[18px] font-light text-white"
            >
              {item.label}
            </a>
          ))}
          <ButtonLink
            href="#acceso"
            onClick={() => setOpen(false)}
            className="mt-4 w-full text-brocha-ink"
          >
            Acceso Anticipado
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
