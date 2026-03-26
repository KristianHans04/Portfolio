# KristianHans04 — Portfolio

Production-ready portfolio and biography system built with:

- Astro
- TypeScript
- Tailwind CSS v4
- React islands only for interactive areas
- Motion for interactive transitions
- Cloudflare Pages + Pages Functions
- Cloudflare Turnstile
- Resend email provider with a swappable Postmark provider implementation

## Quick Start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Run Cloudflare Pages locally with functions:

```bash
npm run build
npm run cf:dev
```

## Project Tree

```text
.
├── astro.config.mjs
├── functions
│   ├── api
│   │   └── contact.ts
│   └── lib
│       └── email
│           ├── index.ts
│           ├── templates.ts
│           ├── types.ts
│           └── providers
│               ├── postmark.ts
│               └── resend.ts
├── public
│   ├── favicon.svg
│   ├── og-default.svg
│   └── robots.txt
├── src
│   ├── components
│   │   ├── contact
│   │   │   └── ContactForm.tsx
│   │   ├── layout
│   │   │   ├── Footer.astro
│   │   │   ├── Header.astro
│   │   │   └── SeoHead.astro
│   │   ├── motion
│   │   │   └── ParallaxPhotoStrip.tsx
│   │   ├── sections
│   │   │   ├── PressCard.astro
│   │   │   ├── ProjectCard.astro
│   │   │   └── WritingCard.astro
│   │   ├── ui
│   │   │   ├── EmptyState.astro
│   │   │   ├── PillList.astro
│   │   │   └── SectionHeading.astro
│   │   └── work
│   │       └── WorkFilter.tsx
│   ├── content
│   │   ├── books
│   │   ├── mentorship
│   │   ├── photos
│   │   ├── press
│   │   ├── projects
│   │   ├── travel
│   │   └── writing
│   ├── data
│   │   ├── navigation.json
│   │   ├── seo.json
│   │   ├── site.json
│   │   └── socials.json
│   ├── layouts
│   │   └── BaseLayout.astro
│   ├── lib
│   │   ├── content
│   │   │   ├── loaders.ts
│   │   │   └── schemas.ts
│   │   ├── site-data.ts
│   │   └── text.ts
│   ├── pages
│   │   ├── 404.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── impact.astro
│   │   ├── index.astro
│   │   ├── life.astro
│   │   ├── now.astro
│   │   ├── sitemap-index.xml.ts
│   │   ├── press
│   │   │   ├── [slug].astro
│   │   │   └── index.astro
│   │   ├── work
│   │   │   ├── [slug].astro
│   │   │   └── index.astro
│   │   └── writing
│   │       └── [slug].astro
│   └── styles
│       └── global.css
└── wrangler.toml
```

## Cloudflare Pages Deployment

1. Push this repository to GitHub.
2. In Cloudflare Pages, create a new project from that repo.
3. Use these build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Add all required environment variables in Pages project settings.
5. Deploy.

Cloudflare Pages automatically picks up the `functions/` directory and exposes `/api/contact`.

## Required Environment Variables

### Public (available to browser)

- `PUBLIC_TURNSTILE_SITE_KEY`

### Server-side (Cloudflare Pages Functions)

- `TURNSTILE_SECRET_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_ACK_FROM_EMAIL` (optional, defaults to `CONTACT_FROM_EMAIL`)
- `EMAIL_PROVIDER` (`resend` or `postmark`)
- `RESEND_API_KEY` (required when `EMAIL_PROVIDER=resend`)
- `POSTMARK_SERVER_TOKEN` (required when `EMAIL_PROVIDER=postmark`)

## JSON Files You Must Fill With Real Data

- `src/data/site.json`
- `src/data/navigation.json`
- `src/data/seo.json`
- `src/data/socials.json`
- `src/content/projects/*.json`
- `src/content/press/*.json`
- `src/content/writing/*.json`
- `src/content/mentorship/*.json`
- `src/content/travel/*.json`
- `src/content/books/*.json`
- `src/content/photos/*.json`

Every file is validated by Zod schemas in `src/lib/content/schemas.ts`.
