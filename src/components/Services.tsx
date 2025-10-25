// src/components/Services.tsx
import { motion } from "framer-motion";

type Service = {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  blurb: string;
  badge?: string;
};

const services: Service[] = [
  {
    icon: <IconLightning />,
    title: "Websites & Online Stores",
    blurb:
      "Next.js storefronts, landing pages, and custom checkouts—fast, secure, and built to convert.",
    bullets: [
      "Next.js SSR/SSG for speed & SEO",
      "Custom checkout & payments",
      "No CMS bloat—own your stack",
    ],
    badge: "Next.js • SEO • Conversion",
  },
  {
    icon: <IconGrid />,
    title: "ERP / CRM / BPMS",
    blurb:
      "Role-based dashboards, clean workflows, and reports your team can trust.",
    bullets: [
      "Permissions & audit trails",
      "Offline-friendly UX",
      "Clear KPIs & exports",
    ],
    badge: "Ops • Finance • HR",
  },
  {
    icon: <IconScan />,
    title: "Barcode, QR & IoT",
    blurb:
      "Generate, label, and scan—linking warehouse, POS, and analytics without friction.",
    bullets: [
      "QR/Barcode pipelines",
      "Low-signal friendly",
      "POS/Inventory integrations",
    ],
    badge: "Inventory • Logistics",
  },
  {
    icon: <IconApi />,
    title: "Integrations & APIs",
    blurb:
      "REST/GraphQL, webhooks, and queues that keep data flowing reliably between your tools.",
    bullets: ["Idempotent endpoints", "Retries & DLQs", "Structured logging"],
    badge: "GraphQL • REST • MQ",
  },
  {
    icon: <IconDashboard />,
    title: "Admin Panels & Dashboards",
    blurb:
      "Operator-first UIs with clean tables, filters, and actions—no mystery clicks.",
    bullets: [
      "Role-aware controls",
      "Bulk ops & audit",
      "Exports without pain",
    ],
    badge: "UX • Data • Control",
  },
  {
    icon: <IconShield />,
    title: "Performance & Security",
    blurb:
      "We ship fast, safe defaults and measure what matters—before it hits production.",
    bullets: [
      "Image & cache strategy",
      "AuthZ/AuthN hardening",
      "Edge where it helps",
    ],
    badge: "Perf • Sec • Edge",
  },
];

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

        {/* Grid of services */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="
                group rounded-2xl border 
                border-black/10 dark:border-white/10 
                bg-[var(--surface)] 
                shadow-md hover:shadow-xl 
                transition-all duration-300 
                hover:-translate-y-1
                ">
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

                <ul className="mt-3 space-y-1.5 text-sm">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                      <span className="opacity-90">{b}</span>
                    </li>
                  ))}
                </ul>

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
              className="px-5 py-2.5 rounded-xl bg-[var(--brand)] text-black font-semibold hover:opacity-90 transition">
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

/* ---------- Small pieces ---------- */

function Stage({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-[var(--bg)]/60 px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
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
    <div
      className="
      rounded-2xl border border-black/10 dark:border-white/10
      bg-[var(--surface)] p-5 shadow-md
      ">
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

/* ---------- Minimal inline icons (no deps) ---------- */

function IconLightning() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M13 2L3 14h7l-1 8 11-12h-7l0-8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        d="M3 7V5a2 2 0 0 1 2-2h2"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M17 3h2a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M21 17v2a2 2 0 0 1-2 2h-2"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M7 21H5a2 2 0 0 1-2-2v-2"
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
        d="M12 3l8 4v6c0 4.418-3.582 7-8 8-4.418-1-8-3.582-8-8V7l8-4z"
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
