// app/sitemap.ts
import { MetadataRoute } from "next";
import posts from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ElixCode.com";

  const pages = ["", "/about-contact", "/blog", "/qr", "/portfolio"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...pages, ...blogPosts];
}
