import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "../components/Navbar";
import JsonLd from "../components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});
const jetmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-mono",
});

export function gaEvent(action: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  // @ts-ignore
  if (!window.gtag) return;
  // @ts-ignore
  window.gtag("event", action, params);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";

  const org = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "ElixCode",
    url: origin,
    logo: origin + "/images/logo.png",
    email: "facoding97@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gqeberha (Port Elizabeth)",
      addressRegion: "Eastern Cape",
      addressCountry: "ZA",
    },
    sameAs: [],
  };

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      <Navbar />
      <div className={`${inter.className} ${jetmono.variable}`}>
        <Component {...pageProps} />

        {/* Footer signature */}
        <footer className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 border-t border-black/10 dark:border-white/10 mt-20">
          <span className="whitespace-nowrap">Written by:</span>
          <a
            className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r dark:text-blue-600  font-medium rounded-lg transition-all duration-300 transform hover:scale-105  whitespace-nowrap text-sm sm:text-base"
            href="http://facoding.elixcode.com/"
            target="_blank"
            rel="noopener noreferrer">
            facoding
          </a>
        </footer>
      </div>

      <JsonLd data={org} />
    </>
  );
}
