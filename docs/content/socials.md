# Social Links

The `src/data/socials.json` file defines social media profiles shown in the site footer.

## Structure

```json
{
  "items": [
    {
      "label": "GitHub",
      "url": "https://github.com/username",
      "handle": "username"
    },
    {
      "label": "Instagram",
      "url": "https://www.instagram.com/username/",
      "handle": "@username"
    }
  ]
}
```

## Fields

| Field | Required | Description |
|-------|----------|-------------|
| `label` | Yes | Display name of the platform |
| `url` | Yes | Full URL to the profile (must be a valid URL) |
| `handle` | No | Username or handle (for display purposes, not used in links) |

## Adding a Social Link

Add a new object to the `items` array with the platform name, URL, and optional handle. The link will appear in the footer automatically.
