# ElixCode — Next.js Portfolio (Pages Router)

## Run

```bash
npm install
npm run dev
```

## ENV (.env.local)

```
SHEETS_WEBHOOK_URL=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
NOTIFY_TO=facoding97@gmail.com
NOTIFY_FROM="ElixCode <no-reply@ElixCode.com>"
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_ORIGIN=https://ElixCode.com
```

## Features

- Floating sticky navbar with mobile hamburger, route-aware active link, and inside-header progress bar
- Hero with endless code-typing canvas (light-mode readability tuned)
- Services & Portfolio sections (smooth-scroll from navbar)
- Portfolio details at `/portfolio/[slug]`
- Blog with 3 posts, deterministic dates (no hydration mismatch), RSS at `/blog/rss.xml`
- Contactus with embedded QR tool and serverless contact form (SMTP + webhook)
- QR generator page (`/qr`) for SVG download
- Theme toggle (system auto-detect + localStorage)
- SEO: meta, OG, canonical, JSON-LD (Organization + Article)
- Public `robots.txt` and `sitemap.xml`
- Tailwind + next/font (Inter, JetBrains Mono)

```

```
