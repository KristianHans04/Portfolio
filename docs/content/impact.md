# Impact Entries

Impact entries cover mentorship, leadership, volunteering, awards, community work, and speaking engagements.

## File Location

`src/content/mentorship/<slug>.json`

Note: The directory is named `mentorship/` for historical reasons, but the content covers all impact areas.

## Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | URL-safe identifier |
| `published` | No | boolean | Defaults to `false` |
| `order` | No | integer | Sort position. Defaults to `1000` |
| `area` | Yes | enum | One of: `mentorship`, `leadership`, `volunteering`, `awards`, `community`, `speaking` |
| `title` | Yes | string | Name of the initiative or achievement |
| `organization` | No | string or null | Associated organization |
| `year` | No | string or null | Year or date range |
| `summary` | Yes | string | Brief description |
| `image` | No | string or null | Local image path or URL |
| `details` | No | string array | Additional context |
| `links` | No | array of objects | Each has `label` and `url` |

## Area Values

| Area | Use For |
|------|---------|
| `mentorship` | Mentoring individuals or groups |
| `leadership` | Leadership roles in organizations or teams |
| `volunteering` | Volunteer work and community service |
| `awards` | Recognitions, medals, certifications |
| `community` | Community building and outreach |
| `speaking` | Talks, panels, and public presentations |

## Example

```json
{
  "slug": "first-global-mentor",
  "published": true,
  "order": 1,
  "area": "mentorship",
  "title": "FIRST Global Team Kenya Technical Mentor",
  "organization": "FIRST Global",
  "year": "2023 - Present",
  "summary": "Technical mentorship for Kenya's international robotics team.",
  "image": "/images/impact/fgc-team.jpg",
  "details": [
    "Oversaw robot design and programming for international competition.",
    "Teams competed in Singapore, Athens, and Panama City."
  ],
  "links": [
    {
      "label": "Team Website",
      "url": "https://fgckenya.kristianhans.com"
    }
  ]
}
```

## Where Impact Entries Appear

- `/impact` page grouped by area
- Homepage stats (total impact count)
