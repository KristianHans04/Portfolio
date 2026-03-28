# Books

Book entries track reading history with status and notes.

## File Location

`src/content/books/<slug>.json`

## Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | URL-safe identifier |
| `published` | No | boolean | Defaults to `false` |
| `title` | Yes | string | Book title |
| `author` | No | string or null | Author name |
| `status` | Yes | enum | One of: `read`, `reading`, `wishlist` |
| `yearFinished` | No | string or null | Year the book was finished |
| `notes` | No | string or null | Personal thoughts on the book |

## Example

```json
{
  "slug": "clean-code",
  "published": true,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "status": "read",
  "yearFinished": "2024",
  "notes": "Foundational reading for any engineer who writes code others will maintain."
}
```

## Where Book Entries Appear

- `/life` page in the reading section
