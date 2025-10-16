import Head from "next/head";
import posts from "@/data/posts";
import Link from "next/link";
import { formatDateYMD } from "@/lib/date";

export default function BlogIndex() {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";
  return (
    <>
      <Head>
        <title>ElixCode Blog — Insights & Engineering Notes</title>
        <meta
          name="description"
          content="Performance, maintainability, and practical workflows for SMEs."
        />
        <link rel="canonical" href={origin + "/blog"} />
      </Head>

      <main className="container py-16 md:py-24">
        <h1 className="text-2xl md:text-4xl font-bold">
          Insights & Engineering Notes
        </h1>
        <p className="opacity-80">
          Performance, maintainability, and practical workflows for SMEs.
        </p>
        <div className="mt-2 text-sm">
          <Link
            className="underline opacity-80 hover:opacity-100"
            href="/blog/rss.xml">
            RSS Feed
          </Link>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="card p-6">
              <div className="text-sm opacity-70">
                {formatDateYMD(post.date)}
              </div>
              <h2 className="text-xl font-semibold mt-1">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 opacity-90">{post.summary}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
