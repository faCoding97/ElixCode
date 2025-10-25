import React from "react";

type Props = {
  subject?: string;
  email?: string; // fallback: elixcode@outlook.com
  phoneDisplay?: string; // "+27 72 933 0166"
  phoneDial?: string; // "tel:+27729330166"
  whatsappNumber?: string; // "27729330166"
  ctaTitle?: string;
  ctaSubtitle?: string;
};

export default function RequestProjectCard({
  subject = "New Project Request — ElixCode",
  email = "elixcode@outlook.com",
  phoneDisplay = "+27 72 933 0166",
  phoneDial = "tel:+27729330166",
  whatsappNumber = "27729330166",
  ctaTitle = "Request a Custom Project",
  ctaSubtitle = "Tell us about your idea — web app, ERP/CRM/BPMS, or QR/Barcode. We’ll review and reply with next steps and an estimate.",
}: Props) {
  const mailBody = `Hello ElixCode Team,

I'd like to request a custom software project. Please find my details below:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 Company / Name:
🌍 Website / Domain (if any):
📞 Phone / WhatsApp:
📧 Email Address:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧩 Project Type:
(ERP / CRM / BPMS / Web App / QR-Barcode / E-Commerce / Admin Dashboard / Automation / Integration / Other)

🧠 Project Summary:
(A short description of what you need and what problem it solves)

⚙️ Key Features & Requirements:
• 
• 
• 

🎨 Design Preferences:
(Modern / Minimal / Corporate / Dark / Light / Custom)

💡 Brand Identity:
• Slogan / tagline:
• Logo file (attach if available):
• Brand colors or style guide:

🕒 Expected Timeline:
(Desired start & completion)

💰 Budget Range:
(Approximate or confirmed budget)

🔗 References:
(Example sites/systems you like)

📍 Location:
(City / Country)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please reply with:
• Estimated cost or pricing model
• Development timeline
• Any questions before starting

Thank you,
[Your Name]
[Your Company / Position]
[Date]`;

  const MAILTO_ORDER =
    `mailto:${email}?subject=${encodeURIComponent(subject)}&body=` +
    encodeURIComponent(mailBody);

  const WHATSAPP_LINK =
    `https://wa.me/${whatsappNumber}?text=` +
    encodeURIComponent(
      "Hi ElixCode team, I’d like to discuss a project.\n— Project type:\n— Timeline:\n— Budget range:"
    );

  return (
    <section className="card p-5 sm:p-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10"></div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
            {ctaTitle}
          </h3>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base opacity-80">
            {ctaSubtitle}
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={MAILTO_ORDER}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand)] text-black font-semibold px-4 py-2.5 hover:opacity-90 transition">
              ✉️ Send Project Request
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white font-semibold px-4 py-2.5 hover:bg-[#1ebe5d] transition">
              💬 WhatsApp
            </a>
            <a
              href={phoneDial}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-4 py-2.5 hover:bg-[var(--surface)] transition">
              📞 Call <span className="opacity-80">{phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-4 py-2.5 hover:bg-[var(--surface)] transition">
              📨 Email <span className="opacity-80">{email}</span>
            </a>
          </div>

          <p className="mt-3 text-xs opacity-70">
            Typical response time: 1–2 business days.
          </p>
        </div>
      </div>
    </section>
  );
}
