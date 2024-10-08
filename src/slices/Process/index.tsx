"use client";

import { useState } from "react";
import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import ButtonLink from "@/components/ButtonLink";

/**
 * Props for `Process`.
 */
export type ProcessProps = SliceComponentProps<Content.ProcessSlice>;

/**
 * Component for "Process" Slices.
 */
const Process = ({ slice }: ProcessProps): JSX.Element => {
  const processes = slice.primary.process;

  const [openProcessIndex, setOpenProcessIndex] = useState(0);

  const toggleProcess = (index: number) => {
    setOpenProcessIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="bg-white md:px-[32px] px-[24px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            <PrismicRichText field={slice.primary.heading} />
            <div className="max-w-full md:max-w-[580px]">
              <PrismicRichText field={slice.primary.text} />
            </div>
          </div>
          {processes && processes.length > 0 && (
            <div className="mt-[30px] rounded-[12px] grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
              {processes.map((process, index) => {
                const isOpen = openProcessIndex === index;

                return (
                  <div
                    className="group gap-[12px] flex relative flex-col lg:text-start text-center lg:items-start items-center pl-[24px] border-l-[0.5px] border-solid border-primary/55 cursor-pointer"
                    key={index}
                    onClick={() => toggleProcess(index)}
                  >
                    <span
                      className={clsx(
                        "text-h1-xl m-0 duration-500 ease-in-out",
                        isOpen
                          ? "bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent"
                          : "text-primary-alt"
                      )}
                    >
                      {process.number}
                    </span>
                    <h6 className="text-h6-m text-dark-primary text-balance">
                      {process.title}
                    </h6>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <PrismicRichText field={process.text} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-[30px]">
            <ButtonLink field={slice.primary.button_link} type="primary">
              {slice.primary.button_text}
            </ButtonLink>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Process;
