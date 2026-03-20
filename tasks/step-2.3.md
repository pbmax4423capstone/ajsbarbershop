# Task: Step 2.3 — Build ContactActions Component

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). This component renders a row of three icon buttons for the shop's primary contact actions: Call, Get Directions, and Email.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites
- Phase 1 complete
- `config/business.ts` — `BUSINESS` constant with `phone`, `email`, `directionsUrl`
- `components/ui/IconButton.tsx` — exists and working
- `utils/linking.ts` — `openPhone()`, `openEmail()`, `openMaps()` exported

## Your Task
Create `components/ContactActions.tsx`.

### No Props Needed
This component is self-contained. It reads all data from `BUSINESS` config directly.

### Layout
Three `IconButton` components in a horizontal row, evenly spaced:

```
[  📞 Call  ]   [ 🗺️ Directions ]   [ ✉️ Email  ]
```

| Button | Icon (Ionicons) | Label | Action |
|--------|----------------|-------|--------|
| Call | `call-outline` | `Call` | `openPhone(BUSINESS.phone)` |
| Directions | `navigate-outline` | `Directions` | `openMaps(BUSINESS.directionsUrl)` |
| Email | `mail-outline` | `Email` | `openEmail(BUSINESS.email)` |

### Accessibility
- Call button: `accessibilityLabel="Call A.J's Barbershop"`
- Directions button: `accessibilityLabel="Get directions to A.J's Barbershop"`
- Email button: `accessibilityLabel="Email A.J's Barbershop"`

### Styling
- Wrap in a `View` with `flexDirection: 'row'`, `justifyContent: 'space-around'`
- Add `SPACING.md` vertical padding
- Optional: add a subtle separator line above the row

### Example Usage
```tsx
<ContactActions />
```

## Acceptance Criteria
- [ ] Three buttons render in a horizontal row
- [ ] Each button has the correct icon and label
- [ ] Each button has a descriptive `accessibilityLabel`
- [ ] Tapping each button calls the correct linking function
- [ ] All data comes from `BUSINESS` config (no hardcoded strings)
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Create
- `components/ContactActions.tsx`

## Do NOT Change
- `config/business.ts`, `config/theme.ts`, `utils/linking.ts`
- `components/ui/IconButton.tsx`
- Any file in `app/`
