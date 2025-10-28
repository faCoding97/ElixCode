// src/data/projects.ts

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
  link?: string; // لینک لایو
  metrics?: {
    ttfbMs?: number; // زمان پاسخ اولیه (میلی‌ثانیه)
    rating?: "Fast" | "OK" | "Slow";
  };
};

const projects: Project[] = [
  {
    slug: "elixcode-site",
    title: "ElixCode — Smart Systems, Built for the Future",
    description:
      "AI-powered digital systems, custom web apps, and automation dashboards — all crafted for performance, scalability, and trust.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "AI Systems",
      "LLMs",
      "Chatbots",
      "RAG",
      "Computer Vision",
      "Stable Diffusion",
      "Agents",
      "Automation",
      "ERP",
      "CRM",
      "BPMS",
      "IoT",
      "Edge AI",
      "Barcode",
      "QR Code",
      "APIs",
      "GraphQL",
      "REST",
      "Admin Panels",
      "Dashboards",
      "Performance",
      "Security",
      "Docker",
      "MLOps",
      "DevOps",
      "Vercel",
      "Cloudflare",
      "AI Projects",
    ],
    content: `
ElixCode — We Build What Others Only Promise

Welcome to ElixCode, where code meets intelligence.  
We design and build next-generation systems that combine web technology, automation, and AI — turning ideas into scalable, high-performance solutions.

---

🤖 AI Systems & Automation
- AI Agents that think, search, and act autonomously  
- Custom fine-tuned LLMs and RAG pipelines on your data  
- Computer Vision (YOLO, SAM2) for real-time detection  
- Voice + Multimodal AI (GPT-4o, Whisper, TTS)  
- Edge AI deployments on mobile, Raspberry Pi, ESP32  

AI isn’t an add-on — it’s built into the foundation of everything we create.

---

💻 Web Apps & Online Platforms
- Next.js 14 (App Router) — SSG, SSR, ISR ready  
- Ultra-fast landing pages and eCommerce flows  
- Custom checkouts, CMS-free content, and API-first design  
- 100/100 Lighthouse performance guarantee  

From a single-page microsite to enterprise portals — all built for speed and reliability.

---

🧩 ERP / CRM / BPMS Dashboards
- Role-based dashboards with full audit trails  
- Workflow automation, smart approvals, notifications  
- Real-time KPIs and exportable analytics (PDF, Excel, API)  
- Offline-first PWA capabilities for field teams  

We turn manual processes into smart, traceable systems.

---

🔗 IoT & Hardware Integration
- Barcode + QR workflows (generate, scan, sync)  
- POS and inventory synchronization  
- IoT telemetry (BLE, LoRa, MQTT)  
- Real-time dashboards and control panels  

Your physical business, fully connected to the digital world.

---

⚙️ APIs & Integrations
- GraphQL & REST — idempotent, secure, scalable  
- Webhooks + queues (Redis, BullMQ)  
- 3rd-party integrations: SAP, Shopify, Google, Slack, etc.  
- Custom automation pipelines & data bridges  

Everything works together — seamlessly.

---

🔒 Performance & Security
- Edge CDN delivery (Vercel + Cloudflare)  
- Secure Auth (RBAC, JWT, OAuth2)  
- Optimized assets (WebP, AVIF, lazy-load)  
- Zero-downtime CI/CD with rollback safety  

Every build is production-ready, every deployment is bulletproof.

---

👥 Our Team
- AI engineers and full-stack developers  
- Experts in scalable systems and automation  
- No middle layers — direct access to the people who build  
- We deliver. Period.  

---

🚀 Our Process
1. You tell us what you need  
2. We scope and quote — fast and fixed  
3. We build, demo weekly, and iterate transparently  
4. You launch with confidence — docs, monitoring, and support included  

---

ElixCode — Smarter Systems. Real Results.

Your idea, engineered for performance, powered by AI.
  `.trim(),
    link: "https://elixcode.com",
    metrics: { ttfbMs: 81, rating: "Fast" },
  },
  {
    slug: "aitechac",
    title: "AiTech AC",
    description:
      "AI Academy & Innovation Lab — in partnership with ElixCode. Together, we design and deploy next-generation AI systems for real businesses.",
    tags: [
      "AI Projects",
      "Generative AI",
      "LLMs",
      "Computer Vision",
      "AI Agents",
      "Automation",
      "RAG",
      "Edge AI",
      "Fine-Tuning",
    ],
    content: `
AiTech AC × ElixCode — Building the Future with AI

We collaborate with AiTech AC to bring cutting-edge artificial intelligence to real-world use.  
From training models to full-scale deployment, we deliver practical AI solutions for companies and creators alike.

🤖 What We Build
- AI chat systems & virtual assistants  
- Image, voice, and document intelligence  
- Data analysis & automation agents  
- Generative tools for content, design, and media  
- Private & on-device AI for local businesses  

💡 Our Mission
Make AI accessible, affordable, and effective —  
helping every business grow smarter with minimal cost and maximum impact.

🚀 Collaborate With Us
Whether you need a chatbot, custom model, or AI-powered web system,  
ElixCode and AiTech AC are ready to build it — fast, scalable, and production-ready.

→ Visit: [aitechac.com](https://aitechac.com)  
→ Contact: ElixCode — AI-Driven Solutions for the Modern Web.
  `.trim(),
    link: "https://aitechac.com",
    metrics: { ttfbMs: 942, rating: "OK" },
  },
  {
    slug: "bpms-erp-platform",
    title: "BPMS & ERP Platform (Modular, Workflow-Driven)",
    description:
      "Modular BPMS + ERP Suite for inventory, HR/attendance, finance, and workflow automation — built for incremental rollout and real-time operations.",
    tags: [
      // Frontend
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "PWA",
      "SSR/SSG/ISR",
      // Backend (pick-one or mix)
      "Node.js",
      "NestJS",
      "Express",
      "Fastify",
      // Workflow / BPMS
      "BPMN 2.0",
      "Camunda",
      "Temporal",
      "n8n",
      "Zeebe",
      // Data Layer
      "PostgreSQL",
      "Prisma",
      "Redis",
      "S3-Object-Storage",
      // Messaging & Jobs
      "BullMQ",
      "Redis Streams",
      "Kafka",
      "RabbitMQ",
      // Realtime
      "WebSocket",
      "Server-Sent Events",
      // APIs
      "REST",
      "GraphQL",
      "tRPC",
      "Webhooks",
      // Auth & Security
      "Auth.js",
      "Keycloak",
      "RBAC",
      "ABAC",
      "JWT",
      "OAuth2/OIDC",
      // DevOps
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "Kubernetes",
      // Edge & Delivery
      "Vercel",
      "Cloudflare",
      "CDN",
      // Observability
      "Sentry",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      // Reporting
      "PDF/Excel Exports",
      "Metabase",
      "Apache Superset",
      // AI (optional)
      "LLMs",
      "RAG",
      "Fine-Tuning",
      "AI Agents",
      // CV/Scanning
      "Barcode",
      "QR Code",
      "ZXing",
      "jsQR",
      // Integrations
      "Stripe",
      "PayPal",
      "SAP",
      "Shopify",
      "Google",
      "Slack",
    ],
    content: `
What It Is
A modular BPMS + ERP stack that unifies core operations (Inventory, HR/Attendance, Finance) with a workflow engine (BPMN) for approvals, SLAs, and auditable processes. Designed for staged rollout, multi-tenant setups, and real-time dashboards.

---

 Core Modules
- Inventory & Stock — SKUs, batches, locations, QR/Barcode moves, cycle counts  
- HR & Attendance — shifts, leave, timesheets, biometric/device integrations  
- Finance & Billing — invoices, payments, cost centers, export to accounting  
- Procurement & Sales — RFQs/POs/SOs, vendor/customer management  
- Workflow (BPMS) — BPMN-driven approvals, tasks, escalations, SLAs, audit trail  
- Reporting — KPI dashboards, PDF/Excel exports, scheduled emails/webhooks

---

 Architecture
- Frontend: Next.js (App Router), React 18, TypeScript, Tailwind, PWA, SSR/SSG/ISR  
- Backend: Node.js + NestJS/Fastify (typed DTOs, DI, modular), REST/GraphQL/tRPC  
- Workflow/BPMS: Camunda/Zeebe or Temporal for long-running, reliable workflows  
- Data: PostgreSQL (+ Prisma), Redis (cache/locks/queues), S3-compatible object storage  
- Messaging/Jobs: BullMQ (job queues), Redis Streams / Kafka for event pipelines  
- Realtime: WebSocket/SSE channels for live tables, notifications, approvals  
- Auth & Security: Auth.js/Keycloak (OIDC), RBAC/ABAC, JWT rotation, per-tenant scoping  
- Files & Docs: S3 uploads, server-side PDF generation, signed URLs  
- Observability: OpenTelemetry traces, Sentry (errors), Prometheus + Grafana (metrics)  
- DevOps: Dockerized services, GitHub Actions CI/CD, preview deploys, zero-downtime releases  
- Edge & Delivery: Vercel/Cloudflare for global routing, CDN, image optimization

---

 QR/Barcode & Devices
- QR/Barcode for stock moves, picking/packing, asset tags  
- Web Scanner (ZXing/jsQR) on mobile PWA — no native app needed  
- Label Printing (ZPL/PDF) with batch templates and reprint history

---

 AI-Assist (Optional)
- LLM copilots for search (“find POs awaiting approval”), anomaly hints, and summaries  
- RAG on your operational data for natural-language analytics  
- Agents that propose next steps (e.g., auto-creating a replenishment PO)

---

 Governance & Compliance
- Multi-tenant isolation, row-level security patterns  
- Audit trails, signature logs, immutable event history  
- Data retention policies, backup/restore runs, DR plans

---

 Why It Wins
- Incremental rollout (module by module) with zero vendor lock-in  
- Visible ROI — faster approvals, fewer errors, real-time stock truth  
- Admin-friendly — schema-driven forms, role-based views, self-serve reports
  `.trim(),
    link: "https://erp.elixflare.com",
    metrics: { ttfbMs: 1899, rating: "Slow" },
  },
  {
    slug: "anreanvari-portfolio",
    title: "Anre Anvari — Portfolio",
    description: "Personal portfolio with projects, bio, and contact via QR.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Portfolio", "QR"],
    content:
      "Showcases work highlights, skills, and contact routes; QR codes simplify sharing and mobile access.",
    link: "https://anreanvari.elixflare.com",
    metrics: { ttfbMs: 89, rating: "Fast" },
  },
  {
    slug: "hair-international",
    title: "Hair International & Beauty",
    description:
      "Salon website with services, pricing, map embed, and booking.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Salon", "QR"],
    content:
      "Service lists, gallery, Google Maps embed, and QR flows to bookings and promos; optimized for mobile visitors.",
    link: "https://hairinternational.elixflare.com",
    metrics: { ttfbMs: 104, rating: "Fast" },
  },
  {
    slug: "restaurant-template",
    title: "Restaurant — QR Menu",
    description: "QR-powered restaurant site with digital menu and specials.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Restaurant", "QR"],
    content:
      "Scannable menus, category filtering, and promo sections; QR deep-links for table-side ordering or menu browsing.",
    link: "https://restaurant.elixflare.com",
    metrics: { ttfbMs: 793, rating: "OK" },
  },

  {
    slug: "coffee-shop",
    title: "Coffee Shop — Brand Site",
    description: "Minimal brand site with menu, gallery, and location.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Cafe", "QR"],
    content:
      "Mobile-first menu pages, hours, and map links; QR posters route customers directly to seasonal items.",
    link: "https://coffeeshop.elixflare.com",
    metrics: { ttfbMs: 87, rating: "Fast" },
  },
  {
    slug: "woodwork-carpentry",
    title: "Woodwork & Carpentry",
    description:
      "Craftsmanship showcase with materials, finishes, and gallery.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Carpentry", "QR"],
    content:
      "Project galleries, inquiry forms, and QR codes to catalogs and finish guides; SEO-structured product info.",
    link: "https://woodwork.elixflare.com",
    metrics: { ttfbMs: 1171, rating: "OK" },
  },
  {
    slug: "academy",
    title: "ElixFlare Academy",
    description: "Courses/catalog site with QR access to course list.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Education", "QR"],
    content:
      "JSON-driven course catalog, clean light theme, and QR deep-link to /courses for quick enrollment paths.",
    link: "https://academy.elixflare.com",
    metrics: { ttfbMs: 1057, rating: "OK" },
  },
  {
    slug: "club",
    title: "Club — Community Site",
    description: "Community/club presence with events and membership.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Community", "QR"],
    content:
      "Events, announcements, and membership CTAs; QR-based sign-up at physical venues for faster onboarding.",
    link: "https://club.elixflare.com",
    metrics: { ttfbMs: 1343, rating: "Slow" },
  },
  {
    slug: "clinic",
    title: "Medical Clinic",
    description: "Modern clinic site with services, doctors, and appointments.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Healthcare", "QR"],
    content:
      "Doctor profiles, service pages, and appointment routing; QR codes on flyers take patients straight to booking.",
    link: "https://clinic.elixflare.com",
    metrics: { ttfbMs: 1140, rating: "OK" },
  },
  {
    slug: "furniture",
    title: "Furniture & Interiors",
    description: "Product gallery for premium home collections.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Furniture", "QR"],
    content:
      "Collections, specs, and price highlights with QR-to-catalog links; performance-focused image rendering.",
    link: "https://furniture.elixflare.com",
    metrics: { ttfbMs: 315, rating: "OK" },
  },
  {
    slug: "home-appliances",
    title: "Home Appliances",
    description: "Category-first brochure for appliances with quick browse.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Retail", "QR"],
    content:
      "Category landing, product highlights, and support info; QR flows from packaging to product pages and manuals.",
    link: "https://homeappliances.elixflare.com",
    metrics: { ttfbMs: 1224, rating: "Slow" },
  },
  {
    slug: "real-estate",
    title: "Real Estate — Listings",
    description: "Property listings with filters, maps, and quick inquiries.",
    tags: ["Next.js", "Tailwind", "TypeScript", "RealEstate", "QR"],
    content:
      "Neighborhood sections, feature cards, and QR codes on print banners linking to each property’s detail page.",
    link: "https://estate.elixflare.com",
    metrics: { ttfbMs: 261, rating: "Fast" },
  },
  {
    slug: "travel-agency",
    title: "Travel Agency",
    description: "Tours and destinations with itinerary highlights.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Travel", "QR"],
    content:
      "Tour cards, pricing bands, and FAQ; QR codes connect offline ads to specific tour pages and checkout flows.",
    link: "https://travel.elixflare.com",
    metrics: { ttfbMs: 1255, rating: "Slow" },
  },
  {
    slug: "inventory-qr-suite",
    title: "Inventory QR Suite",
    description:
      "QR-based inventory and warehouse flow for SMEs, with offline scanning and sync.",
    tags: ["Next.js", "TypeScript", "QR", "Inventory"],
    content:
      "End-to-end QR flows, offline-first scanning, error-tolerant syncing, and role-aware task screens.",
  },
  {
    slug: "custom-checkout",
    title: "Custom Checkout",
    description:
      "Headless e-commerce checkout built with Next.js for sub-second TTFB.",
    tags: ["Next.js", "Edge", "Payments", "Checkout", "QR"],
    content:
      "Edge-rendered steps, payment integrations (Stripe-like), fraud checks, and QR deep-links to prefilled carts.",
  },
  {
    slug: "analytics-pipeline",
    title: "Analytics Pipeline",
    description:
      "Event ingestion & processing with clean, privacy-safe dashboards.",
    tags: ["ETL", "Analytics", "Privacy", "Dashboards"],
    content:
      "Server-side event processing, anonymization, exports to BI, and executive dashboards with guardrails.",
  },
  // می‌تونی این دو تا رو هم اضافه کنی اگر خواستی:
];

export default projects;
