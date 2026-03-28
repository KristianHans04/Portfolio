# Theming System

## Overview

The site supports two themes: dark (default) and light. The theme is controlled by a `data-theme` attribute on the `<html>` element.

## How Theme Switching Works

1. **Persistence.** The selected theme is stored in `localStorage` under the key `theme`.

2. **Flash prevention.** An inline script in `BaseLayout.astro`'s `<head>` reads the stored theme before any CSS loads. This prevents the flash of unstyled content (FOUC) that would occur if the theme were applied after the page rendered.

3. **Toggle component.** The `ThemeToggle` component in the header lets users switch between light and dark mode. It updates both the `data-theme` attribute and `localStorage`.

## CSS Structure

All theme tokens are defined in `src/styles/global.css` using CSS custom properties inside a Tailwind `@theme` block.

The dark theme values are the defaults. Light theme overrides are scoped under `[data-theme="light"]`:

```css
/* Default (dark) */
--color-canvas: #0c1424;
--color-ink: #e8f4ff;

/* Light override */
[data-theme="light"] {
  --color-canvas: #f8fafb;
  --color-ink: #1a2233;
}
```

## Token Categories

| Token | Purpose |
|-------|---------|
| `canvas` | Page background |
| `ink` | Primary text color |
| `ink-muted` | Secondary text color |
| `accent` | Primary brand color (blue) |
| `highlight` | Secondary brand color (green) |
| `panel` | Card and section backgrounds |
| `panel-strong` | Elevated panel backgrounds |
| `border-subtle` | Light borders and dividers |
| `canvas-soft` | Subtle background for inputs |

## Important Notes

- The footer uses a fixed dark background (`#0c1424`) regardless of the active theme.
- Some elements like the hero photo stats overlay always use dark styling because they sit on top of an image.
- The `btn-light` component has explicit light theme overrides to maintain contrast.
- Section wash classes (`section-wash-blue`, `section-wash-green`) have separate light mode color definitions.

See [Design Tokens](../styling/design-tokens.md) for the complete token reference and [Light and Dark Themes](../styling/themes.md) for detailed override rules.
