"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function Lightbox({
  title,
  photos,
  startIndex = 0,
  onClose,
}: {
  title: string;
  photos: readonly string[];
  startIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const varias = photos.length > 1;

  const ir = useCallback(
    (paso: number) => setIndex((i) => (i + paso + photos.length) % photos.length),
    [photos.length],
  );

  useEffect(() => {
    // Bloquea el scroll del fondo y devuelve el foco al cerrar.
    const previo = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (!varias) return;
      if (e.key === "ArrowRight") ir(1);
      if (e.key === "ArrowLeft") ir(-1);
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previo?.focus();
    };
  }, [ir, onClose, varias]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${title}`}
      tabIndex={-1}
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 p-4 outline-none sm:p-8"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 pb-4 text-white">
        <p className="font-[family-name:var(--font-display)] text-[16px] font-bold text-brocha-yellow sm:text-[20px]">
          {title}
          {varias ? (
            <span className="ml-3 font-sans text-[13px] font-medium text-white/70">
              {index + 1} / {photos.length}
            </span>
          ) : null}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar galería"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[22px] leading-none text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brocha-yellow"
        >
          ×
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <Image
          key={photos[index]}
          src={photos[index]}
          alt={`${title} — foto ${index + 1} de ${photos.length}`}
          fill
          sizes="100vw"
          priority
          className="object-contain"
        />
      </div>

      {varias ? (
        <div className="flex shrink-0 items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => ir(-1)}
            aria-label="Foto anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brocha-yellow"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            onClick={() => ir(1)}
            aria-label="Foto siguiente"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brocha-yellow"
          >
            <span aria-hidden>›</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
