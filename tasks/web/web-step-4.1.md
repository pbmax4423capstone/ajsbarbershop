# Task: Web Step 4.1 — Assets, Meta Tags & SEO

## Context
You are building **A.J's Barbershop Website**, a multi-page static site (Next.js 15, TypeScript, Tailwind CSS) hosted on GitHub Pages. This step adds the shop logo, favicon, full meta tags, Open Graph tags, and a robots.txt file to prepare the site for sharing and search engines.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`

> **Model note:** This task is designed to be executed by Claude Haiku 4.5.

## Prerequisites
- All of Phase 1, 2, and 3 are complete: all three pages exist and `npm run build` succeeds.

## Your Task
Add assets and SEO metadata across four actions.

---

### Part 1 — Copy the Logo

The mobile app's logo image is located at:
```
C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app\assets\images\icon.png
```

Copy it to:
```
C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web\public\images\logo.png
```

**Using PowerShell:**
```powershell
New-Item -ItemType Directory -Path "public\images" -Force
Copy-Item -Path "..\ajs-barbershop-app\assets\images\icon.png" -Destination "public\images\logo.png"
```

If the source file does not exist, create a placeholder 256×256 PNG with a navy background (`#1A2B3C`) and the text "AJ" in white. You can skip this and note it as a manual step for Patrick if image generation is not feasible.

After copying, also add a favicon. Copy the same logo as favicon:
```powershell
Copy-Item -Path "public\images\logo.png" -Destination "public\favicon.ico"
```

> **Note:** A `.png` used as `favicon.ico` works in most modern browsers. For production, convert it to a proper `.ico` file using a tool like [favicon.io](https://favicon.io) — note this as a manual step.

---

### Part 2 — Update `app/layout.tsx` with Full Metadata

Replace the `metadata` export in `app/layout.tsx` with comprehensive metadata including Open Graph:

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: "A.J's Barbershop — Greenwood Village, CO",
    template: "%s | A.J's Barbershop",
  },
  description:
    "By appointment only barbershop in Greenwood Village, CO. Quality men's haircuts, senior cuts, kids cuts, and beard detail. Book online via Square.",
  keywords: [
    "barbershop",
    "Greenwood Village",
    "Colorado",
    "Denver barbershop",
    "men's haircut",
    "by appointment barbershop",
    "A.J's Barbershop",
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pbmax4423.github.io/ajs-barbershop-web/',
    siteName: "A.J's Barbershop",
    title: "A.J's Barbershop — Greenwood Village, CO",
    description:
      "By appointment only barbershop in Greenwood Village, CO. Quality cuts and exceptional service.",
    images: [
      {
        url: '/ajs-barbershop-web/images/logo.png',
        width: 256,
        height: 256,
        alt: "A.J's Barbershop logo",
      },
    ],
  },
  icons: {
    icon: '/ajs-barbershop-web/favicon.ico',
    apple: '/ajs-barbershop-web/images/logo.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text-main antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

> **Important:** Replace `pbmax4423` in the URLs above with the actual GitHub username that will host this site. If unknown at build time, use a comment: `// TODO: replace with actual GitHub username`.

---

### Part 3 — Create `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://pbmax4423.github.io/ajs-barbershop-web/sitemap.xml
```

> Replace `pbmax4423` with the actual GitHub username or add a TODO comment.

---

### Part 4 — Update Per-Page Metadata

The Services and Info pages already have `metadata` exports from Steps 3.2 and 3.3. Verify they use the `template` format that will work with the root layout's `title.template`:

Check `app/services/page.tsx` — the `metadata.title` should be a plain string like `"Services & Pricing"` (not the full title — the template appends the site name):

```ts
export const metadata: Metadata = {
  title: 'Services & Pricing',
  description: "...",
}
```

Check `app/info/page.tsx` similarly:

```ts
export const metadata: Metadata = {
  title: 'Hours & Info',
  description: "...",
}
```

If the titles already include "A.J's Barbershop" in them, remove that part — it will be appended automatically by the template.

---

### Part 5 — Verify

```powershell
npm run build
```

After the build:
- `out/images/logo.png` must exist
- `out/favicon.ico` must exist
- `out/robots.txt` must exist
- `out/index.html` must contain Open Graph `<meta>` tags in the `<head>`
- Zero build errors

---

## Acceptance Criteria
- [ ] `public/images/logo.png` exists (copied from mobile app or placeholder)
- [ ] `public/favicon.ico` exists
- [ ] `public/robots.txt` exists with `Allow: /`
- [ ] `app/layout.tsx` has full metadata with `title.template`, description, keywords, and OpenGraph
- [ ] Per-page titles in `services/page.tsx` and `info/page.tsx` use short titles (template appends site name)
- [ ] `npm run build` generates all static assets with zero errors

## Files to Create
- `public/images/logo.png`
- `public/favicon.ico`
- `public/robots.txt`

## Files to Modify
- `app/layout.tsx` — enhanced metadata
- `app/services/page.tsx` — short title for template
- `app/info/page.tsx` — short title for template

## Do NOT Change
- `lib/business.ts`, `lib/hours.ts`
- `components/` directory
- `next.config.ts`, `package.json`, `tsconfig.json`
- `app/page.tsx`
