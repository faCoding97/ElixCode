import Head from "next/head";
import QRTool from "@/components/QRTool";
import RequestProjectCard from "@/components/RequestProjectCard";

export default function AboutContact() {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";

  return (
    <>
      <Head>
        <title>Contact Us — ElixCode</title>
        <link rel="canonical" href={origin + "/Contactus"} />
        <meta
          name="description"
          content="Get in touch with ElixCode — we build custom software, ERP/CRM/BPMS, and QR/Barcode solutions for businesses."
        />
      </Head>

      <main className="container py-16 md:py-24">
        <h1 className="text-2xl md:text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 opacity-80 max-w-3xl">
          Tell us about your idea — whether it’s a business system, web app, or
          automation workflow. Our engineers will review it and reply with next
          steps and an estimate.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <RequestProjectCard />
          <QRTool defaultUrl={origin + "/"} />
        </div>
      </main>
    </>
  );
}
