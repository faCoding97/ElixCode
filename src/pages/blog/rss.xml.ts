// src/pages/blog/rss.xml.ts
import type { GetServerSideProps } from "next";
import posts from "@/data/posts";

const SITE = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";
const FEED_URL = `${SITE}/blog/rss.xml`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // مرتب‌سازی نزولی بر اساس تاریخ
  const sorted = [...posts].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );

  const lastBuildDate = toRssDate(sorted[0]?.date ?? "2025-01-01");
  const items = sorted
    .map((p) => {
      const url = `${SITE}/blog/${p.slug}`;
      const descText = stripHtml(p.summary || "");
      const cats = (p as any).tags?.length
        ? (p as any).tags
            .map((t: string) => `<category>${escapeXml(t)}</category>`)
            .join("")
        : "";
      const author = (p as any).authorEmail
        ? `<author>${escapeXml((p as any).authorEmail)} (${escapeXml(
            (p as any).authorName || "ElixCode"
          )})</author>`
        : "";

      return `
<item>
  <title>${escapeXml(p.title)}</title>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${toRssDate(p.date)}</pubDate>
  ${author}
  ${cats}
  <description><![CDATA[${descText}]]></description>
</item>`.trim();
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>ElixCode Blog</title>
  <link>${SITE}/blog</link>
  <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
  <description>Insights & Engineering Notes</description>
  <language>en</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <ttl>300</ttl>
  ${items}
</channel>
</rss>`.trim();

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  // caching مناسب: 5 دقیقه public + 1 روز stale-while-revalidate
  res.setHeader(
    "Cache-Control",
    "public, max-age=300, stale-while-revalidate=86400"
  );
  res.setHeader("Last-Modified", new Date().toUTCString());
  res.end(xml);

  return { props: {} };
};

function escapeXml(input: string) {
  return input.replace(
    /[<>&'"]/g,
    (c) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[
        c
      ] as string)
  );
}

function stripHtml(input: string) {
  return input.replace(/<\/?[^>]+(>|$)/g, "").trim();
}

function toRssDate(yyyyMmDd: string) {
  // تاریخ‌ها در پست‌ها به صورت YYYY-MM-DD هستند
  return new Date(`${yyyyMmDd}T00:00:00.000Z`).toUTCString();
}

export default function RSS() {
  return null;
}
