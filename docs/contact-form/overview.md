# How the Contact Form Works

## Overview

The contact form allows visitors to send messages directly from the site. The system has three parts:

1. **Client-side form** (React component in the browser)
2. **Server-side API** (Cloudflare Pages Function on the edge)
3. **Email delivery** (SMTP via Zoho Mail by default, with Resend and Postmark as alternatives)

## Flow

1. The visitor fills out the form on the `/contact` page
2. The React component sends a JSON POST request to `/api/contact`
3. The Cloudflare Pages Function receives the request and:
   - Validates the payload against a Zod schema
   - Checks the honeypot field (rejects bots silently)
   - Verifies the Cloudflare Turnstile token (if configured)
   - Sends two emails: one notification to the site owner, one acknowledgment to the sender
4. The function returns a JSON response
5. The React component displays a success or error message with animation

## What Gets Sent

**To the site owner:**
- Sender's name, email, company, subject, and full message
- Reply-To header set to the sender's email for easy responses

**To the sender:**
- A confirmation email acknowledging receipt of their message

## Configuration Required

The contact form requires environment variables to be set on Cloudflare Pages. Without these, the form will return a server configuration error.

See [Environment Variables](../deployment/environment-variables.md) for the full list.

## Related Documentation

- [Server-Side API](api.md)
- [Email Providers](email-providers.md)
- [Spam Protection](spam-protection.md)
- [Contact Page](../pages/contact.md)
