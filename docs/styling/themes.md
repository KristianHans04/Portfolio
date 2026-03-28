# Light and Dark Themes

## Default Theme

The site defaults to dark mode. All base styles and design tokens are written for the dark theme.

## Light Theme Overrides

Light theme styles are defined using the `[data-theme="light"]` CSS selector. These overrides are grouped at the bottom of `src/styles/global.css`.

The overrides cover:

- **Color tokens**: All `--color-*` custom properties are reassigned for light mode
- **Section washes**: Background gradient tints for section backgrounds
- **Cards and panels**: Adjusted shadows, borders, and backgrounds
- **Buttons**: Text and border color adjustments for contrast
- **Navigation**: Active state colors
- **Dividers**: Softer gradient transitions between sections
- **Input fields**: Adjusted backgrounds and focus states

## How Theme Switching Works

1. User clicks the theme toggle in the header
2. The toggle component sets `data-theme` on `<html>` to either `"light"` or `"dark"`
3. The choice is saved to `localStorage` under the key `"theme"`
4. On page load, an inline script in `<head>` reads `localStorage` and applies the theme before any CSS renders, preventing a flash of the wrong theme

## Elements That Ignore the Theme

- The **footer** always uses a dark background (`#0c1424`), regardless of the active theme
- The **photo stats overlay** on the homepage hero always uses dark styling since it sits on an image
- The **glass panels** in the hero section use fixed semi-transparent values

## Adding Light Theme Support for New Components

When creating a new component:

1. Write the base styles using design tokens (these will work in dark mode automatically)
2. Check the component's appearance in light mode
3. If adjustments are needed, add `[data-theme="light"] .your-class` overrides at the bottom of `global.css`
4. Pay attention to text contrast, border visibility, and background differentiation

## Testing Both Themes

Use the theme toggle in the header or set the attribute manually in dev tools:

```js
document.documentElement.setAttribute('data-theme', 'light')
document.documentElement.setAttribute('data-theme', 'dark')
```
