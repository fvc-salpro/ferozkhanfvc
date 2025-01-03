import { createClient } from "@/prismicio";
import { Bounded } from "./Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const footer = await client.getSingle("footer");
  const socials = settings.data.socials;

  return (
    <footer className="bg-footer-bg text-center md:text-start">
      <Bounded as="header" yPadding="null">
        <div
          className="relative md:px-[32px] px-[24px] flex flex-col items-center gap-x-6 w-full py-[30px] md:py-[46px]
          gap-y-3 leading-none border-b border-gray-primary/10"
        >
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[30px] justify-between w-full">
            <div className="flex flex-col gap-[12px]">
              <h6 className="text-h6-m text-dark-primary">
                {footer.data.heading_one}
              </h6>
              {footer.data.quick_links &&
                footer.data.quick_links.length > 0 && (
                  <div className="flex flex-col">
                    {footer.data.quick_links.map((quickLink, index) => (
                      <PrismicNextLink
                        className="py-[4px] hover:text-secondary duration-300 ease-in-out"
                        key={index}
                        field={quickLink.link}
                      >
                        {quickLink.link_text}
                      </PrismicNextLink>
                    ))}
                  </div>
                )}
            </div>
            <div className="flex flex-col gap-[12px]">
              <h6 className="text-h6-m text-dark-primary">
                {footer.data.heading_two}
              </h6>
              {footer.data.services && footer.data.services.length > 0 && (
                <div className="flex flex-col">
                  {footer.data.services.map((serviceLink, index) => (
                    <PrismicNextLink
                      className="py-[4px] hover:text-secondary duration-300 ease-in-out"
                      key={index}
                      field={serviceLink.link}
                    >
                      {serviceLink.link_text}
                    </PrismicNextLink>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-[12px]">
              <h6 className="text-h6-m text-dark-primary">
                {footer.data.heading_three}
              </h6>
              {footer.data.top_countries &&
                footer.data.top_countries.length > 0 && (
                  <div className="flex flex-col">
                    {footer.data.top_countries.map((countryLink, index) => (
                      <PrismicNextLink
                        className="py-[4px] hover:text-secondary duration-300 ease-in-out"
                        key={index}
                        field={countryLink.link}
                      >
                        {countryLink.link_text}
                      </PrismicNextLink>
                    ))}
                  </div>
                )}
            </div>
            <div className="flex flex-col gap-[12px]">
              <h6 className="text-h6-m text-dark-primary">
                {footer.data.heading_four}
              </h6>
              {footer.data.contact_us && footer.data.contact_us.length > 0 && (
                <div className="flex flex-col">
                  {footer.data.contact_us.map((contactLink, index) => (
                    <PrismicNextLink
                      className="py-[4px] hover:text-secondary duration-300 ease-in-out"
                      key={index}
                      field={contactLink.link}
                    >
                      {contactLink.link_text}
                    </PrismicNextLink>
                  ))}
                </div>
              )}
            </div>
          </div>
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
                  <PrismicNextImage
                    width={32}
                    height={32}
                    field={social.icon}
                  />
                </Link>
              ))}
            </div>
          )}
          <PrismicNextLink
            href="/"
            className="text-xl font-semibold tracking-tight"
          >
            <PrismicNextImage
              width={160}
              height={140}
              field={settings.data.site_logo}
            />
          </PrismicNextLink>
        </div>
        <div className="flex lg:flex-row flex-col items-center justify-between text-gray-primary text-b16 px-[32px] py-[16px] w-full">
          <p>{new Date().getFullYear()} Feroz Visa Consultancy</p>
          <p>
            Powered by{" "}
            <Link
              className="font-semibold underline"
              target="_blank"
              href="https://salprodev.com"
            >
              SalPro DEV
            </Link>
          </p>
        </div>
      </Bounded>
    </footer>
  );
}
