# Build Pipeline

## Overview

The site uses Astro's static build mode. Every page is pre-rendered to HTML at build time. There is no server-side rendering at request time (except for Cloudflare Pages Functions, which handle the contact form separately).

## Build Steps

1. **Content Loading.** Vite's `import.meta.glob` eagerly loads all JSON files from `src/content/`. Each file is validated against its Zod schema. Invalid files produce a build error with the file path and specific validation failure.

2. **Page Rendering.** Astro renders each `.astro` file to static HTML. React components marked with `client:visible` or `client:load` are bundled separately as client-side JavaScript islands.

3. **CSS Processing.** Tailwind CSS processes all utility classes found in templates. Custom CSS from `src/styles/global.css` is included. The output is a single optimized stylesheet.

4. **Asset Handling.** Files in `public/` are copied directly to `dist/` without processing. Images, fonts, and other static assets retain their original paths.

5. **Output.** The final output is written to `dist/`. This directory contains all HTML pages, CSS, JavaScript bundles, and static assets ready for deployment.

## Build Command

```
npm run build
```

## Build Output

The build produces a complete static site in `dist/`:

- HTML files for every route (e.g., `dist/index.html`, `dist/work/venturely/index.html`)
- Hashed CSS and JavaScript bundles in `dist/_astro/`
- All public assets in their original paths (e.g., `dist/images/projects/venturely.svg`)
- A `sitemap-index.xml` for search engines

## Dynamic Routes

Pages using bracket notation like `[slug].astro` export a `getStaticPaths()` function that returns all valid slugs at build time. Astro generates one HTML file per slug. If a content JSON file has `"published": false`, it is excluded from the paths.

## Cloudflare Pages Functions

The `functions/` directory is not part of the Astro build. Cloudflare Pages deploys these functions separately as edge workers. They are invoked at request time, not build time. The only function currently is the contact form API at `functions/api/contact.ts`.

## Environment Variables

The build respects the `SITE_URL` environment variable for generating absolute URLs in the sitemap and SEO metadata. If not set, it falls back to `https://example.com`. See [Environment Variables](../deployment/environment-variables.md).
