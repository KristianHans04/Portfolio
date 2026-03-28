# Press and Media

Press entries represent media appearances, news coverage, interviews, and public speaking. Each entry gets a detail page at `/press/<slug>`.

## File Location

`src/content/press/<slug>.json`

## Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | URL-safe identifier |
| `published` | No | boolean | Defaults to `false` |
| `order` | No | integer | Sort position. Defaults to `1000` |
| `title` | Yes | string | Headline of the press entry |
| `summary` | Yes | string | Brief description for cards and listings |
| `type` | Yes | enum | One of: `article`, `media`, `interview`, `podcast`, `speaking` |
| `publication` | No | string or null | Name of the media outlet (e.g., "Citizen TV") |
| `logo` | No | string or null | Path to the media outlet's logo (e.g., `/images/logos/citizen-tv.svg`) |
| `date` | No | string or null | When this appeared. Leave `null` if the exact date is unknown. Do not estimate |
| `event` | No | string or null | Associated event name, if any |
| `image` | No | string or null | Cover image URL or local path |
| `details` | No | string array | Additional context about the appearance |
| `links` | No | array of objects | Each has `label` and `url`. These are displayed as action buttons |

## Type Values

| Type | Use For |
|------|---------|
| `article` | Written news articles or features |
| `media` | Television or video coverage |
| `interview` | Formal interviews |
| `podcast` | Podcast appearances |
| `speaking` | Public speaking events or panels |

## Media Outlet Logos

Place outlet logo SVGs in `public/images/logos/`. These appear on the press listing page, individual press pages, and in the logo strip at the top of the press index.

## Modal Behavior

On the press listing page, links to articles and broadcasts open in a modal overlay with an embedded iframe. A separate "Open in new tab" button is provided for users who prefer to leave the site.

The modal uses a React portal to render on top of all page content. See [Motion Components](../components/motion.md) for implementation details.

## Example

```json
{
  "slug": "citizen-tv-2025",
  "published": true,
  "order": 5,
  "title": "Citizen TV News - Kenyan Youth in International Robotics",
  "summary": "Featured on Citizen TV covering the robotics journey.",
  "type": "media",
  "publication": "Citizen TV",
  "logo": "/images/logos/citizen-tv.svg",
  "date": null,
  "event": null,
  "image": null,
  "details": [
    "Featured on Kenya's most-watched television network.",
    "National broadcast highlighting competition achievements."
  ],
  "links": [
    {
      "label": "View Screenshot",
      "url": "https://example.com/screenshot"
    }
  ]
}
```

## Where Press Entries Appear

- `/press` listing page (all published entries)
- `/press/<slug>` detail page (individual entry with "More Coverage" section)
