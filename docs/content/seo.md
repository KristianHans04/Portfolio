# SEO Configuration

The `src/data/seo.json` file controls default metadata for search engines and social sharing.

## Fields

| Field | Description |
|-------|-------------|
| `defaultTitle` | Page title used when no specific title is set |
| `titleTemplate` | Pattern for page titles. `%s` is replaced with the page-specific title |
| `defaultDescription` | Meta description used when no specific description is set |
| `defaultOgImage` | Path to the default Open Graph image for social sharing |
| `twitterCard` | Twitter card type (typically `summary_large_image`) |
| `siteUrl` | Canonical site URL used for absolute URLs in metadata |

## How It Works

The `SeoHead` component in `src/components/layout/SeoHead.astro` reads these defaults and merges them with any page-specific overrides passed through `BaseLayout`.

Each page can override `title`, `description`, `image`, and `type` by passing props to `BaseLayout`:

```astro
<BaseLayout title="About" description="Learn more about the person behind the work.">
```

## Open Graph Image

Place the default OG image at `public/og-default.svg` (or any format). For page-specific OG images, pass the `image` prop to `BaseLayout`.
