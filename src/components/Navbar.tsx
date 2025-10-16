import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("home");
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const sectionsRef = useRef<string[]>(["home", "services", "portfolio"]);

  // 🔥 NEW: Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (open) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]); // Only re-run when 'open' changes

  // بقیه useEffect های موجود...
  useEffect(() => {
    const off = () => setOpen(false);
    router.events?.on("routeChangeComplete", off);
    return () => router.events?.off("routeChangeComplete", off);
  }, [router.events]);

  useEffect(() => {
    if (router.pathname.startsWith("/blog")) setActive("blog");
    else if (router.pathname.startsWith("/about-contact")) setActive("about");
    else if (router.pathname === "/") {
      const hash =
        typeof window !== "undefined"
          ? window.location.hash.replace("#", "")
          : "";
      setActive(hash || "home");
    }
  }, [router.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const sTop = window.scrollY;
      const d = document.documentElement;
      const h = d.scrollHeight - d.clientHeight || 1;
      setProgress(Math.min(100, Math.max(0, (sTop / h) * 100)));
      setCompact(sTop > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (router.pathname !== "/") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id") || "";
            if (sectionsRef.current.includes(id)) setActive(id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.1, 0.5, 1] }
    );
    sectionsRef.current.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [router.pathname]);

  const onNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string
  ) => {
    if (router.pathname !== "/") {
      e.preventDefault();
      router.push("/#" + targetId);
      return;
    }
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top: y, behavior: "smooth" });

    // 🔥 NEW: Close menu after clicking a link (for mobile)
    setOpen(false);
  };

  const activeCls = (key: string) =>
    key === active ? "text-[var(--brand)] underline underline-offset-4" : "";

  return (
    <div className="sticky top-3 z-50 px-3 sm:px-4 md:px-6">
      <header
        className={`mx-auto w-full max-w-5xl rounded-2xl border bg-[var(--bg)]/85 backdrop-blur
    border-black/10 dark:border-[rgb(37_99_235)] shadow-lg transition-all ${
      compact ? "scale-[0.99]" : "scale-100"
    }`}>
        <nav
          className={`px-4 md:px-6 flex items-center justify-between ${
            compact ? "py-2.5" : "py-3.5"
          }`}>
          <Link href="/" className="flex items-center gap-2 font-medium">
            <img
              src="/images/logo.png"
              alt="ElixCode Logo"
              className="w-7 h-7 rounded-xl shadow-sm"
            />
            <span>ElixCode</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#home"
              onClick={(e) => onNavClick(e, "home")}
              className={`hover:underline ${activeCls("home")}`}>
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => onNavClick(e, "services")}
              className={`hover:underline ${activeCls("services")}`}>
              Services
            </a>
            <a
              href="#portfolio"
              onClick={(e) => onNavClick(e, "portfolio")}
              className={`hover:underline ${activeCls("portfolio")}`}>
              Portfolio
            </a>
            <Link
              href="/about-contact"
              className={`hover:underline ${activeCls("about")}`}>
              Contactus
            </Link>
            <Link
              href="/blog"
              className={`hover:underline ${activeCls("blog")}`}>
              Blog
            </Link>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-2 ">
            <ThemeToggle />
            <button
              aria-label="Open Menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-xl border border-black/10 dark:border-[rgb(37_99_235)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </nav>

        <div className="px-4 md:px-6 pb-2">
          <div className="h-1 bg-transparent rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--brand)] transition-[width] duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {open && (
          <div className="md:hidden px-4 pb-4">
            <div className="rounded-xl border border-black/10 dark:border-[rgb(37_99_235)] bg-[var(--surface)] shadow-md overflow-hidden">
              <div className="flex flex-col">
                <a
                  className={`px-4 py-3 ${activeCls("home")}`}
                  href="#home"
                  onClick={(e) => onNavClick(e, "home")}>
                  Home
                </a>
                <a
                  className={`px-4 py-3 ${activeCls("services")}`}
                  href="#services"
                  onClick={(e) => onNavClick(e, "services")}>
                  Services
                </a>
                <a
                  className={`px-4 py-3 ${activeCls("portfolio")}`}
                  href="#portfolio"
                  onClick={(e) => onNavClick(e, "portfolio")}>
                  Portfolio
                </a>
                <Link
                  className={`px-4 py-3 ${activeCls("about")}`}
                  href="/about-contact"
                  onClick={() => setOpen(false)}>
                  About & Contact
                </Link>
                <Link
                  className={`px-4 py-3 ${activeCls("blog")}`}
                  href="/blog"
                  onClick={() => setOpen(false)}>
                  Blog
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
