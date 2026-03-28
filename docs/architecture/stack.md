# Technology Stack

## Core Framework

**Astro 6** is the site generator. It produces static HTML at build time with zero client-side JavaScript by default. Interactive components opt in to client-side hydration individually.

Configuration lives in `astro.config.mjs`. The site uses static output mode, meaning every page is pre-rendered to HTML during the build.

## Frontend

**React 19** is used for interactive components only. These include the contact form, media modal, scroll animations, and counter components. Each React component uses Astro's `client:visible` or `client:load` directives to control when hydration occurs.

**Tailwind CSS 4** handles all styling through the `@tailwindcss/vite` plugin. Utility classes are used directly in templates. Custom design tokens and component classes are defined in `src/styles/global.css`. See [Design Tokens](../styling/design-tokens.md).

**Motion** (formerly Framer Motion) provides animation primitives for React components. It powers the scroll parallax, staggered reveal, interactive card tilt, counter animations, and the media modal transitions.

## Content and Validation

**Zod 4** validates all JSON content at build time. Every content collection (projects, press, travel, etc.) has a schema defined in `src/lib/content/schemas.ts`. If a JSON file fails validation, the build fails with a descriptive error message.

## Server-Side

**Cloudflare Pages Functions** handle the contact form submission. The API endpoint lives in `functions/api/contact.ts` and runs on Cloudflare's edge network. It validates input, checks spam protection, and sends emails.

**Resend** and **Postmark** are supported as email providers. The system uses a provider abstraction so switching between them requires only changing an environment variable.

**Cloudflare Turnstile** provides spam protection for the contact form. It is a non-intrusive CAPTCHA alternative that runs in the background.

## Build and Deploy

**Vite** is the underlying build tool, configured through Astro. The Tailwind CSS plugin runs as a Vite plugin.

**TypeScript** is used across the entire codebase. The `tsconfig.json` extends Astro's strict preset and adds path aliases (`@/` maps to `src/`).

**Wrangler** is the Cloudflare CLI used for local development with Functions and for deployment.

## Dependency Summary

| Package | Role |
|---------|------|
| `astro` | Static site generator |
| `@astrojs/react` | React integration for Astro |
| `react`, `react-dom` | Interactive component rendering |
| `@tailwindcss/vite` | Tailwind CSS via Vite plugin |
| `motion` | Animation library for React |
| `zod` | Runtime schema validation |
| `resend` | Email sending (production dependency) |
| `typescript` | Type checking |
| `wrangler` | Cloudflare local dev and deploy |
| `@cloudflare/workers-types` | TypeScript types for Cloudflare runtime |
