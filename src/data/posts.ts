export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  content: string;
};

const posts: Post[] = [
  {
    slug: "custom-software-port-elizabeth",
    title: "Custom Software in Port Elizabeth (Gqeberha): What SMEs Need",
    date: "2025-10-01",
    summary: "Why bespoke software beats one‑size‑fits‑all tools for businesses in Gqeberha.",
    content: `
**Local context matters.** SMEs in the Eastern Cape don't need a one-size-fits-all suite—they need adaptable systems that line up with actual workflows.\n\n
**What we deliver:** inventory accuracy, simple dashboards, and integration with the stack you already have.\n\n
**Bottom line:** bespoke apps cost less than you think and save more than you expect.
    `.trim()
  },
  {
    slug: "why-we-dont-use-cms",
    title: "Why We Don’t Use CMS: The Next.js Advantage",
    date: "2025-10-02",
    summary: "Next.js gives speed, security, and control—without plugin roulette.",
    content: `
**Static where possible, dynamic where it counts.** Pages render fast, stay secure, and integrate cleanly with your APIs.\n\n
**Fewer plugins, fewer surprises.** Exactly the features you want—no CMS bloat.
    `.trim()
  },
  {
    slug: "barcode-qr-inventory",
    title: "Barcode & QR for Inventory: Practical Workflows for SMEs",
    date: "2025-10-03",
    summary: "Simple, reliable QR/Barcode flows to keep stock accurate without drama.",
    content: `
From scannable shelf labels to batch operations: keep counts straight and sync in the background.\n\n
**Design for operators.** Big tap targets, offline-first logic, audit trails.
    `.trim()
  }
];

export default posts;
