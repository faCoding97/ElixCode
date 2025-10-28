// src/components/Services.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";

/* -------------------- Types -------------------- */
type Service = {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  blurb: string;
  badge?: string;
};

/* -------------------- Data -------------------- */
const services: Service[] = [
  {
    icon: <IconSparkles />,
    title: "AI & Machine Learning Solutions",
    blurb:
      "From 24/7 smart assistants to forecasting and vision—high-impact AI, engineered for minimal cost.",
    bullets: [
      "24/7 AI chatbot under $10/month",
      "Custom models on your data (no pricey servers)",
      "Integrations: OpenAI, Gemini, Llama, etc.",
      "Analytics, predictions & automation",
      "RAG & fine-tuning for your domain",
    ],
    badge: "AI • Low-cost • High-impact",
  },
  {
    icon: <IconGrid />,
    title: "BPMS / CRM / ERP",
    blurb:
      "Role-based dashboards, clean workflows, and auditable reports—from inventory & finance to HR.",
    bullets: [
      "RBAC + audit trails",
      "BPMN approvals & SLAs",
      "Offline-first PWA & mobile scanners",
      "Realtime (WS/SSE) dashboards",
      "KPIs, PDF/Excel exports",
      "Multi-tenant & row-level security",
      "Integrations: SAP, Shopify, Stripe, Slack",
      "QR/Barcode moves & label printing",
      "Observability: Sentry + OpenTelemetry",
      "AI copilot (natural-language search, RAG)",
    ],
    badge: "Ops • Finance • HR",
  },
  {
    icon: <IconLightning />,
    title: "Websites & Online Stores",
    blurb:
      "Next.js storefronts, landings, and custom checkouts—fast, secure, and built to convert.",
    bullets: [
      "SSR/SSG for speed & SEO",
      "Custom checkout & payments",
      "Own your stack—no CMS bloat",
      "100/100 Lighthouse target",
    ],
    badge: "Next.js • SEO • Conversion",
  },
  {
    icon: <IconScan />,
    title: "Barcode, QR & IoT",
    blurb:
      "Generate, label, scan—connect warehouse, POS, and analytics without friction.",
    bullets: [
      "QR/Barcode pipelines",
      "Low-signal friendly (BLE/LoRa/MQTT)",
      "POS & inventory integrations",
      "Label templates (ZPL/PDF)",
    ],
    badge: "Inventory • Logistics",
  },
  {
    icon: <IconApi />,
    title: "Integrations & APIs",
    blurb:
      "REST/GraphQL, webhooks, and queues—data that flows reliably between your tools.",
    bullets: [
      "Idempotent endpoints",
      "Retries & DLQs",
      "Structured logging",
      "AuthN/AuthZ hardening",
    ],
    badge: "GraphQL • REST • MQ",
  },
  {
    icon: <IconDashboard />,
    title: "Admin Panels & Dashboards",
    blurb:
      "Operator-first UIs with clear tables, filters, and bulk actions—no mystery clicks.",
    bullets: ["Role-aware controls", "Bulk ops & audit", "No-pain exports"],
    badge: "UX • Data • Control",
  },
  {
    icon: <IconShield />,
    title: "Performance & Security",
    blurb:
      "Ship fast with safe defaults—measure what matters before it hits production.",
    bullets: [
      "Image & cache strategy",
      "Edge where it helps",
      "Zero-downtime deploys",
      "OWASP-aware hardening",
    ],
    badge: "Perf • Sec • Edge",
  },
];

/* -------------------- Small building blocks -------------------- */
function Stage({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-[var(--bg)]/60 px-3 py-1">
      <span className="mt-[1px] inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
      {label}
    </span>
  );
}
function StageArrow() {
  return (
    <span aria-hidden className="opacity-50">
      →
    </span>
  );
}

function ModelCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-[var(--surface)] p-5 shadow-md">
      <div className="text-sm opacity-70">Engagement</div>
      <h4 className="text-lg font-semibold mt-1">{title}</h4>
      <ul className="mt-2 space-y-1.5 text-sm">
        {lines.map((l) => (
          <li key={l} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
            <span className="opacity-90">{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Collapsible bullets: کوتاه‌سازی پیش‌فرض به 3 آیتم + Show more/less */
function Bullets({ items, max = 3 }: { items: string[]; max?: number }) {
  const [open, setOpen] = React.useState(false);
  const shown = open ? items : items.slice(0, max);
  const extra = Math.max(0, items.length - shown.length);

  return (
    <>
      <ul className="mt-3 space-y-1.5 text-sm">
        <AnimatePresence initial={false}>
          {shown.map((b) => (
            <motion.li
              key={b}
              className="flex items-start gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}>
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
              <span className="opacity-90">{b}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {extra > 0 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-2 text-[12px] underline opacity-80 hover:opacity-100"
          aria-expanded={open}>
          {open ? "Show less" : `Show ${extra} more…`}
        </button>
      )}
    </>
  );
}

/* -------------------- Main -------------------- */
export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl">
          <div className="text-sm opacity-70">What we do</div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand)] to-emerald-400/70 dark:to-amber-300/70">
              Our Services
            </span>
          </h2>
          <p className="mt-2 opacity-90">
            Software engineered around your business—no templates, no plugin
            roulette. Just clean systems that ship and scale.
          </p>
        </motion.header>

        {/* Process strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-6 rounded-2xl border border-black/10 dark:border-white/10 bg-[var(--surface)] p-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Stage label="Discovery" />
            <StageArrow />
            <Stage label="Design" />
            <StageArrow />
            <Stage label="Build" />
            <StageArrow />
            <Stage label="Integrate" />
            <StageArrow />
            <Stage label="Ship" />
            <StageArrow />
            <Stage label="Support" />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group rounded-2xl border border-black/10 dark:border-white/10 bg-[var(--surface)] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="h-11 w-11 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center bg-[var(--bg)]/60">
                    {s.icon}
                  </div>
                  {s.badge && (
                    <span className="text-[11px] px-2 py-1 rounded-full border border-black/10 dark:border-white/10 bg-[var(--bg)]/60">
                      {s.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 opacity-90">{s.blurb}</p>

                {/* SHORT bullets with Show more */}
                <Bullets items={s.bullets} max={3} />

                <div className="mt-4 flex items-center justify-between">
                  <a
                    href="#portfolio"
                    className="text-sm underline opacity-80 hover:opacity-100">
                    See examples →
                  </a>
                  <a
                    href="/about-contact"
                    className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    Request a quote
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Engagement models */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10 grid md:grid-cols-3 gap-6">
          <ModelCard
            title="Fixed-scope"
            lines={[
              "Clear brief → fixed price",
              "Milestone billing",
              "Great for well-defined apps",
            ]}
          />
          <ModelCard
            title="Retainer"
            lines={[
              "Monthly capacity",
              "Prioritized roadmap",
              "Great for evolving products",
            ]}
          />
          <ModelCard
            title="Audit & Tune"
            lines={[
              "Perf/Sec audit",
              "Hands-on fixes",
              "Reports you can act on",
            ]}
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mt-10 rounded-2xl border border-black/10 dark:border-white/10 p-6 text-center bg-[var(--bg)]/60">
          <h3 className="text-xl font-semibold">
            Ready to build something that lasts?
          </h3>
          <p className="mt-1 opacity-80">
            Tell us what you need—timeline, constraints, and goals. We’ll map a
            path that actually ships.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/about-contact"
              className="px-5 py-2.5 rounded-xl bg-[var(--brand)] text-white font-semibold hover:opacity-90 transition">
              Start a project
            </a>
            <a
              href="#portfolio"
              className="px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-[var(--surface)] transition">
              View case studies
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- Minimal inline icons (no deps) -------------------- */
function IconLightning() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M13 2 3 14h7l-1 8 11-12h-7V2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconSparkles() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden fill="none">
      <circle cx="6" cy="6" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="6" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6 6L12 12M18 6L12 12M6 12L12 12M18 12L12 12M6 18L12 12M18 18L12 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  );
}
function IconScan() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="7"
        y="9"
        width="10"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  );
}
function IconApi() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <circle
        cx="6"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <circle
        cx="18"
        cy="6"
        r="3"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <circle
        cx="18"
        cy="18"
        r="3"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M8.5 10.5 15.5 7.5M8.5 13.5 15.5 16.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function IconDashboard() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M4 4h16v16H4z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path d="M4 10h16M10 4v16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3 20 7v6c0 4.418-3.582 7-8 8-4.418-1-8-3.582-8-8V7l8-4z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
