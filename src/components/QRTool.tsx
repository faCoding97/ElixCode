import { useEffect, useRef, useState } from "react";
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
      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <input
          className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://ElixCode.com/"
          pattern="https://.*"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={utm}
            onChange={(e) => setUtm(e.target.checked)}
          />
          Add UTM
        </label>
        <button
          onClick={onDownload}
          className="px-3 py-2 rounded-xl bg-[var(--brand)] text-black font-semibold">
          Download SVG
        </button>
      </div>
      <div className="mt-4 flex items-center gap-6">
        <QRCodeSVG
          value={fullUrl}
          size={160}
          includeMargin
          ref={svgRef as any}
        />
        <div className="text-xs opacity-80 break-all">{fullUrl}</div>
      </div>
    </div>
  );
}
