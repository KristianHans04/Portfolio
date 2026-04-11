# Cloudflare Pages: Full Deployment Guide with Git Integration

This document covers how all personal projects are deployed to Cloudflare Pages with native GitHub Git integration, what went wrong the first time, how it was fixed, and the exact steps to deploy any future project correctly. It also documents the domain convention and every project-specific configuration.

---

## Domain Convention

All personal projects follow the convention:

```
[project-name].kristianhans.com
```

For example:
- `logistics.kristianhans.com`
- `scrapifie.kristianhans.com`
- `fgckenya.kristianhans.com`

Some projects also have secondary custom domains (e.g., `logistics.ownthejoke.com`, `scrapifie.com`). The primary subdomain is always on `kristianhans.com`.

All DNS records for `kristianhans.com` are managed in Cloudflare. Adding a custom domain to a Pages project automatically creates the CNAME record if the zone is in the same Cloudflare account.

---

## The Correct Way to Deploy a New Project

> Always follow this process for any new project. Never use `wrangler pages deploy` for initial setup — it creates a direct-upload project with no Git connection.

### Step 1 — Create the Cloudflare Pages project via the dashboard (recommended)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** > **Create** > **Pages** > **Connect to Git**
3. Authorize GitHub if not already done
4. Select the repository and branch to deploy from
5. Configure the build settings (see the project table below for per-project settings)
6. Click **Save and Deploy**

This creates a native Git-connected project. Every push to the configured branch triggers a new build and deployment automatically.

### Step 2 — Set environment variables

After the project is created, go to **Settings** > **Environment Variables** and add any required secrets (API keys, database URLs, etc.). These apply to both Production and Preview environments unless configured separately.

For Node.js version requirements, set:
```
NODE_VERSION = <version>
```

For example, the portfolio (Astro) requires Node.js 22+:
```
NODE_VERSION = 22
```

### Step 3 — Add the custom domain

1. Go to the project > **Custom domains** > **Set up a custom domain**
2. Enter `[project-name].kristianhans.com`
3. If the DNS zone for `kristianhans.com` is in the same Cloudflare account, the CNAME is added automatically
4. If on an external registrar, add a CNAME record pointing to `[project-name].pages.dev`

---

## The Mistake: Deploying via Wrangler (Direct Upload)

### What happened

Initially, all eight projects were deployed using the Wrangler CLI:

```bash
npx wrangler pages deploy ./dist --project-name my-project
```

This command creates a **direct-upload** Pages project. Direct-upload projects:
- Have **no Git connection**
- Show "No Git connection" in the Cloudflare dashboard
- Do not auto-deploy on push to GitHub
- Cannot be changed to a Git-connected project after creation via the PATCH API (returns error `8000069: Deployments source type cannot be changed`)
- Do not show which branch is deployed or what commit is live

The CI/CD pipelines (GitHub Actions) were running wrangler on every push, which did deploy the code — but it was a manual file upload, not a native build. There was no branch tracking, no commit visibility, and no way to know from the dashboard what state was deployed.

### Why it cannot be fixed in-place

Cloudflare's API does not allow changing the source type from `direct_upload` to `github` on an existing project:

```json
{
  "errors": [{ "code": 8000069, "message": "Deployments source type cannot be changed" }]
}
```

The only fix is to delete the project and recreate it with the correct source configuration.

### The fix

The fix required:
1. Removing all custom domains from each project (Cloudflare blocks deletion of projects with active custom domains, error `8000028`)
2. Deleting each project via the API
3. Recreating each project via the API with `source.type: "github"` and the correct build configuration
4. Re-adding all custom domains

This was done for all eight projects using the Cloudflare REST API. See the API process section below for the exact calls used.

### Consequences of the mistake

- All projects previously showed "No Git connection" in the dashboard
- Auto-deploy on push did not work at the platform level (only through the GitHub Actions wrangler step)
- Removing the wrangler deploy step from CI was required after fixing, otherwise pushes would trigger both a native Cloudflare build AND a wrangler direct upload (double deploys)
- All CI workflows were updated to be build-verification-only after the Git connection was established

---

## API Process for Creating Git-Connected Projects

This section documents the exact API calls used to fix the deployment issue. It is useful if you ever need to automate project creation or recreate a project.

### Prerequisites

You need:
- A Cloudflare API token with Pages edit permissions
- Your Cloudflare account ID
- The GitHub App installation ID for your account

```bash
CF_ACCOUNT="e09b484534b3f30aa8e395372065c4f6"
CF_TOKEN="<your-api-token>"
```

### Step 1 — Find the GitHub App installation ID

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/pages/connections" \
  -H "Authorization: Bearer $CF_TOKEN"
```

The response includes a `settings_url` like:
```
https://github.com/settings/installations/114717473
```

The number at the end (`114717473`) is the installation ID. You need this when creating projects with Git source.

### Step 2 — Remove custom domains before deleting

```bash
curl -X DELETE \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/pages/projects/PROJECT_NAME/domains/DOMAIN_NAME" \
  -H "Authorization: Bearer $CF_TOKEN"
```

Repeat for every custom domain on the project. The API returns error `8000028` if you try to delete a project that still has active custom domains.

### Step 3 — Delete the project

```bash
curl -X DELETE \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/pages/projects/PROJECT_NAME" \
  -H "Authorization: Bearer $CF_TOKEN"
```

### Step 4 — Create the project with Git source

```bash
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/pages/projects" \
  -H "Authorization: Bearer $CF_TOKEN" \
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
        "pr_comments_enabled": false,
        "deployments_enabled": true
      }
    },
    "build_config": {
      "build_command": "npm run build",
      "destination_dir": "dist",
      "root_dir": ""
    }
  }'
```

Key fields:
- `source.config.owner` — GitHub username or org
- `source.config.repo_name` — exact repository name on GitHub (case-sensitive)
- `build_config.root_dir` — if the frontend lives in a subdirectory (e.g., `client`), set this to that path. Cloudflare runs `npm install` in this directory automatically.
- `build_config.destination_dir` — relative to `root_dir`, where the build outputs go (usually `dist`)

### Step 5 — Set environment variables

```bash
curl -X PATCH \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/pages/projects/PROJECT_NAME" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deployment_configs": {
      "production": {
        "env_vars": {
          "NODE_VERSION": { "value": "22" }
        }
      }
    }
  }'
```

### Step 6 — Re-add custom domains

```bash
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/pages/projects/PROJECT_NAME/domains" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "name": "project.kristianhans.com" }'
```

---

## Project Configuration Reference

This table documents the exact build configuration for all eight deployed projects.

| Project | Pages Name | GitHub Repo | Branch | root_dir | build_command | dest_dir | Custom Domains |
|---------|-----------|-------------|--------|----------|---------------|----------|----------------|
| Department of Logistics | `logistics-hq` | `Logistics` | `main` | `site` | `npm install && npm run build` | `dist` | `logistics.kristianhans.com`, `logistics.ownthejoke.com` |
| Scrapifie | `scrapifie` | `ScraperX` | `master` | *(root)* | `npm run build:frontend` | `dist/frontend` | `scrapifie.com`, `scrapifie.kristianhans.com` |
| Atote Labs | `atote-labs` | `Atote-Labs` | `main` | `client` | `npm install && npm run build` | `dist` | *(none, accessible at atote-labs.pages.dev)* |
| Venturely | `atote` | `atote` | `main` | `client` | `npm install && npm run build` | `dist` | `atotee.kristianhans.com`, `venturely.kristianhans.com` |
| OwnTheJoke | `ownthejoke` | `OwnTheJoke.com` | `main` | `client` | `npm install && npm run build` | `dist` | `ownthejoke.kristianhans.com` |
| MWC Advocates | `mwc-advocates` | `mwc-advocates` | `PERN` | `client` | `npm install && npm run build` | `dist` | `mwc-advocates.kristianhans.com`, `mwcadvocates.kristianhans.com` |
| Portfolio | `kristian-portfolio` | `Portfolio` | `main` | *(root)* | `npm run build` | `dist` | *(points to kristianhans.com separately)* |
| FGC Kenya | `fgc-kenya` | `FGC_Kenya` | `main` | *(root)* | `npm run build` | `out` | `fgckenya.kristianhans.com` |

### Project-specific notes

**ScraperX:**
- Branch is `master`, not `main`
- Build command is `npm run build:frontend`, not the default `npm run build`
- Output dir is `dist/frontend` because the repo contains both backend and frontend; Cloudflare must only serve the frontend build

**MWC Advocates:**
- Default branch is `PERN` — this is the production branch, not `main`
- Frontend is in the `client/` subdirectory; set `root_dir: "client"`

**Atote/Venturely:**
- The GitHub repo is lowercase `atote` (it was renamed on GitHub)
- The Cloudflare Pages project name is also `atote`
- Frontend is in the `client/` subdirectory

**OwnTheJoke:**
- The GitHub repo was renamed from `ClothHats.com` to `OwnTheJoke.com` — always use the current name
- Frontend is in `client/`

**FGC Kenya:**
- Uses Next.js static export — output directory is `out`, not `dist`
- The `.gitignore` in this repo blocks `.github/workflows` — use `git add -f` when adding or updating CI files

**Portfolio:**
- Uses Astro — requires Node.js 22 or higher
- Set `NODE_VERSION = 22` as an environment variable in the Cloudflare Pages project settings

**Atote Labs:**
- Has no custom domain yet; accessible at `atote-labs.pages.dev`

---

## CI/CD Workflow After the Fix

After switching to native Git-connected deployments, Cloudflare Pages handles all builds and deploys natively on push. The GitHub Actions workflows were updated to be **build-verification only** — they no longer deploy anything.

This means every push triggers:
1. A GitHub Actions CI run that builds the project and verifies there are no build errors
2. A Cloudflare Pages native build that deploys the result to production

### What was changed in all CI workflows

Removed from every workflow:
```yaml
- name: Deploy to Cloudflare Pages
  uses: cloudflare/wrangler-action@v3
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    command: pages deploy ...
```

Renamed from `Deploy to Cloudflare Pages` / `CI / Deploy` to just `CI`.

Added `pull_request` trigger to workflows that only had `push`:
```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

All eight workflows follow the same pattern now:
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Build
5. (Cloudflare deploys natively from the same push)

---

## Cloudflare Secrets and Credentials

Do not commit API tokens or secrets to any repository. All sensitive values are stored as:
- Cloudflare Pages environment variables (for build-time values and runtime secrets)
- GitHub Actions repository secrets (for CI workflows)

Required GitHub Actions secrets per project (where applicable):
- `CLOUDFLARE_API_TOKEN` — was previously used for wrangler deploys; no longer needed for CI-only workflows but may still be present
- `CLOUDFLARE_ACCOUNT_ID` — same situation

For fullstack projects that need runtime environment variables (database URLs, API keys), these are set in the Cloudflare Pages dashboard under **Settings** > **Environment Variables**, not in GitHub.

---

## Verifying a Deployment

After any push to the production branch:

1. Check the **Cloudflare Pages dashboard** for the project — the latest deployment should show the commit message and `deploy: success`
2. Check the **GitHub Actions** tab — the CI workflow should complete with a green checkmark
3. Verify the live site at the custom domain

To check deployment status via API:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/pages/projects/PROJECT_NAME/deployments" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -c "
import sys, json
d = json.load(sys.stdin)
r = d.get('result', [])
if r:
    dep = r[0]
    print('Stage:', dep['latest_stage']['name'] + ':' + dep['latest_stage']['status'])
    print('Commit:', dep.get('deployment_trigger', {}).get('metadata', {}).get('commit_message', 'N/A'))
    print('URL:', dep.get('url', 'N/A'))
"
```

---

## LLM Crawling Files

Every deployed project has the following files in its `public/` directory to enable AI agent and search engine discovery:

| File | Purpose |
|------|---------|
| `robots.txt` | Crawler rules — all major AI and search crawlers are explicitly allowed |
| `llms.txt` | Comprehensive plain-text description of every page and view in the project |
| `sitemap.xml` | All public URLs for search engine indexing |
| `_headers` | Cloudflare Pages custom headers for correct content-type and cache settings |

The portfolio site additionally has `llms-full.txt`, `ai.txt`, `humans.txt`, and `opensearch.xml`.

The LLM crawling files are written to cover every view in every project — not just the landing page. See each project's `llms.txt` for the full list of routes documented.

The portfolio's `llms.txt` and `llms-full.txt` contain a table linking to the `llms.txt` of every other deployed site, creating a discoverable ecosystem for AI agents starting from `kristianhans.com`.

### Public directory locations

```
Logistics:      site/public/
ScraperX:       public/
Atote-Labs:     client/public/
Atote:          client/public/
ClothHats.com:  client/public/
mwc-advocates:  client/public/
FGC_Kenya:      public/
Portfolio:      public/
```

---

## Common Issues and Solutions

### "No Git connection" in Cloudflare dashboard

**Cause:** The project was created via `wrangler pages deploy`, which creates a direct-upload project.

**Fix:** Delete the project and recreate it via the Cloudflare dashboard or API with `source.type: "github"`. See the API Process section above.

### "Deployments source type cannot be changed" (error 8000069)

**Cause:** Attempting to PATCH `source.type` on an existing direct-upload project.

**Fix:** You cannot change the source type on an existing project. Delete and recreate it.

### "Please remove custom domain first" (error 8000028)

**Cause:** Attempting to delete a project that still has active custom domains.

**Fix:** Remove all custom domains from the project before deleting it.

### Build fails with "Cannot find module" or Node version error

**Cause:** The Node.js version on Cloudflare's build environment does not match the project requirements.

**Fix:** Set `NODE_VERSION` as an environment variable in the Cloudflare Pages project settings. The portfolio requires `NODE_VERSION=22` (Astro requirement).

### Build output not found / wrong directory

**Cause:** The `destination_dir` in `build_config` does not match where the framework outputs its build.

**Fix:** Check the project's build script. Next.js static export outputs to `out`. Vite and most React setups output to `dist`. ScraperX outputs to `dist/frontend` because it is a monorepo with backend code.

### Frontend in a subdirectory is not found

**Cause:** The `root_dir` in `build_config` is not set, so Cloudflare tries to build from the repo root where there is no `package.json` or the wrong one.

**Fix:** Set `root_dir` to the subdirectory containing the frontend (e.g., `client`). Cloudflare automatically runs `npm install` in that directory before running the build command.

### CI fails because wrangler cannot find a project

**Cause:** A leftover wrangler deploy step in the CI workflow after switching to native Git deployment.

**Fix:** Remove the `cloudflare/wrangler-action@v3` step from the CI workflow. Cloudflare deploys natively; the CI workflow should only build and verify.

### FGC Kenya .github/workflows is gitignored

**Cause:** The FGC_Kenya repository has `.github/workflows` in its `.gitignore`.

**Fix:** Use `git add -f .github/workflows/ci.yml` to force-add the CI file despite the gitignore rule.
