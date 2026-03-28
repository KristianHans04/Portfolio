# Press Pages

## Press Listing

**Route:** `/press`
**File:** `src/pages/press/index.astro`

### Logo Strip

A horizontal strip of media outlet logos at the top of the page, pulled from published press entries that have a `logo` field.

### Entry Cards

Each press entry is displayed as a card with the outlet logo, title, summary, type badge, and action links. Links open in a modal overlay (iframe) rather than navigating away from the site.

### Media Modal

The `MediaModal` React component renders as a portal attached to `document.body`. This ensures the modal appears above all page content regardless of parent element overflow settings. The modal contains an iframe loading the linked URL, with an "Open in new tab" button.

## Press Detail

**Route:** `/press/<slug>`
**File:** `src/pages/press/[slug].astro`

### Content

Shows the full press entry with outlet logo, title, type, publication, date, details, and links. Links with URLs open in the media modal.

### More Coverage

A "More Coverage" section at the bottom displays other press entries, excluding the current one. This allows visitors to browse related coverage without returning to the listing page.

## Data Sources

- `getPressEntries()` from content loaders
- Entries from `src/content/press/*.json`
