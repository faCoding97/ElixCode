import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRTool({ defaultUrl }: { defaultUrl?: string }) {
  const [url, setUrl] = useState(defaultUrl || "https://ElixCode.com/");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [utm, setUtm] = useState(false);

  const fullUrl = utm
    ? `${url}${
        url.includes("?") ? "&" : "?"
      }utm_source=qr&utm_medium=print&utm_campaign=ElixCode`
    : url;

  const onDownload = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const urlb = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlb;
    a.download = "ElixCode-qr.svg";
    a.click();
    URL.revokeObjectURL(urlb);
  };

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-lg">QR Generator</h3>
      <p className="opacity-80 text-sm">
        Generate SVG QR codes for ElixCode pages. Only HTTPS URLs are allowed.
      </p>

      {/* کنترل‌ها: در موبایل ستونی؛ از md سه‌ستونه */}
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://ElixCode.com/"
          pattern="https://.*"
        />

        {/* چک‌باکس ریسپانسیو و قابل شکستن متن */}
        <label
          htmlFor="utm"
          className="flex flex-wrap items-center gap-2 text-sm px-2 py-2 md:p-0 border border-black/10 md:border-0 rounded-xl">
          <input
            id="utm"
            type="checkbox"
            checked={utm}
            onChange={(e) => setUtm(e.target.checked)}
            className="accent-current"
          />
          <span>Add UTM</span>
        </label>

        <button
          onClick={onDownload}
          className="px-3 py-2 rounded-xl bg-[var(--brand)] text-white font-semibold justify-self-start md:justify-self-end">
          Download SVG
        </button>
      </div>

      {/* پیش‌نمایش */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <QRCodeSVG
          value={fullUrl}
          size={160}
          includeMargin
          ref={svgRef as any}
        />
        <div className="text-xs opacity-80 break-all select-all">{fullUrl}</div>
      </div>
    </div>
  );
}
