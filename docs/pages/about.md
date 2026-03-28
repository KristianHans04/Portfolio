# About Page

**Route:** `/about`
**File:** `src/pages/about.astro`

## Sections

### Hero

Title, subtitle, and the long biography from `siteData.longBio`.

### Career Timeline

Rendered from `siteData.timeline`. Entries appear in an alternating left-right layout on desktop and a single column on mobile. Each entry shows the role title, organization, period, and summary.

### Principles

Displays `siteData.values` as a list of professional principles.

### How I Operate

Displays `siteData.workingStyle` as a list of working style descriptions.

### Endorsements

Renders `siteData.endorsements` as quote cards with the person's name and role.

## Data Sources

- `siteData` from `src/data/site.json`
