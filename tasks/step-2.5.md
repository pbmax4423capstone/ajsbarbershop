# Task: Step 2.5 — Implement Home Screen

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). The Home screen is the primary landing screen. It shows the shop status, quick booking CTA, contact actions, and today's hours.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites (all must exist and be working)
- `config/business.ts` — `BUSINESS` constant
- `config/theme.ts` — `COLORS`, `SPACING`, `TYPOGRAPHY`
- `utils/linking.ts` — `openBooking()`
- `utils/hours.ts` — `isOpenNow()`, `getTodayHours()`, `formatTimeRange()`
- `components/Header.tsx`
- `components/ContactActions.tsx`
- `components/ui/Button.tsx`
- `components/ui/StatusBadge.tsx`

## Your Task
Replace the placeholder in `app/(tabs)/index.tsx` with the full Home screen implementation.

---

## Screen Layout (top to bottom, inside a ScrollView)

### Section 1 — Hero
- `Header` component with `title={BUSINESS.name}` and `showLogo={true}`
- `StatusBadge` showing `isOpenNow(BUSINESS.hours)`
- Today's hours as a single line: e.g. `"Today: 10:00 AM – 6:00 PM"` or `"Closed today"`
  - Use `getTodayHours()` and `formatTimeRange()`
  - Style: `TYPOGRAPHY.body`, `COLORS.textSecondary`

### Section 2 — Primary CTA
- Full-width `Button` with:
  - `label="Book Appointment"`
  - `variant="primary"` (gold background)
  - `onPress={() => openBooking(BUSINESS.bookingUrl)}`
  - `accessibilityLabel="Book an appointment at A.J's Barbershop"`
  - `icon="calendar"` (optional, if Button supports it)

### Section 3 — Quick Actions
- `ContactActions` component (Call, Directions, Email row)

### Section 4 — Navigation Hint
- A subtle text link or pressable: `"View Our Services →"`
- Uses `router.push('/(tabs)/services')` from `expo-router`
- Style: `TYPOGRAPHY.body`, `COLORS.accent`, centered

---

## Styling Guidelines
- Outer container: `COLORS.background`, flex 1
- `ScrollView` with `contentContainerStyle` padding: `SPACING.md`
- Section spacing: `SPACING.lg` between major sections
- Hero section: center-aligned text
- Shop name: `TYPOGRAPHY.heading`, `COLORS.text`

---

## Implementation Rules
- All data from `BUSINESS` config — no hardcoded strings
- `isOpenNow()` called at render time (no caching needed)
- Wrap in `SafeAreaView` or use `ScrollView` with adequate padding

## Acceptance Criteria
- [ ] Screen renders all 4 sections without errors
- [ ] Shop name displayed in heading style
- [ ] `StatusBadge` shows correct open/closed state for current time
- [ ] Today's hours show formatted time range or "Closed today"
- [ ] "Book Appointment" button opens the Square site via `openBooking()`
- [ ] `ContactActions` row renders and each button is tappable
- [ ] "View Our Services" link navigates to the Services tab
- [ ] No hardcoded strings outside config imports
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Modify
- `app/(tabs)/index.tsx` — replace placeholder with full implementation

## Do NOT Change
- `config/*`, `utils/*`, `components/*` (except `app/(tabs)/index.tsx`)
- `app/(tabs)/_layout.tsx`
