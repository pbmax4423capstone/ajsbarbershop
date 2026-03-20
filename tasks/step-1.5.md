# Task: Step 1.5 — Create Reusable UI Components

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). These are the small, reusable primitive UI components used across every screen. They must use theme tokens — no hardcoded colors or sizes.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites
- Step 1.1 complete: `components/ui/` directory exists
- Step 1.3 complete: `config/theme.ts` exists with `COLORS`, `SPACING`, `BORDER_RADIUS`, `TYPOGRAPHY`

## Your Task
Create 4 UI primitive components in `components/ui/`.

---

## Component 1: `components/ui/Button.tsx`

### Props Interface
```ts
interface ButtonProps {
  label: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  icon?: string          // Ionicons icon name (optional)
  accessibilityLabel?: string
  disabled?: boolean
  style?: ViewStyle
}
```

### Behavior
- `primary`: filled with `COLORS.accent` (gold) background, white text
- `secondary`: filled with `COLORS.primary` (navy) background, white text
- `outline`: transparent background, `COLORS.primary` border and text
- Minimum height: 48pt (touch target ≥ 44pt)
- Full-width by default
- If `icon` is provided, render an `Ionicons` icon to the left of the label
- `accessibilityRole="button"`
- Disabled state reduces opacity to 0.5

---

## Component 2: `components/ui/Card.tsx`

### Props Interface
```ts
interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}
```

### Behavior
- White (`COLORS.surface`) background
- `BORDER_RADIUS.md` border radius
- Subtle shadow (elevation 2 on Android, shadow props on iOS)
- `SPACING.md` padding
- No onPress — this is a passive container

---

## Component 3: `components/ui/IconButton.tsx`

### Props Interface
```ts
interface IconButtonProps {
  icon: string           // Ionicons icon name
  label: string          // Text label displayed below the icon
  onPress: () => void
  color?: string         // Icon color, defaults to COLORS.primary
  accessibilityLabel?: string
}
```

### Behavior
- Circular icon button (48x48pt circle) with the icon centered
- Text label below the circle
- Used for quick-action buttons: Call, Directions, Email
- `accessibilityRole="button"`
- Minimum touch target 48x48pt (the circle IS the touch target)
- Default icon color: `COLORS.accent`

---

## Component 4: `components/ui/StatusBadge.tsx`

### Props Interface
```ts
interface StatusBadgeProps {
  isOpen: boolean
}
```

### Behavior
- When `isOpen = true`:
  - Green pill badge
  - Shows a green dot + text "Open Now"
  - Background: light green tint (`#DCFCE7`)
  - Text color: `COLORS.success` (`#16A34A`)
- When `isOpen = false`:
  - Red pill badge
  - Shows a red dot + text "Closed"
  - Background: light red tint (`#FEE2E2`)
  - Text color: `COLORS.error` (`#DC2626`)
- `accessibilityLabel`: "Shop is currently open" or "Shop is currently closed"
- Uses BOTH color AND text (not color alone) for accessibility
- Pill shape: `BORDER_RADIUS.full`

---

## General Rules for All Components
- Import all colors, spacing, typography from `config/theme.ts`
- Use `StyleSheet.create()` for styles
- Use `@expo/vector-icons` (`Ionicons`) for icons where applicable
- All interactive components must have `accessibilityRole` and `accessibilityLabel`
- No hardcoded colors, sizes, or font sizes — use theme tokens

## Acceptance Criteria
- [ ] All 4 components render without errors
- [ ] All use theme tokens exclusively (no hardcoded values)
- [ ] Touch targets are ≥ 44pt for interactive components
- [ ] `StatusBadge` uses both text and color to convey status
- [ ] All components have accessibility props
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Create
- `components/ui/Button.tsx`
- `components/ui/Card.tsx`
- `components/ui/IconButton.tsx`
- `components/ui/StatusBadge.tsx`

## Do NOT Change
- `config/business.ts`
- `config/theme.ts`
- `utils/linking.ts`
- `utils/hours.ts`
- Any files in `app/`
