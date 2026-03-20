# Task: Web Step 3.3 — Info Page

## Context
You are building **A.J's Barbershop Website**, a multi-page static site (Next.js 15, TypeScript, Tailwind CSS). The Info page is the reference page for customers who need the full schedule, location, and contact information.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`

> **Model note:** This task is designed to be executed by Claude Haiku 4.5.

## Prerequisites
- Steps 1.1–1.3 complete: `lib/business.ts` and `lib/hours.ts` exist.
- Steps 2.1–2.4 complete: `HoursTable`, `BookingCTA`, `Navbar`, `Footer` exist.
- Steps 3.1–3.2 complete: Home and Services pages exist (so you can verify routing).

## Your Task
Create `app/info/page.tsx` — the Info page with four sections: Hours, Location, Contact, and About.

---

### Page Layout (top to bottom)

```
┌─────────────────────────────────────────────────────┐
│  HOURS                                              │
│  Full HoursTable with today highlighted             │
├─────────────────────────────────────────────────────┤
│  LOCATION                                           │
│  Address + Google Maps static embed + directions    │
├─────────────────────────────────────────────────────┤
│  CONTACT                                            │
│  Email link only (no phone number)                  │
├─────────────────────────────────────────────────────┤
│  ABOUT                                              │
│  Short paragraph about the shop                     │
└─────────────────────────────────────────────────────┘
```

---

### Full Implementation

Create the file `app/info/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { BUSINESS } from '@/lib/business'
import HoursTable from '@/components/HoursTable'
import BookingCTA from '@/components/BookingCTA'

export const metadata: Metadata = {
  title: "Hours & Info — A.J's Barbershop",
  description:
    "Business hours, location, and contact information for A.J's Barbershop in Greenwood Village, CO.",
}

export default function InfoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-12">

      {/* ── Section 1: Hours ── */}
      <section>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Hours &amp; Info
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Hours</h2>
          <div className="bg-surface border border-border rounded-lg p-4 shadow-sm">
            <HoursTable highlightToday={true} />
          </div>
          <p className="mt-3 text-sm text-text-secondary">
            All appointments are by appointment only. Walk-ins are not accepted.
          </p>
        </div>
      </section>

      {/* ── Section 2: Location ── */}
      <section>
        <h2 className="text-xl font-bold text-primary mb-4">Location</h2>
        <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-sm">
          {/* Google Maps static embed using a simple iframe */}
          {/* NOTE: Replace this iframe with a static map image in Step 4.1 if
              you do not want to use an API key. */}
          <iframe
            title="A.J's Barbershop location on Google Maps"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              BUSINESS.address.fullFormatted
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Google Maps showing A.J's Barbershop location"
          />
          <div className="px-5 py-4 space-y-3">
            <p className="text-text-main font-medium">
              {BUSINESS.address.fullFormatted}
            </p>
            <a
              href={BUSINESS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2.5 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
              aria-label="Get directions to A.J's Barbershop (opens in new tab)"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 3: Contact ── */}
      <section>
        <h2 className="text-xl font-bold text-primary mb-4">Contact</h2>
        <div className="bg-surface border border-border rounded-lg px-5 py-4 shadow-sm">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-text-secondary uppercase tracking-wide">
              Email
            </span>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-accent font-medium hover:underline"
              aria-label="Email A.J's Barbershop"
            >
              {BUSINESS.email}
            </a>
          </div>
        </div>
        <p className="mt-3 text-sm text-text-secondary">
          For appointment inquiries, please use the booking link or email us directly.
        </p>
        <div className="mt-4">
          <BookingCTA />
        </div>
      </section>

      {/* ── Section 4: About ── */}
      <section>
        <h2 className="text-xl font-bold text-primary mb-4">About</h2>
        <div className="bg-surface border border-border rounded-lg px-5 py-4 shadow-sm">
          <p className="text-text-main leading-relaxed">
            A.J&apos;s Barbershop is proud to serve the Greater Denver area with quality cuts
            and exceptional service. Located in Greenwood Village, CO, we offer a relaxed,
            professional environment for men&apos;s grooming needs. As a by-appointment shop,
            we ensure every client gets our full attention and the time they deserve.
          </p>
        </div>
      </section>

    </div>
  )
}
```

---

### Map Embed Note
The iframe uses a free Google Maps embed URL that does not require an API key:
```
https://maps.google.com/maps?q=<encoded address>&output=embed
```
This is reliable for small business sites but can be replaced with a static map screenshot in Step 4.1 if preferred.

---

### Directory Note
Next.js App Router requires the file at `app/info/page.tsx` (creating the `/info` route). Create the `app/info/` directory if it does not exist.

---

### Verify

```powershell
npm run build
```

After the build:
- `out/info/index.html` must exist
- All four sections must be present in the HTML
- Zero build errors

---

## Acceptance Criteria
- [ ] `app/info/page.tsx` exists at the correct path
- [ ] Page has a proper `<h1>` (Hours & Info) and page-level `metadata` export
- [ ] Full `<HoursTable highlightToday={true} />` renders in the Hours section
- [ ] Google Maps iframe embed is present in the Location section
- [ ] Address text and "Get Directions" link are present
- [ ] Email mailto link is present; no phone number appears anywhere on this page
- [ ] About paragraph is present
- [ ] `<BookingCTA>` appears in the Contact section
- [ ] `out/info/index.html` is generated by `npm run build`
- [ ] Zero build errors

## Files to Create
- `app/info/page.tsx`
- `app/info/` directory (if it doesn't exist)

## Do NOT Change
- `lib/business.ts`, `lib/hours.ts`
- `components/` directory
- `app/layout.tsx`, `app/page.tsx`, `app/services/page.tsx`
- `next.config.ts`, `package.json`, `tsconfig.json`
