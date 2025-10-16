import Head from "next/head";
import QRTool from "@/components/QRTool";

export default function QRPage() {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";
  return (
    <>
      <Head>
        <title>QR Generator — ElixCode</title>
        <link rel="canonical" href={origin + "/qr"} />
      </Head>
      <main className="container py-16 md:py-24">
        <h1 className="text-2xl md:text-4xl font-bold">QR Generator</h1>
        <p className="mt-2 opacity-80">
          Create SVG QR codes for any internal URL.
        </p>
        <div className="mt-6">
          <QRTool defaultUrl={origin + "/"} />
        </div>
      </main>
    </>
  );
}
