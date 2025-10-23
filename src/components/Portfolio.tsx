import Link from "next/link";
import { useMemo, useState } from "react";
import projects from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio() {
  const [active, setActive] = useState<string>("All");
  const tags = useMemo(() => {
    const t = new Set<string>(["All"]);
    projects.forEach((p) => p.tags.forEach((x) => t.add(x)));
    return Array.from(t);
  }, []);
  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(active)),
    [active]
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold">
          Portfolio
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-2 opacity-80">
          Selected projects and prototypes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <motion.button
              key={t}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(t)}
              className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                active === t
                  ? "bg-[var(--brand)] text-black border-transparent"
                  : "border-black/10 dark:border-white/10 hover:border-[var(--brand)]/60"
              }`}>
              {t}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                variants={item}
                layout
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="touch-pan-y" // برای عملکرد بهتر در موبایل
              >
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="card p-6 h-full flex flex-col transition-all duration-200 hover:shadow-xl hover:ring-2 hover:ring-[var(--brand)]/70 block active:scale-95 active:bg-black/5 dark:active:bg-white/5">
                  <div className="text-sm opacity-70">{p.tags.join(" • ")}</div>
                  <h3 className="mt-2 text-xl font-semibold flex-grow">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm opacity-90">{p.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
