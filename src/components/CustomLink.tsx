// src/components/ButtonLink.tsx

import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";
import { PiArrowRightLight } from "react-icons/pi";

export default function CustomLink({
  className,
  children,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "py-[12px] flex items-center w-fit gap-[10px] duration-500 ease-in-out",
        className
      )}
      {...restProps}
    >
      {children}
      <PiArrowRightLight size={24} />
    </PrismicNextLink>
  );
}
