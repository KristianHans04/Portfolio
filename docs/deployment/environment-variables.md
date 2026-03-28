# Environment Variables

## Build-Time Variables

These are used during the static site build.

| Variable | Required | Description |
|----------|----------|-------------|
| `SITE_URL` | No | The canonical site URL (e.g., `https://kristianhans.com`). Used for sitemap generation and SEO metadata. Defaults to `https://example.com` if not set |
| `NODE_VERSION` | No | Set to `20` to ensure Cloudflare Pages uses the correct Node.js version |

## Runtime Variables (Cloudflare Pages Functions)

These are used by the contact form API at request time. Set them in the Cloudflare Pages dashboard under Settings > Environment Variables.

| Variable | Required | Description |
|----------|----------|-------------|
| `TURNSTILE_SECRET_KEY` | Yes | Server-side secret for Cloudflare Turnstile verification. Get this from the Turnstile section of the Cloudflare dashboard |
| `CONTACT_TO_EMAIL` | Yes | The email address that receives contact form submissions |
| `CONTACT_FROM_EMAIL` | Yes | The sender address for notification emails (e.g., `noreply@yourdomain.com`). Must be verified with your email provider |
| `CONTACT_ACK_FROM_EMAIL` | No | Sender address for acknowledgment emails sent to the person who submitted the form. Falls back to `CONTACT_FROM_EMAIL` if not set |
| `EMAIL_PROVIDER` | No | Which email service to use. Either `resend` (default) or `postmark` |
| `RESEND_API_KEY` | Conditional | Required when `EMAIL_PROVIDER` is `resend` or not set |
| `POSTMARK_SERVER_TOKEN` | Conditional | Required when `EMAIL_PROVIDER` is `postmark` |

## Client-Side Variables

These are used in the browser and must be set as build-time environment variables.

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_TURNSTILE_SITE_KEY` | No | Client-side Turnstile widget key. If not set, the Turnstile widget does not render and the form works without it |

## Setting Variables

### In Cloudflare Pages Dashboard

1. Go to your Pages project in the Cloudflare dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable for both Production and Preview environments
4. Redeploy for changes to take effect

### For Local Development

Create a `.dev.vars` file in the project root (this file is gitignored):

```
TURNSTILE_SECRET_KEY=your_secret_key
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=noreply@example.com
RESEND_API_KEY=re_your_api_key
```

These are picked up by `wrangler pages dev` when running `npm run cf:dev`.

## Security Notes

- Never commit environment variable values to the repository
- The `.dev.vars` file should be in `.gitignore`
- Use separate API keys for development and production environments
- Rotate keys periodically
