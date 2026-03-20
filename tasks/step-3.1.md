# Task: Step 3.1 — Create App Icon and Splash Screen

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). This step adds the branding assets that appear at app launch — the home screen icon and the splash screen shown while the app is loading.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites (all must exist and be working)
- Phase 2 must be complete — all four tab screens functional
- `app.json` exists and is valid
- `assets/` directory exists

## Your Task
Add the app icon and splash screen assets, then wire them up in `app.json`.

---

## Asset Requirements

### Icon — `assets/icon.png`
- **Size:** 1024×1024 px
- Square canvas, no transparency (solid background)
- Use the barbershop's brand color as the background
- Center the logo or initials "AJ" in a clean, readable style
- This is used for the iOS home screen icon

### Adaptive Icon — `assets/adaptive-icon.png`
- **Size:** 1024×1024 px
- Include safe-zone padding (~20% on each side) so the logo is not clipped on Android
- Same logo/mark as `icon.png` but with extra surrounding space
- Transparent or solid background (Android clips to a circle/squircle shape)

### Splash Screen — `assets/splash-icon.png`
- **Size:** 1284×2778 px (or at minimum 1024×1024 centered on a larger canvas)
- Centered logo on the brand background color
- Keep it simple: logo + color, no text required

### Favicon — `assets/favicon.png` *(optional, for web)*
- **Size:** 48×48 px
- Simplified version of the icon

---

## app.json Changes

Update the following fields in `app.json`:

```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#1A1A1A"
    },
    "ios": {
      "icon": "./assets/icon.png"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1A1A1A"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

> Replace `#1A1A1A` with the actual brand background color from `config/theme.ts` (`COLORS.background`).

---

## Implementation Rules
- All asset files must be PNG format
- `icon.png` must have no transparency (Apple rejects icons with alpha channels)
- `splash.resizeMode` should be `"contain"` so the logo is never cropped
- `backgroundColor` in splash must match the visible background so there is no flash on load

## Acceptance Criteria
- [ ] `assets/icon.png` exists, 1024×1024, no transparency
- [ ] `assets/adaptive-icon.png` exists, 1024×1024, with safe-zone padding
- [ ] `assets/splash-icon.png` exists and is centered on brand background
- [ ] `app.json` references all three assets with correct paths
- [ ] `app.json` `splash.backgroundColor` matches `COLORS.background`
- [ ] `npx expo start` launches without asset errors in the console

## Files Created
- `assets/icon.png`
- `assets/adaptive-icon.png`
- `assets/splash-icon.png`
- `assets/favicon.png` *(optional)*

## Files Modified
- `app.json`

## Do NOT Change
- Any source code in `app/`, `components/`, `config/`, or `utils/`
- `package.json` or `tsconfig.json`
