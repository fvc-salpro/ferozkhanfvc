import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `WhyUs`.
 */
export type WhyUsProps = SliceComponentProps<Content.WhyUsSlice>;

/**
 * Component for "WhyUs" Slices.
 */
const WhyUs = ({ slice }: WhyUsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="bg-white px-[32px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            <PrismicRichText field={slice.primary.heading} />
            <div className="max-w-full md:max-w-[580px]">
              <PrismicRichText field={slice.primary.text} />
            </div>
          </div>
          {slice.primary.cards && slice.primary.cards.length > 0 && (
            <div className="mt-[30px] grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
              {slice.primary.cards.map((card, index) => {
                return (
                  <div
                    className="gap-[12px] py-[24px] px-[12px] rounded-[8px] flex relative flex-col text-center items-center
                    duration-700 ease-in-out hover:shadow-lg"
                    key={index}
                  >
                    <PrismicNextImage
                      field={card.icon}
                      width={54}
                      height={54}
                      className="object-contain object-center max-w-[54px] max-h-[54px]"
                    />
                    <h6 className="text-h6-m text-dark-primary text-balance">
                      {card.title}
                    </h6>
                    <p className="text-b14 text-gray-primary">{card.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default WhyUs;
