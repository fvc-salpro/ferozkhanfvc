"use client";

import { Bounded } from "@/components/Bounded";
import { SliceComponentProps } from "@prismicio/react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { PrismicRichText } from "@/components/PrismicRichText";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

/**
 * Props for `Reviews`.
 */
export type ReviewsProps = SliceComponentProps<Content.ReviewsSlice>;

/**
 * Component for "Reviews" Slices.
 */

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const Reviews = ({ slice }: ReviewsProps): JSX.Element => {
  const reviews = slice.primary.reviews || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#FEFBF5]"
    >
      <Bounded as="div" yPadding="base" className="md:px-[32px] px-[24px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            {slice.primary.heading && (
              <PrismicRichText field={slice.primary.heading}></PrismicRichText>
            )}
          </div>

          {reviews.length > 0 && (
            <div className="mt-[30px] w-full relative min-h-[230px]">
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                containerClass="container"
                ssr={true}
                showDots={true}
                autoPlaySpeed={5000}
                keyBoardControl={true}
                transitionDuration={500}
                arrows={false}
                renderDotsOutside
              >
                {reviews.map((review, index) => (
                  <div
                    className="gap-[12px] flex relative flex-col text-center items-center mx-4 max-w-[370px]"
                    key={index}
                  >
                    {isFilled.image(review.image) ? (
                      <PrismicNextImage
                        field={review.image}
                        width={54}
                        height={54}
                        className="object-cover object-center max-w-[54px] max-h-[54px] rounded-full"
                      />
                    ) : (
                      <Image
                        src="/user.svg"
                        alt={`Reviewer ${index}`}
                        width={54}
                        height={54}
                        className="object-cover object-center max-w-[54px] max-h-[54px]"
                      />
                    )}
                    <h6 className="text-h6-m text-dark-primary text-balance">
                      {review.name || "Unknown Reviewer"}
                    </h6>
                    <PrismicRichText field={review.text}></PrismicRichText>
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default Reviews;
