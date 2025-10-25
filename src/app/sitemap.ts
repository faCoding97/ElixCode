import type { MetadataRoute } from "next";
import posts from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://elixcode.com";

  const pages: MetadataRoute.Sitemap = [
    "",
    "/about-contact",
    "/blog",
    "/qr",
    "/portfolio",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blog: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date, // "YYYY-MM-DD"
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...pages, ...blog];
}
