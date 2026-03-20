# Task: Step 3.4 — Error Handling for Link Actions

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). This step hardens the link-opening utility so that failures (e.g., no phone app on a simulator, no email client configured, maps unavailable) never crash the app and always give the user a useful fallback.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites (all must exist and be working)
- `utils/linking.ts` with `openPhone()`, `openEmail()`, `openMaps()`, `openBooking()`
- `config/business.ts` with `BUSINESS.phone`, `BUSINESS.phoneDisplay`, `BUSINESS.email`, `BUSINESS.address.fullFormatted`, `BUSINESS.bookingUrl`
- `expo-web-browser` installed

## Your Task
Rewrite `utils/linking.ts` so every function is safe: it checks whether the URL can be opened before trying, and shows a user-friendly `Alert` with the raw value when it cannot.

---

## Current State
The existing functions in `utils/linking.ts` call `Linking.openURL()` directly without checking if the URL is supported. On iOS simulators (no phone app) and on devices without email clients this causes a silent failure or unhandled rejection.

---

## Updated `utils/linking.ts`

Implement the following four functions. Each follows the same guard pattern:

```
1. Build the URL
2. Check canOpenURL()
3. If yes → open it
4. If no → Alert.alert() with the raw value so the user can act manually
```

### `openPhone(phoneNumber: string)`
- URL: `tel:${phoneNumber}`
- Fallback alert title: `"Cannot Open Dialer"`
- Fallback alert message: `"Please call: ${phoneNumber}"`

### `openEmail(email: string)`
- URL: `mailto:${email}`
- Fallback alert title: `"Cannot Open Email"`
- Fallback alert message: `"Please email: ${email}"`

### `openMaps(url: string)`
- URL: the `directionsUrl` passed in (Google Maps deep link)
- Fallback alert title: `"Cannot Open Maps"`
- Fallback alert message: Include the full formatted address from the URL or pass the address string as a second parameter
- Signature: `openMaps(url: string, fallbackAddress?: string)`
- Fallback alert message: `"Address: ${fallbackAddress ?? url}"`

### `openBooking(url: string)`
- Use `WebBrowser.openBrowserAsync(url)` as the primary method (in-app browser)
- Wrap in a `try/catch`
- On error: fall back to `Linking.openURL(url)`
- If `Linking.openURL` also fails: show alert with title `"Cannot Open Booking"` and message `"Visit: ${url}"`
- This function does NOT need `canOpenURL` — catching the error is sufficient

---

## Error Handling Rules
- All functions must be `async` and return `Promise<void>`
- No function may throw an unhandled exception — all errors must be caught
- `Alert.alert()` is the correct user-facing feedback mechanism (no console.log for user-facing errors)
- Use `console.warn()` only for debugging during development, not as the primary error path

---

## TypeScript Rules
- No use of `any` type
- All parameters typed explicitly
- Export all four functions as named exports

---

## Example Implementation Pattern

```typescript
export async function openPhone(phoneNumber: string): Promise<void> {
  const url = `tel:${phoneNumber}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Cannot Open Dialer', `Please call: ${phoneNumber}`);
  }
}
```

Apply this same pattern to `openEmail` and `openMaps`. Apply the try/catch pattern to `openBooking`.

---

## Acceptance Criteria
- [ ] `openPhone()` shows an alert with the phone number if the dialer is unavailable
- [ ] `openEmail()` shows an alert with the email address if no email client is configured
- [ ] `openMaps()` shows an alert with the address if Maps cannot be opened
- [ ] `openBooking()` falls back from `WebBrowser` → `Linking` → `Alert` on failure
- [ ] No function throws an unhandled exception under any condition
- [ ] `npx tsc --noEmit` passes with zero errors

## Files Modified
- `utils/linking.ts`

## Do NOT Change
- Any screen files in `app/(tabs)/`
- `config/business.ts`
- `config/theme.ts`
- `components/*`
- `app.json`, `package.json`, `tsconfig.json`
