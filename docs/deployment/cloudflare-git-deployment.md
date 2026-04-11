# Deploying to Cloudflare Pages with Git Integration

This document is written for an LLM agent with zero prior context. It documents exactly how all projects in this portfolio are deployed to Cloudflare Pages with native GitHub Git integration, what the correct process is, what went wrong in previous attempts, and what to do differently.

Read this entirely before touching anything.

---

## What You Are Deploying

There are 8 projects deployed as Cloudflare Pages sites. Each follows the domain convention:

```
[project-name].kristianhans.com
```

The DNS zone for `kristianhans.com` is managed in Cloudflare. When you add a custom domain to a Pages project and the zone is in the same Cloudflare account, the CNAME record is created automatically.

---

## Credentials You Will Need

Before doing anything, confirm you have these. Do not proceed without them.

```
CF_ACCOUNT_ID=YOUR_CF_ACCOUNT_ID
CF_API_TOKEN=YOUR_CF_API_TOKEN
GITHUB_APP_INSTALLATION_ID=YOUR_GITHUB_APP_INSTALLATION_ID
```

- `CF_ACCOUNT_ID`: The Cloudflare account ID. Found in the Cloudflare dashboard URL or Account Home.
- `CF_API_TOKEN`: A Cloudflare API token with `Cloudflare Pages: Edit` permissions. Create one at dash.cloudflare.com > Profile > API Tokens.
- `GITHUB_APP_INSTALLATION_ID`: The GitHub App installation ID for the Cloudflare Pages GitHub integration.

Verify the token works before proceeding:
```bash
curl -s "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer YOUR_CF_API_TOKEN"
```

Expected response includes `"status": "active"`.

---

## The Critical Mistake: Do Not Use `wrangler pages deploy`

The first deployment attempt used `wrangler pages deploy` to upload build artifacts directly. This creates a **direct-upload** Pages project with no Git connection. That means:

- No automatic deployments on push
- No branch preview deployments
- The Cloudflare dashboard shows "No Git connection"
- You cannot see which branch is deployed
- Fixing it requires deleting and recreating the project

**Do not use `wrangler pages deploy` for initial project setup.** That command is only for one-off manual uploads.

---

## The Correct Way to Deploy a New Project

### Option A: Cloudflare Dashboard (Simplest)

1. Go to dash.cloudflare.com > Workers & Pages > Create > Pages > Connect to Git
2. Authorize GitHub
3. Select the repository and branch
4. Configure build settings (see per-project table below)
5. Save and Deploy

Every push to the configured branch then triggers an automatic build and deployment.

### Option B: Cloudflare API (Terminal)

**Step 1 - Create the Pages project with Git connection:**

```bash
curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/YOUR_CF_ACCOUNT_ID/pages/projects" \
  -H "Authorization: Bearer YOUR_CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "PROJECT_NAME",
    "production_branch": "main",
    "source": {
      "type": "github",
      "config": {
        "owner": "KristianHans04",
        "repo_name": "REPO_NAME",
        "production_branch": "main",
        "pr_comments_enabled": true,
        "deployments_enabled": true,
        "preview_deployment_setting": "custom",
        "preview_branch_includes": ["dev", "staging"],
        "installations_id": YOUR_GITHUB_APP_INSTALLATION_ID
      }
    },
    "build_config": {
      "build_command": "BUILD_COMMAND",
      "destination_dir": "DIST_DIR",
      "root_dir": ""
    }
  }'
```

Replace PROJECT_NAME, REPO_NAME, BUILD_COMMAND, DIST_DIR with values from the table below.

**Step 2 - Set environment variables:**

```bash
curl -s -X PATCH "https://api.cloudflare.com/client/v4/accounts/YOUR_CF_ACCOUNT_ID/pages/projects/PROJECT_NAME" \
  -H "Authorization: Bearer YOUR_CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deployment_configs": {
      "production": {
        "env_vars": {
          "VARIABLE_NAME": {"type": "plain_text", "value": "VALUE"}
        }
      }
    }
  }'
```

Use `plain_text` type for variables that need to be visible and editable in the CF dashboard.

**Step 3 - Add the custom domain:**

```bash
curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/YOUR_CF_ACCOUNT_ID/pages/projects/PROJECT_NAME/domains" \
  -H "Authorization: Bearer YOUR_CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "PROJECT_NAME.kristianhans.com"}'
```

---

## How to Fix a Project That Has No Git Connection

If a project shows "No Git connection", you must delete it and recreate it.

**Step 1 - Delete:**

```bash
curl -s -X DELETE \
  "https://api.cloudflare.com/client/v4/accounts/YOUR_CF_ACCOUNT_ID/pages/projects/PROJECT_NAME" \
  -H "Authorization: Bearer YOUR_CF_API_TOKEN"
```

Wait a few seconds, then recreate with Option B above.

---

## All 8 Projects - Configuration Reference

| CF Project Name      | Repository         | Branch | Build Command                               | Dist Dir       |
|----------------------|--------------------|--------|---------------------------------------------|----------------|
| kristian-portfolio   | kristian-portfolio | main   | npm run build                               | dist           |
| scrapifie            | Scraper            | main   | npm run build:frontend                      | dist/frontend  |
| atote                | Atote              | main   | cd client && npm install && npm run build   | client/dist    |
| fgc-kenya            | FGC_Kenya          | main   | npm run build                               | out            |
| ownthejoke           | ClothHats.com      | main   | cd client && npm install && npm run build   | client/dist    |
| logistics-hq         | Logistics          | main   | cd site && npm install && npm run build     | site/dist      |
| atote-labs           | Atote-Labs         | main   | cd client && npm install && npm run build   | client/dist    |
| mwc-advocates        | MWC_Advocates      | main   | npm run build                               | dist           |

Custom domains follow the pattern: PROJECT_NAME.kristianhans.com

**Notes:**
- `kristian-portfolio` requires `NODE_VERSION=22` as an env var (Astro requires Node 22+)
- `fgc-kenya` is a Next.js static export so the output dir is `out`, not `dist`
- For monorepo projects (atote, ownthejoke, logistics-hq, atote-labs), the root dir is the repo root and the build command cds into the client subdirectory
- `scrapifie` deploys only the frontend; the backend runs separately on Coolify

---

## GitHub Actions CI Workflow

All repos have `.github/workflows/ci.yml` that runs on push to `main`. The workflow installs dependencies and runs the build. If CI is failing, check:

- Node version: set `node-version` in the workflow to match what the project requires
- Build command: make sure it matches the CF Pages build command in the table above
- Missing env vars: CI builds cannot access CF Pages env vars; the build must succeed with only workflow-defined variables

Example for a standard Vite/React project:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
```

For monorepo projects, adjust the cache-dependency-path and commands:

```yaml
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: client/package-lock.json
      - run: cd client && npm ci
      - run: cd client && npm run build
```

---

## Environment Variables Set Per Project

Set via the PATCH API endpoint with `plain_text` type (visible and editable in CF dashboard).

**kristian-portfolio**: PUBLIC_TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_ACK_FROM_EMAIL, EMAIL_PROVIDER, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SITE_URL, NODE_VERSION

**logistics-hq**: GOOGLE_AI_API_KEY

**atote**: VITE_API_URL (the full production API base URL; code reads import.meta.env.VITE_API_URL)

**fgc-kenya**: NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SUPABASE_URL

**ownthejoke**: VITE_ENABLE_3D_MOCKUP, VITE_AI_MOCKUP_ENABLE_OPENROUTER, VITE_AI_MOCKUP_DEFAULT_PROVIDER, VITE_AI_MOCKUP_DEFAULT_MODEL_PROFILE, VITE_AI_MOCKUP_DEFAULT_ASPECT_RATIO, VITE_AI_MOCKUP_DEFAULT_IMAGE_SIZE

**scrapifie, atote-labs, mwc-advocates**: No frontend environment variables required.

---

## Triggering a Manual Deployment

After setting environment variables, trigger a new build so they take effect:

```bash
curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/YOUR_CF_ACCOUNT_ID/pages/projects/PROJECT_NAME/deployments" \
  -H "Authorization: Bearer YOUR_CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## Verifying Git Connection Status

Run this Python script to check all projects:

```python
import json, urllib.request

CF_ACCOUNT = "YOUR_CF_ACCOUNT_ID"
CF_TOKEN = "YOUR_CF_API_TOKEN"

req = urllib.request.Request(
    "https://api.cloudflare.com/client/v4/accounts/" + CF_ACCOUNT + "/pages/projects",
    headers={"Authorization": "Bearer " + CF_TOKEN}
)
with urllib.request.urlopen(req) as resp:
    d = json.load(resp)

for p in d["result"]:
    src = p.get("source", {})
    connected = bool(src.get("config", {}).get("repo_name"))
    status = "Git: YES" if connected else "DIRECT-UPLOAD (needs fix)"
    print(p["name"], "-", status)
```

Every project should show `Git: YES`.

---

## What Was Done During Initial Setup

1. All 8 projects were initially created with `wrangler pages deploy` — all showed "No Git connection".
2. Each project was deleted via the DELETE endpoint.
3. Each project was recreated via the POST endpoint with the `source.config` block pointing to the correct GitHub repo, branch, and GitHub App installation ID.
4. Custom domains were re-added via the `/domains` endpoint.
5. Environment variables were set via the PATCH endpoint for the 5 projects that need them.
6. Manual deployments were triggered via the POST endpoint to bake environment variables into the first build.

All 8 projects now auto-deploy on push to `main`.
