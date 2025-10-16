import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved as any);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const t = prefersDark ? "dark" : "light";
      setTheme(t);
      document.documentElement.setAttribute("data-theme", t);
    }
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  if (!mounted) return null;
  return (
    <button
      onClick={toggle}
      className="rounded-lg border border-black/10 dark:border-[rgb(37_99_235)] px-3 py-1 text-sm hover:bg-[var(--surface)] transition-colors">
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
