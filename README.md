# Portfolio

Personal portfolio and biography website. Static site built with Astro, styled with Tailwind CSS, deployed on Cloudflare Pages.

## Quick Start

```
npm install
npm run dev
```

Build for production:

```
npm run build
```

Run locally with Cloudflare Functions (for contact form testing):

```
npm run build
npm run cf:dev
```

## Documentation

Full documentation is in the [docs/](docs/README.md) directory, covering:

- [Installation and Setup](docs/getting-started/installation.md)
- [Project Structure](docs/getting-started/project-structure.md)
- [Technology Stack](docs/architecture/stack.md)
- [Content Management](docs/content/overview.md)
- [Styling and Theming](docs/styling/global-styles.md)
- [Contact Form](docs/contact-form/overview.md)
- [Deployment](docs/deployment/cloudflare-pages.md)
- [Environment Variables](docs/deployment/environment-variables.md)

## Stack

- Astro 6 (static site generator)
- React 19 (interactive components only)
- Tailwind CSS 4
- Motion (animations)
- Zod (content validation)
- Cloudflare Pages + Pages Functions
- Resend / Postmark (email)
- Cloudflare Turnstile (spam protection)

## Content

All content is managed through JSON files in `src/content/` and `src/data/`. No CMS or database required. Content is validated at build time. See [Content Overview](docs/content/overview.md).

## Deployment

Deployed on Cloudflare Pages with automatic builds on push. The `functions/` directory provides the contact form API endpoint. See [Deployment Guide](docs/deployment/cloudflare-pages.md).

## Environment Variables

Runtime variables are required for the contact form. See [Environment Variables](docs/deployment/environment-variables.md) for the complete list. No secrets should be committed to the repository.

## License

All rights reserved.

