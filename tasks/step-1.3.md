# Task: Step 1.3 — Create Theme Module

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). The theme module defines all design tokens (colors, spacing, typography, border radii) used throughout the app. No external CSS library — pure React Native StyleSheet.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites
- Step 1.1 is complete: the `config/` directory exists
- Step 1.2 is complete: `config/business.ts` exists (do not modify it)

## Your Task
Create `config/theme.ts` with all design tokens derived from A.J's Barbershop branding.

### Brand Aesthetic
The Square site (`https://ajs-barbershop.square.site`) uses a classic barbershop look: dark navy/charcoal backgrounds, gold/amber accents, and white text. Replicate this vibe with these tokens.

### Actions
Create `config/theme.ts` and export the following constants:

#### 1. COLORS
```ts
export const COLORS = {
  primary: '#1A2B3C',        // Deep navy — main brand color
  primaryDark: '#111D28',    // Darker navy for pressed states
  background: '#F5F5F5',     // Light grey app background
  surface: '#FFFFFF',        // Card / component background
  text: '#1A1A1A',           // Primary text (near-black)
  textSecondary: '#6B7280',  // Muted/secondary text
  textOnPrimary: '#FFFFFF',  // White text on navy backgrounds
  accent: '#C9922A',         // Gold/amber — CTA buttons, highlights
  accentDark: '#A87820',     // Darker gold for pressed states
  border: '#E5E7EB',         // Subtle border color
  success: '#16A34A',        // "Open Now" green
  error: '#DC2626',          // "Closed" red
  tabBar: '#1A2B3C',         // Tab bar background (navy)
  tabBarActive: '#C9922A',   // Active tab icon (gold)
  tabBarInactive: '#8899AA', // Inactive tab icon (muted)
}
```

All text-on-background combinations must meet WCAG 2.2 AA (4.5:1 contrast for body text, 3:1 for large text).

#### 2. SPACING
```ts
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}
```

#### 3. BORDER_RADIUS
```ts
export const BORDER_RADIUS = {
  sm: 6,
  md: 12,
  lg: 20,
  full: 9999,
}
```

#### 4. TYPOGRAPHY
Import `TextStyle` from `'react-native'` and export:
```ts
export const TYPOGRAPHY: Record<string, TextStyle> = {
  heading: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: COLORS.text,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: COLORS.text,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
}
```

## Acceptance Criteria
- [ ] All 4 constants (`COLORS`, `SPACING`, `BORDER_RADIUS`, `TYPOGRAPHY`) are exported
- [ ] File compiles with `npx tsc --noEmit` (zero errors)
- [ ] No hardcoded color values anywhere else in the app — all components must import from this file
- [ ] Text-on-background contrast meets WCAG 2.2 AA minimum

## Files to Create
- `config/theme.ts`

## Do NOT Change
- `config/business.ts`
- Any file in `app/`, `components/`, `utils/`
- `package.json`, `tsconfig.json`, `app.json`
