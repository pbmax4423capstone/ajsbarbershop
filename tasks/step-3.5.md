# Task: Step 3.5 — Device Testing

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). This step creates the device test checklist and generates preview builds via EAS so the app can be tested on real iOS and Android devices before submission.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

**Note:** The agent creates the checklist and build configuration. Patrick executes the checklist manually on physical or emulated devices.

## Prerequisites (all must exist and be working)
- Steps 3.1–3.4 complete
- `eas.json` configured with a `preview` build profile
- EAS CLI installed globally: `npm install -g eas-cli`
- Logged in to Expo account: `eas login`

## Your Task
1. Create the device test checklist at `docs/device-test-checklist.md`
2. Verify `eas.json` has a `preview` profile for both platforms
3. Provide the build commands Patrick should run

---

## Part 1 — Create `docs/device-test-checklist.md`

Create the file with the following content:

```markdown
# A.J's Barbershop — Device Test Checklist

**Version:** Phase 3 Preview  
**Test Date:** _______________  
**Tester:** _______________  
**Build Type:** EAS Preview

---

## iOS Testing

**Device:** _______________  
**OS Version:** _______________

| # | Test | Pass | Fail | Notes |
|---|------|------|------|-------|
| 1 | App launches without crash | | | |
| 2 | Splash screen appears with logo on brand background | | | |
| 3 | App icon appears correctly on home screen | | | |
| 4 | Home screen shows correct Open / Closed status | | | |
| 5 | "Book Appointment" button opens Square booking site in browser | | | |
| 6 | Tap-to-call opens phone dialer with (720) 725-6444 | | | |
| 7 | Tap-to-email opens email client with correct address | | | |
| 8 | "Get Directions" opens Maps app with correct address | | | |
| 9 | Services screen shows all services with prices | | | |
| 10 | Info screen shows full weekly hours | | | |
| 11 | Today's hours are highlighted on the Info screen | | | |
| 12 | App works with Airplane Mode on (Home, Services, Info load) | | | |
| 13 | Book screen shows offline fallback in Airplane Mode | | | |
| 14 | Tap-to-call fallback works in Airplane Mode | | | |
| 15 | App is usable at 200% text size (Settings → Accessibility) | | | |
| 16 | VoiceOver can navigate all screens logically | | | |
| 17 | No visible layout overflow or clipping on any screen | | | |

---

## Android Testing

**Device:** _______________  
**OS Version:** _______________

| # | Test | Pass | Fail | Notes |
|---|------|------|-------|-------|
| 1 | App launches without crash | | | |
| 2 | Splash screen appears with logo on brand background | | | |
| 3 | Adaptive icon appears correctly (circle/squircle, no clipping) | | | |
| 4 | Home screen shows correct Open / Closed status | | | |
| 5 | "Book Appointment" button opens Square booking site in browser | | | |
| 6 | Tap-to-call opens phone dialer with (720) 725-6444 | | | |
| 7 | Tap-to-email opens email client with correct address | | | |
| 8 | "Get Directions" opens Maps app with correct address | | | |
| 9 | Services screen shows all services with prices | | | |
| 10 | Info screen shows full weekly hours | | | |
| 11 | Today's hours are highlighted on the Info screen | | | |
| 12 | App works with Airplane Mode on (Home, Services, Info load) | | | |
| 13 | Book screen shows offline fallback in Airplane Mode | | | |
| 14 | Tap-to-call fallback works in Airplane Mode | | | |
| 15 | App is usable at 200% font size (Settings → Accessibility → Font size) | | | |
| 16 | TalkBack can navigate all screens logically | | | |
| 17 | No visible layout overflow or clipping on any screen | | | |

---

## Bug Log

| # | Screen | Description | Severity (P1/P2/P3) | Status |
|---|--------|-------------|----------------------|--------|
| | | | | |

---

## Sign-off

All P1 bugs resolved: ☐  
Tester sign-off: _______________  
Date: _______________
```

---

## Part 2 — Verify `eas.json`

Ensure `eas.json` in the project root contains a `preview` profile:

```json
{
  "cli": {
    "version": ">= 12.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

If `eas.json` does not exist, create it with the content above.

---

## Part 3 — Build Commands for Patrick

Document the following build commands. Patrick runs these manually after the checklist file is created:

**Android preview build (APK — installs directly on device):**
```bash
eas build --platform android --profile preview
```

**iOS preview build (requires Apple Developer account):**
```bash
eas build --platform ios --profile preview
```

**Both platforms at once:**
```bash
eas build --platform all --profile preview
```

> After the build completes, EAS provides a QR code / download link. Install the APK on Android directly. For iOS, use TestFlight or install via EAS device registration.

---

## Implementation Rules
- The checklist file must be created at `docs/device-test-checklist.md`
- Create the `docs/` directory if it does not exist
- Do not run the EAS builds — only verify the config and document the commands

## Acceptance Criteria
- [ ] `docs/device-test-checklist.md` exists with all 17 iOS and 17 Android test items
- [ ] `eas.json` has a valid `preview` profile with `distribution: "internal"` and Android APK build type
- [ ] `npx tsc --noEmit` passes with zero errors

## Files Created
- `docs/device-test-checklist.md`
- `eas.json` *(if it does not already exist)*

## Files Modified
- `eas.json` *(if the preview profile is missing)*

## Do NOT Change
- Any source code in `app/`, `components/`, `config/`, or `utils/`
- `app.json`, `package.json`, `tsconfig.json`
