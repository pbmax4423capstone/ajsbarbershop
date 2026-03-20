# Task: Step 1.2 — Create Business Config Module

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). All business data lives in a single typed config file — no database, no API. This is the single source of truth for all screens.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites
- Step 1.1 is complete: the `config/` directory exists

## Your Task
Create `config/business.ts` with all business data and TypeScript interfaces.

### Actions
1. Create `config/business.ts` with the following exported interfaces:

```ts
interface Address {
  street: string
  city: string
  state: string
  zip: string
  fullFormatted: string
}

interface DayHours {
  day: string          // "Monday", "Tuesday", etc.
  open: string | null  // "9:00 AM" or null if closed
  close: string | null // "5:00 PM" or null if closed
  isClosed: boolean
}

interface Service {
  name: string
  price: string        // "$30" or "TBD — price coming soon"
  duration?: string    // "30 min"
  description?: string
}

interface SocialLink {
  platform: string
  url: string
}

interface BusinessConfig {
  name: string
  tagline: string
  phone: string
  phoneDisplay: string
  email: string
  address: Address
  hours: DayHours[]
  bookingUrl: string
  directionsUrl: string
  services: Service[]
  socialLinks?: SocialLink[]
}
```

2. Export all interfaces.

3. Export a `BUSINESS` constant of type `BusinessConfig` with this data:
   - `name`: `"A.J's Barbershop"`
   - `tagline`: `"Welcome to A.J's Barbershop!"`
   - `phone`: `"tel:7207256444"`
   - `phoneDisplay`: `"(720) 725-6444"`
   - `email`: `"ajsbbshop5280@gmail.com"`
   - `address`:
     - `street`: `"9640 E Arapahoe Rd Ste 10"`
     - `city`: `"Greenwood Village"`
     - `state`: `"CO"`
     - `zip`: `"80112"`
     - `fullFormatted`: `"9640 E Arapahoe Rd Ste 10, Greenwood Village, CO 80112"`
   - `bookingUrl`: `"https://ajs-barbershop.square.site"`
   - `directionsUrl`: `"https://maps.google.com/?q=9640+E+Arapahoe+Rd+Ste+10,+Greenwood+Village,+CO+80112"`
   - `hours`: Full Mon–Sun array. **Use these hours (client-provided):**
     - Monday: 10:00 AM – 6:00 PM
     - Tuesday: 10:00 AM – 6:00 PM
     - Wednesday: 10:00 AM – 6:00 PM
     - Thursday: 10:00 AM – 6:00 PM
     - Friday: 10:00 AM – 6:00 PM
     - Saturday: 10:00 AM – 4:00 PM
     - Sunday: Closed (`open: null, close: null, isClosed: true`)
   - `services`: 5 placeholder services with `"TBD — price coming soon"` as price (real prices to be provided by client):
     - Haircut
     - Beard Trim
     - Haircut & Beard Combo
     - Kid's Haircut (12 & under)
     - Shape-Up / Edge-Up

## Acceptance Criteria
- [ ] All interfaces are exported as named exports
- [ ] `BUSINESS` constant is exported and matches `BusinessConfig` type
- [ ] File compiles with `npx tsc --noEmit` (zero errors)
- [ ] Services array has clear "TBD" price markers
- [ ] No hardcoded data exists anywhere else — this is the single source of truth

## Files to Create
- `config/business.ts`

## Do NOT Change
- Any file in `app/`, `components/`, `utils/`
- `package.json`, `tsconfig.json`, `app.json`
