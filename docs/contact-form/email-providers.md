# Email Providers

## Overview

The contact form sends emails through a configurable provider. Two providers are supported: Resend and Postmark. The system uses a provider abstraction so adding new providers requires only implementing the `EmailProvider` interface.

## Provider Selection

The active provider is determined by the `EMAIL_PROVIDER` environment variable:

- `"resend"` (default if not set): Uses the Resend API
- `"postmark"`: Uses the Postmark API

## Resend

**File:** `functions/lib/email/providers/resend.ts`

Requires the `RESEND_API_KEY` environment variable. Resend offers a free tier of 3,000 emails per month, which is sufficient for a portfolio contact form.

To set up:
1. Create an account at resend.com
2. Verify your domain (required for sending from your own email address)
3. Generate an API key
4. Set `RESEND_API_KEY` in Cloudflare Pages environment variables

## Postmark

**File:** `functions/lib/email/providers/postmark.ts`

Requires the `POSTMARK_SERVER_TOKEN` environment variable.

To set up:
1. Create an account at postmarkapp.com
2. Create a server and configure your sending domain
3. Copy the server API token
4. Set `POSTMARK_SERVER_TOKEN` and `EMAIL_PROVIDER=postmark` in Cloudflare Pages environment variables

## Provider Interface

Both providers implement the same interface defined in `functions/lib/email/types.ts`:

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

All user input in HTML templates is escaped to prevent injection.

## Adding a New Provider

1. Create a new file in `functions/lib/email/providers/`
2. Implement the `EmailProvider` interface
3. Add a case for the new provider in `functions/lib/email/index.ts`
4. Document the required environment variable
