import { createClient } from "@/prismicio";
import { Bounded } from "./Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");

  return (
    <Bounded as="header" yPadding="null">
      <div className="relative z-[4] shadow-primary/5 md:px-[32px] px-[24px] py-[10px] rounded-[12px] flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none border-b border-gray-primary/10 shadow-md">
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
        <div className="hidden lg:flex">
          <DesktopNav settings={settings} navigation={navigation} />
        </div>
        <div className="flex lg:hidden">
          <MobileNav settings={settings} navigation={navigation} />
        </div>
      </div>
    </Bounded>
  );
}
