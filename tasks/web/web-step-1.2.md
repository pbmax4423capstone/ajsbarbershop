# Task: Web Step 1.2 — Configure Static Export & Tailwind Theme

## Context
You are building **A.J's Barbershop Website**, a multi-page static site (Next.js 15, TypeScript, Tailwind CSS) hosted on GitHub Pages. All business data is static — no server, no database, no API.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`

> **Model note:** This task is designed to be executed by Claude Haiku 4.5.

## Prerequisites
- Step 1.1 is complete: the project is scaffolded, `components/` and `lib/` directories exist, and `npm run build` passes.

## Your Task
Configure Next.js for static export (GitHub Pages compatible) and add the brand color palette to Tailwind so all components can use named color classes like `bg-primary`, `text-accent`, etc.

---

### Part 1 — Configure `next.config.ts` for Static Export

Replace the contents of `next.config.ts` with:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // basePath must match your GitHub repository name exactly.
  // Example: if your repo is github.com/username/ajs-barbershop-web, use '/ajs-barbershop-web'
  // Leave empty string '' if deploying to a root domain (e.g. username.github.io)
  basePath: '/ajs-barbershop-web',
}

export default nextConfig
```

> **Important:** `output: 'export'` tells Next.js to generate a static `out/` directory. `trailingSlash: true` ensures GitHub Pages resolves routes correctly. `images: { unoptimized: true }` is required because the Next.js Image Optimization API is not available in static exports.

---

### Part 2 — Add Brand Colors to Tailwind

**First, check which version of Tailwind CSS is installed** by reading `package.json`. Look at the `tailwindcss` version field.

#### If Tailwind CSS v4 is installed (version `^4.x.x`):

Add the brand color theme to `app/globals.css` using the `@theme` directive. The file should look like this:

```css
@import "tailwindcss";

@theme {
  --color-primary: #1A2B3C;
  --color-primary-dark: #111D28;
  --color-accent: #C9922A;
  --color-accent-dark: #A87820;
  --color-background: #F5F5F5;
  --color-surface: #FFFFFF;
  --color-text-main: #1A1A1A;
  --color-text-secondary: #6B7280;
  --color-border: #E5E7EB;
  --color-success: #16A34A;
  --color-error: #DC2626;
}
```

With Tailwind v4, these custom properties automatically generate utility classes like `bg-primary`, `text-accent`, `border-border`, etc.

#### If Tailwind CSS v3 is installed (version `^3.x.x`):

Update `tailwind.config.ts` (or `tailwind.config.js`) to extend the theme with brand colors:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A2B3C',
        'primary-dark': '#111D28',
        accent: '#C9922A',
        'accent-dark': '#A87820',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        'text-main': '#1A1A1A',
        'text-secondary': '#6B7280',
        border: '#E5E7EB',
        success: '#16A34A',
        error: '#DC2626',
      },
    },
  },
  plugins: [],
}

export default config
```

---

### Part 3 — Update `app/layout.tsx` Background

Set the default page background to the brand light gray. Update `app/layout.tsx` to apply `bg-background` (or use the hex value inline if the class isn't available yet) to the `<body>`:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "A.J's Barbershop",
  description: 'By appointment only barbershop in Greenwood Village, CO.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text-main antialiased">
        {children}
      </body>
    </html>
  )
}
```

---

### Part 4 — Verify

Run:
```powershell
npm run build
```

The `out/` directory must be generated with zero errors. If TypeScript errors appear, fix them before marking complete.

---

## Acceptance Criteria
- [ ] `next.config.ts` has `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`, and `basePath: '/ajs-barbershop-web'`
- [ ] Brand colors are registered in Tailwind (via `@theme` for v4 or `tailwind.config.ts` for v3)
- [ ] `npm run build` generates an `out/` directory with zero errors
- [ ] `app/layout.tsx` applies `bg-background` to `<body>`

## Files Modified
- `next.config.ts`
- `app/globals.css` (Tailwind v4) OR `tailwind.config.ts` (Tailwind v3)
- `app/layout.tsx`

## Do NOT Change
- `package.json`
- `tsconfig.json`
- `app/page.tsx`
- `components/` or `lib/` directories (empty — configured in later steps)
