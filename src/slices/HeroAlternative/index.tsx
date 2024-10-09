import { Bounded } from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import HeroShapes from "@/components/HeroShapes";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";
import Image from "next/image";

/**
 * Props for `HeroAlternative`.
 */
export type HeroAlternativeProps =
  SliceComponentProps<Content.HeroAlternativeSlice>;

/**
 * Component for "HeroAlternative" Slices.
 */

const headerComponents: JSXMapSerializer = {
  heading1: ({ children }) => (
    <h1 className="text-h1-m md:text-h1 text-dark-primary mb-0 leading-[120%]">
      {children}
    </h1>
  ),
  em: ({ children }) => (
    <em className="bg-gradient-to-b from-primary to-secondary bg-clip-text not-italic text-transparent">
      {children}
    </em>
  ),
  paragraph: ({ children }) => (
    <p className="text-b16 m-0 text-gray-primary">{children}</p>
  ),
};

const HeroAlternative = ({ slice }: HeroAlternativeProps): JSX.Element => {
  const image = slice.primary.image;
  const buttons = slice.primary.buttons;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded
        as="div"
        yPadding="base"
        className="bg-white md:px-[32px] px-[24px]"
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:text-start text-center">
          <div className="flex flex-col gap-[32px] justify-center items-center md:justify-start md:items-start">
            <div className="flex flex-col gap-[12px]">
              <PrismicRichText
                components={headerComponents}
                field={slice.primary.heading}
              />
              <PrismicRichText
                components={headerComponents}
                field={slice.primary.text}
              />
            </div>
            {buttons && buttons.length > 0 && (
              <div className="flex md:flex-row flex-wrap gap-[16px] flex-col justify-center items-center md:justify-start md:items-start">
                {buttons.map((button, index) => (
                  <ButtonLink
                    field={button.button_link}
                    type={
                      button.button_type === "secondary"
                        ? "secondary"
                        : "primary"
                    }
                  >
                    {button.button_text || "Learn more"}
                  </ButtonLink>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center relative">
            {isFilled.image(image) && (
              <div className="bg-white">
                <PrismicNextImage
                  field={image}
                  width={520}
                  height={420}
                  className="max-w-[520px] max-h-[420px] h-full w-full object-cover object-center rounded-[12px] z-[1] relative"
                />
              </div>
            )}
            <div className="absolute right-0 hidden md:block">
              {/* <Image
                className="opacity-35 object-cover object-center max-h-full max-w-[540px]"
                src="/fvc-shapes.png"
                width={540}
                height={300}
                alt="Call to action background shapes"
              /> */}
              <HeroShapes/>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default HeroAlternative;
