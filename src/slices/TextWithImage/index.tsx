import { type Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  type JSXMapSerializer,
  type SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import clsx from "clsx";

type TextWithImageProps = SliceComponentProps<Content.TextWithImageSlice>;

const headerComponents: JSXMapSerializer = {
  heading3: ({ children }) => (
    <h3 className="text-h3-m md:text-h3 text-dark-primary mb-0 leading-[120%]">
      {children}
    </h3>
  ),
  paragraph: ({ children }) => (
    <p className="text-b16 m-0 text-gray-primary">{children}</p>
  ),
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2 text-gray-primary">
      {children}
    </li>
  ),
  list: ({ children }) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2 text-gray-primary">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicNextLink
      field={node.data}
      className="underline decoration-1 underline-offset-2"
    >
      {children}
    </PrismicNextLink>
  ),
};

const TextWithImage = ({ slice }: TextWithImageProps) => {
  const image = slice.primary.image;

  return (
    <Bounded
      as="section"
      yPadding="base"
      className="bg-white md:px-[32px] px-[24px]"
    >
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:text-start text-center">
        <div className="flex flex-col gap-[32px] justify-center items-center lg:justify-start lg:items-start">
          <div className="flex flex-col gap-[12px] text-balance">
            <PrismicRichText
              components={headerComponents}
              field={slice.primary.heading}
            />
            <PrismicRichText
              components={headerComponents}
              field={slice.primary.text}
            />
          </div>
          {slice.variation === "withButton" && slice.primary.buttonLink ? (
            <ButtonLink
              field={slice.primary.buttonLink}
              type={
                slice.primary.button_type === "secondary"
                  ? "secondary"
                  : "primary"
              }
            >
              {slice.primary.buttonText || "Learn more"}
            </ButtonLink>
          ) : null}
        </div>
        <div
          className={clsx(slice.primary.image_left ? "-order-1" : "order-1")}
        >
          {isFilled.image(image) && (
            <div className="bg-white">
              <PrismicNextImage
                field={image}
                width={590}
                height={420}
                className="max-w-[590px] max-h-[420px] h-full w-full object-cover object-center rounded-[12px]"
              />
            </div>
          )}
        </div>
      </div>
    </Bounded>
  );
};

export default TextWithImage;
