// src/components/ButtonLink.tsx

import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function ButtonLink({
  className,
  type,
  ...restProps
}: PrismicNextLinkProps) {
  if (type == "secondary") {
    return (
      <PrismicNextLink
        className={clsx(
          "relative inline-flex h-fit w-fit rounded-[8px] text-b16 font-normal border border-secondary border-solid bg-gradient-to-r from-transparent to-transfrom-transparent hover:shadow-md duration-500 ease-in-out px-[32px] py-[12px] text-secondary outline-none transition-colors  hover:border-secondary hover:from-secondary/10 hover:to-secondary/5",
          className
        )}
        {...restProps}
      />
    );
  } else {
    return (
      <PrismicNextLink
        className={clsx(
          "relative inline-flex h-fit w-fit rounded-[8px] text-b16 font-normal border bg-gradient-to-r from-primary to-primary-dark hover:shadow-md duration-300 ease-in-out px-[32px] py-[12px] text-white outline-none transition-colors hover:border-primary hover:text-white border-none",
          className
        )}
        {...restProps}
      />
    );
  }
}
