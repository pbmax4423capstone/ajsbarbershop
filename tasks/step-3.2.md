# Task: Step 3.2 — Accessibility Audit and Fixes

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). This step audits every screen and component for accessibility compliance and applies fixes to meet WCAG 2.2 AA requirements. This is required for Apple App Store review and ensures the app is usable by everyone.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites (all must exist and be working)
- All four tab screens complete: `index.tsx`, `book.tsx`, `services.tsx`, `info.tsx`
- All shared components: `StatusBadge`, `HoursDisplay`, `Button`, `Card`, `ServiceCard`

## Your Task
Audit every screen and component for accessibility issues and apply all necessary fixes.

---

## Audit Checklist — Apply to Every Interactive Element

### 1. Accessibility Labels
- Every `Pressable`, `TouchableOpacity`, and `Button` must have an `accessibilityLabel`
- Labels must be descriptive and action-oriented (e.g., `"Book an appointment"`, not `"Book"`)
- Labels must NOT duplicate what is already read as visible text — use `accessibilityLabel` to clarify, not repeat
- Image-only buttons must always have a label

### 2. Accessibility Roles
Every interactive element must declare its role:
| Element type | Role |
|---|---|
| Navigates to a URL / opens a link | `"link"` |
| Performs an action | `"button"` |
| Section heading | `"header"` |
| Decorative image | `"image"` |
| Static text | `"text"` |

### 3. Accessibility State
- `StatusBadge` must expose open/closed state: `accessibilityState={{ checked: isOpen }}` or equivalent
- Any toggleable element must reflect its current state

### 4. Accessibility Hints
Add `accessibilityHint` to non-obvious actions:
- Tap-to-call: `"Opens the phone dialer"`
- Tap-to-email: `"Opens your email app"`
- Get Directions: `"Opens Maps with directions to the barbershop"`
- Book Appointment: `"Opens the Square booking website in your browser"`

---

## Audit Checklist — Touch Targets
- Every tappable element must have a minimum hit area of **44×44pt**
- Use `minHeight: 44, minWidth: 44` on `Pressable` / button styles
- If the visible element is smaller, add padding to meet the minimum without changing the visual appearance

---

## Audit Checklist — Color Contrast
Verify the following contrast ratios (use a contrast checker tool):
| Text type | Minimum ratio |
|---|---|
| Normal body text (< 18.5pt bold / < 24pt) | 4.5:1 |
| Large text (≥ 18.5pt bold or ≥ 24pt) | 3:1 |
| UI components and icons | 3:1 |

- Check `COLORS.text` on `COLORS.background`
- Check `COLORS.textSecondary` on `COLORS.background`
- Check `COLORS.accent` on `COLORS.background`
- Check `StatusBadge` text on its badge background (open = green, closed = red)
- If any pair fails, adjust the color values in `config/theme.ts`

---

## Audit Checklist — Text Scaling
- All text must use `TYPOGRAPHY` styles which must use relative units or respect system font size
- Test by setting system font size to 200% — content must remain readable and not overflow or overlap
- `ScrollView` wrapping helps; avoid fixed-height containers that clip text

---

## Audit Checklist — Focus Order
- Screen reader (VoiceOver / TalkBack) focus order must match the visual top-to-bottom reading order
- Do not use `importantForAccessibility="no"` unless an element is truly decorative

---

## StatusBadge Specific Requirement
The `StatusBadge` must convey open/closed state through **both** color and text — never color alone:
- Open: green background + "Open Now" text
- Closed: red/gray background + "Closed" text
- Add `accessibilityLabel` that includes the state: `"Currently open"` or `"Currently closed"`

---

## Implementation Rules
- Do not change any business logic, routing, or data
- Do not change the visual design — only add/fix accessibility props and adjust contrast in theme if needed
- All changes must be minimal and targeted

## Acceptance Criteria
- [ ] Every `Pressable` and `Button` has `accessibilityLabel` and `accessibilityRole`
- [ ] `StatusBadge` has `accessibilityLabel` and `accessibilityState`
- [ ] All touch targets are ≥ 44×44pt
- [ ] All text passes WCAG AA contrast ratios
- [ ] App remains fully usable at 200% system font size
- [ ] Screen reader can navigate all screens in logical order
- [ ] `npx tsc --noEmit` passes with zero errors

## Files Modified
- `app/(tabs)/index.tsx`
- `app/(tabs)/book.tsx`
- `app/(tabs)/services.tsx`
- `app/(tabs)/info.tsx`
- `components/StatusBadge.tsx`
- `components/HoursDisplay.tsx`
- `components/ui/Button.tsx`
- `components/ui/Card.tsx`
- `components/ServiceCard.tsx`
- `config/theme.ts` *(only if contrast ratios require color adjustments)*

## Do NOT Change
- `config/business.ts`
- `utils/linking.ts`
- `app/(tabs)/_layout.tsx`
- `app.json`
- `package.json` or `tsconfig.json`
