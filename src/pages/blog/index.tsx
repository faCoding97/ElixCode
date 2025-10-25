import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import posts from "@/data/posts";
import { formatDateYMD } from "@/lib/date";

type PostLike = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  content?: string;
  tags?: string[];
};

function readingTime(text: string): number {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200)); // ~200 wpm
}

function normalize(s: string) {
  return s.toLowerCase().trim();
}

export default function BlogIndex() {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";

  // --- derive tags & sorted posts (newest first)
  const { allTags, sorted } = useMemo(() => {
    const sortedPosts = [...(posts as PostLike[])].sort(
      (a, b) => +new Date(b.date) - +new Date(a.date)
    );
    const tagSet = new Set<string>();
    sortedPosts.forEach((p) => (p.tags || []).forEach((t) => tagSet.add(t)));
    return { allTags: Array.from(tagSet).sort(), sorted: sortedPosts };
  }, []);

  // --- UI states
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("All");

  // --- filtering
  const filtered = useMemo(() => {
    const q = normalize(query);
    return sorted.filter((p) => {
      const hitQ =
        !q ||
        normalize(p.title).includes(q) ||
        normalize(p.summary).includes(q) ||
        normalize(p.slug).includes(q);
      const hitTag = tag === "All" || (p.tags || []).includes(tag);
      return hitQ && hitTag;
    });
  }, [sorted, query, tag]);

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

      <main className="container py-12 md:py-18">
        {/* Header / Hero */}
        <header className="mx-auto max-w-5xl px-4">
          <div className="text-sm opacity-70">ElixCode · Engineering</div>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand)] to-emerald-400/70 dark:to-amber-300/70">
              Insights &amp; Engineering Notes
            </span>
          </h1>
          <p className="mt-3 text-lg opacity-90 max-w-3xl">
            Performance, maintainability, and practical workflows for SMEs.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 min-w-0">
              <label className="sr-only" htmlFor="q">
                Search posts
              </label>
              <input
                id="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts… (title / summary)"
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-[var(--surface)] px-3 py-2 outline-none"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setTag("All")}
                className={`px-3 py-2 rounded-xl border text-sm transition-colors ${
                  tag === "All"
                    ? "border-[var(--brand)]"
                    : "border-black/10 dark:border-white/10 hover:bg-[var(--surface)]"
                }`}>
                All
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-2 rounded-xl border text-sm transition-colors ${
                    tag === t
                      ? "border-[var(--brand)]"
                      : "border-black/10 dark:border-white/10 hover:bg-[var(--surface)]"
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Meta row */}
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="opacity-70">{filtered.length} post(s)</span>
            <span className="opacity-30">·</span>
            <Link
              className="underline opacity-80 hover:opacity-100"
              href="/blog/rss.xml">
              RSS Feed
            </Link>
            <Link
              className="underline opacity-80 hover:opacity-100"
              href="/blog/feed.json">
              JSON Feed
            </Link>
          </div>
        </header>

        {/* Divider */}
        <hr className="my-8 mx-auto max-w-5xl border-black/10 dark:border-white/10" />

        {/* Grid */}
        <section className="mx-auto max-w-5xl px-4 grid gap-6 sm:gap-7 md:grid-cols-2">
          {filtered.map((post) => {
            const minutes = readingTime(
              `${post.title} ${post.summary} ${post.content || ""}`
            );
            return (
              <article
                key={post.slug}
                className="card p-5 md:p-6 hover:shadow-lg transition-shadow">
                {/* top meta */}
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <span>{formatDateYMD(post.date)}</span>
                  <span>·</span>
                  <span>{minutes} min read</span>
                </div>

                {/* title */}
                <h2 className="mt-2 text-lg md:text-xl font-semibold">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                {/* summary */}
                <p className="mt-2 opacity-90">{post.summary}</p>

                {/* tags (if any) */}
                {!!post.tags?.length && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 px-2.5 py-1 text-[12px] bg-[var(--surface)]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* footer row */}
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm underline opacity-80 hover:opacity-100">
                    Read article →
                  </Link>
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Open ${post.title}`}
                    className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm hover:bg-[var(--surface)]">
                    Open
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mx-auto max-w-5xl px-4 mt-8">
            <div className="card p-6 text-sm">
              No posts found. Try a different query or clear filters.
            </div>
          </div>
        )}
      </main>
    </>
  );
}
