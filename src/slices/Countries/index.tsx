import { Bounded } from "@/components/Bounded";
import CustomLink from "@/components/CustomLink";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Countries`.
 */
export type CountriesProps = SliceComponentProps<Content.CountriesSlice>;

/**
 * Component for "Countries" Slices.
 */

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-b14 text-gray-primary">{children}</p>
  ),
};

const headerComponents: JSXMapSerializer = {
  heading2: ({ children }) => (
    <h2 className="text-h2-m md:text-h2 text-dark-primary mb-0">{children}</h2>
  ),
  paragraph: ({ children }) => (
    <p className="text-b16 m-0 text-gray-primary">{children}</p>
  ),
};

const Countries = async ({ slice }: CountriesProps): Promise<JSX.Element> => {
  const client = createClient();
  const countries = await client.getAllByType("country");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="about"
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
          {countries && countries.length > 0 && (
            <div className="mt-[30px] gap-[24px] items-center justify-center flex flex-wrap">
              {countries.map((country, index) => {
                return (
                  <div
                    className="group gap-[6px] max-w-full min-w-full flex relative flex-col lg:text-start text-center lg:items-start items-center md:min-w-[280px] md:max-h-[390px]"
                    key={index}
                  >
                    <PrismicNextImage
                      field={country.data.country_banner}
                      width={280}
                      height={330}
                      className="object-cover object-center max-w-full w-full md:max-w-[280px] md:max-h-[330px] max-h-[330px] rounded-[12px]"
                    />
                    <CustomLink
                      className="after:absolute after:inset-0 after:w-full after:h-full text-secondary group-hover:gap-[20px]"
                      href={`/countries/${country.uid}`}
                    >
                      {country.data.heading}
                    </CustomLink>
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

export default Countries;
