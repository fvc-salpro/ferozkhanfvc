import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `OurPartners`.
 */
export type OurPartnersProps = SliceComponentProps<Content.OurPartnersSlice>;

/**
 * Component for "OurPartners" Slices.
 */

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <h2 className="text-h2-m md:text-h2 text-dark-primary mb-0 leading-[120%]">
      {children}
    </h2>
  ),
};

const OurPartners = ({ slice }: OurPartnersProps): JSX.Element => {
  const partners = slice.primary?.partners;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="partners"
    >
      <Bounded as="div" className="bg-white md:px-[32px] px-[24px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            <PrismicRichText
              components={components}
              field={slice.primary.heading}
            />
          </div>
          {partners && partners.length > 0 && (
            <div className="mt-[30px] w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[16px] min-h-[160px]">
              {partners.map((partner, index) => (
                <PrismicNextLink
                  className="flex justify-center items-center h-full w-full max-w-full max-h-[80px] rounded-lg overflow-hidden"
                  key={index}
                  field={partner.link}
                >
                  <PrismicNextImage
                    field={partner.logo}
                    width={160}
                    height={80}
                    className="object-contain object-center max-w-[160px] max-h-[80px] z-10 rounded-lg"
                  />
                </PrismicNextLink>
              ))}
            </div>
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default OurPartners;
