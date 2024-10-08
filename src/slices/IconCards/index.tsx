import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { JSXMapSerializer, SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@/components/PrismicRichText";

/**
 * Props for `IconCards`.
 */
export type IconCardsProps = SliceComponentProps<Content.IconCardsSlice>;

/**
 * Component for "IconCards" Slices.
 */

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-b14 text-gray-primary">{children}</p>
  ),
};

const IconCards = ({ slice }: IconCardsProps): JSX.Element => {
  const cards = slice.primary.cards;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="bg-white md:px-[32px] px-[24px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            <PrismicRichText field={slice.primary.heading} />
            <div className="max-w-full md:max-w-[580px] mt-[-18px]">
              <PrismicRichText field={slice.primary.text} />
            </div>
          </div>
          {cards && cards.length > 0 && (
            <div className="p-[30px] mt-[30px] rounded-[12px] bg-primary-light grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
              {cards.map((card, index) => {
                return (
                  <div
                    className="group gap-[12px] flex relative flex-col lg:text-start text-center lg:items-start items-center pb-[12px]"
                    key={index}
                  >
                    <PrismicNextImage
                      field={card.icon}
                      width={54}
                      height={54}
                      className="object-contain object-center max-w-[54px] max-h-[54px]"
                    />
                    <h6 className="text-h6 text-dark-primary text-balance">
                      {card.title}
                    </h6>
                    <PrismicRichText
                      components={components}
                      field={card.text}
                    />
                    <div
                      className="absolute w-0 duration-500 ease-in-out group-hover:w-full bg-gradient-to-r from-secondary
                    to-primary h-[1px] bottom-0"
                    />
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

export default IconCards;
