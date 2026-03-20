# Task: Web Step 1.1 — Scaffold Next.js Project

## Context
You are building **A.J's Barbershop Website**, a multi-page static website for a barbershop in Greenwood Village, Colorado. The site will be hosted on GitHub Pages and mirrors the content of the companion mobile app: services/prices, business hours, booking link (Square), directions, and email contact.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`
**Stack:** Next.js 15 (App Router), TypeScript (strict), Tailwind CSS, static export for GitHub Pages

> **Model note:** This task is designed to be executed by Claude Haiku 4.5.

## Prerequisites
- Node.js is installed and available on the PATH
- The parent directory `C:\Cursor Projects\AJsBarbershop` exists
- `ajs-barbershop-web` does NOT yet exist (this step creates it)

## Your Task
Scaffold the Next.js project, then clean the boilerplate so the project is a blank slate ready for Phase 1 configuration.

---

### Actions

#### 1. Scaffold the project
Run the following command from `C:\Cursor Projects\AJsBarbershop`:

```powershell
npx create-next-app@latest ajs-barbershop-web --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

This creates:
```
ajs-barbershop-web/
  app/
    layout.tsx
    page.tsx
    globals.css
  public/
  next.config.ts
  tailwind.config.ts   (may be tailwind.config.js depending on version)
  tsconfig.json
  package.json
  .eslintrc.json
```

#### 2. Clean default boilerplate content
After scaffolding, make the following changes:

**Replace `app/page.tsx` with a minimal placeholder:**
```tsx
export default function HomePage() {
  return (
    <main>
      <h1>A.J&apos;s Barbershop</h1>
    </main>
  )
}
```

**Replace `app/globals.css` — keep only the Tailwind directives (remove all default CSS variables and demo styles):**

If Tailwind v4 was installed (uses `@import "tailwindcss"` syntax):
```css
@import "tailwindcss";
```

If Tailwind v3 was installed (uses `@tailwind` directives):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Check which version was installed by reading `package.json` — if `tailwindcss` version starts with `4`, use v4 syntax. If `3`, use v3 syntax.

**Remove the following default files if they exist:**
- `app/page.module.css`
- `public/next.svg`
- `public/vercel.svg`

#### 3. Create required directories
```powershell
New-Item -ItemType Directory -Path "ajs-barbershop-web\components" -Force
New-Item -ItemType Directory -Path "ajs-barbershop-web\lib" -Force
```

#### 4. Verify the build passes
From `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`:
```powershell
npm run build
```

The build must succeed with zero errors. Fix any TypeScript or lint errors before proceeding.

---

## Acceptance Criteria
- [ ] `ajs-barbershop-web/` directory exists with a valid Next.js project structure
- [ ] `app/page.tsx` contains only the minimal placeholder (no default demo content)
- [ ] `app/globals.css` contains only Tailwind directives (no default CSS variables)
- [ ] `public/next.svg` and `public/vercel.svg` are deleted
- [ ] `components/` and `lib/` directories exist
- [ ] `npm run build` completes with zero errors

## Files Created
- `ajs-barbershop-web/` (entire project scaffold)

## Files Modified
- `app/page.tsx` — stripped to minimal placeholder
- `app/globals.css` — stripped to Tailwind directives only

## Files Deleted
- `app/page.module.css` (if present)
- `public/next.svg`
- `public/vercel.svg`

## Do NOT Change
- `package.json`
- `tsconfig.json`
- `next.config.ts` (will be configured in Step 1.2)
- `tailwind.config.ts` / `tailwind.config.js` (will be configured in Step 1.2)
