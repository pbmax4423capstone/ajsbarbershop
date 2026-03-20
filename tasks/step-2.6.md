# Task: Step 2.6 — Implement Book Screen

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). The Book screen is a simple handoff screen — it opens the Square booking site in an in-app browser. There is no embedded WebView.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites (all must exist and be working)
- `config/business.ts` — `BUSINESS` constant with `bookingUrl`, `phone`, `phoneDisplay`
- `config/theme.ts` — `COLORS`, `SPACING`, `TYPOGRAPHY`
- `utils/linking.ts` — `openBooking()`, `openPhone()`
- `components/ui/Button.tsx`

## Your Task
Replace the placeholder in `app/(tabs)/book.tsx` with the full Book screen.

---

## Screen Layout

### Section 1 — Header Area
- Large heading: `"Book an Appointment"` — `TYPOGRAPHY.heading`
- Subtext: `"Schedule your next visit with A.J's Barbershop"` — `TYPOGRAPHY.body`, `COLORS.textSecondary`
- Calendar emoji or Ionicons `calendar` icon above the heading (decorative, large, `COLORS.accent`)

### Section 2 — Primary Action
- Full-width `Button`:
  - `label="Book Now"`
  - `variant="primary"` (gold)
  - `onPress={handleBookNow}`
  - `accessibilityLabel="Open booking page for A.J's Barbershop"`

### Section 3 — Loading / Error State
- `useState` to track: `isLoading: boolean`, `hasError: boolean`
- While `isLoading`: show `ActivityIndicator` below the button
- If `hasError`: show error message — `"Unable to open booking page. Please try calling us."` in `COLORS.error`

### Section 4 — Phone Fallback
- Divider with text: `"— or —"` centered, `COLORS.textSecondary`
- Secondary `Button` or tappable text:
  - Label: `"Call to Book: {BUSINESS.phoneDisplay}"`
  - `onPress={() => openPhone(BUSINESS.phone)}`
  - `variant="outline"` or plain pressable text in `COLORS.accent`
  - `accessibilityLabel="Call A.J's Barbershop to book an appointment"`

### Section 5 — Info Note
- Small caption text: `"Booking opens in your browser. You'll be redirected to our Square booking page."`
- `TYPOGRAPHY.caption`, `COLORS.textSecondary`, centered

---

## `handleBookNow` Function
```ts
async function handleBookNow() {
  setIsLoading(true)
  setHasError(false)
  try {
    await openBooking(BUSINESS.bookingUrl)
  } catch {
    setHasError(true)
  } finally {
    setIsLoading(false)
  }
}
```

---

## Styling
- Center content vertically (or top-aligned with generous padding)
- `SPACING.xl` between major sections
- Screen background: `COLORS.background`

## Acceptance Criteria
- [ ] "Book Now" button opens the Square URL via `openBooking()`
- [ ] Loading state shows `ActivityIndicator` while browser opens
- [ ] Error state shows message if `openBooking()` throws
- [ ] Phone fallback calls `openPhone(BUSINESS.phone)` when tapped
- [ ] All data from `BUSINESS` config (no hardcoded URLs or phone numbers)
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Modify
- `app/(tabs)/book.tsx` — replace placeholder with full implementation

## Do NOT Change
- `config/*`, `utils/*`, `components/*`
- `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`
