# Project Structure

```
portfolio/
  astro.config.mjs        Astro configuration (output mode, integrations, Vite plugins)
  tsconfig.json            TypeScript configuration with path aliases
  package.json             Dependencies and scripts
  wrangler.toml            Cloudflare Pages configuration
  public/                  Static assets served as-is at the site root
    favicon.svg            Site favicon
    robots.txt             Search engine crawl directives
    og-default.svg         Default Open Graph image
    images/                All images organized by category
      about/               Profile and about page images
      logos/               Media outlet logo SVGs
      projects/            Project logo SVGs and icons
      impact/              Impact page images
      travel/              Travel page images
    placeholders/          Placeholder images for empty states
  functions/               Cloudflare Pages Functions (server-side)
    api/
      contact.ts           Contact form API endpoint
    lib/
      email/               Email sending infrastructure
        index.ts           Provider factory
        types.ts           Shared types
        templates.ts       HTML and plain text email templates
        providers/
          resend.ts        Resend email provider
          postmark.ts      Postmark email provider
  src/
    layouts/
      BaseLayout.astro     Root layout (head, header, main, footer)
    components/
      layout/              Structural components (Header, Footer, SeoHead)
      ui/                  Reusable UI primitives (PillList, EmptyState, etc.)
      motion/              React animation components (ScrollParallax, MediaModal, etc.)
      contact/             Contact form React component
      sections/            Card components for press, projects, writing
      work/                Work page filter component
    pages/                 File-based routes
      index.astro          Homepage
      about.astro          About page
      contact.astro        Contact page
      impact.astro         Impact and community page
      life.astro           Travel, reading, and personal interests
      now.astro            Current focus page
      404.astro            Not found page
      sitemap-index.xml.ts Sitemap generator
      work/
        index.astro        Work listing page
        [slug].astro       Individual project detail page
      press/
        index.astro        Press and media listing page
        [slug].astro       Individual press entry detail page
      writing/
        [slug].astro       Individual writing entry page
    content/               JSON content collections
      projects/            Project entries (one JSON file per project)
      press/               Press and media entries
      writing/             Long-form writing entries
      mentorship/          Impact and community entries
      travel/              Travel entries
      books/               Book entries
      photos/              Photo entries
    data/                  Global site configuration
      site.json            Core identity, bio, timeline, endorsements
      navigation.json      Header and footer navigation links
      seo.json             Default SEO metadata
      socials.json         Social media links
    lib/                   Shared utilities
      content/
        schemas.ts         Zod validation schemas for all content types
        loaders.ts         Content collection loaders with validation and sorting
      site-data.ts         Validated exports of site.json, navigation, SEO, socials
      tech-logos.ts        Technology name to CDN logo URL mapping
      text.ts              Text utility functions
    styles/
      global.css           All styles: tokens, components, layout, themes
```

## Key Conventions

**Content lives in JSON.** Every content type (projects, press, travel, etc.) is a JSON file validated against a Zod schema at build time. Invalid content produces a clear build error.

**Pages are Astro components.** Each `.astro` file in `src/pages/` is a route. Dynamic routes use bracket notation like `[slug].astro`.

**React is used selectively.** Only interactive components (contact form, modals, animations) use React. Static pages are pure Astro.

**Styles are centralized.** All CSS lives in `src/styles/global.css` with design tokens, component classes, and theme overrides in one file.

**Server-side code is in `functions/`.** Cloudflare Pages Functions handle the contact form API. They run on Cloudflare's edge network, not during the static build.
