import type { ReactNode } from "react";
import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children?: ReactNode;
};

export function Heading({
  as: Comp = "h1",
  children,
  className,
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "font-semibold leading-tight tracking-tight md:leading-tight",
        Comp === "h1" && "text-h1-m md:text-h1",
        Comp === "h2" && "text-h2-m md:text-h2",
        Comp === "h3" && "text-h3-m md:text-h3",
        Comp === "h4" && "text-h4-m md:text-h4",
        Comp === "h5" && "text-h5-m md:text-h5",
        Comp === "h6" && "text-h6-m md:text-h6",
        className
      )}
    >
      {children}
    </Comp>
  );
}
