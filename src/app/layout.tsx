import type { Metadata } from "next";
import "./Assets/global.scss";
import Header from "../Components/Header/index.Header";
import Footer from "./../Components/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "The Thousand Beans",
  description: "From Farm To Cup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head> */}
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
