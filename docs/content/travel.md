# Travel Entries

Travel entries document countries visited with personal notes and highlights.

## File Location

`src/content/travel/<slug>.json`

## Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | URL-safe identifier (typically the country name in lowercase) |
| `published` | No | boolean | Defaults to `false` |
| `country` | Yes | string | Full country name (e.g., "Kenya", "Singapore") |
| `city` | No | string or null | Primary city visited |
| `year` | No | string or null | Year of visit or "Home" for the home country |
| `notes` | No | string or null | Personal observations or fun facts about the country |
| `highlights` | No | string array | Things liked and disliked. Prefix with "Liked: " or "Did not like: " for the UI to render them with appropriate icons |
| `photos` | No | string array | Image paths (currently not rendered in the UI) |

## Highlights Format

The life page renders highlights with visual indicators. Each highlight string is expected to start with either "Liked:" or "Did not like:" followed by the observation:

```json
"highlights": [
  "Liked: The food scene in Zurich is incredible.",
  "Did not like: Everything is extremely expensive."
]
```

The UI displays a checkmark icon for "Liked" entries and an X icon for "Did not like" entries.

## Example

```json
{
  "slug": "singapore",
  "published": true,
  "country": "Singapore",
  "city": "Singapore",
  "year": "2024",
  "notes": "One of the most efficient cities on earth.",
  "highlights": [
    "Liked: Public transport is flawless.",
    "Did not like: The humidity takes some adjusting."
  ],
  "photos": []
}
```

## Where Travel Entries Appear

- `/life` page with a scrollable sidebar and country detail cards
- Homepage stats (total countries count)
