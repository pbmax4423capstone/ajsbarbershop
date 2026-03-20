# Task: Web Step 2.2 — BookingCTA Component

## Context
You are building **A.J's Barbershop Website**, a multi-page static site (Next.js 15, TypeScript, Tailwind CSS). The "Book Appointment" button appears on every page and always opens the Square booking site in a new tab.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`

> **Model note:** This task is designed to be executed by Claude Haiku 4.5.

## Prerequisites
- Steps 1.1–1.3 complete: project scaffolded, brand colors configured, `lib/business.ts` exists with `BUSINESS.bookingUrl`.
- Step 2.1 complete: `components/` directory is in use.

## Your Task
Create `components/BookingCTA.tsx` — a reusable, accessible "Book Appointment" call-to-action component used on the Home, Services, and Info pages.

---

### Component Spec

**Props:**
```ts
interface BookingCTAProps {
  label?: string       // Button text. Default: "Book Appointment"
  className?: string   // Additional Tailwind classes for layout overrides (e.g., centering)
  size?: 'sm' | 'md' | 'lg'  // Controls padding and font size. Default: 'md'
}
```

**Behavior:**
- Renders an `<a>` tag (not a `<button>`) — it's a link to an external URL
- `href` comes from `BUSINESS.bookingUrl` (never hardcoded)
- Opens in a new tab: `target="_blank" rel="noopener noreferrer"`
- Gold background (`bg-accent` = `#C9922A`) with dark navy text (`text-primary` = `#1A2B3C`)
- On hover: slightly darker gold (`hover:bg-accent-dark`)
- Rounded corners, bold font
- Transitions: `transition-colors duration-200`
- Full-width by default within its container; can be overridden via `className`

**Size variants:**
- `sm`: `px-4 py-2 text-sm`
- `md`: `px-6 py-3 text-base` (default)
- `lg`: `px-8 py-4 text-lg`

**Accessibility:**
- `aria-label="Book an appointment at A.J's Barbershop (opens in new tab)"`

---

### Implementation

```tsx
import { BUSINESS } from '@/lib/business'

interface BookingCTAProps {
  label?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function BookingCTA({
  label = 'Book Appointment',
  className = '',
  size = 'md',
}: BookingCTAProps) {
  return (
    <a
      href={BUSINESS.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book an appointment at A.J's Barbershop (opens in new tab)"
      className={`
        inline-block
        bg-accent hover:bg-accent-dark
        text-primary
        font-bold
        rounded-lg
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {label}
    </a>
  )
}
```

---

### Example Usage (for reference — do not create these files yet)

```tsx
// On Home page — large, centered
<BookingCTA size="lg" className="block w-full text-center" />

// On Services page — default size
<BookingCTA />

// With custom label
<BookingCTA label="Book Now" size="sm" />
```

---

### Verify

```powershell
npx tsc --noEmit
```

Zero TypeScript errors required.

---

## Acceptance Criteria
- [ ] `components/BookingCTA.tsx` exists
- [ ] `href` is sourced from `BUSINESS.bookingUrl` (not hardcoded)
- [ ] Opens in a new tab with `target="_blank" rel="noopener noreferrer"`
- [ ] Three size variants work: `sm`, `md`, `lg`
- [ ] Gold background with dark navy text (matches brand)
- [ ] Focus ring visible on keyboard navigation
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Create
- `components/BookingCTA.tsx`

## Do NOT Change
- `lib/business.ts`
- `app/layout.tsx`, `app/page.tsx`
- `components/Navbar.tsx`, `components/Footer.tsx`
- `next.config.ts`, `package.json`, `tsconfig.json`
