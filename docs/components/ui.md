# UI Components

Reusable presentation components used across multiple pages.

## EmptyState

**File:** `src/components/ui/EmptyState.astro`

Displayed when a content collection has no published entries. Shows a title and optional description with a muted style.

## PhotoPlaceholder

**File:** `src/components/ui/PhotoPlaceholder.astro`

A placeholder shown when a photo entry is missing its image. Available in different shapes (portrait, landscape, square). Used primarily in the hero section as a fallback when no profile photo is configured.

## PillList

**File:** `src/components/ui/PillList.astro`

Renders an array of strings as small rounded pills. Used for project categories, topics, and tags throughout the site.

## SectionDivider

**File:** `src/components/ui/SectionDivider.astro`

A visual separator between page sections. Renders a gradient line that blends into the surrounding section backgrounds.

## SectionHeading

**File:** `src/components/ui/SectionHeading.astro`

A consistent heading block for page sections. Includes an eyebrow label, main title, and optional introductory text. Used across the homepage, work page, and other listing pages.

## ThemeToggle

**File:** `src/components/ui/ThemeToggle.astro`

A button in the header that switches between light and dark themes. Toggles the `data-theme` attribute on the HTML element and persists the choice to localStorage. Uses sun and moon icons to indicate the current state. See [Theming System](../architecture/theming.md).
