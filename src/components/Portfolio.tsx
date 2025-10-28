"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
const VAR_ITEM = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const MAX_VISIBLE_TAGS = 8;

// --- Utils ---
function truncate(s = "", n = 150) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
function useDebounced<T>(v: T, ms = 250) {
  const [x, setX] = useState(v);
  useEffect(() => {
    const id = setTimeout(() => setX(v), ms);
    return () => clearTimeout(id);
  }, [v, ms]);
  return x;
}
function rankTags(items: Project[]) {
  const map = new Map<string, number>();
  items.forEach((p) =>
    p.tags.forEach((t) => map.set(t, (map.get(t) ?? 0) + 1))
  );
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t]) => t);
}

// --- Small component: collapsible tag line per card ---
function TagList({ tags, max = 6 }: { tags: string[]; max?: number }) {
  const [open, setOpen] = useState(false);
  const shown = open ? tags : tags.slice(0, max);
  const extra = Math.max(0, tags.length - shown.length);
  if (!tags?.length) return null;
  return (
    <div className="text-[12px] opacity-70">
      <span>{shown.join(" • ")}</span>
      {extra > 0 && !open && (
        <>
          <span> • </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="underline opacity-80 hover:opacity-100"
            aria-label={`Show ${extra} more tags`}>
            +{extra} more
          </button>
        </>
      )}
      {open && tags.length > max && (
        <>
          <span> • </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="underline opacity-80 hover:opacity-100"
            aria-label="Show fewer tags">
            show less
          </button>
        </>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "old" | "az">("new");
  const dq = useDebounced(query, 250);

  // Ranked tags for top row + remaining in popover
  const ranked = useMemo(() => {
    const list = rankTags(projects as Project[]);
    const rest = list.filter((t) => t !== "All");
    return {
      top: ["All", ...rest.slice(0, MAX_VISIBLE_TAGS)],
      remaining: rest.slice(MAX_VISIBLE_TAGS),
    };
  }, []);

  // Filter + search + sort
  const filtered = useMemo(() => {
    const q = dq.trim().toLowerCase();
    let list = (projects as Project[]).filter((p) => {
      const byTag = active === "All" || p.tags.includes(active);
      const byQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return byTag && byQ;
    });
    if (sort === "old") list = [...list].reverse();
    if (sort === "az")
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [active, dq, sort]);

  // Popover: More tags
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreQuery, setMoreQuery] = useState("");
  const [limit, setLimit] = useState(15);
  const moreRef = useRef<HTMLDivElement>(null);

  const moreList = useMemo(() => {
    const q = moreQuery.trim().toLowerCase();
    return ranked.remaining.filter((t) => !q || t.toLowerCase().includes(q));
  }, [ranked.remaining, moreQuery]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (
        moreOpen &&
        moreRef.current &&
        !moreRef.current.contains(e.target as Node)
      )
        setMoreOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [moreOpen]);

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
            mind — speed, reliability, maintainability.
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
          <div className="relative flex items-center gap-2">
            <div className="flex flex-wrap gap-2 max-w-full">
              {ranked.top.map((t) => {
                const on = active === t;
                return (
                  <button
                    key={t}
                    onClick={() => setActive(t)}
                    aria-pressed={on}
                    className={`px-3 py-1.5 rounded-full border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/60 ${
                      on
                        ? "bg-[var(--brand)] text-white border-transparent"
                        : "border-black/10 dark:border-white/10 hover:border-[var(--brand)]/60"
                    }`}>
                    {t}
                  </button>
                );
              })}

              {ranked.remaining.length > 0 && (
                <div className="relative" ref={moreRef}>
                  <button
                    onClick={() => setMoreOpen((v) => !v)}
                    aria-expanded={moreOpen}
                    aria-haspopup="dialog"
                    className="px-3 py-1.5 rounded-full border text-sm transition-all border-black/10 dark:border-white/10 hover:border-[var(--brand)]/60">
                    More ({ranked.remaining.length})
                  </button>

                  <AnimatePresence>
                    {moreOpen && (
                      <motion.div
                        key="more-popover"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        role="dialog"
                        aria-label="More tags"
                        className="absolute z-20 mt-2 w-72 rounded-xl border border-black/10 dark:border-white/10 bg-[var(--surface)] p-2 shadow-lg">
                        <div className="mb-2">
                          <input
                            value={moreQuery}
                            onChange={(e) => {
                              setMoreQuery(e.target.value);
                              setLimit(15);
                            }}
                            placeholder="Search tags…"
                            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
                          />
                        </div>

                        <div className="max-h-64 overflow-auto pr-1">
                          {moreList.length === 0 && (
                            <div className="p-2 text-xs opacity-70">
                              No tags found
                            </div>
                          )}

                          {moreList.slice(0, limit).map((t) => {
                            const on = active === t;
                            return (
                              <button
                                key={t}
                                onClick={() => {
                                  setActive(t);
                                  setMoreOpen(false);
                                  setMoreQuery("");
                                  setLimit(15);
                                }}
                                className={`mb-1 mr-1 inline-flex items-center rounded-full border px-2.5 py-1 text-xs transition ${
                                  on
                                    ? "bg-[var(--brand)] text-white border-transparent"
                                    : "border-black/10 dark:border-white/10 hover:border-[var(--brand)]/60"
                                }`}>
                                {t}
                              </button>
                            );
                          })}

                          {moreList.length > limit && (
                            <button
                              onClick={() => setLimit((l) => l + 15)}
                              className="mt-2 w-full text-[12px] underline">
                              Show {moreList.length - limit} more…
                            </button>
                          )}
                          {limit > 15 && (
                            <button
                              onClick={() => setLimit(15)}
                              className="mt-1 w-full text-[12px] underline opacity-80">
                              Show less
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
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
            key={`${active}-${dq}-${sort}`}
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
                <div className="p-5 flex-1 flex flex-col">
                  {/* Short tag line with +X more */}
                  <TagList tags={p.tags} max={6} />
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
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-[var(--surface)] p-6 text-sm">
              No projects found. Try a different query or clear filters.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
