import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Navbar() {
  const router = useRouter();

  // --- state
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<
    "home" | "services" | "portfolio" | "about" | "blog"
  >("home");
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  // --- refs
  const sectionsRef = useRef<string[]>(["home", "services", "portfolio"]);
  const headerRef = useRef<HTMLElement | null>(null);
  const navBoxRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // compute dynamic offset based on header height
  const scrollOffset = useMemo(() => {
    if (!navBoxRef.current) return 92; // fallback
    const rect = navBoxRef.current.getBoundingClientRect();
    return Math.round(rect.height + 12); // header height + top gap (top-3≈12px)
  }, [compact]); // compact changes height

  // close mobile menu on route change
  useEffect(() => {
    const off = () => setOpen(false);
    router.events?.on("routeChangeComplete", off);
    return () => router.events?.off("routeChangeComplete", off);
  }, [router.events]);

  // close mobile menu on scroll / outside click / escape
  useEffect(() => {
    const onScroll = () => open && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        navBoxRef.current &&
        !navBoxRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  // route-based active link (non-home pages)
  useEffect(() => {
    if (router.pathname.startsWith("/blog")) setActive("blog");
    else if (router.pathname.startsWith("/about-contact")) setActive("about");
    else if (router.pathname === "/") {
      const hash =
        typeof window !== "undefined"
          ? window.location.hash.replace("#", "")
          : "";
      setActive((hash as any) || "home");
    }
  }, [router.pathname]);

  // scroll progress + compact header
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

  // section spy only on home
  useEffect(() => {
    if (router.pathname !== "/") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id") || "";
            if (sectionsRef.current.includes(id)) setActive(id as any);
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

  // smooth scroll with dynamic offset
  const onNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: "home" | "services" | "portfolio"
  ) => {
    if (router.pathname !== "/") {
      e.preventDefault();
      router.push("/#" + targetId);
      return;
    }
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  const activeCls = (key: string) =>
    key === active ? "text-[var(--brand)] underline underline-offset-4" : "";

  return (
    <div
      className="sticky top-3 z-50 px-3 sm:px-4 md:px-6"
      ref={headerRef as any}>
      <header
        ref={navBoxRef}
        className={`mx-auto w-full max-w-5xl rounded-2xl border bg-[var(--bg)]/85 backdrop-blur
        border-black/10 dark:border-white/10 shadow-lg transition-all
        ${compact ? "scale-[0.99]" : "scale-100"}`}>
        {/* NAV BAR */}
        <nav
          className={`px-4 md:px-6 flex items-center justify-between ${
            compact ? "py-2.5" : "py-3.5"
          }`}
          aria-label="Primary">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <img
              src="/images/logo.png"
              alt="ElixCode Logo"
              className="w-7 h-7 rounded-xl shadow-sm"
            />
            <span>ElixCode</span>
          </Link>

          {/* Desktop menu */}
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
              Contact us
            </Link>
            <Link
              href="/blog"
              className={`hover:underline ${activeCls("blog")}`}>
              Blog
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile toggles */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              aria-label="Open Menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-xl border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/60">
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

        {/* Progress (thinner than nav) */}
        <div className="px-4 md:px-6 pb-2">
          <div className="h-[4px] bg-transparent rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--brand)] transition-[width] duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Mobile menu — same width as nav box */}
        {open && (
          <div className="md:hidden px-4 pb-4" id="mobile-menu" ref={menuRef}>
            <div className="rounded-xl border border-black/10 dark:border-white/10 bg-[var(--surface)] shadow-md overflow-hidden">
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
