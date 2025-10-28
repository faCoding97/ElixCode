import React from "react";
import {
  FaPaperPlane,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaRocket,
} from "react-icons/fa"; // آیکون‌های جدید

type Props = {
  subject?: string;
  email?: string;
  phoneDisplay?: string;
  phoneDial?: string;
  whatsappNumber?: string;
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
  const mailBody = `...`; // بدون تغییر
  const MAILTO_ORDER = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(mailBody)}`;
  const WHATSAPP_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi ElixCode team, I’d like to discuss a project.\n— Project type:\n— Timeline:\n— Budget range:"
  )}`;

  return (
    <section className="card p-4 sm:p-5 md:p-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-[var(--brand)]/10">
          <FaRocket className="text-lg text-[var(--brand)]" />{" "}
          {/* آیکون جدید برای div */}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
            {ctaTitle}
          </h3>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base opacity-80">
            {ctaSubtitle}
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
            <a
              href={MAILTO_ORDER}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand)] text-white font-semibold px-4 py-2.5 hover:opacity-90 transition">
              <FaPaperPlane className="text-base" />
              Send Project Request
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white font-semibold px-4 py-2.5 hover:bg-[#1ebe5d] transition">
              <FaWhatsapp className="text-base" />
              WhatsApp
            </a>
            <a
              href={phoneDial}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-500 dark:border-green-500 px-4 py-2.5 hover:bg-[#b2e9b88c] transition">
              <FaPhone className="text-base" />
              Call <span className="opacity-80">{phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-500 dark:border-blue-500 px-4 py-2.5 hover:bg-[#c5e0f29d] transition">
              <FaEnvelope className="text-base" />
              Email <span className="opacity-80">{email}</span>
            </a>
          </div>

          <p className="mt-3 text-xs sm:text-sm opacity-70">
            Typical response time: 1–2 business days.
          </p>
        </div>
      </div>
    </section>
  );
}
