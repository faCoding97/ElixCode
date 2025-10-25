// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import posts from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ElixCode.com";

  const pages = ["", "/about-contact", "/blog", "/qr", "/portfolio"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(), // Date ok
      changeFrequency: "monthly" as const, // ← literal
      priority: 0.8,
    })
  );

  const blogPosts = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.date, // string (YYYY-MM-DD) ok
    changeFrequency: "weekly" as const, // ← literal
    priority: 0.6,
  }));

  return [...pages, ...blogPosts];
}
