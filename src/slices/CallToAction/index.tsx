import { Bounded } from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded
        as="div"
        yPadding="base"
        className="bg-white md:px-[32px] px-[24px] min-h-[420px] flex justify-center items-center relative overflow-hidden"
      >
        <Image
          className="opacity-35 object-cover object-center"
          src="/fvc-shapes.png"
          fill
          alt="Call to action background shapes"
        />
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            <PrismicRichText field={slice.primary.heading} />
            <div className="max-w-full md:max-w-[740px] -mt-[20px]">
              <PrismicRichText field={slice.primary.text} />
            </div>
          </div>
          {isFilled.link(slice.primary.button_link) && (
            <ButtonLink
              className="mt-[30px]"
              type={slice.primary.type === "secondary" ? "secondary" : "primary"}
              field={slice.primary.button_link}
            >
              {slice.primary.button_text}
            </ButtonLink>
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default CallToAction;
