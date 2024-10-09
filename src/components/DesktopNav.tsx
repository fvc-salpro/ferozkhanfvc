"use client";

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { asText, Content } from "@prismicio/client";
import ButtonLink from "./ButtonLink";
import Link from "next/link";

type NavBarProps = {
  navigation: Content.NavigationDocument;
  settings: Content.SettingsDocument;
};

export default function DesktopNav({ navigation, settings }: NavBarProps) {
  const socials = settings.data.socials;

  return (
    <>
      {socials && socials.length > 0 && (
        <div className="flex flex-col gap-[10px] bg-gradient-to-r from-primary to-primary-dark fixed left-0 py-[8px] px-[10px] top-[20%] rounded-[8px]">
          {socials.map((social, index) => (
            <Link
              className="rounded-[8px] duration-300 ease-in-out transition-all hover:bg-[#ffffff15] backdrop-blur-sm hover:shadow-sm 
              shadow-black/5"
              key={index}
              href={social.link}
              target="_blank"
            >
              <PrismicNextImage width={32} height={32} field={social.icon} />
            </Link>
          ))}
        </div>
      )}

      <nav>
        <ul className="flex flex-wrap gap-0 items-center md:gap-0">
          {navigation.data?.links.map((item) => {
            if (item.cta) {
              return (
                <li
                  key={asText(item.label)}
                  className="font-semibold tracking-tight text-slate-800"
                >
                  <ButtonLink field={item?.link} className={"text-primary"}>
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
    </>
  );
}
