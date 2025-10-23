export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  content: string;
};

const posts: Post[] = [
  {
    slug: "custom-software-gqeberha-erp-crm-bpms",
    title: "Custom Software in Gqeberha: ERP/CRM/BPMS That Fit Your Ops",
    date: "2025-10-23",
    summary:
      "Why SMEs in Port Elizabeth (Gqeberha) benefit from tailored ERP/CRM/BPMS with clear dashboards, roles, and offline-first UX.",
    content: `
**Local operations ≠ generic software.** Teams in the Eastern Cape need systems that reflect how they actually work—approvals, shifts, and inventory moves.

**What we build:** modular **ERP/CRM/BPMS** with role-based access, audit trails, and simple dashboards. We connect to tools you already use, then automate the boring parts.

**Results we aim for:** fewer stock errors, faster approvals, and cleaner reports your team can trust.
    `.trim(),
  },
  {
    slug: "qr-barcode-inventory-to-pos",
    title: "QR & Barcode: From Warehouse to POS Without Friction",
    date: "2025-10-22",
    summary:
      "Practical QR/Barcode workflows for stock, receiving, and sales—built for low-signal environments and quick training.",
    content: `
**Designed for operators.** Big tap targets, readable fonts, and offline-first logic. Scan shelf labels, pallets, or item stickers—even when Wi-Fi drops.

**End-to-end flow:** generate codes → label → scan (move/adjust/count) → sync → audit.  
**Integrations:** inventory, POS, and reporting—so counts match reality.
    `.trim(),
  },
  {
    slug: "frontends-that-perform",
    title: "Fast Frontends, Clear Control: Why We Use Next.js",
    date: "2025-10-21",
    summary:
      "A practical approach to speed, security, and maintainability with Next.js—static where possible, dynamic where it counts.",
    content: `
**Speed by design.** Pages render fast and stay stable with smart caching and edge rendering where it helps.

**Security & control.** Fully owned UI, fewer moving parts, and clean API boundaries. We integrate with your services without plugin roulette.

**Outcome:** predictable performance, easier upgrades, and a codebase your team can actually extend.
    `.trim(),
  },
  {
    slug: "systems-that-talk-apis-integrations",
    title: "Systems That Talk: Robust APIs & Integrations for Growth",
    date: "2025-10-20",
    summary:
      "REST/GraphQL APIs, webhooks, and queues that keep data flowing reliably between your tools.",
    content: `
**Connect your stack.** CRM ↔ ERP, storefront ↔ checkout, inventory ↔ analytics. We design APIs and event flows that scale without surprises.

**Built-in observability.** Retries, dead-letter queues, and clear logs—so ops teams can see what's happening and why.
    `.trim(),
  },
  {
    slug: "portfolio-highlights-elixflare",
    title: "Portfolio Highlights: Real-World Sites, Scan-Ready",
    date: "2025-10-19",
    summary:
      "A quick look at recent builds—salon, restaurant (QR menu), real estate listings, academy, and more.",
    content: `
**What you'll see:** clear information architecture, fast navigation, and **QR flows** for instant access.

- **Salon** — services, pricing, map embed, and booking.
- **Restaurant (QR menu)** — scannable categories and specials.
- **Real Estate** — listings, neighborhood filters, and quick inquiries.
- **Academy** — course catalog with direct QR to **/courses**.
- **ERP/Inventory** — role-aware dashboards and scan-to-move stock.

**Goal:** useful, production-ready sites that your team and users understand in seconds.
    `.trim(),
  },
  {
    slug: "performance-security-checklist",
    title: "Our Performance & Security Checklist for Production Apps",
    date: "2025-10-18",
    summary:
      "What we check before launch: caching, profiling, access control, and safe defaults.",
    content: `
**Performance:** image strategy, code-splitting, cache headers, and edge where it helps.  
**Security:** roles/permissions, input validation, CSRF/CORS, and secret management.  
**Reliability:** health checks, structured logs, and graceful fallbacks.

**Result:** apps that hold up under real-world conditions—fast, stable, and protected.
    `.trim(),
  },
];

export default posts;
