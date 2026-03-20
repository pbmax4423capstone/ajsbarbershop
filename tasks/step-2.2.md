# Task: Step 2.2 — Build HoursDisplay Component

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). This component renders the full weekly hours table with today's row highlighted, used on both the Home and Info screens.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites
- Phase 1 complete
- `config/business.ts` — `DayHours` interface exported
- `config/theme.ts` — `COLORS`, `SPACING`, `TYPOGRAPHY` exported
- `utils/hours.ts` — `getDayOfWeek()`, `formatTimeRange()` exported

## Your Task
Create `components/HoursDisplay.tsx`.

### Props Interface
```ts
import type { DayHours } from '../config/business'

interface HoursDisplayProps {
  hours: DayHours[]
  highlightToday?: boolean  // defaults to true
}
```

### Layout
Render a vertical list of rows. Each row shows:
```
[Day Name]          [Hours or "Closed"]
```

For example:
```
Monday              10:00 AM – 6:00 PM
Tuesday             10:00 AM – 6:00 PM
...
Sunday              Closed
```

### Behavior
- Use `getDayOfWeek()` to determine today's day name
- If `highlightToday` is true, today's row gets a highlighted background: `COLORS.primary` at 8% opacity (use `rgba` or a light tint)
- Today's day name is bold/semibold
- "Closed" days use `COLORS.textSecondary` for the hours column
- Use `formatTimeRange()` from `utils/hours.ts` to format each row
- Use `FlatList` or `View` with mapped rows (either is fine — it's a short list)

### Accessibility
- Each row should have `accessibilityLabel` like `"Monday, 10:00 AM to 6:00 PM"` or `"Sunday, Closed"`
- Today's row: `"Today, Monday, 10:00 AM to 6:00 PM"`

### Example Usage
```tsx
<HoursDisplay hours={BUSINESS.hours} />
<HoursDisplay hours={BUSINESS.hours} highlightToday={false} />
```

## Acceptance Criteria
- [ ] All 7 days render as rows
- [ ] Today's row is visually highlighted when `highlightToday` is true
- [ ] "Closed" days show "Closed" text in muted color
- [ ] Each row has a meaningful `accessibilityLabel`
- [ ] Uses `formatTimeRange()` from utils (no manual formatting)
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Create
- `components/HoursDisplay.tsx`

## Do NOT Change
- `config/business.ts`, `config/theme.ts`, `utils/hours.ts`
- Any file in `components/ui/` or `app/`
