import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

export default function PostQR({ url }: { url: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const onDownload = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const urlb = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlb;
    a.download = "post-qr.svg";
    a.click();
    URL.revokeObjectURL(urlb);
  };

  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <QRCodeSVG value={url} size={160} includeMargin ref={svgRef as any} />
        <div className="text-sm">
          <div className="font-semibold">Scan to open this article</div>
          <div className="opacity-80 break-all">{url}</div>
        </div>
      </div>
      <div>
        <button
          onClick={onDownload}
          className="px-3 py-2 rounded-xl bg-[var(--brand)] text-white font-semibold">
          Download SVG
        </button>
      </div>
    </div>
  );
}
