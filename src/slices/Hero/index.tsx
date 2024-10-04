import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps, JSXMapSerializer } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { PrismicRichText } from "@/components/PrismicRichText";
import ButtonLink from "@/components/ButtonLink";
import Image from "next/image";
import AnimatedContent from "@/components/AnimatedContent";

type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps) => {
  const backgroundImage = slice.primary.backgroundImage;

  // const container = useRef(null);
  // const preferReduceMotion = usePrefersReducedMotion();
  // gsap.registerPlugin(useGSAP);

  // useGSAP(
  //   () => {
  //     if (preferReduceMotion) {
  //       gsap.set(
  //         ".hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow",
  //         { opacity: 1 }
  //       );
  //       return;
  //     }

  //     const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

  //     tl.fromTo(
  //       ".hero__heading",
  //       { scale: 0.5 },
  //       { scale: 1, opacity: 1, duration: 0.8 }
  //     );
  //     tl.fromTo(
  //       ".hero__body",
  //       { y: 20 },
  //       { y: 0, opacity: 1, duration: 0.5 },
  //       "-=0.6"
  //     );
  //     tl.fromTo(
  //       ".hero__button",
  //       { scale: 0.5 },
  //       { scale: 1, opacity: 1, duration: 0.5 },
  //       "-=0.8"
  //     );
  //     tl.fromTo(
  //       ".hero__image",
  //       { y: 100 },
  //       { y: 0, opacity: 1, duration: 0.5 },
  //       "+=0.3"
  //     );
  //     tl.fromTo(
  //       ".hero__glow",
  //       { scale: 0.5 },
  //       { scale: 1, opacity: 1, duration: 0.8 },
  //       "-=1"
  //     );
  //   },
  //   { scope: container }
  // );

  return (
    <section className="relative bg-white">
      <Bounded yPadding="base" className="relative px-[32px]">
        <div className="grid justify-items-center gap-8">
          <div className="max-w-full lg:max-w-[810px] text-center">
            <PrismicRichText field={slice.primary.heading} />
            <PrismicRichText field={slice.primary.text} />
          </div>
          <div className="flex flex-row items-center gap-[16px]">
            {slice.primary.buttons &&
              slice.primary.buttons.length > 0 &&
              slice.primary.buttons.map((button, index) => {
                return (
                  <ButtonLink
                    type={button.button_type}
                    key={index}
                    field={button.button_link}
                  >
                    {button.button_text}
                  </ButtonLink>
                );
              })}
          </div>
          <div className="relative w-full justify-center items-center flex lg:mt-[66px]">
            {isFilled.image(backgroundImage) && (
              <PrismicNextImage
                field={backgroundImage}
                alt=""
                width={940}
                height={440}
                className="pointer-events-none z-[2] lg:-translate-y-[46px] rounded-[12px] select-none object-cover object-center max-w-[940px] max-h-[440px] h-full w-full"
              />
            )}
            <Image
              alt="FVC Shapes Banner"
              src="/fvc-shapes.png"
              width={1280}
              height={300}
              className="max-w-full max-h-[300px] object-cover object-center absolute bottom-0"
              loading="lazy"
            />
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Hero;
