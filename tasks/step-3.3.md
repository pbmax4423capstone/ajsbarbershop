# Task: Step 3.3 — Offline-Safe Static Content

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). This step ensures that the static screens (Home, Services, Info) work without any network connection, and that the Book screen gracefully handles being offline with a fallback to tap-to-call.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites (all must exist and be working)
- All four tab screens complete: `index.tsx`, `book.tsx`, `services.tsx`, `info.tsx`
- `config/business.ts` with `BUSINESS.phone`, `BUSINESS.phoneDisplay`
- `utils/linking.ts` with `openPhone()`
- `expo-network` is available in Expo SDK (no install needed — confirm with `npx expo install expo-network` if uncertain)

## Your Task
1. Confirm that Home, Services, and Info screens have zero network dependencies
2. Add offline detection and a fallback UI to the Book screen

---

## Part 1 — Static Screens Audit

Review `app/(tabs)/index.tsx`, `app/(tabs)/services.tsx`, and `app/(tabs)/info.tsx`:

- Confirm that all content is sourced from `config/business.ts` and `config/theme.ts` — no `fetch()`, no API calls, no network-dependent imports
- Confirm that `StatusBadge` / open-hours logic uses `new Date()` (device time) — not a network time server
- If any network dependency exists, refactor it to use local config

**These three screens must render fully with Airplane Mode enabled.**

---

## Part 2 — Book Screen Offline Fallback

Update `app/(tabs)/book.tsx` to detect network status and show a fallback when offline.

### Network Detection
Use `expo-network` to check connectivity:

```typescript
import * as Network from 'expo-network';
```

On component mount (and when the screen comes into focus with `useFocusEffect`), check:

```typescript
const state = await Network.getNetworkStateAsync();
const isConnected = state.isConnected && state.isInternetReachable;
```

### UI States

**Online (default):**
- Show the existing `WebView` or booking button that opens the Square booking site
- No network indicator needed

**Offline:**
- Hide the booking WebView / button
- Show a centered message:
  - Icon: `wifi-off-outline` (Ionicons)
  - Heading: `"No Internet Connection"` — `TYPOGRAPHY.subheading`, `COLORS.text`
  - Body: `"Booking requires an internet connection."` — `TYPOGRAPHY.body`, `COLORS.textSecondary`
  - Call-to-action button:
    - `label="Call to Book: {BUSINESS.phoneDisplay}"`
    - `variant="primary"`
    - `icon="call-outline"`
    - `onPress={() => openPhone(BUSINESS.phone)}`
    - `accessibilityLabel="Call A.J's Barbershop to book an appointment"`
    - `accessibilityHint="Opens the phone dialer"`

### Re-check on Focus
Wrap the network check in `useFocusEffect` so the UI updates correctly if the user goes offline and then returns to the Book tab:

```typescript
import { useFocusEffect } from 'expo-router';

useFocusEffect(
  useCallback(() => {
    checkNetwork();
  }, [])
);
```

---

## Styling
- Offline state is centered vertically and horizontally in the available screen space
- Use `SPACING.lg` gaps between the icon, heading, body text, and button
- Icon size: 48, color: `COLORS.textSecondary`

---

## Implementation Rules
- Only `book.tsx` gets network-aware logic — other screens must NOT import `expo-network`
- Do not show a persistent network indicator when online — only show UI when offline
- The phone fallback must work even when offline (native dialer, no network needed)

## Acceptance Criteria
- [ ] Home, Services, and Info screens render with zero network connection (Airplane Mode test)
- [ ] Book screen detects offline state on mount and on focus
- [ ] Book screen shows offline message and tap-to-call button when offline
- [ ] Tap-to-call button works offline (opens native dialer)
- [ ] Offline UI does not appear when online
- [ ] `npx tsc --noEmit` passes with zero errors

## Files Modified
- `app/(tabs)/book.tsx`

## Dependencies Added
- `expo-network` (install via `npx expo install expo-network` if not already present)

## Do NOT Change
- `app/(tabs)/index.tsx`
- `app/(tabs)/services.tsx`
- `app/(tabs)/info.tsx`
- `config/*`, `utils/*`, `components/*`
- `app/(tabs)/_layout.tsx`
- `app.json`
