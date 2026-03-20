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
