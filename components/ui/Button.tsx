import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-[20px] px-5 text-center text-[12px] font-medium uppercase leading-none transition-transform duration-150 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-brocha-yellow text-black",
  secondary: "bg-white text-black",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentPropsWithoutRef<"button"> & { variant?: Variant }) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentPropsWithoutRef<"a"> & { variant?: Variant }) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
