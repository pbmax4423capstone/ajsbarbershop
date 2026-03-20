# Task: Step 1.7 — Configure EAS Build

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). EAS Build enables cloud builds for iOS without needing a Mac. This step creates the build configuration files.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites
- Steps 1.1–1.6 are complete
- You do NOT need an Expo account to create these files — just create the config

## Your Task
Create `eas.json` and update `app.json` with production identifiers.

---

## File 1: Create `eas.json`

Create this file at the root of the project (`ajs-barbershop-app/eas.json`):

```json
{
  "cli": {
    "version": ">= 12.0.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      },
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true,
      "ios": {
        "simulator": false
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "REPLACE_WITH_APPLE_ID",
        "ascAppId": "REPLACE_WITH_ASC_APP_ID",
        "appleTeamId": "REPLACE_WITH_TEAM_ID"
      },
      "android": {
        "serviceAccountKeyPath": "./google-services-key.json",
        "track": "internal"
      }
    }
  }
}
```

---

## File 2: Update `app.json`

Make the following changes to `app.json`:

1. Set `expo.name` to `"A.J's Barbershop"`
2. Set `expo.slug` to `"ajs-barbershop"`
3. Add `expo.ios.bundleIdentifier`: `"com.ajsbarbershop.app"`
4. Add `expo.android.package`: `"com.ajsbarbershop.app"`
5. Keep all other existing fields unchanged

The final `app.json` should look like:
```json
{
  "expo": {
    "name": "A.J's Barbershop",
    "slug": "ajs-barbershop",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "ajsbarbershopapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#1A2B3C"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.ajsbarbershop.app"
    },
    "android": {
      "package": "com.ajsbarbershop.app",
      "adaptiveIcon": {
        "backgroundColor": "#1A2B3C",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-web-browser"
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

Note: `splash.backgroundColor` updated to `"#1A2B3C"` (navy brand color) and `adaptiveIcon.backgroundColor` updated to match.

---

## Acceptance Criteria
- [ ] `eas.json` exists with 3 build profiles: `development`, `preview`, `production`
- [ ] `app.json` has `ios.bundleIdentifier: "com.ajsbarbershop.app"`
- [ ] `app.json` has `android.package: "com.ajsbarbershop.app"`
- [ ] `app.json` has `name: "A.J's Barbershop"` and `slug: "ajs-barbershop"`
- [ ] No other files are modified

## Files to Create
- `eas.json`

## Files to Modify
- `app.json`

## Do NOT Change
- Any file in `app/`, `components/`, `config/`, `utils/`
- `package.json`, `tsconfig.json`
