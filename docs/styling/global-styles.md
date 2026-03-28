# Global Styles

All CSS for the site is in a single file: `src/styles/global.css`. This file contains design tokens, component classes, layout utilities, page-specific styles, and theme overrides.

## File Structure

The file is organized in these sections (in order):

1. **Tailwind imports** and `@theme` block with design tokens
2. **Font declarations** (Manrope, Space Grotesk, JetBrains Mono)
3. **Base styles** (body, headings, links)
4. **Component classes** (buttons, cards, panels, pills, badges)
5. **Layout utilities** (section-shell, bento-grid, scene-panel)
6. **Section wash classes** (background color washes for page sections)
7. **Page-specific styles** (hero, morph text, timeline, stats)
8. **Light theme overrides** (all `[data-theme="light"]` rules grouped together)

## Why One File

All styles are in one file rather than co-located with components for two reasons:

1. Tailwind CSS 4 uses a `@theme` block for token definitions, which must be in the main stylesheet
2. Theme overrides (light mode) reference many component classes and are easier to maintain in one place

## Adding New Styles

When adding new component styles:

- Define the component class in the appropriate section of global.css
- If the component needs different styles in light mode, add an override in the light theme section at the bottom of the file
- Use CSS custom properties (design tokens) for colors rather than hardcoded values

See [Design Tokens](design-tokens.md) for the available tokens and [Light and Dark Themes](themes.md) for theme override patterns.
