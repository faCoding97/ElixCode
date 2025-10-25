// src/components/FancyQR.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
// @ts-ignore
import QRCodeStyling from "qr-code-styling";

type FancyQRProps = {
  value: string;
  maxSize?: number;
  minSize?: number;
  dotStyle?: "square" | "rounded" | "dots";
  fg?: string;
  bg?: string;
  withMargin?: boolean;
  logoUrl?: string;
  logoRadius?: number;
  logoRatio?: number; // 0..1
  logoBg?: string;
};

/** کش ساده برای data URL لوگوها */
const logoCache = new Map<string, string>();
async function toDataURL(url: string): Promise<string> {
  if (url.startsWith("data:")) return url;
  const abs = new URL(url, window.location.origin).toString();
  if (logoCache.has(abs)) return logoCache.get(abs)!;
  const res = await fetch(abs, {
    credentials: "same-origin",
    cache: "force-cache",
  });
  const blob = await res.blob();
  const reader = new FileReader();
  const dataUrl = await new Promise<string>((resolve) => {
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
  logoCache.set(abs, dataUrl);
  return dataUrl;
}

export default function FancyQR({
  value,
  maxSize = 220,
  minSize = 120,
  dotStyle = "rounded",
  fg,
  bg,
  withMargin = true,
  logoUrl,
  logoRadius = 12,
  logoRatio = 0.35,
  logoBg,
}: FancyQRProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<any>(null);
  const [renderSize, setRenderSize] = useState<number>(maxSize);
  const [ready, setReady] = useState(false);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);

  // رنگ‌ها از CSS vars اگر پاس ندادی
  const colors = useMemo(() => {
    if (typeof window === "undefined") {
      return { fg: fg || "#111827", bg: bg || "#ffffff", surface: "#ffffff" };
    }
    const cs = getComputedStyle(document.documentElement);
    return {
      fg: fg || cs.getPropertyValue("--fg")?.trim() || "#111827",
      bg: bg || cs.getPropertyValue("--surface")?.trim() || "#ffffff",
      surface: cs.getPropertyValue("--surface")?.trim() || "#ffffff",
    };
  }, [fg, bg]);

  const dotsType =
    dotStyle === "rounded"
      ? "rounded"
      : dotStyle === "dots"
      ? "dots"
      : "square";

  // 0) آماده‌سازی data URL لوگو (اگر لوگو خواسته شده)
  useEffect(() => {
    let isAlive = true;
    (async () => {
      if (!logoUrl) {
        if (isAlive) setLogoDataUrl(null);
        return;
      }
      try {
        const dataUrl = await toDataURL(logoUrl);
        if (isAlive) setLogoDataUrl(dataUrl);
      } catch {
        if (isAlive) setLogoDataUrl(null);
      }
    })();
    return () => {
      isAlive = false;
    };
  }, [logoUrl]);

  // 1) ریسپانسیو
  useEffect(() => {
    if (!shellRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const cw = Math.floor(e.contentRect.width);
        const usable = Math.max(0, cw - 12); // padding تقریبی
        const next = Math.max(minSize, Math.min(maxSize, usable));
        setRenderSize(next);
      }
    });
    ro.observe(shellRef.current);
    return () => ro.disconnect();
  }, [minSize, maxSize]);

  // 2) ساخت QR اولیه
  useEffect(() => {
    if (!mountRef.current) return;

    qrRef.current = new QRCodeStyling({
      width: renderSize,
      height: renderSize,
      type: "svg",
      data: value,
      margin: withMargin ? 6 : 0,
      qrOptions: { errorCorrectionLevel: "Q" },
      dotsOptions: { type: dotsType, color: colors.fg },
      backgroundOptions: { color: colors.bg },
      cornersSquareOptions: { type: "extra-rounded", color: colors.fg },
      cornersDotOptions: { type: "dot", color: colors.fg },
    });

    qrRef.current.append(mountRef.current);
    setReady(true);

    return () => {
      if (mountRef.current) mountRef.current.innerHTML = "";
      qrRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // فقط بار اول

  // 3) آپدیت + تزریق لوگو
  useEffect(() => {
    if (!qrRef.current) return;

    qrRef.current.update({
      data: value,
      width: renderSize,
      height: renderSize,
      margin: withMargin ? 6 : 0,
      dotsOptions: { type: dotsType, color: colors.fg },
      backgroundOptions: { color: colors.bg },
      cornersSquareOptions: { type: "extra-rounded", color: colors.fg },
      cornersDotOptions: { type: "dot", color: colors.fg },
    });

    const id = requestAnimationFrame(() => injectRoundedLogo());
    return () => cancelAnimationFrame(id);
  }, [
    value,
    renderSize,
    withMargin,
    dotsType,
    colors.fg,
    colors.bg,
    logoDataUrl, // ⬅️ مهم: وقتی data URL آماده شد دوباره تزریق کن
    logoRadius,
    logoRatio,
    logoBg,
  ]);

  function ensureNamespacesAndViewBox(svg: SVGSVGElement) {
    if (!svg.getAttribute("xmlns"))
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    if (!svg.getAttribute("xmlns:xlink"))
      svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    if (!svg.getAttribute("viewBox")) {
      const w = parseFloat(svg.getAttribute("width") || "") || renderSize;
      const h = parseFloat(svg.getAttribute("height") || "") || renderSize;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    }
  }

  function injectRoundedLogo() {
    if (!mountRef.current) return;
    const svg = mountRef.current.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;

    // پاکسازی قبلی
    Array.from(svg.querySelectorAll('[data-elx^="logo"]')).forEach((n) =>
      n.parentNode?.removeChild(n)
    );

    if (!logoDataUrl) return; // تا وقتی data URL آماده نشده، چیزی تزریق نکن

    ensureNamespacesAndViewBox(svg);

    const svgNS = "http://www.w3.org/2000/svg";

    // ابعاد از viewBox
    let W = renderSize,
      H = renderSize;
    const vb = svg.getAttribute("viewBox");
    if (vb) {
      const [, , vw, vh] = vb.split(/\s+/).map(Number);
      if (vw && vh) {
        W = vw;
        H = vh;
      }
    }

    const L = Math.max(8, Math.min(W, H) * (logoRatio ?? 0.35));
    const x = (W - L) / 2;
    const y = (H - L) / 2;

    let defs = svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS(svgNS, "defs");
      svg.insertBefore(defs, svg.firstChild);
    }
    const clipId = `elxLogoClip_${Math.random().toString(36).slice(2, 9)}`;
    const cp = document.createElementNS(svgNS, "clipPath");
    cp.setAttribute("id", clipId);
    cp.setAttribute("data-elx", "logo-clip");
    cp.setAttribute("clipPathUnits", "userSpaceOnUse");
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", String(x));
    rect.setAttribute("y", String(y));
    rect.setAttribute("width", String(L));
    rect.setAttribute("height", String(L));
    rect.setAttribute("rx", String(logoRadius));
    rect.setAttribute("ry", String(logoRadius));
    cp.appendChild(rect);
    defs.appendChild(cp);

    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("data-elx", "logo-wrap");

    const bgRect = document.createElementNS(svgNS, "rect");
    bgRect.setAttribute("x", String(x));
    bgRect.setAttribute("y", String(y));
    bgRect.setAttribute("width", String(L));
    bgRect.setAttribute("height", String(L));
    bgRect.setAttribute("rx", String(logoRadius));
    bgRect.setAttribute("ry", String(logoRadius));
    bgRect.setAttribute("fill", logoBg || colors.surface || "#ffffff");
    bgRect.setAttribute("data-elx", "logo-bg");
    g.appendChild(bgRect);

    const img = document.createElementNS(svgNS, "image");
    (img as any).setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "href",
      logoDataUrl
    );
    img.setAttribute("href", logoDataUrl);
    img.setAttribute("x", String(x));
    img.setAttribute("y", String(y));
    img.setAttribute("width", String(L));
    img.setAttribute("height", String(L));
    img.setAttribute("preserveAspectRatio", "xMidYMid slice");
    img.setAttribute("clip-path", `url(#${clipId})`);
    img.setAttribute("data-elx", "logo");
    g.appendChild(img);

    svg.appendChild(g);
  }

  // دانلود SVG
  async function downloadSVG(filename = "ElixCode-qr.svg") {
    if (!mountRef.current) return;
    const svg = mountRef.current.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;
    ensureNamespacesAndViewBox(svg);
    const s = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([s], { type: "image/svg+xml;charset=utf-8" });
    triggerDownload(blob, filename);
  }

  // دانلود PNG — چون لوگو data URL است، دیگر مشکل نداریم
  async function downloadPNG(filename = "ElixCode-qr.png", scale = 3) {
    if (!mountRef.current) return;
    const svg = mountRef.current.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;

    ensureNamespacesAndViewBox(svg);

    // ابعاد از viewBox
    let W = renderSize,
      H = renderSize;
    const vb = svg.getAttribute("viewBox");
    if (vb) {
      const [, , vw, vh] = vb.split(/\s+/).map(Number);
      if (vw && vh) {
        W = vw;
        H = vh;
      }
    }

    const s = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([s], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    try {
      const img = new Image();
      img.decoding = "sync";
      img.src = svgUrl; // کل منابع داخل خود SVG اینکد شده‌اند
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = (e) => rej(e);
      });

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(W * scale));
      canvas.height = Math.max(1, Math.floor(H * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const pngBlob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b as Blob), "image/png", 0.95)
      );
      triggerDownload(pngBlob, filename);
    } finally {
      URL.revokeObjectURL(svgUrl);
    }
  }

  function triggerDownload(blob: Blob, filename: string) {
    const urlb = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlb;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(urlb), 0);
  }

  return (
    <div ref={shellRef} className="w-full max-w-full overflow-hidden">
      <div className="rounded-2xl p-3 bg-[var(--surface)] border border-black/10 dark:border-white/10 shadow-sm mx-auto flex items-center justify-center">
        <div ref={mountRef} style={{ width: renderSize, height: renderSize }} />
      </div>

      <div className="mt-3 flex gap-2">
        <button
          disabled={!ready}
          onClick={() => downloadSVG()}
          className="px-3 py-2 rounded-xl bg-[var(--brand)] text-black font-semibold disabled:opacity-50">
          SVG
        </button>
        <button
          disabled={!ready}
          onClick={() => downloadPNG()}
          className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 disabled:opacity-50">
          PNG
        </button>
      </div>
    </div>
  );
}
