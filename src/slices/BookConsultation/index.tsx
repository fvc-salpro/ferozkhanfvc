"use client";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { InlineWidget } from "react-calendly";

/**
 * Props for `BookConsultation`.
 */
export type BookConsultationProps =
  SliceComponentProps<Content.BookConsultationSlice>;

/**
 * Component for "BookConsultation" Slices.
 */
const BookConsultation = ({ slice }: BookConsultationProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="book-consulation"
    >
      <Bounded as="div" className="bg-white md:px-[32px] px-[24px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            <PrismicRichText field={slice.primary.heading} />
            <div className="max-w-full md:max-w-[580px] text-balance mt-[-12px]">
              <PrismicRichText field={slice.primary.text} />
            </div>
          </div>
        </div>
        <InlineWidget
          url="https://calendly.com/ferozvisaconsultancy"
          iframeTitle="Book Consultation"
          key={"book-consultation-form"}
          styles={{
            height: "1000px",
            marginTop: "30px",
          }}
        />
      </Bounded>
    </section>
  );
};

export default BookConsultation;
