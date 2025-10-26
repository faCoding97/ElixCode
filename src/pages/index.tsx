import Head from "next/head";
import HeroInteractive from "@/components/HeroInteractive";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://elixcode.com"; // Fix casing to lowercase
  return (
    <>
      <Head>
        <title>
          ElixCode — IT Services & Custom Software in Port Elizabeth, South
          Africa
        </title>{" "}
        {/* Add local keywords for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="ElixCode provides custom IT services, ERP/CRM/BPMS, websites, and QR/Barcode systems for businesses in Port Elizabeth (Gqeberha), South Africa — fast, scalable, and secure."
        />{" "}
        {/* Add local reference for relevance */}
        <meta
          name="keywords"
          content="IT services Port Elizabeth, custom software Gqeberha, website development South Africa, QR code solutions, ERP CRM Port Elizabeth"
        />{" "}
        {/* New: Add targeted keywords */}
        <link rel="canonical" href={origin} />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="ElixCode — IT Services & Custom Software in Port Elizabeth, South Africa"
        />{" "}
        {/* Add local */}
        <meta
          property="og:description"
          content="Custom ERP, web apps, QR systems, and IT solutions for businesses in Port Elizabeth (Gqeberha), South Africa. Visit ElixCode.com."
        />{" "}
        {/* Add local */}
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
          content="ElixCode — IT Services & Custom Software in Port Elizabeth, South Africa"
        />{" "}
        {/* Add local */}
        <meta
          name="twitter:description"
          content="Custom ERP, web apps, QR systems, and IT solutions for businesses in Port Elizabeth (Gqeberha), South Africa."
        />{" "}
        {/* Add local */}
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
              "@type": ["Organization", "LocalBusiness"], // Add LocalBusiness for local SEO
              name: "ElixCode",
              url: "https://elixcode.com", // Fix casing
              logo: "https://elixcode.com/images/logo.png", // Fix casing
              sameAs: [
                "https://www.linkedin.com/in/farazaghababayi",
                "https://github.com/faCoding97",
                "https://x.com/ElixCode",
              ],
              description:
                "ElixCode provides custom IT services, ERP, CRM, and software solutions for businesses in Port Elizabeth (Gqeberha), South Africa.",
              address: {
                // New: Add address for local signals
                "@type": "PostalAddress",
                addressLocality: "Port Elizabeth (Gqeberha)",
                addressRegion: "Eastern Cape",
                addressCountry: "ZA",
              },
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
