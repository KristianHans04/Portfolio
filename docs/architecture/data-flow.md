# Data Flow

## How Content Gets from JSON to the Page

The data flow follows a clear path: JSON files are validated, loaded into typed collections, and consumed by page components.

### Step 1: JSON Source Files

All content lives in `src/content/` as plain JSON files organized by type:

```
src/content/
  projects/venturely.json
  press/citizen-tv-2025.json
  travel/kenya.json
  ...
```

Global site configuration lives in `src/data/`:

```
src/data/
  site.json
  navigation.json
  seo.json
  socials.json
```

### Step 2: Schema Validation

Every JSON file is validated at build time using Zod schemas defined in `src/lib/content/schemas.ts`. Each content type has its own schema that defines required fields, optional fields, and their types.

If any JSON file fails validation, the build stops and reports which file failed and which fields are invalid.

### Step 3: Collection Loading

The loaders in `src/lib/content/loaders.ts` use Vite's `import.meta.glob` to eagerly load all JSON files from each content directory. Each file is parsed against its schema, and the results are sorted and cached.

Loaders expose functions like `getProjects()`, `getPressEntries()`, and `getTravelEntries()`. Each accepts an optional `{ includeDrafts: true }` parameter. By default, only entries with `"published": true` are returned.

### Step 4: Site Data

Global configuration is loaded and validated in `src/lib/site-data.ts`. This module exports `siteData`, `navigationData`, `seoData`, and `socialsData` as typed, validated objects.

### Step 5: Page Consumption

Astro pages import data directly from loaders and site data. For example:

```
// In an Astro page's frontmatter
import { getProjects } from "@/lib/content/loaders";
import { siteData } from "@/lib/site-data";

const projects = getProjects();
```

The data is then used in the template to render HTML at build time. No API calls are made at runtime for content display.

### Step 6: Dynamic Route Generation

Pages with dynamic routes (like `work/[slug].astro`) use `getStaticPaths()` to generate one page per published entry:

```
export function getStaticPaths() {
  return getProjects().map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
}
```

## Server-Side Data Flow (Contact Form)

The contact form follows a different flow since it runs at request time, not build time:

1. The React component in the browser sends a POST request to `/api/contact`
2. Cloudflare Pages routes this to `functions/api/contact.ts`
3. The function validates the payload with Zod
4. It verifies the Turnstile token with Cloudflare's API
5. It sends emails via the configured provider (Resend or Postmark)
6. It returns a JSON response to the browser

See [Contact Form Overview](../contact-form/overview.md) for the full breakdown.
