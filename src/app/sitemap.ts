import type { MetadataRoute } from "next";
import posts from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://elixcode.com"; // Already good, lowercase.

  const pages: MetadataRoute.Sitemap = [
    "",
    "/about-contact",
    "/blog",
    "/qr",
    "/portfolio",
    "/portfolio/aitechac",
    "/portfolio/clinic",
    "/portfolio/anreanvari-portfolio",
    "/portfolio/hair-international",
    "/portfolio/restaurant-template",
    "/portfolio/erp-platform",
    "/portfolio/coffee-shop",
    "/portfolio/woodwork-carpentry",
    "/portfolio/academy",
    "/portfolio/club",
    "/portfolio/home-appliances",
    "/portfolio/furniture",
    "/portfolio/clinic",
    "/portfolio/real-estate",
    "/portfolio/travel-agency",
    "/portfolio/inventory-qr-suite",
    "/portfolio/elixcode-site",
    "/portfolio/analytics-pipeline",
    "/portfolio/custom-checkout",
    "/blog/website-ai-and-qr-digital-growth",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(), // Keeps it dynamic for static pages
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blog: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date), // Convert string to Date for consistency (handles "YYYY-MM-DD")
    changeFrequency: "weekly" as const,
    priority: 0.7, // Slight increase to emphasize blog for SEO content strategy
  }));

  return [...pages, ...blog];
}
