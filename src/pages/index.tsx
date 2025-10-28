// pages/index.tsx  (Pages Router)
// اگر App Router دارید، بهتره این متاها رو با Metadata API پیاده‌سازی کنید.
// این نسخه روی Pages Router بهینه‌سازی شده.

import Head from "next/head";
import HeroInteractive from "@/components/HeroInteractive";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";

// ✅ در صورت نبودن .env مقدار پیش‌فرض استفاده می‌شود
const ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN?.toLowerCase() || "https://elixcode.com";

const SEO = {
  title:
    "ElixCode — IT Services & Custom Software in Port Elizabeth (Gqeberha), South Africa",
  description:
    "ElixCode provides custom IT services, ERP/CRM/BPMS, websites, and QR/Barcode systems for businesses in Port Elizabeth (Gqeberha), South Africa — fast, scalable, and secure.",
  ogImage: `${ORIGIN}/images/logo.png`,
  siteName: "ElixCode",
  phone: "+27 72 933 0166",
  locale: "en_ZA",
  twitterHandle: "@ElixCode", // در صورت نبود، مشکلی نیست
};

export default function Home() {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "ElixCode",
    url: ORIGIN,
    logo: `${ORIGIN}/images/logo.png`,
    sameAs: [
      "https://www.linkedin.com/in/farazaghababayi",
      "https://github.com/faCoding97",
      "https://x.com/ElixCode",
    ],
    description:
      "ElixCode provides custom IT services, ERP, CRM, and software solutions for businesses in Port Elizabeth (Gqeberha), South Africa.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Port Elizabeth (Gqeberha)",
      addressRegion: "Eastern Cape",
      addressCountry: "ZA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SEO.phone,
      contactType: "customer support",
      areaServed: "ZA",
      availableLanguage: ["English"],
    },
  };

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO.siteName,
    url: ORIGIN,
    potentialAction: {
      "@type": "SearchAction",
      target: `${ORIGIN}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: ORIGIN,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${ORIGIN}/portfolio`,
      },
    ],
  };

  return (
    <>
      <Head>
        {/* ===== Primary ===== */}
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <link rel="canonical" href={ORIGIN} />

        {/* اختیاری و کم‌اثر: */}
        <meta
          name="keywords"
          content="IT services Port Elizabeth, custom software Gqeberha, website development South Africa, QR code solutions, ERP CRM Port Elizabeth"
        />

        {/* ===== Open Graph ===== */}
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:url" content={ORIGIN} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SEO.siteName} />
        <meta property="og:locale" content={SEO.locale} />
        <meta property="og:image" content={SEO.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ElixCode — banner" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* ===== Twitter Card ===== */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
        <meta name="twitter:image" content={SEO.ogImage} />
        <meta name="twitter:site" content={SEO.twitterHandle} />

        {/* ===== Robots & Viewport ===== */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow,max-image-preview:large" />

        {/* ===== Favicons ===== */}
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />

        {/* ===== Verification (در صورت نیاز) ===== */}
        <meta
          name="google-site-verification"
          content="A2hSsIvglnDXsaPF6wrR96Gv3bL8XBK7BhFY01izvbU"
        />

        {/* ===== Performance hints ===== */}
        {/* فقط اگر GA یا فونت خارجی دارید: */}
        {/* <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" /> */}

        {/* ===== Structured Data (JSON-LD) ===== */}
        <script
          type="application/ld+json"
          // Organization + LocalBusiness
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
        <script
          type="application/ld+json"
          // WebSite
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          // Breadcrumb
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
      </Head>

      {/* ===== Page Content ===== */}
      <HeroInteractive />
      <Services />
      <Portfolio />
    </>
  );
}
