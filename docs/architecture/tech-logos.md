# Tech Logo Mapping

## Overview

The file `src/lib/tech-logos.ts` maps technology names (as they appear in project JSON files) to their logo image URLs. This allows the work pages and project detail pages to display recognizable logos next to each technology in the stack.

## How It Works

The module exports two functions:

- `getTechLogo(techName)` returns the CDN URL for a single technology name, or `undefined` if no mapping exists.
- `getAllTechLogos(stack)` takes an array of technology names and returns an array of objects with `name` and optional `logo` fields.

## Logo Sources

Logos are sourced from public CDNs:

- **Devicon** (`cdn.jsdelivr.net/gh/devicons/devicon/icons/`) for most mainstream technologies
- **Simple Icons** (`cdn.simpleicons.org/`) for technologies not in Devicon
- Direct URLs for a few tools with their own hosted logos (e.g., Cheerio, Drizzle ORM)

## Adding a New Technology Logo

1. Open `src/lib/tech-logos.ts`
2. Add an entry to the `techLogoMap` object. The key must match the technology name exactly as it appears in the project JSON's `stack` array.
3. Find the logo URL from Devicon or Simple Icons. The Devicon pattern is: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-original.svg`

## Fallback Behavior

When a technology has no mapped logo, the UI displays the first letter of the technology name inside a small colored badge. No broken image icons appear.

## Where Logos Appear

- **Work index page** (`/work`): Small logos next to technology names in project cards
- **Project detail pages** (`/work/[slug]`): Logos in the "Tech Stack" section
- **Homepage featured projects**: Logos are inherited from the project's `logo` field (separate from tech stack logos)
