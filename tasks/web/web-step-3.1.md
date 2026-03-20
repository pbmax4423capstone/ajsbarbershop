# Task: Web Step 3.1 — Home Page

## Context
You are building **A.J's Barbershop Website**, a multi-page static site (Next.js 15, TypeScript, Tailwind CSS). The Home page is the main landing page — it introduces the shop, drives bookings, previews services, and shows today's hours at a glance.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`

> **Model note:** This task is designed to be executed by Claude Haiku 4.5.

## Prerequisites
- Steps 1.1–1.3 complete: project configured, `lib/business.ts` and `lib/hours.ts` exist.
- Steps 2.1–2.4 complete: `Navbar`, `Footer`, `BookingCTA`, `HoursTable`, and `ServiceCard` all exist.

## Your Task
Replace the placeholder `app/page.tsx` with the full Home page. The page should be a Server Component and must not include `'use client'`.

---

### Page Layout (top to bottom)

```
┌─────────────────────────────────────────────────────┐
│  HERO                                               │
│  Shop name (h1), tagline, status badge, Book CTA    │
├─────────────────────────────────────────────────────┤
│  SERVICES PREVIEW                                   │
│  "Our Services" (h2) + first 3 ServiceCards         │
│  "View All Services →" link                         │
├─────────────────────────────────────────────────────┤
│  HOURS AT A GLANCE                                  │
│  "Hours" (h2) + HoursTable + today's summary text   │
├─────────────────────────────────────────────────────┤
│  CONTACT ACTIONS                                    │
│  "Find Us" (h2) + directions button + email link    │
└─────────────────────────────────────────────────────┘
```

---

### Full Implementation

```tsx
import Link from 'next/link'
import { BUSINESS } from '@/lib/business'
import { isOpenNow, getTodayHours, formatTimeRange } from '@/lib/hours'
import BookingCTA from '@/components/BookingCTA'
import HoursTable from '@/components/HoursTable'
import ServiceCard from '@/components/ServiceCard'

export default function HomePage() {
  const open = isOpenNow(BUSINESS.hours)
  const today = getTodayHours(BUSINESS.hours)
  const todayHoursText = formatTimeRange(today.open, today.close)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-16">

      {/* ── Section 1: Hero ── */}
      <section className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            A.J&apos;s Barbershop
          </h1>
          <p className="text-lg text-text-secondary">
            {BUSINESS.tagline} &mdash; Greenwood Village, CO
          </p>
        </div>

        {/* Open/Closed badge */}
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
              open
                ? 'bg-success/10 text-success'
                : 'bg-error/10 text-error'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${open ? 'bg-success' : 'bg-error'}`}
              aria-hidden="true"
            />
            {open ? 'Open Now' : 'By Appointment'}
          </span>
        </div>

        <p className="text-text-secondary text-sm">
          Today: <span className="font-medium text-text-main">{todayHoursText}</span>
        </p>

        <BookingCTA size="lg" className="inline-block" />
      </section>

      {/* ── Section 2: Services Preview ── */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-primary">Our Services</h2>
          <Link
            href="/services"
            className="text-sm font-medium text-accent hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="space-y-3">
          {BUSINESS.services.slice(0, 3).map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/services"
            className="text-sm font-medium text-accent hover:underline"
          >
            View All Services →
          </Link>
        </div>
      </section>

      {/* ── Section 3: Hours ── */}
      <section>
        <h2 className="text-2xl font-bold text-primary mb-5">Hours</h2>
        <div className="bg-surface border border-border rounded-lg p-4 shadow-sm">
          <HoursTable highlightToday={true} />
        </div>
      </section>

      {/* ── Section 4: Contact / Find Us ── */}
      <section>
        <h2 className="text-2xl font-bold text-primary mb-5">Find Us</h2>
        <div className="bg-surface border border-border rounded-lg p-6 shadow-sm space-y-4">
          <p className="text-text-main">
            {BUSINESS.address.fullFormatted}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={BUSINESS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2.5 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors duration-200 text-center"
              aria-label="Get directions to A.J's Barbershop (opens in new tab)"
            >
              Get Directions
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="inline-block px-5 py-2.5 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors duration-200 text-center"
              aria-label="Email A.J's Barbershop"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
```

---

### Responsive Behavior
- Single column on mobile
- `max-w-5xl mx-auto` centers content on wide screens
- Hero text: `text-4xl` on mobile → `text-5xl` on `md`+
- Contact buttons: `flex-col` on mobile → `flex-row` on `sm`+

---

### Verify

```powershell
npm run build
```

After the build, open `out/index.html` and verify all four sections are present. Zero build errors required.

---

## Acceptance Criteria
- [ ] `app/page.tsx` is a Server Component (no `'use client'`)
- [ ] Hero section shows shop name, tagline, open/closed badge, today's hours, and `<BookingCTA>`
- [ ] Services preview shows the first 3 services from `BUSINESS.services` using `<ServiceCard>`
- [ ] "View All Services →" links to `/services`
- [ ] Hours section uses `<HoursTable highlightToday={true} />`
- [ ] Find Us section has a "Get Directions" link and "Email Us" mailto link
- [ ] All data comes from `BUSINESS` config (no hardcoded strings for address, email, hours)
- [ ] `npm run build` succeeds with zero errors

## Files to Modify
- `app/page.tsx` — full replacement

## Do NOT Change
- `lib/business.ts`, `lib/hours.ts`
- `components/` directory
- `app/layout.tsx`
- `next.config.ts`, `package.json`, `tsconfig.json`
