"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import { isFilled, GroupField } from "@prismicio/client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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

export type ReviewsProps = SliceComponentProps<Content.ReviewsSlice>;

const ReviewsCarousel = ({ slice }: ReviewsProps) => {
  return (
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
  );
};

export default ReviewsCarousel;
