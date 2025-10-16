export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
};

const projects: Project[] = [
  {
    slug: "inventory-qr-suite",
    title: "Inventory QR Suite",
    description: "QR-based inventory and warehouse flow for SMEs, with offline scanning and sync.",
    tags: ["Next.js","TypeScript","QR","Inventory"],
    content: "End-to-end QR-based flows, offline support, warehouse scanning, error-tolerant syncing."
  },
  {
    slug: "erp-lite",
    title: "ERP Lite",
    description: "Modular ERP for HR/Attendance/Finance with dashboards and audit trails.",
    tags: ["React","Node","PostgreSQL","ERP"],
    content: "Role-based permissions, multi-tenant support, auditable actions, reporting modules."
  },
  {
    slug: "custom-checkout",
    title: "Custom Checkout",
    description: "Headless e‑commerce checkout built with Next.js for sub‑second TTFB.",
    tags: ["Next.js","Edge","Payments"],
    content: "Edge-rendered pages, stripe-like integrations, fraud checks, ultra-fast TTFB."
  },
  {
    slug: "analytics-pipeline",
    title: "Analytics Pipeline",
    description: "Event ingestion & processing with clean, privacy‑safe dashboards.",
    tags: ["ETL","Analytics","Privacy"],
    content: "Server-side event processing, anonymization, export to BI tools, clean dashboards."
  }
];

export default projects;
