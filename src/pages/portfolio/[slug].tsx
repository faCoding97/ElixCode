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
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";
  const url = `${origin}/portfolio/${project.slug}`;
  return (
    <>
      <Head>
        <title>{project.title} — ElixCode Portfolio</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={url} />
      </Head>
      <main className="container py-16 md:py-24">
        <article className="max-w-3xl card p-6">
          <div className="text-sm opacity-70">{project.tags.join(" • ")}</div>
          <h1 className="text-2xl md:text-4xl font-bold mt-1">
            {project.title}
          </h1>
          <p className="mt-3 opacity-90">{project.description}</p>
          <div className="mt-6 whitespace-pre-wrap">{project.content}</div>
        </article>
      </main>
    </>
  );
}
