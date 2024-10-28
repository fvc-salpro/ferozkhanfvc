import { Bounded } from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `OurSocials`.
 */
export type OurSocialsProps = SliceComponentProps<Content.OurSocialsSlice>;

/**
 * Component for "OurSocials" Slices.
 */

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <h2 className="text-h2-m md:text-h2 text-dark-primary mb-0 leading-[120%]">
      {children}
    </h2>
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

const OurSocials = async ({ slice }: OurSocialsProps): Promise<JSX.Element> => {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const socials = settings.data?.socials || [];
  

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="socials"
    >
      <Bounded as="div" className="bg-white md:px-[32px] px-[24px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            <PrismicRichText components={components} field={slice.primary.heading} />
            <div className="max-w-full md:max-w-[580px] mt-[12px]">
              <PrismicRichText field={slice.primary.body} />
            </div>
          </div>
          {socials && socials.length > 0 && (
            <div className="mt-[30px] grid grid-cols-2 md:grid-cols-6 gap-[24px] w-full">
              {socials.map((social, index) => {
                return (
                  <div
                    className="overflow-hidden group gap-[12px] flex relative flex-col text-center items-center pb-[12px] rounded-lg p-[16px] 
                     duration-500 ease-in-out transition-all hover:drop-shadow-xl
                    bg-gradient-to-br from-primary to-primary/65 justify-center"
                    key={index}
                  >
                    <div className="group-hover:opacity-100 opacity-0 w-[100px] h-[100px] bg-secondary/35 absolute blur-xl -right-5 -top-5 duration-500 ease-in-out"></div>
                    <PrismicNextImage
                      field={social.icon}
                      width={54}
                      height={54}
                      className="object-contain object-center max-w-[54px] max-h-[54px] z-10"
                    />
                    <Link className="after:absolute after:inset-0 font-semibold z-10" href={social?.link || ''}>
                    <span className="text-h6M text-white text-balance">
                      {social.icon?.alt || ''}
                    </span>
                    </Link>
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

export default OurSocials;
