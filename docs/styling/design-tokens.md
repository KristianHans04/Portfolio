# Design Tokens

Design tokens are CSS custom properties defined in the `@theme` block of `src/styles/global.css`. They are the single source of truth for all colors, fonts, and spacing values.

## Color Tokens

| Token | Dark Value | Light Value | Usage |
|-------|-----------|-------------|-------|
| `--color-canvas` | `#0c1424` | `#f8fafb` | Page background |
| `--color-ink` | `#e8f4ff` | `#1a2233` | Primary text |
| `--color-ink-muted` | `#8ba2b8` | `#5a6a7a` | Secondary text |
| `--color-accent` | `#3ab8ff` | `#1478c2` | Primary brand blue |
| `--color-highlight` | `#39d4ad` | `#0c9468` | Secondary brand green |
| `--color-panel` | `#13243b` | `#ffffff` | Card and panel backgrounds |
| `--color-panel-strong` | `#182d48` | `#f0f4f8` | Elevated panels |
| `--color-border-subtle` | `#1e3a57` | `#d8e0e8` | Borders and dividers |
| `--color-canvas-soft` | `#0f1d30` | `#f0f4f8` | Input backgrounds |
| `--color-accent-soft` | `rgba(58,184,255,0.08)` | `rgba(20,120,194,0.06)` | Accent tint backgrounds |

## Font Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--font-body` | Manrope, sans-serif | Body text |
| `--font-display` | Space Grotesk, sans-serif | Headlines and titles |
| `--font-mono` | JetBrains Mono, monospace | Code, labels, and badges |

## Using Tokens

In CSS, reference tokens with `var()`:

```css
.my-component {
  color: var(--color-ink);
  background: var(--color-panel);
  border: 1px solid var(--color-border-subtle);
}
```

In Tailwind utility classes, tokens are available as color names:

```html
<p class="text-ink bg-panel border border-border-subtle">Content</p>
```

## Extending Tokens

To add a new token:

1. Add it to the `@theme` block in `global.css`
2. If it needs a light mode override, add it to the `[data-theme="light"]` section
3. Tailwind automatically makes it available as a utility class
