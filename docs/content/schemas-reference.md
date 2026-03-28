# Content Schemas Reference

All content schemas are defined in `src/lib/content/schemas.ts` using Zod. This is the complete reference for every schema and its exported TypeScript types.

## Project Schema

```
projectSchema {
  slug: string (min 1)
  published: boolean (default false)
  featured: boolean (default false)
  order: integer (default 1000)
  title: string (min 1)
  summary: string (min 1)
  logo: string | null (default null)
  categories: string[] (default [])
  client: string | null (default null)
  period: string | null (default null)
  overview: string | null (default null)
  problem: string | null (default null)
  role: string[] (default [])
  architecture: string[] (default [])
  stack: string[] (default [])
  gallery: ProjectGalleryImage[] (default [])
  results: ProjectResult[] (default [])
  lessonsLearned: string[] (default [])
  links: ContentLink[] (default [])
}
```

## Press Entry Schema

```
pressEntrySchema {
  slug: string (min 1)
  published: boolean (default false)
  order: integer (default 1000)
  title: string (min 1)
  summary: string (min 1)
  type: "article" | "media" | "interview" | "podcast" | "speaking"
  publication: string | null (default null)
  logo: string | null (default null)
  date: string | null (default null)
  event: string | null (default null)
  image: string | null (default null)
  details: string[] (default [])
  links: ContentLink[] (default [])
}
```

## Writing Entry Schema

```
writingEntrySchema {
  slug: string (min 1)
  published: boolean (default false)
  order: integer (default 1000)
  title: string (min 1)
  summary: string (min 1)
  format: "article" | "essay" | "newsletter" | "talk-notes"
  publishedAt: string | null (default null)
  readTimeMinutes: positive integer | null (default null)
  topics: string[] (default [])
  outlet: string | null (default null)
  sections: WritingSection[] (default [])
  links: ContentLink[] (default [])
}
```

## Impact Entry Schema

```
impactEntrySchema {
  slug: string (min 1)
  published: boolean (default false)
  order: integer (default 1000)
  area: "mentorship" | "leadership" | "volunteering" | "awards" | "community" | "speaking"
  title: string (min 1)
  organization: string | null (default null)
  year: string | null (default null)
  summary: string (min 1)
  image: string | null (default null)
  details: string[] (default [])
  links: ContentLink[] (default [])
}
```

## Travel Entry Schema

```
travelEntrySchema {
  slug: string (min 1)
  published: boolean (default false)
  country: string (min 1)
  city: string | null (default null)
  year: string | null (default null)
  notes: string | null (default null)
  highlights: string[] (default [])
  photos: string[] (default [])
}
```

## Book Entry Schema

```
bookEntrySchema {
  slug: string (min 1)
  published: boolean (default false)
  title: string (min 1)
  author: string | null (default null)
  status: "read" | "reading" | "wishlist"
  yearFinished: string | null (default null)
  notes: string | null (default null)
}
```

## Photo Entry Schema

```
photoEntrySchema {
  slug: string (min 1)
  published: boolean (default false)
  src: string (min 1)
  alt: string (min 1)
  caption: string | null (default null)
  category: "about" | "life" | "travel" | "hobby"
  takenOn: string | null (default null)
  location: string | null (default null)
}
```

## Shared Sub-Schemas

```
ContentLink { label: string, url: string (valid URL) }
ProjectGalleryImage { src: string, alt: string, caption: string | null }
ProjectResult { title: string, detail: string }
WritingSection { heading: string | null, body: string }
```

## Site Data Schema

See [Site Data](site-data.md) for field descriptions. The schema validates the full `src/data/site.json` structure including nested objects for timeline entries, endorsements, and the now section.

## Exported Types

Each schema has a corresponding TypeScript type exported from `schemas.ts`:

- `Project`, `PressEntry`, `WritingEntry`, `ImpactEntry`, `TravelEntry`, `BookEntry`, `PhotoEntry`
- `SiteData`, `NavigationData`, `SeoData`, `SocialsData`
