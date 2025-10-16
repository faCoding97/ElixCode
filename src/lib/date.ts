// Deterministic date formatting to avoid SSR/CSR mismatch
export function formatDateYMD(dateStr: string) {
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}/${m[2]}/${m[3]}`;
  const d = new Date(dateStr);
  const y = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${y}/${mm}/${dd}`;
}
