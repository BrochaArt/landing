import type { ReactNode } from "react";

/**
 * Encabezado estándar del diseño: eyebrow 25px Montserrat Medium
 * sobre un título 50px Montserrat Bold (leading 1:1).
 */
export function SectionHeading({
  eyebrow,
  lines,
  eyebrowClassName = "",
  titleClassName = "",
  className = "",
  children,
}: {
  eyebrow?: string;
  lines?: readonly string[];
  eyebrowClassName?: string;
  titleClassName?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-[10px] ${className}`}>
      {eyebrow ? (
        <p
          className={`text-[18px] font-medium lg:text-[25px] ${eyebrowClassName}`}
        >
          {eyebrow}
        </p>
      ) : null}
      {lines ? (
        <h2
          className={`text-[32px] font-bold leading-[1.05] sm:text-[40px] lg:text-[50px] lg:leading-[50px] ${titleClassName}`}
        >
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
      ) : null}
      {children}
    </div>
  );
}
