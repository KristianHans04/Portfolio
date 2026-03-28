# Content Overview

## How Content Works

All site content is stored as plain JSON files. There are two categories:

1. **Content collections** in `src/content/` for entries that have multiple items (projects, press, travel, etc.)
2. **Global data** in `src/data/` for site-wide configuration (identity, navigation, SEO, social links)

## Content Collections

Each collection lives in its own subdirectory under `src/content/`. Every JSON file in a collection directory is treated as one entry.

| Collection | Directory | Schema | Purpose |
|-----------|-----------|--------|---------|
| Projects | `src/content/projects/` | `projectSchema` | Engineering projects with technical detail |
| Press | `src/content/press/` | `pressEntrySchema` | Media appearances and coverage |
| Writing | `src/content/writing/` | `writingEntrySchema` | Articles, essays, newsletters |
| Impact | `src/content/mentorship/` | `impactEntrySchema` | Community, mentorship, awards |
| Travel | `src/content/travel/` | `travelEntrySchema` | Countries visited with notes |
| Books | `src/content/books/` | `bookEntrySchema` | Reading list |
| Photos | `src/content/photos/` | `photoEntrySchema` | Photo entries with metadata |

## Validation

Every JSON file is validated against its Zod schema at build time. If a file has a missing required field, an invalid type, or fails any constraint, the build will fail with a message identifying the file and the specific problem.

## Published vs Draft

Most content types have a `published` boolean field. Only entries with `"published": true` appear on the live site. Setting `"published": false` hides the entry without deleting the file.

## Ordering

Entries with an `order` field are sorted by that number (ascending). Entries with the same order are sorted alphabetically by title. Lower numbers appear first.

## Adding New Content

To add a new entry to any collection:

1. Create a new JSON file in the appropriate directory
2. Follow the schema for that content type (see the individual content docs linked below)
3. Set `"published": true` when ready to display
4. Run `npm run build` to validate

## Detailed Guides

- [Projects](projects.md)
- [Press and Media](press.md)
- [Impact Entries](impact.md)
- [Travel Entries](travel.md)
- [Writing Entries](writing.md)
- [Books](books.md)
- [Photos](photos.md)
- [Site Data](site-data.md)
- [Navigation](navigation.md)
- [SEO Configuration](seo.md)
- [Social Links](socials.md)
- [Content Schemas Reference](schemas-reference.md)
