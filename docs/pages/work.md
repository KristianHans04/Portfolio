# Work Pages

## Work Listing

**Route:** `/work`
**File:** `src/pages/work/index.astro`

### Stats Bar

Four animated counters showing:

- **Projects**: Total published project count
- **Technologies**: Deduplicated technology count (normalizes variants like "React 19" to "React" and "Tailwind CSS v4" to "Tailwind CSS")
- **Domains**: Unique category count across all projects
- **With Source**: Number of projects that have at least one external link

### Project Grid

A three-column responsive grid of project cards. Each card shows the project logo (or fallback initial), title, summary, and up to four tech stack items with logos.

## Project Detail

**Route:** `/work/<slug>`
**File:** `src/pages/work/[slug].astro`

### Layout

Two-column layout with a sidebar on the right containing:

- Project category pills
- Tech stack with logo icons from the CDN mapping
- Build highlights (top 3 architecture items)

The main content area shows:

- Project title and summary
- Logo (if available)
- Links to external resources
- Overview section
- Problem section
- Results section
- Gallery (if images are provided)
- Lessons learned
- Previous/Next project navigation

### Tech Stack Logos

Each technology in the `stack` array is matched against `src/lib/tech-logos.ts`. Matching entries display the CDN logo. Unmatched entries show the first letter of the technology name in a colored badge.

### Route Generation

Uses `getStaticPaths()` to generate one page per published project.
