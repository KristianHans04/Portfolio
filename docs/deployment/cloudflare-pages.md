# Cloudflare Pages Setup

## Overview

The site is deployed on Cloudflare Pages, which serves the static HTML and also runs the contact form API as a Pages Function.

## Initial Setup

1. Create a Cloudflare account at dash.cloudflare.com if you do not have one
2. Go to Workers and Pages in the dashboard
3. Create a new Pages project
4. Connect your Git repository (GitHub or GitLab)
5. Configure the build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 20 (set via environment variable `NODE_VERSION=20`)

## Deployment

Cloudflare Pages automatically deploys on every push to the main branch. You can also deploy manually:

```
npm run build
npx wrangler pages deploy dist --project-name YOUR_PROJECT_NAME
```

Replace `YOUR_PROJECT_NAME` with your Cloudflare Pages project name.

## Pages Functions

The `functions/` directory is automatically detected by Cloudflare Pages. Any TypeScript files in `functions/api/` become API endpoints. The contact form handler at `functions/api/contact.ts` is deployed as `/api/contact`.

Functions run on Cloudflare's edge network, close to the user, with low latency.

## Local Development with Functions

The standard `npm run dev` does not execute Cloudflare Functions. To test the contact form locally:

```
npm run build
npm run cf:dev
```

This starts the Wrangler local development server with Functions support.

## Environment Variables

Environment variables are set in the Cloudflare Pages dashboard under Settings. See [Environment Variables](environment-variables.md) for the required variables.

## Wrangler Configuration

The `wrangler.toml` file contains minimal configuration:

```toml
name = "premium-engineering-portfolio"
compatibility_date = "2026-03-07"

[assets]
directory = "./dist"
```

The compatibility date determines which Cloudflare runtime features are available. The assets directory tells Wrangler where to find the static build output.
