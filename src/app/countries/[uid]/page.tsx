import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("country", params.uid)
    .catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("country", params.uid)
    .catch(() => notFound());

  const pageTitle = `${page.data.meta_title}`;
  const keywords = page.data.keywords?.split(' ') || [];
  const alternativeKeywords = ["FVC", "#ferozkhanfvc", "consultancy", "migration", "visa", "tourvisa", "Feroz Khan", "study"];

  return {
    title: pageTitle,
    description: page.data.meta_description,
    applicationName: "Feroz Visa Consultancy",
    keywords: keywords.length > 0 ? keywords : alternativeKeywords,
    openGraph: {
      title: page.data.meta_title
        ? `${page.data.meta_title} - Feroz Khan FVC`
        : undefined,
      description: page.data.meta_description ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
      siteName: 'Feroz Visa Consultancy - Feroz Khan FVC',
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("country");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
