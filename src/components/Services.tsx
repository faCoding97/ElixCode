export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-2xl md:text-4xl font-bold">Our Services</h2>
        <p className="mt-2 opacity-80">
          We build powerful software — designed around your business, not
          templates.
        </p>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              t: "Websites & Online Stores",
              d: "Modern, fast, and mobile-friendly websites and e-commerce platforms built with Next.js. From landing pages to full online stores — designed to convert and scale.",
            },
            {
              t: "ERP / CRM / BPMS Solutions",
              d: "Smart business platforms to manage inventory, sales, HR, and workflows. We design ERP, CRM, and BPMS systems that fit how your company truly works.",
            },
            {
              t: "Automation & AI Tools",
              d: "Save time and reduce errors with intelligent automation. We connect systems, create smart triggers, and integrate AI for data analysis and process automation.",
            },
            {
              t: "Barcode, QR & IoT Systems",
              d: "Complete tracking systems with barcode or QR code generation, real-time scanning, and device integration for logistics, POS, and warehouse control.",
            },
            {
              t: "Integrations & APIs",
              d: "We make your systems talk to each other. From REST and GraphQL APIs to secure automation pipelines, we connect tools and data across your business.",
            },
            {
              t: "Custom Dashboards & Admin Panels",
              d: "Beautiful and easy-to-use control panels for your operations — with clear insights, analytics, and role-based access. Work smarter every day.",
            },
            {
              t: "Performance & Security Optimization",
              d: "Speed, safety, and stability matter. We audit, optimize, and secure your software for real-world conditions — so it stays fast and protected.",
            },
          ].map((x, i) => (
            <div
              key={i}
              className="card p-6 border border-black/10 rounded-xl bg-white/60 backdrop-blur shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold">{x.t}</h3>
              <p className="mt-2 opacity-90">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
