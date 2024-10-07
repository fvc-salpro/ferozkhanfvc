"use client";

import { Content } from "@prismicio/client";
import { JSXMapSerializer, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Bounded } from "@/components/Bounded";
import { useState } from "react";
import Image from "next/image";

/**
 * Props for `Faqs`.
 */
export type FaqsProps = SliceComponentProps<Content.FaqsSlice>;

/**
 * Component for "Faqs" Slices.
 */
const Faqs = ({ slice }: FaqsProps): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const headerComponents: JSXMapSerializer = {
    paragraph: ({ children }) => (
      <p className="text-b16 m-0 text-gray-primary">{children}</p>
    ),
  };

  const faqs = slice.primary?.faqs || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" yPadding="base" className="md:px-[32px] px-[24px]">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between gap-[30px]">
          <div className="flex flex-col gap-[12px] w-full">
            {faqs.map((faq, index) => (
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
                  {faq.question}
                </button>
                <div
                  className={`overflow-hidden transition-all ease-in-out duration-700 ${openIndex === index ? "max-h-[500px]" : "max-h-0"}`}
                >
                  <PrismicRichText field={faq.answer}></PrismicRichText>
                </div>
              </div>
            ))}
          </div>

          {slice.primary?.image && (
            <div className="w-full">
              <PrismicNextImage
                width={590}
                height={420}
                className="rounded-[12px] max-w-[590px] max-h-[420px] w-full h-full"
                field={slice.primary.image}
              />
            </div>
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default Faqs;
