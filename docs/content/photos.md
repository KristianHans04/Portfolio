# Photos

Photo entries store image metadata for display across the site.

## File Location

`src/content/photos/<slug>.json`

## Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | URL-safe identifier |
| `published` | No | boolean | Defaults to `false` |
| `src` | Yes | string | Image path (local path starting with `/images/` or external URL) |
| `alt` | Yes | string | Descriptive alt text for accessibility |
| `caption` | No | string or null | Display caption |
| `category` | Yes | enum | One of: `about`, `life`, `travel`, `hobby` |
| `takenOn` | No | string or null | Date the photo was taken |
| `location` | No | string or null | Where the photo was taken |

## Important Note on Image Hosting

External image URLs from services like Google Photos are blocked by browser security policies and will not render. Always download images to `public/images/` and use local paths.

## Example

```json
{
  "slug": "team-kenya-singapore",
  "published": true,
  "src": "/images/impact/team-kenya-singapore.jpg",
  "alt": "Team Kenya at FIRST Global Challenge in Singapore",
  "caption": "Singapore 2024",
  "category": "travel",
  "takenOn": "2024-10-15",
  "location": "Singapore"
}
```
