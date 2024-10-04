import { type Content, isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import ButtonLink from "@/components/ButtonLink";
import clsx from "clsx";

type TextWithImageProps = SliceComponentProps<Content.TextWithImageSlice>;

const TextWithImage = ({ slice }: TextWithImageProps) => {
  const image = slice.primary.image;

  return (
    <Bounded as="section" yPadding="base" className="bg-white px-[32px]">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:text-start text-center">
        <div>
          <PrismicRichText field={slice.primary.heading} />
          <PrismicRichText field={slice.primary.text} />
          {slice.variation === "withButton" && slice.primary.buttonLink ? (
            <ButtonLink
              field={slice.primary.buttonLink}
              type={slice.primary.button_type}
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
