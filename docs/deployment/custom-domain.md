# Custom Domain

## Setting Up a Custom Domain on Cloudflare Pages

1. Go to your Pages project in the Cloudflare dashboard
2. Navigate to Custom Domains
3. Click "Set up a custom domain"
4. Enter your domain (e.g., `kristianhans.com`)
5. Cloudflare will configure DNS automatically if your domain is already on Cloudflare

If your domain is managed outside Cloudflare, you will need to add a CNAME record pointing to your Pages project URL (e.g., `your-project.pages.dev`).

## SSL

Cloudflare Pages provides free SSL certificates automatically. No configuration is needed.

## Updating the Site URL

After setting up a custom domain, update the site URL in two places:

1. **`src/data/seo.json`**: Set `siteUrl` to your domain (e.g., `https://kristianhans.com`)
2. **Environment variable**: Set `SITE_URL` to the same value in Cloudflare Pages settings

This ensures the sitemap, canonical URLs, and Open Graph metadata use the correct domain.

## Redirect Configuration

Cloudflare Pages supports redirect rules via a `_redirects` file in the `public/` directory. If you need to redirect old URLs or set up www-to-root redirects, create `public/_redirects`:

```
/old-path /new-path 301
```

For www redirect, configure this in the Cloudflare DNS settings rather than in the application.
