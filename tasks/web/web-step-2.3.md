# Task: Web Step 2.3 — HoursTable Component

## Context
You are building **A.J's Barbershop Website**, a multi-page static site (Next.js 15, TypeScript, Tailwind CSS). The HoursTable displays the full weekly schedule with today's row highlighted. It is used on both the Home page (compact version) and the Info page (full version).

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`

> **Model note:** This task is designed to be executed by Claude Haiku 4.5.

## Prerequisites
- Steps 1.1–1.3 complete: `lib/business.ts` (with `BUSINESS.hours`) and `lib/hours.ts` (with `getTodayHours`) exist.
- Step 2.1 complete: `components/` directory is in use.

## Your Task
Create `components/HoursTable.tsx` — a full 7-day hours display that highlights today's row and dims closed days.

---

### Component Spec

**Props:**
```ts
interface HoursTableProps {
  highlightToday?: boolean  // Highlight today's row in gold. Default: true
}
```

**Data source:** `BUSINESS.hours` from `lib/business.ts` (7 entries, Monday through Sunday).

**Behavior:**
- Renders a styled table (or `<dl>` list) with one row per day
- Each row shows: day name on the left, hours on the right
- If `isClosed` is true, show "Closed" instead of hours
- Today's row: gold left border + light gold background + bold text (when `highlightToday` is true)
- Closed days: dimmed text (`text-text-secondary`)
- Today detection uses `getTodayHours()` from `lib/hours.ts` — compare the `day` field

**This is a Server Component** (no `'use client'` needed — `new Date()` runs at request time in Next.js static export, which is acceptable for a barbershop site where hours rarely change; the build time determines "today").

> **Note for Haiku:** In a static export, `new Date()` runs at **build time**, not at the user's request time. This means the highlighted row reflects the day the site was last built. For a small barbershop site, this is acceptable behavior. Document this limitation in a comment in the code.

---

### Implementation

```tsx
import { BUSINESS } from '@/lib/business'
import { getTodayHours, formatTimeRange } from '@/lib/hours'

interface HoursTableProps {
  highlightToday?: boolean
}

export default function HoursTable({ highlightToday = true }: HoursTableProps) {
  // NOTE: In a static export, new Date() runs at BUILD TIME, not at the user's
  // request time. The highlighted row reflects the day the site was last deployed.
  const todayEntry = getTodayHours(BUSINESS.hours)

  return (
    <div className="w-full">
      <dl className="divide-y divide-border">
        {BUSINESS.hours.map((entry) => {
          const isToday = highlightToday && entry.day === todayEntry.day
          const hoursText = formatTimeRange(entry.open, entry.close)

          return (
            <div
              key={entry.day}
              className={`flex justify-between items-center py-3 px-2 ${
                isToday
                  ? 'bg-accent/10 border-l-4 border-accent pl-3 rounded-sm'
                  : ''
              }`}
            >
              <dt
                className={`font-medium ${
                  isToday
                    ? 'text-primary font-bold'
                    : entry.isClosed
                    ? 'text-text-secondary'
                    : 'text-text-main'
                }`}
              >
                {entry.day}
                {isToday && (
                  <span className="ml-2 text-xs font-normal text-accent">
                    (Today)
                  </span>
                )}
              </dt>
              <dd
                className={`text-sm ${
                  entry.isClosed
                    ? 'text-text-secondary italic'
                    : isToday
                    ? 'text-primary font-semibold'
                    : 'text-text-main'
                }`}
              >
                {hoursText}
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
```

---

### Tailwind Class Notes

- `bg-accent/10` — 10% opacity of the accent gold color (Tailwind v3+). If this doesn't render correctly in your version, use `bg-yellow-50` as a fallback.
- `border-accent` — requires the `accent` color to be registered in your Tailwind config (done in Step 1.2).
- `divide-border` — adds a divider using the `border` color token.

---

### Example Usage

```tsx
// Full page (Info screen) — highlight today
<HoursTable highlightToday={true} />

// Home page sidebar — no highlight needed
<HoursTable highlightToday={false} />
```

---

### Verify

```powershell
npx tsc --noEmit
npm run build
```

---

## Acceptance Criteria
- [ ] `components/HoursTable.tsx` exists
- [ ] All 7 days render with correct day names and hours
- [ ] "Closed" days show "Closed" text in a dimmed style
- [ ] Today's row has a gold left border and "(Today)" label
- [ ] The build-time `new Date()` limitation is documented in a code comment
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Create
- `components/HoursTable.tsx`

## Do NOT Change
- `lib/business.ts`, `lib/hours.ts`
- `components/Navbar.tsx`, `components/Footer.tsx`, `components/BookingCTA.tsx`
- `app/layout.tsx`, `app/page.tsx`
- `next.config.ts`, `package.json`, `tsconfig.json`
