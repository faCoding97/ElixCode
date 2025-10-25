import type { GetServerSideProps } from "next";
import posts from "@/data/posts";

const SITE = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";
const FEED_URL = `${SITE}/blog/feed.json`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sorted = [...posts].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );

  const items = sorted.map((p) => ({
    id: `${SITE}/blog/${p.slug}`,
    url: `${SITE}/blog/${p.slug}`,
    title: p.title,
    content_text: stripHtml(p.summary || p.content || ""),
    date_published: `${p.date}T00:00:00.000Z`,
    tags: (p as any).tags || undefined,
    author: (p as any).authorName ? { name: (p as any).authorName } : undefined,
  }));

  const json = {
    version: "https://jsonfeed.org/version/1.1",
    title: "ElixCode Blog",
    home_page_url: `${SITE}/blog`,
    feed_url: FEED_URL,
    description: "Insights & Engineering Notes",
    items,
  };

  const body = JSON.stringify(json, null, 2);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/feed+json; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, max-age=300, stale-while-revalidate=86400"
  );
  res.end(body);
  return { props: {} };
};

function stripHtml(input: string) {
  return input.replace(/<\/?[^>]+(>|$)/g, "").trim();
}

export default function JSONFeed() {
  return null;
}
