# Life Page

**Route:** `/life`
**File:** `src/pages/life.astro`

## Overview

The life page covers travel experiences with country-by-country detail cards and a scrollable sidebar navigation.

## Sections

### Hero

Title and introductory text.

### Travel Section

A two-column layout:

- **Left sidebar**: A sticky list of country names with flag emojis. Clicking a country scrolls to its card. The active country is highlighted as the user scrolls, powered by an IntersectionObserver script at the bottom of the file.
- **Right content**: Travel cards for each country showing the country name with flag, year, personal notes, and highlights.

### Highlights Display

Each travel highlight is parsed for its prefix:

- Entries starting with "Liked:" display with a green checkmark SVG icon
- Entries starting with "Did not like:" display with a red X SVG icon
- Entries without a recognized prefix display with a neutral bullet

### Scroll Highlighting

An inline `<script>` at the bottom of the file sets up an IntersectionObserver that watches all `.travel-card` elements. When a card enters the viewport, the corresponding sidebar link receives the `active` class for visual highlighting.

## Data Sources

- `getTravelEntries()` from content loaders
- Entries from `src/content/travel/*.json`

## Design Notes

- No emojis are used anywhere on this page except for country flag emojis next to country names
- The sidebar is sticky on desktop and scrolls with the page on mobile
- Photo galleries were removed from this page due to image hosting limitations
