import Link from "next/link";
import { useMemo, useState } from "react";
import projects from "@/data/projects";

export default function Portfolio() {
  const [active, setActive] = useState<string>("All");
  const tags = useMemo(() => {
    const t = new Set<string>(["All"]);
    projects.forEach((p) => p.tags.forEach((x) => t.add(x)));
    return Array.from(t);
  }, []);
  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.tags.includes(active))),
    [active]
  );

  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-2xl md:text-4xl font-bold">Portfolio</h2>
        <p className="mt-2 opacity-80">Selected projects and prototypes.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                active === t
                  ? "bg-[var(--brand)] text-black border-transparent"
                  : "border-black/10 dark:border-white/10 hover:border-[var(--brand)]/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-[var(--brand)]/70"
            >
              <div className="text-sm opacity-70">{p.tags.join(" • ")}</div>
              <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm opacity-90">{p.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
