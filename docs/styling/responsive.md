# Responsive Design

## Breakpoints

The site uses Tailwind CSS default breakpoints:

| Prefix | Minimum Width | Typical Use |
|--------|--------------|-------------|
| (none) | 0px | Mobile-first base styles |
| `sm` | 640px | Large phones and small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops and desktops |
| `xl` | 1280px | Large screens |

## Mobile-First Approach

All styles are written for mobile first. Larger screen styles are added with responsive prefixes (`sm:`, `md:`, `lg:`).

## Key Responsive Behaviors

### Header

- **Desktop** (`md:` and up): Horizontal pill-style navigation bar
- **Mobile** (below `md:`): Hamburger icon that opens a dropdown menu via `<details>` element

### Homepage Hero

- **Desktop** (`lg:` and up): Two-column grid with text on the left (columns 1-7) and photo on the right (columns 8-12)
- **Mobile**: Single column with the photo appearing first (above the text) using CSS `order` property

### Content Grids

- **Desktop**: Multi-column grids (2 or 3 columns)
- **Mobile**: Single column stacks

### Life Page Sidebar

- **Desktop** (`lg:` and up): Sticky sidebar with country navigation
- **Mobile**: Sidebar scrolls with the content or is hidden

### Stats Bar

- **Desktop** (`sm:` and up): Four columns
- **Mobile**: Two columns (2x2 grid)

## Max Width

The `.section-shell` class constrains content to a maximum width of approximately 1200px with horizontal padding, centering content on wide screens.

## Typography

Font sizes use `clamp()` for fluid scaling between mobile and desktop:

```css
font-size: clamp(2.8rem, 6vw, 5rem);
```

This ensures text scales smoothly without abrupt size changes at breakpoints.
