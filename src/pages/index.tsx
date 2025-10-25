import Head from "next/head";
import HeroInteractive from "@/components/HeroInteractive";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";
  return (
    <>
      <Head>
        <title>ElixCode — Custom Software, ERP & Web Apps</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="ElixCode builds custom software, ERP/CRM/BPMS, and QR/Barcode systems for businesses — fast, scalable, and secure."
        />

        <link rel="canonical" href={origin} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="ElixCode — Custom Software, ERP & Web Apps"
        />
        <meta
          property="og:description"
          content="Custom ERP, web apps, and automation systems engineered for real-world performance. Visit ElixCode.com."
        />
        <meta property="og:url" content={origin} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ElixCode" />
        <meta property="og:image" content={`${origin}/images/og-banner.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ElixCode — Custom Software, ERP & Web Apps"
        />
        <meta
          name="twitter:description"
          content="Custom ERP, web apps, and automation systems engineered for performance."
        />
        <meta name="twitter:image" content={`${origin}/images/og-banner.jpg`} />
        <meta
          name="google-site-verification"
          content="A2hSsIvglnDXsaPF6wrR96Gv3bL8XBK7BhFY01izvbU"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ElixCode",
              url: "https://ElixCode.com",
              logo: "https://ElixCode.com/images/logo.png",
              sameAs: [
                "https://www.linkedin.com/in/farazaghababayi",
                "https://github.com/faCoding97",
                "https://x.com/ElixCode",
              ],
              description:
                "ElixCode builds custom ERP, CRM, and software solutions tailored for SMEs.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+27 72 933 0166",
                contactType: "customer support",
                areaServed: "ZA",
                availableLanguage: ["English"],
              },
            }),
          }}
        />
      </Head>

      <HeroInteractive />
      <Services />
      <Portfolio />
    </>
  );
}
