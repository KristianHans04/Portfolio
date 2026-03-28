# Layout Components

Layout components provide the structural shell for every page.

## BaseLayout

**File:** `src/layouts/BaseLayout.astro`

The root layout wrapping all pages. It provides:

- HTML document structure with `lang="en"` and `scroll-smooth`
- Favicon link
- Inline theme initialization script (reads localStorage before CSS loads to prevent flash)
- `SeoHead` component for metadata
- Skip-to-content accessibility link
- `Header` component
- `<main id="main-content">` wrapper with a `<slot />` for page content
- `Footer` component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | undefined | Page title (used in SEO head) |
| `description` | string | undefined | Meta description |
| `image` | string | undefined | Open Graph image path |
| `type` | "website" or "article" | undefined | OG type |
| `noindex` | boolean | undefined | If true, adds noindex meta tag |

## Header

**File:** `src/components/layout/Header.astro`

Sticky header with:

- Brand name and role linking to homepage
- Desktop navigation: horizontal pill-style nav bar from `navigationData.main`
- Theme toggle button
- Contact CTA button (hidden on small screens)
- Mobile navigation: hamburger icon that opens a dropdown via `<details>` element

The current page is highlighted based on URL matching.

## Footer

**File:** `src/components/layout/Footer.astro`

Site footer with a fixed dark background (`#0c1424`) regardless of the active theme. Contains:

- "Open to opportunities" heading
- Tagline from `siteData.tagline`
- Positioning statement
- Email link
- Footer navigation sections from `navigationData.footer`
- Social links from `socialsData`
- Copyright notice

## SeoHead

**File:** `src/components/layout/SeoHead.astro`

Renders all `<meta>` tags for SEO and social sharing. Merges page-specific props with defaults from `seoData`. Generates:

- Title (using `titleTemplate`)
- Meta description
- Open Graph tags (title, description, image, type, URL)
- Twitter card tags
- Canonical URL
- Optional noindex directive
