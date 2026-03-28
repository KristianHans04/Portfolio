# Impact Page

**Route:** `/impact`
**File:** `src/pages/impact.astro`

## Overview

Displays mentorship, leadership, volunteering, awards, community, and speaking entries grouped by area.

## Sections

### Hero

Title and introductory text.

### Impact Groups

Entries from `getImpactEntries()` are grouped by their `area` field. Each group has a heading and a list of entry cards showing title, organization, year, summary, image (if provided), and links.

## Data Sources

- `getImpactEntries()` from content loaders
- Entries from `src/content/mentorship/*.json`
