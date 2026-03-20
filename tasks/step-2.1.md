# Task: Step 2.1 — Build Header Component

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). This is a feature component used at the top of each screen to display the screen title and optionally the shop logo.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites
- Phase 1 complete: `config/theme.ts`, `config/business.ts`, `utils/`, `components/ui/` all exist
- `components/ui/Button.tsx`, `Card.tsx`, `IconButton.tsx`, `StatusBadge.tsx` all exist

## Your Task
Create `components/Header.tsx`.

### Props Interface
```ts
interface HeaderProps {
  title: string
  showLogo?: boolean   // defaults to false
}
```

### Behavior
- If `showLogo` is true:
  - Render the shop logo image from `assets/images/icon.png` (placeholder until real logo is added in Phase 3)
  - Logo should be 48x48pt, rounded
  - Display `title` text to the right of the logo (or below if preferred)
- If `showLogo` is false:
  - Display only the `title` text
- `accessibilityRole="header"` on the container or heading element
- Use `TYPOGRAPHY.heading` for the title text
- Use `COLORS.primary` for any background tinting if you add one
- Component should be self-contained — no data fetching

### Example Usage
```tsx
<Header title="Welcome to A.J's" showLogo={true} />
<Header title="Our Services" />
```

## Acceptance Criteria
- [ ] Renders with and without logo
- [ ] `accessibilityRole="header"` is set
- [ ] Uses theme typography tokens
- [ ] No hardcoded colors or sizes
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Create
- `components/Header.tsx`

## Do NOT Change
- Any file in `config/`, `utils/`, `components/ui/`, or `app/`
