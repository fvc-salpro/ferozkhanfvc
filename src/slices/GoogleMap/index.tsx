import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `GoogleMap`.
 */
export type GoogleMapProps = SliceComponentProps<Content.GoogleMapSlice>;

/**
 * Component for "GoogleMap" Slices.
 */
const GoogleMap = ({ slice }: GoogleMapProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="bg-white px-[24px] md:px-[32px]">
        <div className="max-w-full max-h-[450px] w-full h-full">
          <iframe
            width="1280"
            height="450"
            src={slice.primary.google_map_url}
            title="YouTube video player"
            className="rounded-[12px] max-w-full max-h-[450px] w-full lg:h-[450px] h-[360px]"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Bounded>
    </section>
  );
};

export default GoogleMap;
