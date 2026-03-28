# Contact Page

**Route:** `/contact`
**File:** `src/pages/contact.astro`

## Overview

The contact page provides a form for visitors to send messages. It is designed to feel warm and approachable rather than formal or intimidating.

## Form Fields

| Field | Required | Notes |
|-------|----------|-------|
| Name | Yes | Marked with asterisk |
| Email | Yes | Validated as email format |
| Company or Team | No | Optional context |
| Subject | Yes | Brief topic |
| Message | Yes | Free-text, minimum 8 characters |

## Form Component

The form is a React component at `src/components/contact/ContactForm.tsx`. It handles:

- Client-side validation with required field indicators (red asterisks)
- Loading state with a spinner animation on the submit button
- Success state with a spring-animated green confirmation message
- Error state with a spring-animated red error message
- Form reset after successful submission

## Spam Protection

A hidden honeypot field (`companyWebsite`) catches basic bots. If filled, the server silently accepts the submission without sending email.

Cloudflare Turnstile provides additional protection when configured. The form works without Turnstile if the site key is not set. See [Spam Protection](../contact-form/spam-protection.md).

## Server-Side Processing

Form submissions are sent as JSON to `/api/contact`, handled by the Cloudflare Pages Function. See [Contact Form Overview](../contact-form/overview.md).

## Data Sources

- `siteData.contactExpectations` for context text above the form
- Turnstile site key from the `PUBLIC_TURNSTILE_SITE_KEY` environment variable
