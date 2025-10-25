import { useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRTool({ defaultUrl }: { defaultUrl?: string }) {
  const [url, setUrl] = useState(defaultUrl || "https://ElixCode.com/");
  const [utm, setUtm] = useState(false);

  // به‌جای ref مستقیم به QRCodeSVG، یک container می‌گیریم و داخلش svg را پیدا می‌کنیم
  const svgWrapRef = useRef<HTMLDivElement | null>(null);

  const fullUrl = useMemo(() => {
    const base = url.trim();
    if (!utm) return base;
    return `${base}${
      base.includes("?") ? "&" : "?"
    }utm_source=qr&utm_medium=print&utm_campaign=ElixCode`;
  }, [url, utm]);

  const valid = /^https:\/\/[\w\W]+$/i.test(fullUrl);

  const downloadSVG = () => {
    const svg = svgWrapRef.current?.querySelector("svg");
    if (!svg) return;
    // اطمینان از namespace برای سازگاری مرورگرها
    if (!svg.getAttribute("xmlns")) {
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    }
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    triggerDownload(blob, makeFilename("svg"));
  };

  const downloadPNG = async () => {
    if (!svgWrapRef.current) return;
    downloadPNGFromWrap(svgWrapRef.current, makeFilename("png"), 3);
  };

  function triggerDownload(blob: Blob, filename: string) {
    const urlb = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlb;
    a.download = filename;
    // Safari بعضی وقت‌ها نیاز دارد element در DOM باشد
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(urlb), 0);
  }

  function makeFilename(ext: "svg" | "png") {
    try {
      const u = new URL(fullUrl);
      const path =
        u.pathname.replace(/\W+/g, "-").replace(/^-+|-+$/g, "") || "home";
      return `ElixCode-qr-${u.hostname}-${path}.${ext}`;
    } catch {
      return `ElixCode-qr.${ext}`;
    }
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
    <div className="card p-6">
      <h3 className="font-semibold text-lg">QR Generator</h3>
      <p className="opacity-80 text-sm">
        Generate QR codes for ElixCode pages. HTTPS only.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          className="w-full rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://ElixCode.com/"
          pattern="https://.*"
        />

        <label
          htmlFor="utm"
          className="flex flex-wrap items-center gap-2 text-sm px-2 py-2 md:p-0 border border-black/10 dark:border-white/10 md:border-0 rounded-xl">
          <input
            id="utm"
            type="checkbox"
            checked={utm}
            onChange={(e) => setUtm(e.target.checked)}
            className="accent-current"
          />
          <span>Add UTM</span>
        </label>

        <div className="flex gap-2 justify-self-start md:justify-self-end">
          <button
            onClick={downloadSVG}
            disabled={!valid}
            className={`px-3 py-2 rounded-xl font-semibold ${
              valid
                ? "bg-[var(--brand)] text-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 cursor-not-allowed"
            }`}>
            Download SVG
          </button>
          <button
            onClick={downloadPNG}
            disabled={!valid}
            className={`px-3 py-2 rounded-xl font-semibold ${
              valid
                ? "border border-black/10 dark:border-white/10"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}>
            PNG
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Wrapper برای گرفتن svg واقعی */}
        <div ref={svgWrapRef}>
          <QRCodeSVG value={fullUrl} size={160} includeMargin />
        </div>
        <div className="text-xs opacity-80 break-all select-all">{fullUrl}</div>
      </div>

      {!valid && (
        <div className="mt-3 text-xs text-red-600 dark:text-red-400">
          URL must start with <code>https://</code>
        </div>
      )}
    </div>
  );
}
