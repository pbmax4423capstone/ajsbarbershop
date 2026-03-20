# Task: Web Step 4.3 — GitHub Actions Deploy Workflow

## Context
You are building **A.J's Barbershop Website**, a multi-page static site (Next.js 15, TypeScript, Tailwind CSS). This final step sets up automated deployment to GitHub Pages using GitHub Actions so that every push to `main` automatically deploys the site.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`

> **Model note:** This task is designed to be executed by Claude Haiku 4.5.

## Prerequisites
- All of Phase 1–4 (Steps 1.1 through 4.2) are complete.
- `npm run build` succeeds and generates an `out/` directory.
- `next.config.ts` has `output: 'export'`, `trailingSlash: true`, and `basePath: '/ajs-barbershop-web'`.

## Your Task
Create the GitHub Actions workflow file that builds and deploys the site to GitHub Pages, and document the manual steps Patrick needs to perform in the GitHub repository settings.

---

### Part 1 — Create the GitHub Actions Workflow

Create the file `.github/workflows/deploy.yml`:

**Step 1:** Create the directory structure:
```powershell
New-Item -ItemType Directory -Path ".github\workflows" -Force
```

**Step 2:** Create `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  # Allow manual trigger from the GitHub Actions tab
  workflow_dispatch:

# Sets permissions for the GITHUB_TOKEN to allow GitHub Pages deployment
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js static export
        run: npm run build

      - name: Upload static files as artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload the 'out' directory (Next.js static export output)
          path: out/

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### Part 2 — Verify `next.config.ts` is Correct

Before Patrick pushes to GitHub, confirm `next.config.ts` has the correct settings. Read the file and verify:

1. `output: 'export'` is present
2. `trailingSlash: true` is present
3. `images: { unoptimized: true }` is present
4. `basePath` is set to the GitHub repository name (e.g., `'/ajs-barbershop-web'`)

If `basePath` is still set to the placeholder value `/ajs-barbershop-web`, that is correct **as long as the GitHub repository is named `ajs-barbershop-web`**. Document this dependency clearly.

---

### Part 3 — Create a Deployment Guide

Create the file `DEPLOY.md` in the project root with instructions for Patrick:

```markdown
# Deployment Guide — A.J's Barbershop Website

## One-Time Setup (do this before the first deploy)

### 1. Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in as `pbmax4423`
2. Click "New repository"
3. Name it exactly: `ajs-barbershop-web`
   - This must match the `basePath` in `next.config.ts`
4. Set visibility to **Public** (required for free GitHub Pages)
5. Do NOT initialize with README, .gitignore, or license (you'll push existing code)
6. Click "Create repository"

### 2. Push the Code to GitHub
From `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`:

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/pbmax4423/ajs-barbershop-web.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub: `github.com/pbmax4423/ajs-barbershop-web`
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Build and deployment", set **Source** to: **GitHub Actions**
4. Click Save (if prompted)

### 4. Wait for the First Deploy
- Go to the **Actions** tab in your repository
- You should see a workflow run called "Deploy to GitHub Pages" in progress
- Wait for it to complete (usually 1–3 minutes)
- When done, your site is live at:
  `https://pbmax4423.github.io/ajs-barbershop-web/`

---

## Ongoing Updates

Every time you push to `main`, the site automatically rebuilds and deploys.

To update business data (hours, prices, services):
1. Edit `lib/business.ts`
2. Commit and push to `main`:
   ```powershell
   git add .
   git commit -m "Update business hours"
   git push
   ```
3. Wait ~2 minutes for the deploy to complete

---

## Custom Domain (Optional, Future)

If AJ's Barbershop gets a custom domain (e.g., `ajsbarbershop.com`):
1. Add a `CNAME` file to the `public/` folder containing just the domain name
2. Set `basePath: ''` in `next.config.ts` (remove it entirely)
3. Configure DNS with your domain registrar to point to GitHub Pages
4. In GitHub Settings → Pages, enter the custom domain

---

## Troubleshooting

**Build fails in GitHub Actions:**
- Check the Actions tab for error logs
- Most common cause: a TypeScript error that passed locally but fails in CI
- Fix the error, commit, and push again

**Site shows 404:**
- Verify the repository name exactly matches `basePath` in `next.config.ts`
- Verify GitHub Pages source is set to "GitHub Actions" (not "Deploy from branch")

**Images not loading:**
- Ensure `images: { unoptimized: true }` is in `next.config.ts`
- Ensure image paths include the `basePath` prefix (e.g., `/ajs-barbershop-web/images/logo.png`)
```

---

### Part 4 — Verify Locally

Run a final full build to confirm everything is ready for GitHub:

```powershell
npm run build
```

Confirm the `out/` directory contains:
- `index.html`
- `services/index.html`
- `info/index.html`
- `images/logo.png`
- `favicon.ico`
- `robots.txt`

---

## Acceptance Criteria
- [ ] `.github/workflows/deploy.yml` exists with the correct workflow content
- [ ] Workflow triggers on push to `main` and on manual `workflow_dispatch`
- [ ] Workflow uses `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`
- [ ] `DEPLOY.md` exists with clear step-by-step instructions for Patrick
- [ ] `next.config.ts` `basePath` matches the planned repo name `ajs-barbershop-web`
- [ ] `npm run build` generates `out/` with all required files
- [ ] `out/index.html`, `out/services/index.html`, and `out/info/index.html` all exist

## Files to Create
- `.github/workflows/deploy.yml`
- `.github/` directory
- `.github/workflows/` directory
- `DEPLOY.md`

## Do NOT Change
- Any source files in `app/`, `components/`, `lib/`
- `next.config.ts` (verify only — do not change unless `basePath` is wrong)
- `package.json`, `tsconfig.json`
