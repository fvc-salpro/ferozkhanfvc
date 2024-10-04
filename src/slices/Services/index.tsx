import { Bounded } from "@/components/Bounded";
import CustomLink from "@/components/CustomLink";
import { Heading } from "@/components/Heading";
import { PrismicRichText } from "@/components/PrismicRichText";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { JSXMapSerializer, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

/**
 * Component for "Services" Slices.
 */

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-b14 text-gray-primary">{children}</p>
  ),
};

const Services = async ({ slice }: ServicesProps): Promise<JSX.Element> => {
  const client = createClient();
  const services = await client.getAllByType("service");

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
          {services && services.length > 0 && (
            <div className="p-[30px] mt-[30px] rounded-[12px] bg-primary-light grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
              {services.map((service, index) => {
                return (
                  <div
                    className="group gap-[12px] flex relative flex-col lg:text-start text-center lg:items-start items-center"
                    key={index}
                  >
                    <PrismicNextImage
                      field={service.data.service_icon}
                      width={54}
                      height={54}
                      className="object-contain object-center max-w-[54px] max-h-[54px]"
                    />
                    <h6 className="text-h6 text-dark-primary text-balance">
                      {service.data.heading}
                    </h6>
                    <PrismicRichText
                      components={components}
                      field={service.data.description}
                    />
                    <CustomLink
                      className="after:absolute after:inset-0 after:w-full after:h-full text-secondary group-hover:gap-[20px]"
                      href={`/services/${service.uid}`}
                    >
                      Learn More
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

export default Services;
