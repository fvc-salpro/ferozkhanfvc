import { Metadata } from "next";
import { notFound } from "next/navigation";
import { JSXMapSerializer, PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Bounded } from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import HeroShapes from "@/components/HeroShapes";
import Link from "next/link";
import { PiArrowDownLight } from "react-icons/pi";

type Params = { uid: string };

const headerComponents: JSXMapSerializer = {
  heading1: ({ children }) => (
    <h1 className="text-h1-m md:text-h1 text-dark-primary mb-0 leading-[120%]">
      {children}
    </h1>
  ),
  em: ({ children }) => (
    <em className="bg-gradient-to-b from-primary to-secondary bg-clip-text not-italic text-transparent">
      {children}
    </em>
  ),
  paragraph: ({ children }) => (
    <p className="text-b16 m-0 text-gray-primary">{children}</p>
  ),
};

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("service", params.uid)
    .catch(() => notFound());

  const buttons = page.data.buttons;
  const image = page.data.service_banner;
  const icon = page.data.service_icon;

  return (
    <section className="flex flex-col">
      <Bounded
        as="div"
        yPadding="base"
        className="bg-white md:px-[32px] px-[24px]"
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:text-start text-center">
          <div className="flex flex-col gap-[32px] justify-center items-center md:justify-start md:items-start">
            <div className="flex flex-col gap-[12px] md:items-start items-center">
              <PrismicNextImage
                field={icon}
                width={54}
                height={54}
                className="object-contain object-center max-w-[54px] max-h-[54px]"
              />
              <h1 className="text-h1-m md:text-h1 bg-gradient-to-b from-primary to-secondary bg-clip-text not-italic text-transparent">
                {page.data.heading}
              </h1>
              <PrismicRichText
                components={headerComponents}
                field={page.data.description}
              />
            </div>
            {buttons && buttons.length > 0 && (
              <div className="flex md:flex-row flex-wrap gap-[16px] flex-col justify-center items-center md:justify-start md:items-start">
                {buttons.map((button, index) => (
                  <ButtonLink
                    field={button.button_link}
                    key={index}
                    type={
                      button.button_type === "secondary"
                        ? "secondary"
                        : "primary"
                    }
                  >
                    {button.button_text || "Learn more"}
                  </ButtonLink>
                ))}
              </div>
            )}
            <Link
              href="#about"
              className="flex justify-center items-center rounded-full w-[42px] h-[42px] bg-primary/15 animate-bounce duration-500 ease-in-out"
            >
              <PiArrowDownLight color="#F74C06" />
            </Link>
          </div>
          <div className="flex justify-center items-center relative">
            {isFilled.image(image) && (
              <div className="bg-white">
                <PrismicNextImage
                  field={image}
                  width={520}
                  height={420}
                  className="max-w-[520px] max-h-[420px] h-full w-full object-cover object-center rounded-[12px] z-[1] relative"
                />
              </div>
            )}
            <div className="absolute right-0 hidden md:block">
              <HeroShapes />
            </div>
          </div>
        </div>
      </Bounded>
      <SliceZone slices={page.data.slices} components={components} />
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("service", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    applicationName: "Feroz Visa Consultancy",
    openGraph: {
      title: page.data.meta_title ?? undefined,
      description: page.data.meta_description ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("service");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
