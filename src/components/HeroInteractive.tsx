import { useEffect, useRef, useState } from "react";

/** Stable typing for H1 (mouse movement boosts speed, no resets). */
function useTypingEffectStable(
  text: string,
  baseSpeed = 95,
  boostRef?: React.MutableRefObject<number>
) {
  const [out, setOut] = useState("");
  const idxRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const accRef = useRef(0);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    idxRef.current = 0;
    setOut("");
    accRef.current = 0;
    lastRef.current = null;

    const loop = (t: number) => {
      if (lastRef.current == null) lastRef.current = t;
      const dt = t - (lastRef.current || t);
      lastRef.current = t;

      const boost = boostRef?.current ?? 0;
      const perChar = Math.max(45, baseSpeed * (1 - 0.6 * boost));

      accRef.current += dt;
      while (accRef.current >= perChar && idxRef.current <= text.length) {
        idxRef.current += 1;
        accRef.current -= perChar;
        setOut(text.slice(0, idxRef.current));
      }
      if (idxRef.current <= text.length) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, baseSpeed, boostRef]);

  return out;
}

function isDarkTheme() {
  const cs = getComputedStyle(document.documentElement);
  const bg = (cs.getPropertyValue("--bg") || "#1d1e22").trim();
  const m = bg.match(/#([0-9a-f]{6})/i);
  if (!m) return true;
  const hex = m[1];
  const r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 140;
}

type Token = { text: string; color: string };

function tokenizePy(line: string, dark: boolean): Token[] {
  const colors = dark
    ? {
        base: "#e5e7eb",
        kw: "#a78bfa",
        def: "#a3e635",
        str: "#22d3ee",
        op: "#94a3b8",
        comm: "#9ca3af",
      }
    : {
        base: "#111827",
        kw: "#7c3aed",
        def: "#047857",
        str: "#0ea5e9",
        op: "#4b5563",
        comm: "#6b7280",
      };

  if (line.trimStart().startsWith("#"))
    return [{ text: line, color: colors.comm }];

  const out: Token[] = [];
  const parts = line.split(
    /(\s+|#[^\n]*|\".*?\"|\'.*?\'|\bdef\b|\bclass\b|\breturn\b|\bif\b|\bfor\b|\bwhile\b|\bimport\b|\bfrom\b|\bas\b|\btry\b|\bexcept\b|\bfinally\b|\bwith\b|\bpass\b|\braise\b|\bawait\b|\basync\b|\blambda\b|\bTrue\b|\bFalse\b|\bNone\b)/g
  );
  for (const p of parts) {
    if (!p) continue;
    if (/^#/.test(p)) {
      out.push({ text: p, color: colors.comm });
      continue;
    }
    if (/^["'].*["']$/.test(p)) {
      out.push({ text: p, color: colors.str });
      continue;
    }
    if (/^\s+$/.test(p)) {
      out.push({ text: p, color: colors.base });
      continue;
    }
    if (
      /\b(def|class|async|await|return|if|for|while|import|from|as|try|except|finally|with|pass|raise|lambda|True|False|None)\b/.test(
        p
      )
    ) {
      out.push({ text: p, color: colors.kw });
      continue;
    }
    if (/^[()\[\]{}=+\-*/:.,]+$/.test(p)) {
      out.push({ text: p, color: colors.op });
      continue;
    }
    out.push({ text: p, color: colors.base });
  }
  return out;
}

function generateCodeLines(count = 180): string[] {
  const lines: string[] = [];
  lines.push("from dataclasses import dataclass");
  lines.push("@dataclass");
  lines.push("class Company:");
  lines.push("    name: str");
  lines.push("    city: str");
  lines.push("");
  lines.push("def best_company():");
  lines.push("    return Company(name='ElixCode', city='Gqeberha')");
  lines.push("");
  lines.push("def fib(n):");
  lines.push("    a, b = 0, 1");
  lines.push("    for _ in range(n):");
  lines.push("        a, b = b, a + b");
  lines.push("    return a");
  lines.push("");
  lines.push("def score_latency(ms):");
  lines.push("    # lower is better");
  lines.push("    return max(0, 100 - int(ms // 10))");
  lines.push("");
  for (let i = 1; i <= count; i++) {
    lines.push(`# tick ${i}`);
    lines.push(`item = {'id': ${i}, 'name': 'wave', 'ok': True}`);
    lines.push("lat = (fib(12) % 33) + 12");
    lines.push("s = score_latency(lat)");
    if (i % 7 === 0) {
      lines.push("c = best_company()");
      lines.push('msg = f"Best dev company? {c.name}."');
      lines.push("print(msg)");
    } else {
      lines.push("print('processing', item['id'], s)");
    }
    lines.push("if s < 10:");
    lines.push("    raise Exception('slow path')");
    lines.push("try:");
    lines.push("    total = sum(range(10))");
    lines.push("except Exception as e:");
    lines.push("    total = -1");
    lines.push("finally:");
    lines.push("    pass");
  }
  return lines;
}

export default function HeroInteractive() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boostRef = useRef(0);

  const headline = useTypingEffectStable(
    "From simple stores to enterprise-level solutions - fast, scalable.",
    95,
    boostRef
  );

  // Mouse → speed boost
  useEffect(() => {
    if (prefersReducedMotion) return;
    let lastT = performance.now();
    let lastX = 0,
      lastY = 0;

    const onMove = (e: MouseEvent) => {
      const t = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dt = Math.max(1, t - lastT);
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = t;
      const speed = Math.min(1, Math.hypot(dx, dy) / dt);
      boostRef.current = Math.min(1, boostRef.current * 0.85 + speed * 0.6);
    };
    const decay = () => {
      boostRef.current = Math.max(0, boostRef.current - 0.01);
      rafDecay = requestAnimationFrame(decay);
    };
    window.addEventListener("mousemove", onMove);
    let rafDecay = requestAnimationFrame(decay);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafDecay);
    };
  }, [prefersReducedMotion]);

  // Canvas renderer
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    // ✅ explicit non-null ctx for TS (survives into nested fns)
    const ctxCandidate = canvasEl.getContext("2d");
    if (!ctxCandidate) return;
    const ctx: CanvasRenderingContext2D = ctxCandidate;

    const LINES = generateCodeLines(180);
    let isDark = isDarkTheme();

    let width = 0,
      height = 0,
      dpr = Math.max(1, window.devicePixelRatio || 1);
    let raf: number | null = null;
    let lastFrameTime: number | null = null;
    const gridStep = 24;
    const fontPx = 20;
    const rowPad = 28;
    const colPad = 28;
    const rowHeight = Math.round(fontPx * 1.1);

    ctx.font = `600 ${fontPx}px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`;

    const state = { startLine: 0, typingCol: 0, acc: 0 };

    function drawBG() {
      ctx.clearRect(0, 0, width, height);
      const cs = getComputedStyle(document.documentElement);
      const bg = (cs.getPropertyValue("--bg") || "#1d1e22").trim();
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = isDark ? "rgba(127,127,127,0.12)" : "rgba(0,0,0,0.06)";
      for (let x = 0; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Light-mode soft vignette/panel
      if (!isDark) {
        const g = ctx.createLinearGradient(0, 0, 0, height);
        g.addColorStop(0, "rgba(0,0,0,0.06)");
        g.addColorStop(0.12, "rgba(0,0,0,0)");
        g.addColorStop(0.88, "rgba(0,0,0,0)");
        g.addColorStop(1, "rgba(0,0,0,0.06)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }
    }

    function resize() {
      const c = canvasRef.current; // re-read for TS safety
      if (!c) return;
      width = window.innerWidth;
      height = window.innerHeight;
      c.width = Math.floor(width * dpr);
      c.height = Math.floor(height * dpr);
      c.style.width = width + "px";
      c.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawBG();
    }

    function render(now: number) {
      if (lastFrameTime == null) lastFrameTime = now;
      const dt = now - lastFrameTime;
      lastFrameTime = now;

      drawBG();

      if (!isDark) {
        ctx.fillStyle = "rgba(0,0,0,0.025)";
        ctx.fillRect(
          0,
          rowPad - Math.round(fontPx * 0.8),
          width,
          height - (rowPad - Math.round(fontPx * 0.8)) * 2
        );
      }

      const visibleRows = Math.floor((height - rowPad * 2) / rowHeight) - 1;
      const perCharBase = 110;
      const perChar = Math.max(
        45,
        perCharBase * (1 - 0.5 * (boostRef.current || 0))
      );

      state.acc += dt;

      for (let i = 0; i < visibleRows; i++) {
        const li = (state.startLine + i) % LINES.length;
        const y = rowPad + (i + 1) * rowHeight;
        const line = LINES[li];
        const fullyTyped =
          i < visibleRows - 1 || state.typingCol >= line.length;

        // subtle text shadow in light
        if (!isDark) {
          ctx.shadowColor = "rgba(0,0,0,0.15)";
          ctx.shadowBlur = 4;
          ctx.shadowOffsetY = 1;
        } else {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.shadowOffsetY = 0;
        }

        const drawLine = (txt: string) => {
          const tokens = tokenizePy(txt, isDark);
          let x = colPad;
          for (const tk of tokens) {
            ctx.fillStyle = tk.color;
            ctx.fillText(tk.text, x, y);
            x += ctx.measureText(tk.text).width;
          }
          return x;
        };

        if (fullyTyped) {
          drawLine(line);
        } else {
          const x = drawLine(line.slice(0, state.typingCol));
          // caret
          if (Math.floor(performance.now() / 500) % 2 === 0) {
            ctx.fillStyle = (isDark ? "#d4d4dc" : "#111827") + "AA";
            const caretH = Math.round(fontPx * 1.1);
            const caretOffsetY = Math.round(fontPx * 0.9);
            ctx.fillRect(
              x,
              y - caretOffsetY,
              Math.max(2 + fontPx / 10, 9),
              caretH
            );
          }
        }
      }

      while (state.acc >= perChar) {
        state.acc -= perChar;
        state.typingCol += 1;
        const currentIdx = (state.startLine + visibleRows - 1) % LINES.length;
        const currentLine = LINES[currentIdx];
        if (state.typingCol > currentLine.length) {
          state.typingCol = 0;
          state.startLine = (state.startLine + 1) % LINES.length;
        }
      }

      raf = requestAnimationFrame(render);
    }

    const onTheme = () => {
      isDark = isDarkTheme();
    };
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    resize();
    window.addEventListener("resize", resize, { passive: true });
    raf = requestAnimationFrame(render);

    // Pause when tab hidden
    const onVis = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      } else if (!raf) {
        lastFrameTime = null;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      mo.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden -mt-20 md:-mt-20">
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute top-0 right-0 bottom-0 left-0"
          aria-hidden
        />
      )}

      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-3xl card p-8 md:p-10 transition-shadow duration-300">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {headline}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="mt-4 text-lg opacity-90">
            EElixCode builds every kind of website: e-commerce platforms, online
            sales systems, &amp; custom web apps, ERP, BPMS, barcode & QR
            workflows, and high-performance integrations.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#services"
              className="px-4 py-2 rounded-2xl bg-[var(--brand)] text-black font-semibold">
              See Services
            </a>
            <a
              href="#portfolio"
              className="px-4 py-2 rounded-2xl border border-black/10 dark:border-white/20">
              View Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
