"use client";

import { Bounded } from "@/components/Bounded";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

/**
 * Props for `ImagesCarousel`.
 */
export type ImagesCarouselProps =
  SliceComponentProps<Content.ImagesCarouselSlice>;

/**
 * Component for "ImagesCarousel" Slices.
 */

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <h2 className="text-h2-m md:text-h2 text-dark-primary mb-0 leading-[120%]">
      {children}
    </h2>
  ),
  paragraph: ({ children }) => (
    <p className="text-b16 m-0 text-gray-primary">{children}</p>
  ),
};

const ImagesCarousel = ({ slice }: ImagesCarouselProps): JSX.Element => {
  const images = slice.primary.images;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white"
    >
      <Bounded as="div" yPadding="base" className="md:px-[32px] px-[24px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            {slice.primary.heading && (
              <PrismicRichText
                components={components}
                field={slice.primary.heading}
              ></PrismicRichText>
            )}
            {slice.primary.text && (
              <PrismicRichText
                components={components}
                field={slice.primary.text}
              ></PrismicRichText>
            )}
          </div>

          {images.length > 0 && (
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
                partialVisible={true}
                partialVisbile={true}
                itemClass="mx-[16px]"
              >
                {images.map((image, index) => (
                  <div
                    className="flex relative flex-col text-center items-center max-w-[320px]"
                    key={index}
                  >
                    {isFilled.image(image.image) && (
                      <PrismicNextImage
                        field={image.image}
                        width={320}
                        height={260}
                        className="object-cover object-center max-w-[320px] max-h-[260px] rounded-[12px]"
                      />
                    )}
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

export default ImagesCarousel;
