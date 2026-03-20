# spec.md — A.J's Barbershop Mobile App Solution Design

## 1. Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Expo SDK 52+ / React Native | Single codebase for iOS, Android, and optional web/PWA |
| Language | TypeScript (strict mode) | Type safety, better maintainability for Patrick |
| Routing | Expo Router v4 (file-based) | Convention-based routing, minimal config |
| Styling | React Native StyleSheet + custom theme tokens | No external CSS library needed; consistent with RN patterns |
| Builds | Expo EAS Build (cloud) | No Mac required; free tier sufficient |
| State | React built-in (useState, useContext) | App is too small for Redux/Zustand |
| Testing | Jest + React Native Testing Library | Consistent with existing skills |
| Icons | @expo/vector-icons (Ionicons) | Free, high-quality, no CDN dependency |

## 2. Data Model

### 2.1 Static Business Config (`config/business.ts`)

No database. All business data lives in a single TypeScript config file.

```
interface BusinessConfig {
  name: string                    // "A.J's Barbershop"
  tagline: string                 // "Welcome to A.J's Barbershop!"
  phone: string                   // "(720) 725-6444"
  email: string                   // "ajsbbshop5280@gmail.com"
  address: Address
  hours: DayHours[]
  bookingUrl: string              // "https://ajs-barbershop.square.site"
  directionsUrl: string           // Google Maps deep link
  services: Service[]
  socialLinks?: SocialLink[]
}

interface Address {
  street: string                  // "9640 E Arapahoe Rd Ste 10"
  city: string                    // "Greenwood Village"
  state: string                   // "Colorado"
  zip: string                     // "80112-3703"
  fullFormatted: string           // Full display string
}

interface DayHours {
  day: string                     // "Monday"
  open: string | null             // "9:00 AM" or null if closed
  close: string | null            // "5:00 PM" or null if closed
  isClosed: boolean
}

interface Service {
  name: string                    // "Haircut"
  price: string                   // "$30"
  duration?: string               // "30 min" (optional)
  description?: string            // Short description (optional)
}
```

### 2.2 Theme Tokens (`config/theme.ts`)

Colors, spacing, typography, and border radii defined as constants. Derived from the Square site branding.

```
interface Theme {
  colors: {
    primary: string               // Extracted from site header/CTA
    primaryDark: string
    background: string            // White or very light
    surface: string               // Card backgrounds
    text: string                  // Dark text
    textSecondary: string         // Muted text
    accent: string                // CTA/booking button
    border: string
    success: string               // Open indicator
    error: string                 // Closed indicator
  }
  spacing: Record<string, number> // xs, sm, md, lg, xl
  borderRadius: Record<string, number>
  typography: {
    heading: TextStyle
    subheading: TextStyle
    body: TextStyle
    caption: TextStyle
    button: TextStyle
  }
}
```

## 3. App Architecture

### 3.1 Screen Map

```
app/
├── _layout.tsx            # Root layout with tab navigator
├── (tabs)/
│   ├── _layout.tsx        # Tab bar configuration
│   ├── index.tsx          # Home screen (hero + quick actions)
│   ├── book.tsx           # Booking screen (Square WebView/browser)
│   ├── services.tsx       # Services list with prices
│   └── info.tsx           # Hours, address, contact, directions
```

### 3.2 Shared Components

```
components/
├── ui/
│   ├── Button.tsx         # Primary/secondary/outline variants
│   ├── Card.tsx           # Reusable card container
│   ├── IconButton.tsx     # Circular icon action button
│   └── StatusBadge.tsx    # Open/Closed indicator
├── HoursDisplay.tsx       # Renders weekly hours with today highlighted
├── ContactActions.tsx     # Call, email, directions buttons
├── ServiceCard.tsx        # Individual service with name/price
└── Header.tsx             # Screen header with logo
```

### 3.3 Utility Modules

```
utils/
├── linking.ts             # openPhone(), openEmail(), openMaps(), openBooking()
├── hours.ts               # isOpenNow(), getTodayHours(), formatHours()
└── platform.ts            # Platform-specific helpers if needed
```

## 4. Screen Specifications

### 4.1 Home Screen (`index.tsx`)
- Hero section with shop logo/name and "Open Now" / "Closed" badge
- Primary CTA: "Book Appointment" button (full-width, accent color)
- Quick-action cards row:
  - Call Us (tap-to-call)
  - Get Directions (opens maps)
  - Email Us (opens email client)
- Today's hours display
- Navigation hint to Services tab

### 4.2 Book Screen (`book.tsx`)
- Opens the Square booking URL
- Strategy: Use `expo-web-browser` (in-app browser) as primary approach
  - Falls back to `Linking.openURL()` if in-app browser unavailable
  - Avoids full WebView to reduce store-review risk
- Loading indicator while browser opens
- "Book by Phone" fallback with tap-to-call

### 4.3 Services Screen (`services.tsx`)
- Scrollable list of services with name, price, and optional duration
- Data sourced from `config/business.ts` (static, no API)
- Each service rendered as a card
- "Book This Service" CTA at bottom linking to Square

### 4.4 Info Screen (`info.tsx`)
- Full weekly hours display with today's row highlighted
- Full address with "Get Directions" button
- Phone with tap-to-call
- Email with tap-to-email
- Optional: About the barber / shop section

## 5. External Link Handling

All external actions use React Native `Linking` API:

| Action | URL Scheme | Module |
|--------|-----------|--------|
| Book appointment | `https://ajs-barbershop.square.site` | `expo-web-browser` or `Linking.openURL` |
| Phone call | `tel:7207256444` | `Linking.openURL` |
| Email | `mailto:ajsbbshop5280@gmail.com` | `Linking.openURL` |
| Directions | Google Maps intent URL | `Linking.openURL` |

## 6. Security Model

| Concern | Approach |
|---------|----------|
| Secrets | None required — no API keys, tokens, or credentials in V1 |
| User data | App does not collect, store, or transmit user data |
| Network | Only outbound links to Square, Google Maps, and phone/email — no inbound API |
| Privacy policy | Required for store submission; hosted as a free static page |
| Permissions | No camera, location, contacts, or storage permissions needed |

## 7. Accessibility Requirements

| Requirement | Implementation |
|------------|----------------|
| Screen reader labels | All interactive elements have `accessibilityLabel` and `accessibilityRole` |
| Touch targets | Minimum 44x44pt for all tappable elements |
| Color contrast | WCAG 2.2 AA minimum (4.5:1 for text, 3:1 for large text and UI) |
| Text scaling | Support Dynamic Type / system font scaling |
| Focus order | Logical tab order matching visual layout |
| Status indicators | "Open/Closed" uses text + color (not color alone) |

## 8. Build and Distribution

| Concern | Approach |
|---------|----------|
| iOS builds | EAS Build (cloud) — no Mac required |
| Android builds | EAS Build (cloud) or local |
| Internal testing | Expo Go for development; EAS preview builds for device testing |
| iOS distribution | TestFlight → App Store (requires Apple Developer $99/year) |
| Android distribution | Internal testing track → Google Play (requires $25 one-time) |
| Web/PWA (optional) | Expo web export if store path is delayed |

## 9. File/Folder Structure

```
ajs-barbershop-app/
├── app/                    # Expo Router screens
│   ├── _layout.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx       # Home
│       ├── book.tsx        # Booking
│       ├── services.tsx    # Services
│       └── info.tsx        # Info
├── components/
│   ├── ui/                 # Reusable primitives
│   └── ...                 # Feature components
├── config/
│   ├── business.ts         # All business data
│   └── theme.ts            # Design tokens
├── utils/
│   ├── linking.ts          # Deep link helpers
│   └── hours.ts            # Hours logic
├── assets/
│   ├── icon.png            # App icon (1024x1024)
│   ├── splash.png          # Splash screen
│   ├── adaptive-icon.png   # Android adaptive icon
│   └── logo.png            # In-app logo
├── app.json                # Expo config
├── eas.json                # EAS Build config
├── package.json
├── tsconfig.json
└── babel.config.js
```

## 10. Reporting / Analytics

No paid analytics in V1. Rely on:
- App Store Connect analytics (iOS installs, sessions) — free
- Google Play Console statistics (Android installs, sessions) — free
- Square's own appointment analytics for booking conversion

## 11. Integration Points

| System | Integration Type | Direction |
|--------|-----------------|-----------|
| Square Appointments | URL handoff (in-app browser) | Outbound only |
| Google Maps | URL deep link | Outbound only |
| Phone dialer | `tel:` URL scheme | Outbound only |
| Email client | `mailto:` URL scheme | Outbound only |

No inbound integrations. No webhooks. No APIs consumed. No server-side code.

## 12. Update / Maintenance Strategy

When business details change (hours, prices, services):
1. Patrick edits `config/business.ts`
2. Commits and pushes to the repo
3. Runs `eas build` for new builds
4. Submits update to app stores
5. Or uses EAS Update for OTA update (within Expo free tier limits)