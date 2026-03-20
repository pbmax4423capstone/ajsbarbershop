# Task: Step 2.8 — Implement Info Screen

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). The Info screen is the "visit us" screen — it shows the full weekly hours, address, and contact options. It's the most content-dense screen.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites (all must exist and be working)
- `config/business.ts` — `BUSINESS` constant with `hours`, `address`, `phone`, `phoneDisplay`, `email`, `directionsUrl`
- `config/theme.ts` — `COLORS`, `SPACING`, `TYPOGRAPHY`
- `utils/linking.ts` — `openPhone()`, `openEmail()`, `openMaps()`
- `components/HoursDisplay.tsx`
- `components/ui/Button.tsx`
- `components/ui/Card.tsx`

## Your Task
Replace the placeholder in `app/(tabs)/info.tsx` with the full Info screen.

---

## Screen Layout (inside a `ScrollView`)

### Section 1 — Hours
- Section title: `"Hours"` — `TYPOGRAPHY.subheading`, `COLORS.text`
- `HoursDisplay` component with `hours={BUSINESS.hours}` and `highlightToday={true}`
- Wrap in a `Card`

### Section 2 — Address
- Section title: `"Location"` — `TYPOGRAPHY.subheading`
- Address text: `BUSINESS.address.fullFormatted` — `TYPOGRAPHY.body`
- `Button` below:
  - `label="Get Directions"`
  - `variant="outline"`
  - `icon="navigate-outline"`
  - `onPress={() => openMaps(BUSINESS.directionsUrl)}`
  - `accessibilityLabel="Get directions to A.J's Barbershop"`
- Wrap section in a `Card`

### Section 3 — Contact
- Section title: `"Contact Us"` — `TYPOGRAPHY.subheading`
- Phone row:
  - Label: `"Phone"` — `TYPOGRAPHY.label`, `COLORS.textSecondary`
  - Value: `BUSINESS.phoneDisplay` — `TYPOGRAPHY.body`, `COLORS.accent` (tappable)
  - `onPress={() => openPhone(BUSINESS.phone)}`
  - `accessibilityLabel="Call A.J's Barbershop at {BUSINESS.phoneDisplay}"`
- Email row:
  - Label: `"Email"` — `TYPOGRAPHY.label`, `COLORS.textSecondary`
  - Value: `BUSINESS.email` — `TYPOGRAPHY.body`, `COLORS.accent` (tappable)
  - `onPress={() => openEmail(BUSINESS.email)}`
  - `accessibilityLabel="Email A.J's Barbershop"`
- Wrap section in a `Card`

### Section 4 — About (optional placeholder)
- Section title: `"About"` — `TYPOGRAPHY.subheading`
- Text: `"A.J's Barbershop has been serving the Greenwood Village community with quality cuts and exceptional service."` (placeholder copy — client will update)
- Wrap in a `Card`

---

## Styling
- `ScrollView` with `contentContainerStyle`: `SPACING.md` padding all sides
- `SPACING.lg` vertical gap between section cards
- Section titles have `SPACING.sm` bottom margin before the card content
- Tappable text (`Pressable`) has a subtle pressed opacity: `0.7`

---

## Implementation Rules
- All data from `BUSINESS` config — no hardcoded strings
- Tappable contact items use `Pressable` with `accessibilityRole="link"` or `"button"`
- Each section wrapped in its own `Card`

## Acceptance Criteria
- [ ] Full weekly hours rendered via `HoursDisplay` with today highlighted
- [ ] Address displayed with working "Get Directions" button
- [ ] Phone number is tappable and calls `openPhone()`
- [ ] Email address is tappable and calls `openEmail()`
- [ ] All data from `BUSINESS` config (no hardcoded strings)
- [ ] Screen scrolls on small devices
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Modify
- `app/(tabs)/info.tsx` — replace placeholder with full implementation

## Do NOT Change
- `config/*`, `utils/*`, `components/*`
- `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `app/(tabs)/book.tsx`, `app/(tabs)/services.tsx`
