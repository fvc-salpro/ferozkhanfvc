"use client";

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { asLink, asText, Content } from "@prismicio/client";
import ButtonLink from "./ButtonLink";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavBarProps = {
  navigation: Content.NavigationDocument;
  settings: Content.SettingsDocument;
};

export default function DesktopNav({ navigation, settings }: NavBarProps) {
  const socials = settings.data.socials;
  const [isOpen, setIsOpen] = useState<Boolean>(true);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-8 rounded-full hover:shadow-lg text-white hover:shadow-primary-dark transition ease-in-out duration-500"
        aria-label="Toggle Social Links"
      >
        <Image
          width={32}
          height={32}
          alt="Fast Mark Icon"
          src="/fast-logo-mark.svg"
        />
      </button>

      {socials && socials.length > 0 && (
        <div
          className={clsx(
            "overflow-hidden transition-all ease-in-out duration-700 flex flex-col gap-[10px] bg-gradient-to-r from-primary to-primary-dark fixed bottom-[70px] right-6 rounded-[8px] shadow-lg",
            isOpen
              ? "max-h-[500px] py-[8px] px-[10px] opacity-100"
              : "max-h-0 py-[8px] px-[10px] opacity-0"
          )}
        >
          {socials.map((social, index) => (
            <Link
              className="rounded-[8px] duration-300 ease-in-out transition-all hover:bg-[#ffffff15] backdrop-blur-sm hover:shadow-sm shadow-black/5"
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
            const isActive = pathName === (asLink(item.link) as string)
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
                className={clsx("font-normal text-b14 tracking-tight duration-500 ease-in-out hover:text-secondary", isActive ? "text-secondary" : "text-gray-primary")}
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
