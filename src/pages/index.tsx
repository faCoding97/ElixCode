import Head from "next/head";
import HeroInteractive from "@/components/HeroInteractive";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";
  return (
    <>
      <Head>
        <title>ElixCode — Custom Software, No CMS</title>
        <meta
          name="description"
          content="Custom websites, ERP/Inventory, QR/Barcode systems, and robust integrations."
        />
        <link rel="canonical" href={origin} />
        <meta
          property="og:title"
          content="ElixCode — Custom Software, No CMS"
        />
        <meta
          property="og:description"
          content="Custom websites, ERP/Inventory, QR/Barcode systems, and robust integrations."
        />
        <meta property="og:url" content={origin} />

        {/* ICO (classic) */}
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
      </Head>
      <HeroInteractive />
      <Services />
      <Portfolio />
    </>
  );
}
