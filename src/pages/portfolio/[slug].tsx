// src/pages/portfolio/[slug].tsx

import Head from "next/head";
import projects, { Project } from "@/data/projects";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: projects.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const project = projects.find((p) => p.slug === slug) as Project;
  return { props: { project } };
};

export default function ProjectPage({ project }: { project: Project }) {
  const origin =
    process.env.NEXT_PUBLIC_SITE_ORIGIN?.toLowerCase() ||
    "https://elixcode.com";
  const url = `${origin}/portfolio/${project.slug}`;

  const speedBadge =
    project.metrics?.rating === "Fast"
      ? "bg-emerald-600"
      : project.metrics?.rating === "OK"
      ? "bg-amber-600"
      : project.metrics?.rating === "Slow"
      ? "bg-rose-600"
      : "bg-slate-500";

  return (
    <>
      <Head>
        <title>{project.title} — ElixCode Portfolio</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={url} />
        {/* Open Graph / Twitter */}
        <meta
          property="og:title"
          content={`${project.title} — ElixCode Portfolio`}
        />
        <meta property="og:description" content={project.description} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="container py-16 md:py-24">
        <article className="max-w-3xl card p-6 border border-black/10 rounded-xl bg-white/70 backdrop-blur">
          <div className="flex flex-wrap items-center gap-2 text-sm opacity-80">
            <span>{project.tags.join(" • ")}</span>
            {project.metrics?.rating && (
              <span
                className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${speedBadge}`}
                title={
                  project.metrics?.ttfbMs
                    ? `TTFB ≈ ${project.metrics.ttfbMs}ms`
                    : "Performance badge"
                }>
                {project.metrics.rating}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl font-bold mt-2">
            {project.title}
          </h1>
          <p className="mt-3 opacity-90">{project.description}</p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 font-medium">
              Visit Website
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5M6 18h12a2 2 0 0 0 2-2V6"
                />
              </svg>
            </a>
          )}

          <div className="mt-6 whitespace-pre-wrap">{project.content}</div>
        </article>
      </main>
    </>
  );
}
