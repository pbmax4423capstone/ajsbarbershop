# phase3.md — Native Polish & Quality

## Objective
Add production-quality polish: app icon, splash screen, accessibility pass, offline behavior, error handling, and device testing. This is the phase that differentiates the app from a thin website wrapper and reduces Apple review risk.

## Scope
- App icon (1024x1024) and splash screen
- Android adaptive icon
- Accessibility audit and fixes (WCAG 2.2 AA)
- Offline-safe static content
- Error handling for failed link opens
- Device testing on real or emulated iPhone and Android

## Non-Scope
- Store listing copy and screenshots (Phase 4)
- Developer account creation (Phase 4)
- Store submission (Phase 4)

## Dependencies
- Phase 2 must be complete and Sonnet-approved
- All screens must be functional before polish begins

## Step-by-Step Implementation Plan

### Step 3.1 — Create App Icon and Splash Screen
**Agent:** Haiku 4.5
**Purpose:** Add branding assets for app launch experience
**Actions:**
1. Create or source app icon from the Square site logo
   - `assets/icon.png` — 1024x1024, square, no transparency
   - `assets/adaptive-icon.png` — 1024x1024, with safe-zone padding for Android
   - `assets/favicon.png` — 48x48 for web (optional)
2. Create splash screen image:
   - `assets/splash-icon.png` — centered logo on brand background color
3. Update `app.json`:
   - Set `icon`, `splash.image`, `splash.backgroundColor`, `splash.resizeMode`
   - Set `android.adaptiveIcon.foregroundImage` and `backgroundColor`
   - Set `ios.icon`
**Acceptance Criteria:**
- App icon appears correctly on both iOS and Android home screens
- Splash screen shows logo on brand-colored background during app load
- No distortion or cropping on any screen size
**Files Created:** `assets/icon.png`, `assets/adaptive-icon.png`, `assets/splash-icon.png`
**Files Modified:** `app.json`

### Step 3.2 — Accessibility Audit and Fixes
**Agent:** Haiku 4.5
**Purpose:** Ensure the app meets WCAG 2.2 AA requirements
**Actions:**
1. Audit every interactive element for:
   - `accessibilityLabel` — descriptive, not redundant with visible text
   - `accessibilityRole` — correct role (button, link, header, text, image)
   - `accessibilityState` — for StatusBadge and any toggleable elements
   - `accessibilityHint` — for non-obvious actions (e.g., "Opens the phone dialer")
2. Verify touch targets ≥ 44x44pt for all tappable elements
3. Verify color contrast ratios:
   - Normal text: ≥ 4.5:1
   - Large text (≥ 18.5pt bold or ≥ 24pt): ≥ 3:1
   - UI components and graphical objects: ≥ 3:1
4. Verify text scales properly with system font size settings
5. Verify focus order is logical (matches visual reading order)
6. StatusBadge must convey state via text + color (not color alone)
**Acceptance Criteria:**
- Every interactive element has an accessibility label
- No touch target below 44x44pt
- All text passes WCAG AA contrast ratios
- App remains usable at 200% text scale
- Screen reader can navigate all screens logically
**Files Modified:** All screen and component files as needed

### Step 3.3 — Offline-Safe Static Content
**Agent:** Haiku 4.5
**Purpose:** Ensure hours, address, and contact info are readable without network
**Actions:**
1. Verify that Home, Services, and Info screens render fully from local config (no network dependency for static content)
2. Add a subtle network-status indicator only on the Book screen (since booking requires internet)
3. On Book screen, if network is unavailable:
   - Show "No internet connection" message
   - Show "Call to book: (720) 725-6444" fallback with tap-to-call
4. Use `@react-native-community/netinfo` or `expo-network` for network check (Book screen only)
**Acceptance Criteria:**
- Home, Services, and Info screens render without any network connection
- Book screen shows a clear offline fallback
- Phone fallback works offline
**Files Modified:** `app/(tabs)/book.tsx`
**Dependencies Added:** `expo-network` (if not already present)

### Step 3.4 — Error Handling for Link Actions
**Agent:** Haiku 4.5
**Purpose:** Handle failures in phone, email, maps, and booking links
**Actions:**
1. Update `utils/linking.ts`:
   - Each function checks `Linking.canOpenURL()` before opening
   - If URL cannot be opened, show an `Alert` with the raw value (phone number, email, address)
   - `openBooking()` catches `WebBrowser` errors and falls back to `Linking.openURL()`
2. Ensure no function throws an unhandled exception
**Acceptance Criteria:**
- If phone dialer is unavailable (e.g., simulator), user sees the phone number in an alert
- If email client is unavailable, user sees the email address
- If maps cannot open, user sees the full address
- Booking link has a fallback path
**Files Modified:** `utils/linking.ts`

### Step 3.5 — Device Testing
**Agent:** Haiku 4.5 (creates test plan); Patrick executes manually
**Purpose:** Verify the app on real devices
**Actions:**
1. Create a device test checklist:
   - [ ] App launches without crash (iOS)
   - [ ] App launches without crash (Android)
   - [ ] Home screen shows correct Open/Closed status
   - [ ] "Book Appointment" opens Square booking site
   - [ ] Tap-to-call opens phone dialer with correct number
   - [ ] Tap-to-email opens email client with correct address
   - [ ] "Get Directions" opens Google Maps / Apple Maps
   - [ ] Services list shows all services
   - [ ] Info screen shows full weekly hours
   - [ ] Today's hours are highlighted
   - [ ] App is usable with large text (accessibility setting)
   - [ ] Screen reader can access all content
   - [ ] Splash screen and icon appear correctly
   - [ ] App works when offline (static screens)
   - [ ] Book screen shows offline fallback when no network
2. Generate EAS preview builds for testing:
   - Android: `eas build --platform android --profile preview`
   - iOS: `eas build --platform ios --profile preview`
**Acceptance Criteria:**
- All checklist items pass on at least one iOS and one Android device
- Any failures are logged as bugs for immediate fix
**Files Created:** `docs/device-test-checklist.md`

## Quality Gates (Sonnet Review)
After all 5 steps, Sonnet must verify:
- [ ] App icon and splash screen are present and configured
- [ ] Accessibility audit is complete — no missing labels, no small touch targets
- [ ] Color contrast meets WCAG 2.2 AA
- [ ] Offline behavior is correct for all screens
- [ ] Error handling covers all link action failures
- [ ] Preview builds generate successfully via EAS
- [ ] The app provides enough native value to pass Apple review (not a thin wrapper)
- [ ] No new backend, API, or subscription dependencies introduced

## Deliverables
1. App icon and splash screen assets
2. Accessibility-compliant screens and components
3. Offline-safe fallback for Book screen
4. Error-handled deep link functions
5. Device test checklist
6. Working preview builds (iOS + Android)

## Exit Criteria
Phase 3 is complete when:
- Preview builds install and run on test devices
- All device test checklist items pass
- Sonnet confirms the app is not a "thin wrapper" for review purposes
- No critical accessibility gaps remain