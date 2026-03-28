# Server-Side API

## Endpoint

`POST /api/contact`

**File:** `functions/api/contact.ts`

## Request Format

The endpoint accepts JSON or form-encoded data.

### JSON Body

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "company": "Acme Corp",
  "subject": "Engineering collaboration",
  "message": "I would like to discuss a potential project.",
  "turnstileToken": "<token from Cloudflare Turnstile widget>"
}
```

### Validation Rules

| Field | Rules |
|-------|-------|
| `name` | Required, 2-120 characters |
| `email` | Required, valid email, max 256 characters |
| `company` | Optional, max 120 characters. Empty strings are treated as null |
| `subject` | Required, 2-180 characters |
| `message` | Required, 8-5000 characters |
| `companyWebsite` | Honeypot field. If filled, the submission is silently accepted without sending email |
| `turnstileToken` | Required by the schema. The client omits this if Turnstile is not configured |

## Response Format

All responses are JSON with `Content-Type: application/json`.

### Success (200)

```json
{
  "ok": true,
  "message": "Thanks for reaching out. Your message is in, and a confirmation email has been sent."
}
```

### Validation Error (400)

```json
{
  "ok": false,
  "error": "Invalid form input."
}
```

### Spam Check Failed (400)

```json
{
  "ok": false,
  "error": "Spam check failed. Please retry."
}
```

### Server Configuration Error (500)

```json
{
  "ok": false,
  "error": "Server configuration incomplete. Set TURNSTILE_SECRET_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL."
}
```

### Email Send Failure (502)

```json
{
  "ok": false,
  "error": "Unable to send email right now. Please try again."
}
```

## CORS and Methods

The endpoint supports `POST` and `OPTIONS` methods. The `OPTIONS` handler returns `204 No Content` with an `Allow` header. No CORS headers are set, meaning the form must be submitted from the same domain.
