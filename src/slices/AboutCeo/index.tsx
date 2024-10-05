import { Bounded } from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `AboutCeo`.
 */
export type AboutCeoProps = SliceComponentProps<Content.AboutCeoSlice>;

/**
 * Component for "AboutCeo" Slices.
 */

const headerComponents: JSXMapSerializer = {
  heading4: ({ children }) => (
    <h4 className="text-h4-m md:text-h4 text-dark-primary mb-0">{children}</h4>
  ),
  heading5: ({ children }) => (
    <h4 className="text-h5-m md:text-h5 text-dark-primary mb-0">{children}</h4>
  ),
  paragraph: ({ children }) => (
    <p className="text-b16 m-0 text-gray-primary">{children}</p>
  ),
};

const headerComponentsSmall: JSXMapSerializer = {
  heading5: ({ children }) => (
    <h4 className="text-h5-m text-dark-primary mb-0">{children}</h4>
  ),
  heading6: ({ children }) => (
    <h6 className="text-h6-m text-dark-primary mb-0">{children}</h6>
  ),
  paragraph: ({ children }) => (
    <p className="text-b14 m-0 text-gray-primary">{children}</p>
  ),
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2 text-gray-primary text-b14">
      {children}
    </li>
  ),
  list: ({ children }) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2 text-gray-primary text-b14">
      {children}
    </li>
  ),
};

const AboutCeo = ({ slice }: AboutCeoProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="bg-white px-[24px] md:px-[32px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px] gap-[8px]">
            <PrismicRichText
              components={headerComponents}
              field={slice.primary.heading}
            />
            <div className="max-w-full md:max-w-[660px]">
              <PrismicRichText
                components={headerComponents}
                field={slice.primary.text}
              />
            </div>
          </div>
          <div className="mt-[30px] flex flex-col lg:flex-row gap-[24px] text-center md:text-start items-center">
            <div className="flex flex-col gap-[6px] w-full">
              <PrismicRichText
                components={headerComponents}
                field={slice.primary.name}
              />
              <h6 className="text-h6-m text-primary">
                {slice.primary.deligation}
              </h6>
              <p className="text-b14 text-gray-primary mt-[6px]">
                {slice.primary.short_description}
              </p>
            </div>
            <div>
              <PrismicNextImage
                field={slice.primary.image}
                width={360}
                height={360}
                className="object-cover object-center max-w-[360px] max-h-[360px] rounded-[24px] border border-primary 
                shadow-lg bg-white"
              />
            </div>
            <div className="flex flex-col gap-[12px] w-full text-start justify-center items-center lg:justify-start lg:items-start">
              <PrismicRichText
                components={headerComponentsSmall}
                field={slice.primary.key_points}
              />
              <ButtonLink
                field={slice.primary.button_link}
                type={
                  slice.primary.button_type === "primary"
                    ? "primary"
                    : "secondary"
                }
              >
                {slice.primary.button_text}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default AboutCeo;
