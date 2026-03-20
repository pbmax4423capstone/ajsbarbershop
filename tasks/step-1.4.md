# Task: Step 1.4 — Create Utility Modules

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). These utility modules contain helper functions used across screens. They import from `config/business.ts` types but do NOT hardcode any business data.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites
- Step 1.1 complete: `utils/` directory exists
- Step 1.2 complete: `config/business.ts` exists with `DayHours` interface
- `expo-web-browser` and `expo-linking` are installed

## Your Task
Create two utility files: `utils/linking.ts` and `utils/hours.ts`.

---

## File 1: `utils/linking.ts`

### Purpose
All external link/deep link actions go through this module. Screens never call `Linking` or `WebBrowser` directly.

### Functions to Export

```ts
import * as WebBrowser from 'expo-web-browser'
import { Linking } from 'react-native'

/**
 * Opens the Square booking site in an in-app browser.
 * Falls back to system browser if WebBrowser fails.
 */
export async function openBooking(url: string): Promise<void>

/**
 * Opens the phone dialer with the given phone URI.
 * @param phoneUri - e.g. "tel:7207256444"
 */
export async function openPhone(phoneUri: string): Promise<void>

/**
 * Opens the default email client.
 * @param email - e.g. "ajsbbshop5280@gmail.com"
 */
export async function openEmail(email: string): Promise<void>

/**
 * Opens Google Maps or the default maps app.
 * @param mapsUrl - full URL to open
 */
export async function openMaps(mapsUrl: string): Promise<void>
```

### Implementation Rules
- Every function must be `async` with `try/catch`
- On error, log with `console.error` and do not rethrow (silent failure is acceptable for link actions)
- `openBooking` uses `WebBrowser.openBrowserAsync(url)` as primary; on failure, falls back to `Linking.openURL(url)`
- `openPhone`, `openEmail`, `openMaps` use `Linking.openURL()`
- No hardcoded URLs — all URLs are passed in as parameters

---

## File 2: `utils/hours.ts`

### Purpose
Pure functions for computing open/closed state and formatting hours for display. No side effects.

### Types (import from config/business.ts)
```ts
import type { DayHours } from '../config/business'
```

### Functions to Export

```ts
/**
 * Returns today's day name, e.g. "Monday"
 */
export function getDayOfWeek(): string

/**
 * Returns the DayHours entry for today.
 * Returns the first matching day or the last entry as fallback.
 */
export function getTodayHours(hours: DayHours[]): DayHours

/**
 * Returns true if the shop is currently open based on current time.
 * Closed days always return false.
 * Time strings are in "H:MM AM/PM" format (e.g. "9:00 AM", "10:00 AM").
 */
export function isOpenNow(hours: DayHours[]): boolean

/**
 * Formats an open/close pair for display.
 * e.g. formatTimeRange("10:00 AM", "6:00 PM") => "10:00 AM – 6:00 PM"
 * Returns "Closed" if either value is null.
 */
export function formatTimeRange(open: string | null, close: string | null): string

/**
 * Returns a short label for display, e.g. "Open until 6:00 PM" or "Closed today"
 */
export function getStatusLabel(hours: DayHours[]): string
```

### Implementation Rules
- All functions in `hours.ts` are pure (no side effects, no imports beyond types)
- `isOpenNow` must parse 12-hour time strings correctly (handle "10:00 AM" and "6:00 PM")
- `getDayOfWeek` uses `new Date()` internally — this is the only impure function
- No hardcoded business data

## Acceptance Criteria
- [ ] Both files compile with `npx tsc --noEmit` (zero errors)
- [ ] `hours.ts` functions are pure (except `getDayOfWeek`)
- [ ] `linking.ts` functions are async with try/catch
- [ ] No hardcoded business data in either file
- [ ] `isOpenNow` correctly handles 12-hour AM/PM time strings

## Files to Create
- `utils/linking.ts`
- `utils/hours.ts`

## Do NOT Change
- `config/business.ts`
- `config/theme.ts`
- Any files in `app/` or `components/`
