"use client";

import { useEffect, useRef, useState } from "react";
// @ts-ignore — این پکیج تایپ رسمی نداره
import QRCodeStyling from "qr-code-styling";

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

export default function PostQR({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);

  // لوگو را یکبار به data URL تبدیل کن
  useEffect(() => {
    let isAlive = true;
    (async () => {
      try {
        const dataUrl = await toDataURL("/images/logo.svg"); // ← SVG شارپ‌تره
        if (isAlive) setLogoDataUrl(dataUrl);
      } catch {
        // fallback اختیاری
        if (isAlive) setLogoDataUrl(null);
      }
    })();
    return () => {
      isAlive = false;
    };
  }, []);

  // ساخت QR (بدون لوگوی داخلی)
  useEffect(() => {
    if (!ref.current) return;

    qrRef.current = new QRCodeStyling({
      width: 180,
      height: 180,
      type: "svg",
      data: url,
      margin: 6,
      qrOptions: { errorCorrectionLevel: "Q" },
      dotsOptions: { type: "rounded", color: "var(--fg, #111827)" },
      backgroundOptions: { color: "var(--surface, #ffffff)" },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "var(--fg, #111827)",
      },
      cornersDotOptions: { type: "dot", color: "var(--fg, #111827)" },
    });

    qrRef.current.append(ref.current);
    setReady(true);

    return () => {
      if (ref.current) ref.current.innerHTML = "";
      qrRef.current = null;
    };
  }, [url]);

  // تزریق لوگوی گرد وسط (وقتی logoDataUrl آماده شد)
  useEffect(() => {
    const id = requestAnimationFrame(() => injectLogo());
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, logoDataUrl]);

  function ensureNamespacesAndViewBox(svg: SVGSVGElement) {
    if (!svg.getAttribute("xmlns"))
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    if (!svg.getAttribute("xmlns:xlink"))
      svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    if (!svg.getAttribute("viewBox")) {
      const w = parseFloat(svg.getAttribute("width") || "") || 180;
      const h = parseFloat(svg.getAttribute("height") || "") || 180;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    }
  }

  function injectLogo() {
    if (!ref.current || !logoDataUrl) return;
    const svg = ref.current.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;

    // پاک‌سازی قبلی
    Array.from(svg.querySelectorAll("[data-elx-logo]")).forEach((n) =>
      n.remove()
    );

    ensureNamespacesAndViewBox(svg);

    const svgNS = "http://www.w3.org/2000/svg";

    // ابعاد واقعی از viewBox یا width/height
    const vb = svg.getAttribute("viewBox");
    let W = 180,
      H = 180;
    if (vb) {
      const [, , vw, vh] = vb.split(/\s+/).map(Number);
      if (vw && vh) {
        W = vw;
        H = vh;
      }
    } else {
      W = parseFloat(svg.getAttribute("width") || "180") || 180;
      H = parseFloat(svg.getAttribute("height") || "180") || 180;
    }

    const L = Math.min(W, H) * 0.22; // ~35%
    const x = (W - L) / 2;
    const y = (H - L) / 2;
    const radius = Math.max(6, L * 0.15);

    // defs + clipPath با userSpaceOnUse
    const defs =
      svg.querySelector("defs") ||
      svg.insertBefore(document.createElementNS(svgNS, "defs"), svg.firstChild);
    const clipId = "postLogoClip";
    const cp = document.createElementNS(svgNS, "clipPath");
    cp.setAttribute("id", clipId);
    cp.setAttribute("data-elx-logo", "true");
    cp.setAttribute("clipPathUnits", "userSpaceOnUse");
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", String(x));
    rect.setAttribute("y", String(y));
    rect.setAttribute("width", String(L));
    rect.setAttribute("height", String(L));
    rect.setAttribute("rx", String(radius));
    rect.setAttribute("ry", String(radius));
    cp.appendChild(rect);
    defs.appendChild(cp);

    // زمینه سفید
    const bgRect = document.createElementNS(svgNS, "rect");
    bgRect.setAttribute("x", String(x));
    bgRect.setAttribute("y", String(y));
    bgRect.setAttribute("width", String(L));
    bgRect.setAttribute("height", String(L));
    bgRect.setAttribute("rx", String(radius));
    bgRect.setAttribute("ry", String(radius));
    bgRect.setAttribute("fill", "#f9fafb");
    bgRect.setAttribute("data-elx-logo", "true");
    svg.appendChild(bgRect);

    // لوگو — حالا data URL
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
    img.setAttribute("data-elx-logo", "true");
    svg.appendChild(img);
  }

  // خروجی‌گرفتن از SVG/PNG — حالا چون لوگو data URL است، PNG هم درست می‌شود
  const download = async (ext: "svg" | "png") => {
    if (!ref.current) return;
    const svg = ref.current.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;

    ensureNamespacesAndViewBox(svg);

    if (ext === "svg") {
      const s = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([s], { type: "image/svg+xml;charset=utf-8" });
      triggerDownload(blob, "post-qr.svg");
      return;
    }

    // PNG
    const s = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([s], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const vb = svg.getAttribute("viewBox");
    let W = 180,
      H = 180;
    if (vb) {
      const [, , vw, vh] = vb.split(/\s+/).map(Number);
      if (vw && vh) {
        W = vw;
        H = vh;
      }
    } else {
      W = parseFloat(svg.getAttribute("width") || "180") || 180;
      H = parseFloat(svg.getAttribute("height") || "180") || 180;
    }

    const scale = 3;
    const img = new Image();
    img.decoding = "sync";
    img.src = svgUrl; // نیازی به crossOrigin نیست چون کل SVG درون blob ماست
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(W * scale));
      canvas.height = Math.max(1, Math.floor(H * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (b) => {
          if (b) triggerDownload(b, "post-qr.png");
          URL.revokeObjectURL(svgUrl);
        },
        "image/png",
        0.95
      );
    };
  };

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
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div
          ref={ref}
          className="rounded-2xl p-3 bg-[var(--surface)] border border-black/10 dark:border-white/10 shadow-sm flex items-center justify-center"
          style={{ width: 192, height: 192, placeItems: "center" }}
        />
        <div className="text-sm min-w-0">
          <div className="font-semibold">Scan to open this article</div>
          <div className="opacity-80 break-all">{url}</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          disabled={!ready}
          onClick={() => download("svg")}
          className="px-3 py-2 rounded-xl bg-[var(--brand)] text-black font-semibold disabled:opacity-50">
          Download SVG
        </button>
        <button
          disabled={!ready}
          onClick={() => download("png")}
          className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 disabled:opacity-50">
          PNG
        </button>
      </div>
    </div>
  );
}
