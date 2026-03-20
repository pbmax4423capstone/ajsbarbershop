# Task: Web Step 1.3 — Business Config & Hours Utility

## Context
You are building **A.J's Barbershop Website**, a multi-page static site (Next.js 15, TypeScript, Tailwind CSS). All business data is static — no server, no database, no API. The business config is the single source of truth for all pages.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`

> **Model note:** This task is designed to be executed by Claude Haiku 4.5.

## Prerequisites
- Steps 1.1 and 1.2 are complete: project is scaffolded, `lib/` directory exists, `npm run build` passes.

## Your Task
Create two files in `lib/`:
1. `lib/business.ts` — all business data as typed constants (mirrored from the mobile app, with no phone number exposed)
2. `lib/hours.ts` — utility functions for determining open/closed status and formatting hours

---

### Part 1 — Create `lib/business.ts`

```ts
export interface Address {
  street: string
  city: string
  state: string
  zip: string
  fullFormatted: string
}

export interface DayHours {
  day: string
  open: string | null   // "9:00 AM" or null if closed
  close: string | null  // "5:00 PM" or null if closed
  isClosed: boolean
}

export interface Service {
  name: string
  price: string
  duration?: string
  description?: string
}

export interface BusinessConfig {
  name: string
  tagline: string
  email: string
  address: Address
  hours: DayHours[]
  bookingUrl: string
  directionsUrl: string
  googleMapsEmbedUrl: string
  services: Service[]
}

export const BUSINESS: BusinessConfig = {
  name: "A.J's Barbershop",
  tagline: 'By Appointment Only',
  email: 'ajsbbshop5280@gmail.com',
  address: {
    street: '9640 E Arapahoe Rd Ste 10',
    city: 'Greenwood Village',
    state: 'CO',
    zip: '80112',
    fullFormatted: '9640 E Arapahoe Rd Ste 10, Greenwood Village, CO 80112',
  },
  bookingUrl: 'https://ajs-barbershop.square.site',
  directionsUrl:
    'https://maps.google.com/?q=9640+E+Arapahoe+Rd+Ste+10,+Greenwood+Village,+CO+80112',
  // Embed URL for the Google Maps iframe on the Info page
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=9640+E+Arapahoe+Rd+Ste+10,+Greenwood+Village,+CO+80112',
  hours: [
    { day: 'Monday', open: null, close: null, isClosed: true },
    { day: 'Tuesday', open: '9:00 AM', close: '5:00 PM', isClosed: false },
    { day: 'Wednesday', open: '9:00 AM', close: '5:00 PM', isClosed: false },
    { day: 'Thursday', open: '9:00 AM', close: '5:00 PM', isClosed: false },
    { day: 'Friday', open: '9:00 AM', close: '5:00 PM', isClosed: false },
    { day: 'Saturday', open: '9:00 AM', close: '4:00 PM', isClosed: false },
    { day: 'Sunday', open: null, close: null, isClosed: true },
  ],
  services: [
    { name: "Men's Haircut", price: '$35.00' },
    { name: 'Senior Cut', price: '$30.00' },
    { name: "Kid's Cut", price: '$30.00' },
    { name: 'Beard Detail', price: '$13.00' },
    { name: 'Shampoo / Massage', price: '$7.00' },
  ],
}
```

> **Note on the Maps embed URL:** The URL above uses a public demo API key that may not work in production. In Step 4.1 (Assets & SEO), this will be replaced with a static map image or a free embed approach. For now, this field is a placeholder.

---

### Part 2 — Create `lib/hours.ts`

```ts
import type { DayHours } from './business'

/**
 * Returns the DayHours entry for today (based on the client's local time).
 * Falls back to Sunday if the day index is out of range.
 */
export function getTodayHours(hours: DayHours[]): DayHours {
  // getDay() returns 0 = Sunday, 1 = Monday, ... 6 = Saturday
  // BUSINESS.hours array is ordered Monday=0 through Sunday=6
  const jsDay = new Date().getDay() // 0 (Sun) – 6 (Sat)
  // Remap: JS Sunday(0) → index 6, Monday(1) → index 0, etc.
  const idx = jsDay === 0 ? 6 : jsDay - 1
  return hours[idx] ?? hours[6]
}

/**
 * Returns true if the shop is currently open based on today's hours
 * and the current local time.
 */
export function isOpenNow(hours: DayHours[]): boolean {
  const today = getTodayHours(hours)
  if (today.isClosed || !today.open || !today.close) return false

  const now = new Date()
  const [openTime, openPeriod] = today.open.split(' ')
  const [closeTime, closePeriod] = today.close.split(' ')
  const [openH, openM] = openTime.split(':').map(Number)
  const [closeH, closeM] = closeTime.split(':').map(Number)

  let openMinutes = openH * 60 + openM
  let closeMinutes = closeH * 60 + closeM
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  // Convert 12-hour to 24-hour
  if (openPeriod === 'PM' && openH !== 12) openMinutes += 12 * 60
  if (openPeriod === 'AM' && openH === 12) openMinutes -= 12 * 60
  if (closePeriod === 'PM' && closeH !== 12) closeMinutes += 12 * 60
  if (closePeriod === 'AM' && closeH === 12) closeMinutes -= 12 * 60

  return nowMinutes >= openMinutes && nowMinutes < closeMinutes
}

/**
 * Formats an open/close time pair into a readable string.
 * Returns "Closed" if either value is null.
 */
export function formatTimeRange(
  open: string | null,
  close: string | null
): string {
  if (!open || !close) return 'Closed'
  return `${open} – ${close}`
}

/**
 * Returns a short status label and whether the shop is open.
 */
export function getStatusLabel(hours: DayHours[]): {
  label: string
  isOpen: boolean
} {
  const open = isOpenNow(hours)
  return {
    label: open ? 'Open Now' : 'By Appointment',
    isOpen: open,
  }
}
```

---

### Part 3 — Verify TypeScript Compiles

Run:
```powershell
npx tsc --noEmit
```

Fix any errors before marking complete.

---

## Acceptance Criteria
- [ ] `lib/business.ts` exists with all interfaces exported and `BUSINESS` constant matching the data above
- [ ] `lib/hours.ts` exists and exports `getTodayHours`, `isOpenNow`, `formatTimeRange`, `getStatusLabel`
- [ ] No phone number appears anywhere in either file (no phone field, no `tel:` URL)
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] `npm run build` still succeeds

## Files to Create
- `lib/business.ts`
- `lib/hours.ts`

## Do NOT Change
- `app/` directory
- `components/` directory
- `next.config.ts`
- `package.json`, `tsconfig.json`
