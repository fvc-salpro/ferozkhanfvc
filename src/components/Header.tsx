import { createClient } from "@/prismicio";
import { Bounded } from "./Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { asText } from "@prismicio/client";
import ButtonLink from "./ButtonLink";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");

  return (
    <Bounded as="header" yPadding="null">
      <div className="relative z-[1] shadow-primary/5 md:px-[32px] px-[24px] py-[10px] rounded-[12px] flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none border-b border-gray-primary/10 shadow-md">
        <PrismicNextLink
          href="/"
          className="text-xl font-semibold tracking-tight"
        >
          <PrismicNextImage
            width={103}
            height={51}
            field={settings.data.site_logo}
          />
        </PrismicNextLink>
        <nav>
          <ul className="flex flex-wrap gap-0 items-center md:gap-0">
            {navigation.data?.links.map((item) => {
              if (item.cta) {
                return (
                  <li
                    key={asText(item.label)}
                    className="font-semibold tracking-tight text-slate-800"
                  >
                    <ButtonLink
                      field={item?.link}
                      //   aria-current={isActive ? "page" : undefined}
                      className={"text-primary"}
                    >
                      {asText(item?.label)}
                    </ButtonLink>
                  </li>
                );
              }
              return (
                <li
                  key={asText(item.label)}
                  className="font-normal text-b14 tracking-tight text-gray-primary duration-500 ease-in-out hover:text-secondary"
                >
                  <PrismicNextLink
                    className="py-[10px] px-[12px]"
                    field={item.link}
                  >
                    <PrismicText field={item.label} />
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
}
