# Email Providers

## Overview

The contact form sends emails through a configurable provider. Three providers are supported: SMTP, Resend, and Postmark. The system uses a provider abstraction so adding new providers requires only implementing the `EmailProvider` interface.

## Provider Selection

The active provider is determined by the `EMAIL_PROVIDER` environment variable:

- `"smtp"` (default): Direct SMTP over TLS using Cloudflare Workers TCP sockets
- `"resend"`: Uses the Resend HTTP API
- `"postmark"`: Uses the Postmark HTTP API

## SMTP (Zoho Mail)

**File:** `functions/lib/email/providers/smtp.ts`

The recommended provider. Connects directly to an SMTP server over TLS (port 465) using the TCP socket API available in Cloudflare Workers. No third-party SDK is required.

Requires:
- `SMTP_HOST` -- SMTP server hostname (e.g., `smtp.zoho.com`)
- `SMTP_PORT` -- SMTP server port (default `465` for implicit TLS)
- `SMTP_USER` -- SMTP username (typically your email address)
- `SMTP_PASS` -- SMTP password (use an app-specific password, not your account password)

### Setting up with Zoho Mail

1. Log in to Zoho Mail at mail.zoho.com
2. Go to Settings > Security > App Passwords (or accounts.zoho.com > Security > App Passwords)
3. Generate a new app-specific password for "Portfolio Contact Form"
4. Set the following in Cloudflare Pages environment variables:
   - `EMAIL_PROVIDER=smtp`
   - `SMTP_HOST=smtp.zoho.com`
   - `SMTP_PORT=465`
   - `SMTP_USER=your-email@zoho.com` (or your custom domain email hosted on Zoho)
   - `SMTP_PASS=` the app-specific password you generated
   - `CONTACT_FROM_EMAIL=your-email@zoho.com` (must match `SMTP_USER` for Zoho)

Important: Never use your main Zoho account password. App-specific passwords can be revoked independently and do not grant full account access.

### How it works

The provider opens a TCP socket with implicit TLS to the SMTP server, authenticates with AUTH LOGIN, and sends MIME-encoded messages. It handles multi-line SMTP responses, base64 content encoding, and proper dot-stuffing for the DATA payload.

## Resend

**File:** `functions/lib/email/providers/resend.ts`

Requires the `RESEND_API_KEY` environment variable. Resend offers a free tier of 3,000 emails per month, which is sufficient for a portfolio contact form.

To set up:
1. Create an account at resend.com
2. Verify your domain (required for sending from your own email address)
3. Generate an API key
4. Set `RESEND_API_KEY` and `EMAIL_PROVIDER=resend` in Cloudflare Pages environment variables

## Postmark

**File:** `functions/lib/email/providers/postmark.ts`

Requires the `POSTMARK_SERVER_TOKEN` environment variable.

To set up:
1. Create an account at postmarkapp.com
2. Create a server and configure your sending domain
3. Copy the server API token
4. Set `POSTMARK_SERVER_TOKEN` and `EMAIL_PROVIDER=postmark` in Cloudflare Pages environment variables

## Provider Interface

All providers implement the same interface defined in `functions/lib/email/types.ts`:

```typescript
interface EmailProvider {
  send(message: EmailMessage): Promise<void>;
}
```

Where `EmailMessage` contains: `to`, `from`, `subject`, `text`, optional `html`, and optional `replyTo`.

## Email Templates

Templates are defined in `functions/lib/email/templates.ts`. Two templates are generated for each submission:

1. **Owner notification**: A structured email with the sender's details and message, formatted in both plain text and HTML
2. **Sender acknowledgment**: A confirmation email to the person who submitted the form

Both templates use the portfolio's design language (color palette, typography) and support dark and light mode through the CSS `prefers-color-scheme` media query. Email clients that support this feature (Apple Mail, Outlook desktop, Thunderbird) will display the appropriate theme. Other clients fall back to the light theme.

All user input in HTML templates is escaped to prevent injection.

## Adding a New Provider

1. Create a new file in `functions/lib/email/providers/`
2. Implement the `EmailProvider` interface
3. Add a case for the new provider in `functions/lib/email/index.ts`
4. Document the required environment variables
