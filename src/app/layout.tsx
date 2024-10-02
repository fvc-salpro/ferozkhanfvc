import "./globals.css";

import { Inter, Montserrat } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";

import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
      </head>
      <body className="overflow-x-hidden antialiased">
        <Header />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
