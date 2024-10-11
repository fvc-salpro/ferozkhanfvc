import {
  PrismicRichText as BasePrismicRichText,
  type PrismicRichTextProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import { Heading } from "./Heading";

const defaultComponents: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      className="mb-7 mt-12 first:mt-0 last:mb-0 text-dark-primary text-balance"
    >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading
      as="h2"
      className="mb-7 mt-12 first:mt-0 last:mb-0 text-dark-primary text-balance"
    >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading
      as="h3"
      className="mb-7 mt-12 first:mt-0 last:mb-0 text-dark-primary text-balance"
    >
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading
      as="h4"
      className="mb-7 mt-12 first:mt-0 last:mb-0 text-dark-primary text-balance"
    >
      {children}
    </Heading>
  ),
  heading5: ({ children }) => (
    <Heading
      as="h5"
      className="mb-7 mt-12 first:mt-0 last:mb-0 text-dark-primary text-balance"
    >
      {children}
    </Heading>
  ),
  heading6: ({ children }) => (
    <Heading
      as="h6"
      className="mb-7 mt-12 first:mt-0 last:mb-0 text-dark-primary text-balance"
    >
      {children}
    </Heading>
  ),
  em: ({ children }) => (
    <em className="bg-gradient-to-b from-primary to-secondary bg-clip-text not-italic text-transparent">
      {children}
    </em>
  ),
  paragraph: ({ children }) => (
    <p className="mb-7 last:mb-0 text-b16 text-gray-primary">{children}</p>
  ),
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2 text-gray-primary">
      {children}
    </li>
  ),
  list: ({ children }) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2 text-gray-primary">
      {children}
    </li>
  ),
  preformatted: ({ children }) => (
    <pre className="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicNextLink
      field={node.data}
      className="underline decoration-1 underline-offset-2"
    >
      {children}
    </PrismicNextLink>
  ),
  image: ({ node }) => (
    <div className="my-6">
      <PrismicNextImage
        width={520}
        height={860}
        field={node}
        className="w-full h-full max-w-[520px] max-h-[860px] rounded-[12px] mx-auto"
      />
    </div>
  ),
  embed: ({ node }) => (
    <div className="my-6 aspect-w-16 aspect-h-9">
      <iframe
        className="w-full h-full"
        src={node.oembed.embed_url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ),
};

export function PrismicRichText({
  components,
  ...props
}: PrismicRichTextProps) {
  return (
    <BasePrismicRichText
      components={{ ...defaultComponents, ...components }}
      {...props}
    />
  );
}
