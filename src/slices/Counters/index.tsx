import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Counters`.
 */
export type CountersProps = SliceComponentProps<Content.CountersSlice>;

/**
 * Component for "Counters" Slices.
 */

const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <h3 className="text-h3-m md:text-h3 text-dark-primary mb-0">{children}</h3>
  ),
};

const Counters = ({ slice }: CountersProps): JSX.Element => {
  const counters = slice.primary.counters;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-secondary-light"
    >
      <Bounded as="div" className=" md:px-[32px] px-[24px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center max-w-[950px]">
            <PrismicRichText
              components={components}
              field={slice.primary.heading}
            />
          </div>
          {counters && counters.length > 0 && (
            <div className="mt-[30px] rounded-[12px] grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
              {counters.map((counter, index) => {
                return (
                  <div
                    className="group gap-[16px] flex relative flex-col text-center items-center"
                    key={index}
                  >
                    <div className="px-[32px] py-[12px] bg-primary-light-alt rounded-[8px] text-secondary">
                      <h4 className="text-h4 text-balance">{counter.number}</h4>
                    </div>
                    <h6 className="text-h6-m text-gray-primary text-balance">
                      {counter.title}
                    </h6>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default Counters;
