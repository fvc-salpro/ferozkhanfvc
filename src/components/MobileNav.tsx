"use client";

import { useState } from "react";
import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { asLink, asText, Content } from "@prismicio/client";
import ButtonLink from "./ButtonLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavBarProps = {
  navigation: Content.NavigationDocument;
  settings: Content.SettingsDocument;
};

export default function MobileNav({ navigation, settings }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const socials = settings.data.socials;
  const pathName = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative">
      <button
        onClick={() => toggleMenu()}
        className=" p-2 bg-white rounded focus:outline-none border-none"
        aria-label="Toggle Menu"
      >
        <span
          className={`block w-6 h-[2px] bg-black mb-[5px] transition-all duration-500 ease-in-out ${isOpen ? "rotate-45 translate-y-[5px] bg-primary" : ""}`}
        ></span>
        <span
          className={`block w-6 h-[2px] bg-black transition-all duration-500 ease-in-out ${isOpen ? "opacity-0" : ""}`}
        ></span>
        <span
          className={`block w-6 h-[2px] bg-black mt-[5px] transition-all duration-500 ease-in-out ${isOpen ? "-rotate-45 -translate-y-[5px] bg-primary" : ""}`}
        ></span>
      </button>

      <ul
        className={`fixed right-0 w-full bg-white shadow-xl overflow-hidden transition-all ease-in-out duration-700 mt-[12px] ${isOpen ? "max-h-[1080px] p-[24px] transition-all ease-in-out duration-700" : "max-h-0 transition-all ease-in-out duration-700"}`}
      >
        {navigation.data?.links.map((item) => {
          const isActive = pathName === (asLink(item.link) as string)

          if (item.cta) {
            return (
              <li
                key={asText(item.label)}
                className="font-semibold tracking-tight text-slate-800"
                onClick={() => toggleMenu()}
              >
                <ButtonLink field={item?.link} className={"text-primary"}>
                  {asText(item?.label)}
                </ButtonLink>
              </li>
            );
          }
          return (
            <li
              onClick={() => {
                setTimeout(() => {
                  toggleMenu();
                }, 500);
              }}
              key={asText(item.label)}
              className={clsx("font-normal text-b14 tracking-tigh duration-500 ease-in-out hover:text-secondary", isActive ? "text-secondary" : "text-gray-primary")}
            >
              <PrismicNextLink
                className="py-[10px] px-[12px] flex"
                field={item.link}
              >
                <PrismicText field={item.label} />
              </PrismicNextLink>
            </li>
          );
        })}
        {socials && socials.length > 0 && (
          <div
            className="flex flex-row mt-[30px] justify-center flex-wrap gap-[10px] bg-gradient-to-r from-primary to-primary-dark py-[8px] px-[10px] 
          top-[20%] rounded-[8px]"
          >
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
      </ul>
    </nav>
  );
}
