"use client";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { SliceComponentProps } from "@prismicio/react";
import ReviewsCarousel from "./ReviewsCarousel";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import Carousel from "react-multi-carousel";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

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
              {/* <ReviewsCarousel reviews={slice.primary.reviews} /> */}
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                containerClass="reviews-carousel"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="carousel-item-padding-40-px"
              >
                {slice?.primary?.reviews &&
                  slice?.primary?.reviews.map((review, index) => (
                    <div
                      className="group gap-[12px] flex relative flex-col text-center items-center"
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
                      <h6 className="text-h6 text-dark-primary text-balance">
                        {review.name}
                      </h6>
                      <PrismicRichText field={review.text} />
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
