import Head from "next/head";
import Link from "next/link";

export default function BlogRssDocs() {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";
  return (
    <>
      <Head>
        <title>ElixCode Blog Feeds</title>
        <meta
          name="description"
          content="Subscribe to the ElixCode blog via RSS or JSON Feed."
        />
        <link rel="canonical" href={origin + "/blog/rss"} />
      </Head>

      <main className="container py-12 md:py-18">
        <div className="mx-auto max-w-3xl card p-6">
          <h1 className="text-2xl md:text-4xl font-bold">Blog Feeds</h1>
          <p className="mt-2 opacity-90">
            Subscribe with your favorite reader. We publish practical
            engineering notes for SMEs.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">RSS 2.0</div>
                <div className="text-sm opacity-80">{origin}/blog/rss.xml</div>
              </div>
              <Link
                href="/blog/rss.xml"
                className="px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-[var(--surface)]">
                Open
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">JSON Feed 1.1</div>
                <div className="text-sm opacity-80">
                  {origin}/blog/feed.json
                </div>
              </div>
              <Link
                href="/blog/feed.json"
                className="px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-[var(--surface)]">
                Open
              </Link>
            </div>
          </div>

          <div className="mt-6 text-sm opacity-80">
            Tip: In most readers, paste the URL and it will detect the feed
            automatically.
          </div>
        </div>
      </main>
    </>
  );
}
    