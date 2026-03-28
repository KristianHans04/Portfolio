# Writing Entries

Writing entries are for long-form content: articles, essays, newsletters, and talk notes.

## File Location

`src/content/writing/<slug>.json`

## Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | URL-safe identifier |
| `published` | No | boolean | Defaults to `false` |
| `order` | No | integer | Sort position. Defaults to `1000` |
| `title` | Yes | string | Title of the piece |
| `summary` | Yes | string | Brief description for listings |
| `format` | Yes | enum | One of: `article`, `essay`, `newsletter`, `talk-notes` |
| `publishedAt` | No | string or null | Publication date |
| `readTimeMinutes` | No | integer or null | Estimated reading time |
| `topics` | No | string array | Topic tags |
| `outlet` | No | string or null | Where it was published |
| `sections` | No | array of objects | Content sections, each with optional `heading` and required `body` |
| `links` | No | array of objects | Each has `label` and `url` |

## Where Writing Entries Appear

- `/writing/<slug>` detail pages
