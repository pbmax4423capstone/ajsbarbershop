# Task: Web Step 2.4 — ServiceCard Component

## Context
You are building **A.J's Barbershop Website**, a multi-page static site (Next.js 15, TypeScript, Tailwind CSS). The ServiceCard displays a single barbershop service with its name and price. It is used on the Home page (3-card preview) and the Services page (all 5 cards).

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-web`

> **Model note:** This task is designed to be executed by Claude Haiku 4.5.

## Prerequisites
- Steps 1.1–1.3 complete: `lib/business.ts` exists and exports the `Service` interface and `BUSINESS.services`.
- Step 2.1 complete: `components/` directory is in use.

## Your Task
Create `components/ServiceCard.tsx` — a clean card component that displays one service entry from the business config.

---

### Component Spec

**Props:**
```ts
import type { Service } from '@/lib/business'

interface ServiceCardProps {
  service: Service
}
```

**Design:**
- White background (`bg-surface`)
- Subtle border (`border border-border`)
- Rounded corners (`rounded-lg`)
- Box shadow (`shadow-sm`)
- Service name on the **left**: dark, medium weight
- Price on the **right**: gold (`text-accent`), bold, slightly larger
- Optional `duration` below the name if provided (muted, small text)
- Optional `description` below duration if provided (muted, small text)
- Comfortable padding (`p-4` or `px-5 py-4`)
- Hover: very slight lift (`hover:shadow-md transition-shadow duration-200`)

---

### Implementation

```tsx
import type { Service } from '@/lib/business'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        {/* Left: name + optional details */}
        <div className="flex-1">
          <h3 className="font-semibold text-text-main text-base leading-snug">
            {service.name}
          </h3>
          {service.duration && (
            <p className="text-sm text-text-secondary mt-0.5">
              {service.duration}
            </p>
          )}
          {service.description && (
            <p className="text-sm text-text-secondary mt-1">
              {service.description}
            </p>
          )}
        </div>

        {/* Right: price */}
        <div className="flex-shrink-0">
          <span className="text-lg font-bold text-accent">
            {service.price}
          </span>
        </div>
      </div>
    </div>
  )
}
```

---

### Example Usage

```tsx
import { BUSINESS } from '@/lib/business'
import ServiceCard from '@/components/ServiceCard'

// Render all services
{BUSINESS.services.map((service) => (
  <ServiceCard key={service.name} service={service} />
))}

// Render only first 3 (preview on Home page)
{BUSINESS.services.slice(0, 3).map((service) => (
  <ServiceCard key={service.name} service={service} />
))}
```

---

### Verify

```powershell
npx tsc --noEmit
```

Zero TypeScript errors required.

---

## Acceptance Criteria
- [ ] `components/ServiceCard.tsx` exists
- [ ] Accepts a `Service` object as its only prop
- [ ] Service name renders left-aligned, price renders right-aligned in gold
- [ ] `duration` and `description` fields render only when provided (not empty elements)
- [ ] Hover shadow transition works
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Create
- `components/ServiceCard.tsx`

## Do NOT Change
- `lib/business.ts`
- `components/Navbar.tsx`, `components/Footer.tsx`, `components/BookingCTA.tsx`, `components/HoursTable.tsx`
- `app/layout.tsx`, `app/page.tsx`
- `next.config.ts`, `package.json`, `tsconfig.json`
