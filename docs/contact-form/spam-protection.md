# Spam Protection

The contact form uses two layers of spam protection.

## Layer 1: Honeypot Field

A hidden form field named `companyWebsite` is rendered in the form but visually hidden using `sr-only` (screen reader only) CSS and `aria-hidden="true"`. It also has `tabIndex={-1}` so keyboard users cannot reach it.

Legitimate users never see or fill this field. Automated bots that fill all form fields will populate it. When the server detects a non-empty `companyWebsite` value, it responds with a success message but does not send any email. This silently discards bot submissions without alerting the bot that it was detected.

## Layer 2: Cloudflare Turnstile

Cloudflare Turnstile is a non-intrusive CAPTCHA alternative. It runs in the background and verifies that the visitor is human without requiring them to solve a puzzle.

### Setup

1. Go to the Cloudflare dashboard and navigate to Turnstile
2. Create a new widget for your domain
3. Copy the **Site Key** and **Secret Key**
4. Set these as environment variables on Cloudflare Pages:
   - `PUBLIC_TURNSTILE_SITE_KEY`: Used by the client-side widget
   - `TURNSTILE_SECRET_KEY`: Used by the server to verify tokens

### How It Works

1. If `PUBLIC_TURNSTILE_SITE_KEY` is set, the Turnstile widget renders below the form
2. When the user submits, the widget provides a token
3. The server sends this token to Cloudflare's verification API (`challenges.cloudflare.com/turnstile/v0/siteverify`)
4. If verification fails, the submission is rejected with an error message

### Without Turnstile

If `PUBLIC_TURNSTILE_SITE_KEY` is not configured, the Turnstile widget does not render and the form works without it. The submit button is not disabled. The honeypot field remains active as the only spam protection.

Note that the server-side function currently requires `TURNSTILE_SECRET_KEY` to be set. If you want the form to work without Turnstile on the server side as well, the validation logic in `functions/api/contact.ts` would need to be adjusted to make the `turnstileToken` field optional.
