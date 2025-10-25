// src/components/QRTool.tsx
import { useMemo, useState } from "react";
import FancyQR from "./FancyQR";

export default function QRTool({ defaultUrl }: { defaultUrl?: string }) {
  const [url, setUrl] = useState(defaultUrl || "https://ElixCode.com/");
  const [utm, setUtm] = useState(false);
  const [style, setStyle] = useState<"rounded" | "dots" | "square">("rounded");
  const [withLogo, setWithLogo] = useState(true);

  const fullUrl = useMemo(() => {
    const base = url.trim();
    if (!utm) return base;
    return `${base}${
      base.includes("?") ? "&" : "?"
    }utm_source=qr&utm_medium=print&utm_campaign=ElixCode`;
  }, [url, utm]);

  const valid = /^https:\/\/[\w\W]+$/i.test(fullUrl);

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-lg">QR Generator</h3>
      <p className="opacity-80 text-sm">
        Rounded, brand-colored, logo-ready QR.
      </p>

      {/* Controls */}
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
        <input
          className="w-full rounded-xl px-3 py-2 outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://ElixCode.com/"
          pattern="https://.*"
        />

        <label className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-black/10 dark:border-white/10">
          <input
            type="checkbox"
            checked={utm}
            onChange={(e) => setUtm(e.target.checked)}
            className="accent-current"
          />
          <span>UTM</span>
        </label>

        <select
          className="w-full rounded-xl px-3 py-2 text-sm outline-none"
          value={style}
          onChange={(e) => setStyle(e.target.value as any)}>
          <option value="rounded">Rounded</option>
          <option value="dots">Dots</option>
          <option value="square">Square</option>
        </select>

        <label className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-black/10 dark:border-white/10">
          <input
            type="checkbox"
            checked={withLogo}
            onChange={(e) => setWithLogo(e.target.checked)}
            className="accent-current"
          />
          <span>Logo</span>
        </label>
      </div>

      {/* Preview */}
      <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <FancyQR
          value={fullUrl}
          maxSize={220}
          minSize={120}
          dotStyle={style}
          withMargin
          logoUrl={withLogo ? "/images/logo.svg" : undefined} // FancyQR خودش به data URL تبدیل می‌کند
          logoRadius={8}
          logoRatio={0.2}
        />
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
