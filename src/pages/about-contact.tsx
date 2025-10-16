import Head from "next/head";
import QRTool from "@/components/QRTool";
import { useState } from "react";

export default function AboutContact() {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://ElixCode.com";
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, any> = {};
    fd.forEach((v, k) => (payload[k] = v));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const j = await res.json();
    setLoading(false);
    setOk(
      j?.ok
        ? "Thanks — we'll get back to you shortly."
        : j?.message || "Something went wrong."
    );
    if (j?.ok) (e.currentTarget as any).reset();
  }

  return (
    <>
      <Head>
        <title>Contactus — ElixCode</title>
        <link rel="canonical" href={origin + "/Contactus"} />
      </Head>

      <main className="container py-16 md:py-24">
        <h1 className="text-2xl md:text-4xl font-bold">Contactus</h1>
        <p className="mt-2 opacity-80 max-w-3xl">
          ElixCode bridges South Africa and China—lean teams, fast delivery, and
          no-nonsense engineering. Ping us on WhatsApp (placeholder) or use the
          form. A QR generator is embedded on this page, too.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div className="card p-6">
            <h2 className="text-xl font-semibold">Contact Form</h2>
            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              {/* Honeypot */}
              <div className="hp-hidden">
                <label>Company</label>
                <input name="company" autoComplete="off" />
              </div>

              <label className="block">
                <span className="text-sm opacity-80">Your name</span>
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm opacity-80">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm opacity-80">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
                />
              </label>
              <button
                disabled={loading}
                className="px-4 py-2 rounded-2xl bg-[var(--brand)] text-black font-semibold">
                {loading ? "Sending..." : "Send"}
              </button>
              {ok && <p className="text-sm mt-2">{ok}</p>}
            </form>
          </div>

          <QRTool defaultUrl={origin + "/"} />
        </div>
      </main>
    </>
  );
}
