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
    slug: "aitechac",
    title: "AiTech AC",
    description:
      "Product/service microsite with modern sections and appointment CTAs.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Microsite", "QR"],
    content:
      "Lightweight landing and service pages with fast navigation, FAQs, and QR-to-WhatsApp/contact for quick leads.",
    link: "https://aitechac.com",
    metrics: { ttfbMs: 942, rating: "OK" },
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
    slug: "erp-platform",
    title: "ERP Platform (Modular)",
    description: "Modular ERP for inventory, HR/attendance, and finance.",
    tags: ["Next.js", "Tailwind", "TypeScript", "ERP", "Dashboard", "QR"],
    content:
      "Role-based permissions, multi-tenant setup, audit trails, and QR-assisted stock moves; built for incremental rollout.",
    link: "https://erp.elixflare.com",
    metrics: { ttfbMs: 1899, rating: "Slow" },
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
  {
    slug: "elixcode-site",
    title: "ElixCode — Company Website",
    description:
      "Clean, fast company site with clear service pages and contact funnels.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Company", "QR"],
    content:
      "Service breakdowns, case studies, and CTA-driven sections with QR entry points to portfolio and contacts.",
    link: "https://elixcode.com",
    metrics: { ttfbMs: 81, rating: "Fast" },
  },
];

export default projects;
