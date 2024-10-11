"use client";

import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import Image from "next/image";
import { PrismicRichText } from "@/components/PrismicRichText";

/**
 * Props for `Wrapper`.
 */
export type WrapperProps = SliceComponentProps<Content.WrapperSlice>;

/**
 * Component for "Wrapper" Slices.
 */

const Wrapper = ({ slice }: WrapperProps): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const countries = slice.primary.country;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="bg-white px-[24px] md:px-[32px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px] gap-[8px]">
            <PrismicRichText field={slice.primary.heading} />
            <div className="max-w-full md:max-w-[560px] mt-[-18px]">
              <PrismicRichText field={slice.primary.text} />
            </div>
          </div>
          <div className="flex flex-col gap-[12px] w-full mt-[30px]">
            {countries &&
              countries.map((country, index) => (
                <div key={index}>
                  <button
                    className="w-full text-left py-[6px] lg:text-h6-m text-b18 font-semibold hover:text-primary text-dark-primary flex items-center gap-[10px]
                  focus:outline-none transition-all"
                    onClick={() => handleToggle(index)}
                  >
                    <Image
                      className="duration-500 transition-all ease-in-out"
                      width={16}
                      height={16}
                      alt="Show/Hide Icon for FAQ"
                      src={`${openIndex === index ? "/add-icon.svg" : "/subtract-icon.svg"}`}
                    />
                    {country.title}
                  </button>
                  <div
                    className={`overflow-hidden transition-all ease-in-out duration-700 ${openIndex === index ? "max-h-[5000px]" : "max-h-0"}`}
                  >
                    <PrismicRichText
                      field={country.description}
                    ></PrismicRichText>
                    <div
                      key={index}
                      className="max-w-[380px] max-h-[280px] w-full h-full mx-auto my-[24px]"
                    >
                      <iframe
                        width="380"
                        height="280"
                        src={country.link}
                        title="YouTube video player"
                        className="rounded-[12px]"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Wrapper;
