# Development Workflow

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the local development server with hot reload |
| `npm run build` | Generate the static production build into `dist/` |
| `npm run preview` | Serve the production build locally for verification |
| `npm run check` | Run the Astro type checker |
| `npm run cf:dev` | Run the Cloudflare Pages local dev server with Functions support |
| `npm run cf:deploy` | Deploy to Cloudflare Pages (requires project name configuration) |

## Development Server

The dev server supports hot module replacement. Changes to Astro components, React components, CSS, and JSON content files are reflected immediately in the browser without a full page reload.

## Cloudflare Functions Locally

The standard `npm run dev` command does not execute Cloudflare Pages Functions (such as the contact form API). To test server-side functionality locally, use:

```
npm run build && npm run cf:dev
```

This builds the site and starts the Wrangler local server, which runs Functions from the `functions/` directory against the static output in `dist/`.

## Adding Content

Most day-to-day updates involve editing JSON files in `src/content/` and `src/data/`. No code changes are needed for routine content updates. See [Content Overview](../content/overview.md) for details.

## Adding New Pages

Create a new `.astro` file in `src/pages/`. Astro uses file-based routing, so `src/pages/example.astro` becomes `/example` on the site. Use `BaseLayout` as the wrapping layout to inherit the header, footer, SEO, and theme support. See [Layout Components](../components/layout.md).

## Path Aliases

The project uses `@/` as a path alias that maps to `src/`. This is configured in `tsconfig.json`. For example, `import { siteData } from "@/lib/site-data"` resolves to `src/lib/site-data.ts`.
