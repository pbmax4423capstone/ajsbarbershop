# Task: Step 2.7 — Implement Services Screen

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). The Services screen displays the shop's service menu with prices. Data is static — sourced entirely from the business config file.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites (all must exist and be working)
- `config/business.ts` — `BUSINESS` constant with `services` array
- `config/theme.ts` — `COLORS`, `SPACING`, `TYPOGRAPHY`
- `utils/linking.ts` — `openBooking()`
- `components/ServiceCard.tsx`
- `components/ui/Button.tsx`

## Your Task
Replace the placeholder in `app/(tabs)/services.tsx` with the full Services screen.

---

## Screen Layout

### Section 1 — Header
- Heading: `"Our Services"` — `TYPOGRAPHY.heading`
- Subtext: `"Prices subject to change. Contact us for current pricing."` — `TYPOGRAPHY.caption`, `COLORS.textSecondary`
  - Only show this subtext if any service has a "TBD" price (check `BUSINESS.services.some(s => s.price.includes('TBD'))`)

### Section 2 — Services List
- Use `FlatList` with `data={BUSINESS.services}`
- Render each item as a `ServiceCard`
- `keyExtractor`: use the service name
- `ItemSeparatorComponent`: `SPACING.sm` vertical gap
- `contentContainerStyle`: `SPACING.md` horizontal padding, `SPACING.md` bottom padding

### Section 3 — Bottom CTA
- Rendered as `FlatList`'s `ListFooterComponent`
- `SPACING.lg` top margin
- `Button`:
  - `label="Book an Appointment"`
  - `variant="primary"`
  - `onPress={() => openBooking(BUSINESS.bookingUrl)}`
  - `accessibilityLabel="Book an appointment at A.J's Barbershop"`

---

## Implementation Rules
- Use `FlatList` — NOT a `ScrollView` with `.map()` — for the services list
- All data from `BUSINESS.services` — no hardcoded service entries
- The BookNow CTA at the bottom must always be visible after scrolling past the list

## Acceptance Criteria
- [ ] All services from `BUSINESS.services` render as `ServiceCard` components
- [ ] `FlatList` is used (not ScrollView + map)
- [ ] "TBD pricing" notice appears only when any price contains "TBD"
- [ ] "Book an Appointment" CTA at bottom works and calls `openBooking()`
- [ ] No hardcoded service data
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Modify
- `app/(tabs)/services.tsx` — replace placeholder with full implementation

## Do NOT Change
- `config/*`, `utils/*`, `components/*`
- `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `app/(tabs)/book.tsx`
