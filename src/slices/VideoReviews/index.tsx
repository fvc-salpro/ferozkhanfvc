"use client";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

/**
 * Props for `VideoReviews`.
 */
export type VideoReviewsProps = SliceComponentProps<Content.VideoReviewsSlice>;

/**
 * Component for "VideoReviews" Slices.
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

const VideoReviews = ({ slice }: VideoReviewsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="bg-white md:px-[32px] px-[24px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            <PrismicRichText field={slice.primary.heading} />
            <div className="max-w-full md:max-w-[780px]">
              <PrismicRichText field={slice.primary.text} />
            </div>
          </div>
          {slice.primary.reviews && slice.primary.reviews.length > 0 && (
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
            >
              {slice.primary.reviews.map((review, index) => {
                return (
                  <div key={index} className="max-w-[380px] max-h-[280px] w-full h-full">
                    <iframe
                      width="380"
                      height="280"
                      src={review.review_link}
                      title="YouTube video player"
                      className="rounded-[12px]"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </Carousel>
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default VideoReviews;
