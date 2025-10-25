import type { NextApiRequest, NextApiResponse } from "next";
import posts from "@/data/posts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const base = "https://elixcode.com";

  const staticUrls = [
    { loc: `${base}/`, changefreq: "monthly", priority: "0.9" },
    { loc: `${base}/about-contact`, changefreq: "monthly", priority: "0.8" },
    { loc: `${base}/blog`, changefreq: "weekly", priority: "0.7" },
    { loc: `${base}/qr`, changefreq: "monthly", priority: "0.6" },
    { loc: `${base}/portfolio`, changefreq: "monthly", priority: "0.7" },
  ];

  const blogUrls = posts.map((p) => ({
    loc: `${base}/blog/${p.slug}`,
    lastmod: p.date, // YYYY-MM-DD
    changefreq: "weekly",
    priority: "0.6",
  }));

  const urls = [...staticUrls, ...blogUrls];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map(
        (u) =>
          `<url>` +
          `<loc>${u.loc}</loc>` +
          (u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : "") +
          `<changefreq>${u.changefreq}</changefreq>` +
          `<priority>${u.priority}</priority>` +
          `</url>`
      )
      .join("") +
    `</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.status(200).send(xml);
}
