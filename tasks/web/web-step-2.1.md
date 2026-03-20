# Task: Web Step 2.1 — Root Layout, Navbar & Footer

## Context
You are building **A.J's Barbershop Website**, a multi-page static site (Next.js 15, TypeScript, Tailwind CSS). The site has three pages: Home (`/`), Services (`/services`), and Info (`/info`). Every page shares a Navbar at the top and a Footer at the bottom.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`

> **Model note:** This task is designed to be executed by Claude Haiku 4.5.

## Prerequisites
- Steps 1.1–1.3 are complete: project is scaffolded, brand colors are in Tailwind, `lib/business.ts` and `lib/hours.ts` exist.

## Your Task
Build three files:
1. `components/Navbar.tsx` — responsive navigation bar with mobile hamburger menu
2. `components/Footer.tsx` — site footer with address, hours summary, email, and copyright
3. Update `app/layout.tsx` — wrap all pages with `<Navbar>` and `<Footer>`

---

### Part 1 — `components/Navbar.tsx`

**Design:**
- Dark navy background (`bg-primary` = `#1A2B3C`)
- Logo/shop name on the left in white
- Navigation links on the right: **Home**, **Services**, **Info**
- Active link highlighted in gold (`text-accent` = `#C9922A`)
- On mobile (< `md` breakpoint): hamburger icon toggles a vertical dropdown menu
- Use React `useState` for open/closed toggle — this is a Client Component (`'use client'`)

**Behavior:**
- Navigation links use Next.js `<Link>` for client-side routing
- The active page link is detected using `usePathname()` from `next/navigation`
- Hamburger icon: three horizontal bars (can use Unicode `☰` or a simple SVG)
- Close icon: `✕` when menu is open
- Clicking a nav link on mobile closes the menu

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/info', label: 'Info' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-white shadow-md">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Shop Name */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:text-accent transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          A.J&apos;s Barbershop
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-medium transition-colors hover:text-accent ${
                  pathname === href ? 'text-accent' : 'text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-accent rounded"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-primary-dark px-4 pb-4">
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block py-2 font-medium transition-colors hover:text-accent ${
                    pathname === href ? 'text-accent' : 'text-white'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
```

---

### Part 2 — `components/Footer.tsx`

**Design:**
- Dark navy background (`bg-primary`)
- White and muted text
- Three columns on desktop (stacked on mobile):
  - **Column 1:** Shop name + tagline
  - **Column 2:** Address + directions link
  - **Column 3:** Hours summary (Tue–Fri 9–5, Sat 9–4, Closed Sun & Mon) + email link
- Bottom bar: copyright line

```tsx
import Link from 'next/link'
import { BUSINESS } from '@/lib/business'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Brand */}
        <div>
          <h3 className="text-lg font-bold mb-2">{BUSINESS.name}</h3>
          <p className="text-sm text-gray-300">{BUSINESS.tagline}</p>
        </div>

        {/* Column 2: Location */}
        <div>
          <h4 className="font-semibold mb-2 text-accent">Location</h4>
          <p className="text-sm text-gray-300 mb-3">
            {BUSINESS.address.street}<br />
            {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
          </p>
          <a
            href={BUSINESS.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline"
          >
            Get Directions →
          </a>
        </div>

        {/* Column 3: Hours + Contact */}
        <div>
          <h4 className="font-semibold mb-2 text-accent">Hours</h4>
          <ul className="text-sm text-gray-300 space-y-1 mb-3">
            <li>Tue – Fri: 9:00 AM – 5:00 PM</li>
            <li>Saturday: 9:00 AM – 4:00 PM</li>
            <li>Sun &amp; Mon: Closed</li>
          </ul>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-sm text-accent hover:underline"
          >
            {BUSINESS.email}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 px-4 py-4">
        <p className="text-center text-xs text-gray-400">
          &copy; {currentYear} {BUSINESS.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
```

---

### Part 3 — Update `app/layout.tsx`

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "A.J's Barbershop — Greenwood Village, CO",
  description:
    'By appointment only barbershop in Greenwood Village, CO. Book online via Square.',
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

> `flex flex-col min-h-screen` on `<body>` and `flex-1` on `<main>` ensures the footer always sticks to the bottom even on short pages.

---

### Part 4 — Verify

```powershell
npm run build
```

Open the generated `out/index.html` and confirm the HTML contains the navbar and footer structure.

---

## Acceptance Criteria
- [ ] `components/Navbar.tsx` exists and is a Client Component (`'use client'`)
- [ ] Navbar shows "Home", "Services", "Info" links; active link is gold
- [ ] Hamburger menu toggles on mobile (< `md` breakpoint)
- [ ] `components/Footer.tsx` exists with brand, address, hours, and email
- [ ] `app/layout.tsx` imports and renders `<Navbar>` and `<Footer>`
- [ ] Footer sticks to the bottom on short pages (`flex-col min-h-screen`)
- [ ] `npm run build` succeeds with zero errors

## Files to Create
- `components/Navbar.tsx`
- `components/Footer.tsx`

## Files to Modify
- `app/layout.tsx`

## Do NOT Change
- `lib/business.ts`, `lib/hours.ts`
- `next.config.ts`
- `app/globals.css` (color config)
- `app/page.tsx` (will be built in Step 3.1)
