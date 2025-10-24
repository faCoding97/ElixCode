import Head from "next/head";
import QRTool from "@/components/QRTool";

export default function AboutContact() {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";

  const DISPLAY_PHONE = "+27 72 933 0166";
  const TEL_LINK = "tel:+27729330166";

  const WHATSAPP_LINK =
    "https://wa.me/27729330166?text=" +
    encodeURIComponent(
      "Hi ElixCode team, I’d like to discuss a project.\n— Project type:\n— Timeline:\n— Budget range:"
    );

  const CONTACT_EMAIL = "elixcode@outlook.com";

  const MAILTO =
    `mailto:${CONTACT_EMAIL}?subject=` +
    encodeURIComponent("ElixCode — New Inquiry") +
    `&body=` +
    encodeURIComponent(
      `Hi ElixCode team,

I’d like to get in touch regarding:

— Project type:
— Timeline:
— Budget range:

Thanks!`
    );

  const MAILTO_ORDER =
  `mailto:${CONTACT_EMAIL}?subject=` +
  encodeURIComponent("New Project Request — ElixCode") +
  `&body=` +
  encodeURIComponent(
    `Hello ElixCode Team,

I'd like to request a custom software project. Please find my details below:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 Company / Name:
🌍 Website / Domain (if any):
📞 Phone / WhatsApp:
📧 Email Address:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧩 Project Type:
(ERP / CRM / BPMS / Web App / QR-Barcode / E-Commerce / Admin Dashboard / Automation System / Integration / Other)

🧠 Project Summary:
(A short description of what you need and what problem it solves)

⚙️ Key Features & Requirements:
• 
• 
• 

🎨 Design Preference:
(Modern / Minimal / Corporate / Dark / Light / Custom)

🕒 Expected Timeline:
(Desired start date & completion target)

💰 Budget Range:
(Approximate or confirmed budget)

🔗 Reference Links:
(Example websites, designs, or systems you like)

📍 Business Location:
(City / Country)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please review this information and get back to me with:
• Estimated cost or pricing model
• Expected development timeline
• Any questions you might have before starting

Thank you,
[Your Name]
[Your Company / Position]
[Date]
`
  );


  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ElixCode",
    url: origin,
    email: CONTACT_EMAIL,
    telephone: "+27729330166",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+27729330166",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        areaServed: "ZA",
        availableLanguage: ["en"],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Contact Us — ElixCode</title>
        <link rel="canonical" href={origin + "/Contactus"} />
        <meta
          name="description"
          content="Get in touch with ElixCode — we build custom software, ERP/CRM/BPMS, and QR/Barcode solutions for businesses."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </Head>

      <main className="container py-16 md:py-24">
        <h1 className="text-2xl md:text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 opacity-80 max-w-3xl">
          ElixCode builds custom software — web applications, ERP/CRM/BPMS
          systems, and QR/Barcode solutions designed for real-world business
          needs. You can reach us using any of the options below.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div className="card p-6">
            {/* Order instruction */}
            <div className="mb-6 rounded-xl border border-black/10 p-6 text-center">
              <h3 className="text-xl font-semibold tracking-tight">
                Request a Custom Project
              </h3>
              <p className="mt-2 text-base opacity-80 max-w-xl mx-auto">
                Tell us about your idea — whether it’s a business system, web
                app, or automation workflow. Our engineers will review it and
                reply with next steps and an estimate.
              </p>
              <a
                href={MAILTO_ORDER}
                className="inline-flex items-center justify-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-[var(--brand)] font-semibold text-black hover:opacity-90 transition">
                ✉️ <span>Send Project Request</span>
              </a>
              <div className="mt-3 text-sm opacity-70">
                or email us directly at{" "}
                <a
                  href={MAILTO_ORDER}
                  className="font-medium underline hover:text-[var(--brand)]">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            {/* Contact options */}
            <section className="p-6 rounded-xl border border-black/10 mt-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand)]" />
                Contact Options
              </div>

              <div className="mt-5 space-y-3">
                <a
                  href={MAILTO_ORDER}
                  className="flex items-center justify-between rounded-xl border border-black/10 px-4 py-3 transition hover:border-[var(--brand)]/50">
                  <span className="inline-flex items-center gap-2">
                    📨 <span className="font-medium">Order via Email</span>
                  </span>
                  <span className="text-sm opacity-80">Send Request</span>
                </a>

                <a
                  href={TEL_LINK}
                  className="flex items-center justify-between rounded-xl border border-black/10 px-4 py-3 transition hover:border-[var(--brand)]/50">
                  <span className="inline-flex items-center gap-2">
                    📞 <span className="font-medium">Call</span>
                  </span>
                  <span className="text-sm opacity-80">{DISPLAY_PHONE}</span>
                </a>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-[#25D366] px-4 py-3 font-semibold text-white transition hover:bg-[#1ebe5d]">
                  <span className="inline-flex items-center gap-2">
                    💬 <span>WhatsApp</span>
                  </span>
                  <span className="text-sm opacity-90">Open Chat</span>
                </a>

                <a
                  href={MAILTO}
                  className="flex items-center justify-between rounded-xl border border-black/10 px-4 py-3 transition hover:border-[var(--brand)]/50">
                  <span className="inline-flex items-center gap-2">
                    ✉️ <span className="font-medium">Email</span>
                  </span>
                  <span className="text-sm opacity-80">{CONTACT_EMAIL}</span>
                </a>
              </div>

              <div className="mt-6 text-sm opacity-80">
                <p>Prefer SMS or a missed call? We’ll get back to you.</p>
                <p className="mt-1">
                  Typical response time: 1–2 business days.
                </p>
              </div>
            </section>
          </div>

          <QRTool defaultUrl={origin + "/"} />
        </div>
      </main>
    </>
  );
}
