# Task: Step 1.6 — Configure Tab Navigation Shell

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript, Expo Router v4). This step wires up the 4-tab navigation shell with placeholder screen content and branded styling.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites
- Step 1.1 complete: boilerplate cleaned, directories created
- Step 1.3 complete: `config/theme.ts` with `COLORS` exported
- `@expo/vector-icons` (Ionicons) is available (included with Expo)

## Your Task
Rewrite the tab layout and create 4 placeholder screen files.

---

## File 1: Update `app/(tabs)/_layout.tsx`

Replace the entire file with a 4-tab layout using `Ionicons` icons and theme colors.

### 4 Tabs
| Tab | Route file | Title | Icon (Ionicons) |
|-----|-----------|-------|-----------------|
| Home | `index` | Home | `home` / `home-outline` |
| Book | `book` | Book | `calendar` / `calendar-outline` |
| Services | `services` | Services | `cut` / `cut-outline` |
| Info | `info` | Info | `information-circle` / `information-circle-outline` |

### Tab Bar Styling
```ts
tabBarStyle: {
  backgroundColor: COLORS.tabBar,   // navy
  borderTopColor: COLORS.border,
}
tabBarActiveTintColor: COLORS.tabBarActive     // gold
tabBarInactiveTintColor: COLORS.tabBarInactive // muted
```

### Header Styling
```ts
headerStyle: { backgroundColor: COLORS.primary }
headerTintColor: COLORS.textOnPrimary
headerTitleStyle: { fontWeight: '600' }
```

### Implementation Notes
- Use `Ionicons` from `@expo/vector-icons` (NOT `SymbolView` — that's the boilerplate)
- Active tab uses filled icon variant, inactive uses outline variant
- `headerShown: true` — each tab shows a header with its title
- Remove any reference to `modal`, `SymbolView`, `useClientOnlyValue`, `useColorScheme`, or `Colors` from the old boilerplate

---

## File 2: Create `app/(tabs)/index.tsx` (Home placeholder)

Simple placeholder — will be fully implemented in Phase 2.

```tsx
import { View, Text, StyleSheet } from 'react-native'
import { COLORS, SPACING, TYPOGRAPHY } from '@/config/theme'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Text style={styles.sub}>Phase 2: Hero + Book CTA + Quick Actions</Text>
    </View>
  )
}
```
Style it centered, use theme tokens.

---

## File 3: Create `app/(tabs)/book.tsx` (Book placeholder)

```tsx
export default function BookScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Book Screen</Text>
      <Text style={styles.sub}>Phase 2: Square booking handoff</Text>
    </View>
  )
}
```

---

## File 4: Create `app/(tabs)/services.tsx` (Services placeholder)

```tsx
export default function ServicesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Services Screen</Text>
      <Text style={styles.sub}>Phase 2: Service list with prices</Text>
    </View>
  )
}
```

---

## File 5: Create `app/(tabs)/info.tsx` (Info placeholder)

```tsx
export default function InfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Info Screen</Text>
      <Text style={styles.sub}>Phase 2: Hours, address, contact</Text>
    </View>
  )
}
```

---

## Acceptance Criteria
- [ ] 4 tabs render with correct icons and titles
- [ ] Tab bar has navy background with gold active icon
- [ ] Each tab header is styled with navy background and white text
- [ ] Tapping each tab shows the corresponding placeholder screen
- [ ] No references to old boilerplate (`Colors`, `SymbolView`, `useClientOnlyValue`) remain
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Modify
- `app/(tabs)/_layout.tsx` — full rewrite

## Files to Create
- `app/(tabs)/index.tsx`
- `app/(tabs)/book.tsx`
- `app/(tabs)/services.tsx`
- `app/(tabs)/info.tsx`

## Do NOT Change
- `app/_layout.tsx`
- Any file in `config/` or `utils/`
- `package.json`, `tsconfig.json`, `app.json`
