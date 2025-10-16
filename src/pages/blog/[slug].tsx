import Head from "next/head";
import posts, { Post } from "@/data/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { formatDateYMD } from "@/lib/date";

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

export default function BlogPost({ post }: { post: Post }) {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";
  const url = `${origin}/blog/${post.slug}`;
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
      <main className="container py-16 md:py-24">
        <article className="prose prose-neutral dark:prose-invert max-w-3xl">
          <div className="text-sm opacity-70">{formatDateYMD(post.date)}</div>
          <h1>{post.title}</h1>
          <p className="opacity-80">{post.summary}</p>
          <div className="mt-6 whitespace-pre-wrap">{post.content}</div>
        </article>
      </main>
    </>
  );
}
