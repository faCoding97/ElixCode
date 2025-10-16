export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-2xl md:text-4xl font-bold">Services</h2>
        <p className="mt-2 opacity-80">Custom software — engineered, not assembled.</p>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {t:'Websites & E‑Commerce', d:'Next.js storefronts, blazing‑fast landing pages, custom checkouts, no CMS bloat.'},
            {t:'ERP / Inventory / HR / Attendance', d:'Tailored dashboards, permissioned roles, reporting, and offline‑friendly UIs.'},
            {t:'Barcode & QR Systems', d:'QR/Barcode generation and scanning pipelines integrated with inventory and POS.'},
            {t:'Integrations & APIs', d:'REST/GraphQL services, webhooks, and message queues that reliably scale.'},
            {t:'Custom Admin & Ops Tools', d:'Simple internal tools that save hours per week and reduce error rates.'},
            {t:'Performance & Hardening', d:'Profiling, caching, and security reviews for real-world conditions.'},
          ].map((x,i)=>(
            <div key={i} className="card p-6">
              <h3 className="text-lg font-semibold">{x.t}</h3>
              <p className="mt-2 opacity-90">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
