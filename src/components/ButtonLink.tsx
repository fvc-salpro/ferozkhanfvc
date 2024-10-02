// src/components/ButtonLink.tsx

import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function ButtonLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "relative inline-flex h-fit w-fit rounded-[8px] text-b16 font-normal border bg-gradient-to-r from-primary to-primary-dark hover:shadow-md duration-300 ease-in-out px-[32px] py-[12px] text-white outline-none transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-primary/60 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-primary hover:text-white border-none",
        className
      )}
      {...restProps}
    />
  );
}
