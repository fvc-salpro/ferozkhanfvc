import { MetadataRoute } from "next";
import { createClient } from "@/prismicio";

const baseUrl = "https://www.ferozvisaconsultancy.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  const dynamicPages = await client.getAllByType("page");
  const dynamicServices = await client.getAllByType("service");
  const dynamicCountries = await client.getAllByType("country");

  const dynamicRoutes = dynamicPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date().toISOString(),
  }));

  const serviceRoutes = dynamicServices.map((service) => ({
    url: `${baseUrl}/services/${service.uid}`,
    lastModified: new Date().toISOString(),
  }));

  const countriesRoutes = dynamicCountries.map((country) => ({
    url: `${baseUrl}/countries/${country.uid}`,
    lastModified: new Date().toISOString(),
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  return [
    ...staticRoutes,
    ...dynamicRoutes,
    ...serviceRoutes,
    ...countriesRoutes,
  ];
}
