# Projects

Projects are the core content type. Each project gets a detail page at `/work/<slug>` and appears in the work listing at `/work`.

## File Location

`src/content/projects/<slug>.json`

## Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | URL-safe identifier. Must match the filename (without `.json`) |
| `published` | No | boolean | Whether the project appears on the site. Defaults to `false` |
| `featured` | No | boolean | Currently unused in the UI but available for filtering |
| `order` | No | integer | Sort position. Lower numbers appear first. Defaults to `1000` |
| `title` | Yes | string | Display name of the project |
| `summary` | Yes | string | One to two sentence description shown in cards and listings |
| `logo` | No | string or null | Path to the project logo image (e.g., `/images/projects/venturely.svg`) |
| `categories` | No | string array | Tags like "Full-Stack", "SaaS", "Infrastructure" |
| `client` | No | string or null | Client name if this was client work |
| `period` | No | string or null | Time range (e.g., "2024 - Present"). Only include if accurate |
| `overview` | No | string or null | Detailed paragraph about what the project does |
| `problem` | No | string or null | The problem the project solves |
| `role` | No | string array | Your specific responsibilities and contributions |
| `architecture` | No | string array | Technical implementation highlights |
| `stack` | No | string array | Technology names. These are matched against the tech logo map for display. Use exact names like "React 19", "PostgreSQL", "Sentry" |
| `gallery` | No | array of objects | Screenshots. Each has `src`, `alt`, and optional `caption` |
| `results` | No | array of objects | Key outcomes. Each has `title` and `detail` |
| `lessonsLearned` | No | string array | Takeaways from building the project |
| `links` | No | array of objects | External links. Each has `label` and `url` |

## Example

```json
{
  "slug": "scrapifie",
  "published": true,
  "featured": true,
  "order": 3,
  "title": "Scrapifie",
  "summary": "Enterprise web scraping platform with anti-detection capabilities.",
  "logo": "/images/projects/scrapifie.svg",
  "categories": ["Full-Stack", "SaaS", "Infrastructure"],
  "client": null,
  "period": null,
  "overview": "Scrapifie is a web scraping infrastructure platform...",
  "problem": "Modern websites deploy sophisticated anti-bot measures...",
  "role": [
    "Lead Engineer and Architect",
    "Designed the anti-detection engine"
  ],
  "architecture": [
    "TypeScript across the entire stack",
    "Playwright-based scraping engine with fingerprint injection"
  ],
  "stack": ["TypeScript", "Playwright", "Redis", "PostgreSQL"],
  "gallery": [],
  "results": [
    {
      "title": "Anti-Detection Engine",
      "detail": "Bypasses modern bot detection systems."
    }
  ],
  "lessonsLearned": [
    "Anti-detection is an arms race."
  ],
  "links": [
    {
      "label": "Live Platform",
      "url": "https://scrapifie.kristianhans.com"
    }
  ]
}
```

## Project Logos

Place logo files in `public/images/projects/`. SVG is preferred for quality at any size. Set the `logo` field to the path starting with `/images/projects/`.

If no logo is provided, the UI displays the first letter of the project title as a fallback.

## Tech Stack Logos

Technology names in the `stack` array are matched against the logo mapping in `src/lib/tech-logos.ts`. If a match is found, the tech logo appears next to the name. See [Tech Logo Mapping](../architecture/tech-logos.md).

## Where Projects Appear

- `/work` listing page (all published projects)
- `/work/<slug>` detail page (individual project)
- Homepage featured section (first 3 projects by order)
