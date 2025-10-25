import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";
import {
  FaHome,
  FaCogs,
  FaBriefcase,
  FaInfoCircle,
  FaBlog,
  FaBars,
  FaRocket,
} from "react-icons/fa"; // آیکون‌های جدید

export default function Navbar() {
  const router = useRouter();

  // --- state
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<
    "home" | "services" | "portfolio" | "about" | "blog"
  >("home");
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [spacerH, setSpacerH] = useState(0);

  // --- refs
  const sectionsRef = useRef<string[]>(["home", "services", "portfolio"]);
  const headerRef = useRef<HTMLElement | null>(null);
  const navBoxRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // --- scroll close controls
  const openedAtYRef = useRef<number>(0);
  const ignoreScrollUntilRef = useRef<number>(0);
  const SCROLL_CLOSE_THRESHOLD = 120;
  const OPEN_IGNORE_WINDOW_MS = 200;

  // --- compute scroll offset
  const scrollOffset = useMemo(() => {
    if (!navBoxRef.current) return 92;
    const rect = navBoxRef.current.getBoundingClientRect();
    return Math.round(rect.height + 12);
  }, [compact]);

  // --- measure navbar height for spacer
  useEffect(() => {
    const measure = () => {
      if (!navBoxRef.current) return;
      const rect = navBoxRef.current.getBoundingClientRect();
      setSpacerH(Math.round(rect.height + 12));
    };

    measure();

    let ro: any = null;

    if (typeof window !== "undefined") {
      const RO = (window as any).ResizeObserver;
      if (RO) {
        ro = new RO(() => measure());
        if (navBoxRef.current) ro.observe(navBoxRef.current);
      }

      window.addEventListener("resize", measure);
    }

    const t = setTimeout(measure, 0);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", measure);
      }
      if (ro && navBoxRef.current) ro.unobserve(navBoxRef.current);
      if (ro?.disconnect) ro.disconnect();
      clearTimeout(t);
    };
  }, [open, compact]);

  // --- close menu on route change
  useEffect(() => {
    const off = () => setOpen(false);
    router.events?.on("routeChangeComplete", off);
    return () => router.events?.off("routeChangeComplete", off);
  }, [router.events]);

  // --- close menu on scroll / escape / outside click
  useEffect(() => {
    const onScroll = () => {
      if (!open) return;
      const now = Date.now();
      if (now < ignoreScrollUntilRef.current) return;
      const dy = Math.abs(window.scrollY - openedAtYRef.current);
      if (dy > SCROLL_CLOSE_THRESHOLD) setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onPointerDownOutside = (e: PointerEvent) => {
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
    window.addEventListener("pointerdown", onPointerDownOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDownOutside);
    };
  }, [open]);

  // --- scroll progress + compact header
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

  // --- active route detection
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

  // --- section spy (only on home)
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

  // --- smooth scroll
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
    <>
      {/* fixed navbar container */}
      <div
        className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-4 md:px-6"
        ref={headerRef as any}>
        <header
          ref={navBoxRef}
          className={`mx-auto w-full max-w-5xl rounded-2xl border bg-[var(--bg)]/85 backdrop-blur
          border-black/10 dark:border-[rgb(37_99_235)] shadow-lg transition-all
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
              {/* آیکون مکمل لوگو */}
              <span>ElixCode</span>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#home"
                onClick={(e) => onNavClick(e, "home")}
                className={`flex items-center gap-2 hover:underline ${activeCls(
                  "home"
                )}`}>
                <FaHome className="text-base" /> Home
              </a>
              <a
                href="#services"
                onClick={(e) => onNavClick(e, "services")}
                className={`flex items-center gap-2 hover:underline ${activeCls(
                  "services"
                )}`}>
                <FaCogs className="text-base" /> Services
              </a>
              <a
                href="#portfolio"
                onClick={(e) => onNavClick(e, "portfolio")}
                className={`flex items-center gap-2 hover:underline ${activeCls(
                  "portfolio"
                )}`}>
                <FaBriefcase className="text-base" /> Portfolio
              </a>
              <Link
                href="/about-contact"
                className={`flex items-center gap-2 hover:underline ${activeCls(
                  "about"
                )}`}>
                <FaInfoCircle className="text-base" /> Contact us
              </Link>
              <Link
                href="/blog"
                className={`flex items-center gap-2 hover:underline ${activeCls(
                  "blog"
                )}`}>
                <FaBlog className="text-base" /> Blog
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
                onClick={() => {
                  openedAtYRef.current = window.scrollY;
                  ignoreScrollUntilRef.current =
                    Date.now() + OPEN_IGNORE_WINDOW_MS;
                  setOpen((v) => !v);
                }}
                className="p-2 rounded-xl border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/60">
                <FaBars className="w-5 h-5" />{" "}
                {/* آیکون جدید برای منوی موبایل */}
              </button>
            </div>
          </nav>

          {/* Progress */}
          <div className="px-4 md:px-6 pb-2">
            <div className="h-[4px] bg-transparent rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--brand)] transition-[width] duration-150 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden px-4 pb-4" id="mobile-menu" ref={menuRef}>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-[var(--surface)] shadow-md overflow-hidden">
                <div className="flex flex-col">
                  <a
                    className={`px-4 py-3 flex items-center gap-2 ${activeCls(
                      "home"
                    )}`}
                    href="#home"
                    onClick={(e) => onNavClick(e, "home")}>
                    <FaHome className="text-base" /> Home
                  </a>
                  <a
                    className={`px-4 py-3 flex items-center gap-2 ${activeCls(
                      "services"
                    )}`}
                    href="#services"
                    onClick={(e) => onNavClick(e, "services")}>
                    <FaCogs className="text-base" /> Services
                  </a>
                  <a
                    className={`px-4 py-3 flex items-center gap-2 ${activeCls(
                      "portfolio"
                    )}`}
                    href="#portfolio"
                    onClick={(e) => onNavClick(e, "portfolio")}>
                    <FaBriefcase className="text-base" /> Portfolio
                  </a>
                  <Link
                    className={`px-4 py-3 flex items-center gap-2 ${activeCls(
                      "about"
                    )}`}
                    href="/about-contact"
                    onClick={() => setOpen(false)}>
                    <FaInfoCircle className="text-base" /> About & Contact
                  </Link>
                  <Link
                    className={`px-4 py-3 flex items-center gap-2 ${activeCls(
                      "blog"
                    )}`}
                    href="/blog"
                    onClick={() => setOpen(false)}>
                    <FaBlog className="text-base" /> Blog
                  </Link>
                </div>
              </div>
            </div>
          )}
        </header>
      </div>

      {/* Spacer to prevent content overlap */}
      <div aria-hidden="true" style={{ height: spacerH }} />
    </>
  );
}
