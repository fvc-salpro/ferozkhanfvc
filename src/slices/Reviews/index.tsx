import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { SliceComponentProps } from "@prismicio/react";
import ReviewsCarousel from "./ReviewsCarousel";
import { Content } from "@prismicio/client";

/**
 * Props for `Reviews`.
 */
export type ReviewsProps = SliceComponentProps<Content.ReviewsSlice>;

/**
 * Component for "Reviews" Slices.
 */
const Reviews = ({ slice }: ReviewsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-primary-light"
    >
      <Bounded as="div" className="md:px-[32px] px-[24px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            <PrismicRichText field={slice.primary.heading} />
          </div>
          {slice.primary.reviews && slice.primary.reviews.length > 0 && (
            <div className="mt-[30px]">
              <ReviewsCarousel reviews={slice.primary.reviews} />
            </div>
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default Reviews;
