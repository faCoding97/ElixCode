import { QRCodeSVG } from "qrcode.react";
import { useMemo, useRef } from "react";

export default function PostQR({ url }: { url: string }) {
  // به جای ref مستقیم، یک رَپِر می‌گیریم و داخلش svg را پیدا می‌کنیم
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const filenameBase = useMemo(() => {
    try {
      const u = new URL(url);
      const path =
        u.pathname.replace(/\W+/g, "-").replace(/^-+|-+$/g, "") || "post";
      return `post-qr-${u.hostname}-${path}`;
    } catch {
      return "post-qr";
    }
  }, [url]);

  const downloadSVG = () => {
    const svg = wrapRef.current?.querySelector("svg");
    if (!svg) return;

    // اطمینان از namespace برای سازگاری مرورگرها
    if (!svg.getAttribute("xmlns")) {
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    }

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    triggerDownload(blob, `${filenameBase}.svg`);
  };

  const downloadPNG = async () => {
    if (!wrapRef.current) return;
    downloadPNGFromWrap(wrapRef.current, filenameBase + ".png", 3); // scale=3 برای شارپ‌تر
  };

  function triggerDownload(blob: Blob, filename: string) {
    const urlb = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlb;
    a.download = filename;
    document.body.appendChild(a); // سافاری گاهی لازم دارد در DOM باشد
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(urlb), 0);
  }

  async function downloadPNGFromWrap(
    wrapEl: HTMLDivElement,
    filename: string,
    scale = 2
  ) {
    const svg = wrapEl?.querySelector("svg");
    if (!svg) return;

    // 1) SVG استاندارد: namespace و ابعاد
    if (!svg.getAttribute("xmlns"))
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    let w = parseInt(svg.getAttribute("width") || "", 10);
    let h = parseInt(svg.getAttribute("height") || "", 10);
    if (!w || !h) {
      const bb = svg.getBBox?.();
      w = bb?.width ? Math.ceil(bb.width) : 160;
      h = bb?.height ? Math.ceil(bb.height) : 160;
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));
    }

    // 2) Serialize → Blob → Blob URL (پایدارتر از base64)
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    try {
      // 3) Load to Image
      const img = new Image();
      img.decoding = "sync";
      const loaded = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (e) => reject(e);
      });
      img.src = svgUrl;
      await loaded;

      // 4) Draw on canvas (با scale برای رزولوشن بالاتر)
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(w * scale));
      canvas.height = Math.max(1, Math.floor(h * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.drawImage(img, 0, 0);

      // 5) canvas → Blob (PNG) → دانلود
      const pngBlob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b as Blob), "image/png", 0.95)
      );
      const dlUrl = URL.createObjectURL(pngBlob);
      const a = document.createElement("a");
      a.href = dlUrl;
      a.download = filename.endsWith(".png") ? filename : `${filename}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(dlUrl);
    } finally {
      URL.revokeObjectURL(svgUrl);
    }
  }

  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Wrapper برای گرفتن svg واقعی */}
        <div ref={wrapRef}>
          <QRCodeSVG value={url} size={160} includeMargin />
        </div>
        <div className="text-sm min-w-0">
          <div className="font-semibold">Scan to open this article</div>
          <div className="opacity-80 break-all">{url}</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={downloadSVG}
          className="px-3 py-2 rounded-xl bg-[var(--brand)] text-white font-semibold">
          Download SVG
        </button>
        <button
          onClick={downloadPNG}
          className="px-3 py-2 rounded-xl border border-white dark:border-white/10">
          PNG
        </button>
      </div>
    </div>
  );
}
