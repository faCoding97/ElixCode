import Link from "next/link";
import { useMemo, useState } from "react";
import projects from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
};

const VAR_CONTAINER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const VAR_ITEM = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function truncate(s: string, n = 150) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export default function Portfolio() {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "old" | "az">("new");

  // همهٔ تگ‌ها (با All)
  const tags = useMemo(() => {
    const t = new Set<string>(["All"]);
    (projects as Project[]).forEach((p) => p.tags.forEach((x) => t.add(x)));
    return Array.from(t);
  }, []);

  // فیلتر + جست‌وجو + سورت
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = (projects as Project[]).filter((p) => {
      const hitTag = active === "All" || p.tags.includes(active);
      const hitQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return hitTag && hitQuery;
    });

    // سورت: فرض می‌کنیم آرایه در data از جدید به قدیم چیده شده.
    if (sort === "new") list = [...list]; // همونی که هست
    if (sort === "old") list = [...list].reverse();
    if (sort === "az")
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [active, query, sort]);

  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="container">
        {/* Heading */}
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand)] to-emerald-400/70 dark:to-amber-300/70">
              Portfolio
            </span>
          </h2>
          <p className="mt-2 opacity-80">
            Selected projects and prototypes. Built with real constraints in
            mind—speed, reliability, maintainability.
          </p>
        </motion.header>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => {
              const isActive = active === t;
              return (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  aria-pressed={isActive}
                  className={`px-3 py-1.5 rounded-full border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/60 ${
                    isActive
                      ? "bg-[var(--brand)] text-black border-transparent"
                      : "border-black/10 dark:border-white/10 hover:border-[var(--brand)]/60"
                  }`}>
                  {t}
                </button>
              );
            })}
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <label htmlFor="portfolio-q" className="sr-only">
              Search projects
            </label>
            <input
              id="portfolio-q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="w-full sm:w-64 rounded-xl border border-black/10 dark:border-white/10 bg-[var(--surface)] px-3 py-2 outline-none"
            />

            <div className="flex items-center gap-2">
              <label htmlFor="portfolio-sort" className="text-sm opacity-70">
                Sort
              </label>
              <select
                id="portfolio-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="rounded-xl border border-black/10 dark:border-white/10 bg-[var(--surface)] px-3 py-2 text-sm outline-none">
                <option value="new">Newest</option>
                <option value="old">Oldest</option>
                <option value="az">A–Z</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${query}-${sort}`}
            variants={VAR_CONTAINER}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <motion.article
                key={p.slug}
                variants={VAR_ITEM}
                layout
                className="group rounded-2xl border border-black/10 dark:border-white/10 bg-[var(--surface)] overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                {/* body */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-[12px] opacity-70">
                    {p.tags.join(" • ")}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">
                    <Link
                      href={`/portfolio/${p.slug}`}
                      className="hover:underline">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm opacity-90">
                    {truncate(p.description, 160)}
                  </p>

                  {/* actions */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <Link
                      href={`/portfolio/${p.slug}`}
                      className="text-sm underline opacity-80 hover:opacity-100">
                      Case study →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-8">
            <div className="card p-6 text-sm">
              No projects found. Try a different query or clear filters.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
