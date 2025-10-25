import Head from "next/head";
import Link from "next/link";
import posts, { Post } from "@/data/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { formatDateYMD } from "@/lib/date";
import PostQR from "@/components/PostQR";
import { useEffect, useMemo, useRef, useState } from "react";
import RequestProjectCard from "@/components/RequestProjectCard";

// --- helpers --------------------------------------------------

function readingTime(text: string): { minutes: number; words: number } {
  const words = (text || "").trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200)); // ~200wpm
  return { minutes, words };
}

function useReadingProgress(containerRef: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const viewed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(Math.round((viewed / Math.max(total, 1)) * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerRef]);
  return progress;
}

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        } catch {}
      }}
      className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-[var(--surface)] transition-colors">
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}

function ShareMenu({ url, title }: { url: string; title: string }) {
  return (
    <div className="flex gap-2">
      <a
        className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-[var(--surface)]"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer">
        Share X
      </a>
      <a
        className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-[var(--surface)]"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`}
        target="_blank"
        rel="noopener noreferrer">
        Share LinkedIn
      </a>
    </div>
  );
}

function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs bg-[var(--surface)]">
      {label}
    </span>
  );
}

function Divider() {
  return <hr className="my-10 border-black/10 dark:border-white/10" />;
}

function AuthorCard() {
  return <RequestProjectCard />;
}

// --- SSG ------------------------------------------------------

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const post = posts.find((p) => p.slug === slug) as Post;
  return { props: { post } };
};

// --- page -----------------------------------------------------

export default function BlogPost({ post }: { post: Post }) {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";
  const url = `${origin}/blog/${post.slug}`;

  const { minutes, words } = useMemo(
    () => readingTime(`${post.title} ${post.summary} ${post.content}`),
    [post]
  );
  const containerRef = useRef<HTMLElement>(null);
  const progress = useReadingProgress(containerRef);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: "ElixCode" },
    mainEntityOfPage: url,
  };

  return (
    <>
      <Head>
        <title>{post.title} — ElixCode Blog</title>
        <meta name="description" content={post.summary} />
        <link rel="canonical" href={url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
      </Head>

      {/* top progress */}
      <div className="sticky top-[10px] z-40 mx-auto max-w-4xl px-4">
        <div className="h-1 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[var(--brand)] transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <main ref={containerRef} className="container py-12 md:py-18">
        {/* header block */}
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-2 text-sm opacity-70">
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <span>·</span>
            <span>{formatDateYMD(post.date)}</span>
            <span>·</span>
            <span>{minutes} min read</span>
          </div>

          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand)] to-emerald-400/70 dark:to-amber-300/70">
              {post.title}
            </span>
          </h1>

          <p className="mt-4 text-lg opacity-90 max-w-3xl">{post.summary}</p>

          {/* meta row: tags + actions */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {/* اگر تگ داری اینجا رندر کن */}
            {"tags" in post && Array.isArray((post as any).tags) && (
              <div className="flex flex-wrap gap-2">
                {(post as any).tags.map((t: string) => (
                  <TagPill key={t} label={t} />
                ))}
              </div>
            )}
            <div className="ml-auto flex items-center gap-2">
              <CopyLinkButton url={url} />
              <ShareMenu url={url} title={post.title} />
            </div>
          </div>
        </div>

        <Divider />

        {/* content + aside */}
        <div className="mx-auto max-w-4xl px-4 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-10">
          {/* article */}
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            {/* نکته: اگر محتوای Markdown داری، بهتره از markdown parser استفاده کنی */}
            <div className="whitespace-pre-wrap">{post.content}</div>

            {/* callout نمونه (اختیاری) */}
            {/* <div className="not-prose mt-6 p-4 rounded-xl bg-[var(--surface)] border border-black/10 dark:border-white/10">
              <div className="font-semibold mb-1">TL;DR</div>
              <div className="opacity-90">…</div>
            </div> */}

            {/* code style تقویت شده */}
            <style jsx global>{`
              .prose pre code {
                font-family: var(
                  --font-mono,
                  ui-monospace,
                  SFMono-Regular,
                  Menlo,
                  Monaco,
                  Consolas,
                  "Liberation Mono",
                  monospace
                );
                font-size: 0.92rem;
                line-height: 1.6;
              }
              .prose pre {
                border-radius: 14px;
                border: 1px solid rgba(0, 0, 0, 0.12);
              }
              [data-theme="dark"] .prose pre {
                border-color: rgba(255, 255, 255, 0.12);
              }
              .prose blockquote {
                border-left-color: var(--brand);
              }
            `}</style>
          </article>

          {/* aside (sticky) */}
          <aside className="hidden md:block">
            <div className="sticky top-24 space-y-4">
              <div className="card p-4">
                <div className="text-sm font-semibold">On this page</div>
                <div className="mt-2 text-sm opacity-80">
                  {/* اگر TOC نیاز داری بعداً با پارس عنوان‌ها پر کن */}
                  <div>— {post.title}</div>
                </div>
              </div>
              <div className="card p-4">
                <div className="text-sm font-semibold">Share</div>
                <div className="mt-2">
                  <ShareMenu url={url} title={post.title} />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <Divider />

        {/* bottom actions */}
        <div className="mx-auto max-w-4xl px-4 grid gap-6">
          <AuthorCard />
          <PostQR url={url} />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-[var(--surface)] hover:bg-[var(--bg)] text-sm sm:text-base font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back to Blog</span>
            </Link>

            <span className="opacity-40 hidden sm:inline">·</span>
            <CopyLinkButton url={url} />
          </div>
        </div>

        {/* related posts (اختیاری) */}
        <Divider />
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-sm font-semibold mb-3">Related</div>
          <div className="grid md:grid-cols-2 gap-4">
            {posts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="card p-4 hover:bg-[var(--surface)] transition-colors">
                  <div className="text-sm opacity-70">
                    {formatDateYMD(r.date)}
                  </div>
                  <div className="font-semibold">{r.title}</div>
                  <div className="opacity-80 text-sm line-clamp-2">
                    {r.summary}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
