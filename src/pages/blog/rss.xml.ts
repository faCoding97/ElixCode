import type { GetServerSideProps } from "next";
import posts from "@/data/posts";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://wavesoft.com";
  const items = posts
    .map(
      (p) => `
<item>
  <title>${escapeXml(p.title)}</title>
  <link>${origin}/blog/${p.slug}</link>
  <guid>${origin}/blog/${p.slug}</guid>
  <pubDate>${new Date(p.date + "T00:00:00Z").toUTCString()}</pubDate>
  <description><![CDATA[${p.summary}]]></description>
</item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>WaveSoft Blog</title>
  <link>${origin}/blog</link>
  <description>Insights & Engineering Notes</description>
  ${items}
</channel>
</rss>`;

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.write(xml);
  res.end();

  // No page to render
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

export default function RSS() {
  return null;
}
