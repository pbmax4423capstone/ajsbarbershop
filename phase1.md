# phase1.md — Foundation

## Objective
Set up the Expo project, establish the folder structure, configure build tooling, and create the foundational data and theme modules that all screens depend on.

## Scope
- Repository initialization with Expo, TypeScript, and Expo Router
- Static business config module with all shop data
- Theme tokens (colors, spacing, typography)
- Reusable UI primitives (Button, Card, IconButton, StatusBadge)
- Tab navigation shell (4 tabs, placeholder screens)
- EAS Build configuration for cloud builds

## Non-Scope
- Screen implementations beyond placeholder stubs
- App icon and splash screen (Phase 3)
- Store submission (Phase 4)
- Any backend, auth, or API work

## Step-by-Step Implementation Plan

### Step 1.1 — Initialize Expo Project
**Agent:** Haiku 4.5
**Purpose:** Create the repo and install dependencies
**Actions:**
1. Run `npx create-expo-app@latest ajs-barbershop-app --template tabs`
2. Navigate into the project directory
3. Install required dependencies:
   - `expo-web-browser` (for booking handoff)
   - `expo-linking` (for phone/email/maps)
   - `@expo/vector-icons` (already included)
4. Remove boilerplate example screens and assets
5. Verify the app boots with `npx expo start`
**Acceptance Criteria:**
- App launches in Expo Go without errors
- TypeScript compiles without errors
- Folder structure matches spec.md
**Files Created/Modified:** `package.json`, `tsconfig.json`, `app.json`, `app/_layout.tsx`

### Step 1.2 — Create Business Config Module
**Agent:** Haiku 4.5
**Purpose:** Centralize all business data in one typed config file
**Actions:**
1. Create `config/business.ts`
2. Define and export interfaces: `BusinessConfig`, `Address`, `DayHours`, `Service`
3. Export a `BUSINESS` constant with all known data:
   - Shop name, tagline, phone, email
   - Full address
   - Weekly hours (Mon–Sun)
   - Booking URL (`https://ajs-barbershop.square.site`)
   - Directions URL (Google Maps intent)
   - Services array with placeholder data (3–5 items with "TBD" prices until client provides real data)
**Acceptance Criteria:**
- File compiles without errors
- All interfaces are exported
- `BUSINESS` constant is importable from any screen
- Services array has clear placeholder markers
**Files Created:** `config/business.ts`
**Files NOT to Change:** `app/_layout.tsx`, `package.json`

### Step 1.3 — Create Theme Module
**Agent:** Haiku 4.5
**Purpose:** Define design tokens for consistent styling
**Actions:**
1. Create `config/theme.ts`
2. Extract approximate brand colors from the Square site (dark background sections, CTA button color, text colors)
3. Define and export:
   - `COLORS` object with primary, background, surface, text, textSecondary, accent, border, success, error
   - `SPACING` object with xs(4), sm(8), md(16), lg(24), xl(32)
   - `BORDER_RADIUS` object with sm(6), md(12), lg(20), full(9999)
   - `TYPOGRAPHY` object with heading, subheading, body, caption, button text styles
4. All values must meet WCAG 2.2 AA contrast ratios
**Acceptance Criteria:**
- File compiles without errors
- All tokens are exported as named constants
- Text-on-background combinations meet 4.5:1 contrast minimum
**Files Created:** `config/theme.ts`
**Files NOT to Change:** `config/business.ts`

### Step 1.4 — Create Utility Modules
**Agent:** Haiku 4.5
**Purpose:** Build helper functions for deep linking and hours logic
**Actions:**
1. Create `utils/linking.ts` with functions:
   - `openBooking()` — opens Square URL via `expo-web-browser`
   - `openPhone(phoneNumber: string)` — opens `tel:` link
   - `openEmail(email: string)` — opens `mailto:` link
   - `openMaps(url: string)` — opens directions URL
   - All functions include try/catch with console.error fallback
2. Create `utils/hours.ts` with functions:
   - `isOpenNow(hours: DayHours[]): boolean`
   - `getTodayHours(hours: DayHours[]): DayHours`
   - `formatTimeRange(open: string, close: string): string`
   - `getDayOfWeek(): string`
**Acceptance Criteria:**
- Both files compile without errors
- Functions are pure where possible (hours.ts is fully pure)
- linking.ts uses proper async/await
- No hardcoded business data in utility files
**Files Created:** `utils/linking.ts`, `utils/hours.ts`
**Files NOT to Change:** `config/*`

### Step 1.5 — Create Reusable UI Components
**Agent:** Haiku 4.5
**Purpose:** Build small, composable UI primitives
**Actions:**
1. Create `components/ui/Button.tsx`
   - Props: `label`, `onPress`, `variant` (primary | secondary | outline), `icon?`, `accessibilityLabel`
   - Uses theme tokens for styling
   - Minimum 44x44pt touch target
2. Create `components/ui/Card.tsx`
   - Props: `children`, `style?`
   - Rounded surface with subtle shadow
3. Create `components/ui/IconButton.tsx`
   - Props: `icon`, `label`, `onPress`, `color?`
   - Circular icon with text label below
   - Used for quick-action buttons (Call, Directions, Email)
4. Create `components/ui/StatusBadge.tsx`
   - Props: `isOpen: boolean`
   - Shows "Open Now" (green) or "Closed" (red) with text + icon (not color alone)
   - Accessible — uses both color and text
**Acceptance Criteria:**
- All components render without errors
- All have `accessibilityLabel` or `accessibilityRole` props
- Touch targets are ≥44x44pt
- Components use theme tokens, not hardcoded colors
**Files Created:** `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/ui/IconButton.tsx`, `components/ui/StatusBadge.tsx`

### Step 1.6 — Configure Tab Navigation Shell
**Agent:** Haiku 4.5
**Purpose:** Set up the 4-tab layout with placeholder screens
**Actions:**
1. Update `app/(tabs)/_layout.tsx` with 4 tabs:
   - Home (icon: home-outline)
   - Book (icon: calendar-outline)
   - Services (icon: cut-outline or list-outline)
   - Info (icon: information-circle-outline)
2. Create placeholder screens:
   - `app/(tabs)/index.tsx` — "Home Screen" text
   - `app/(tabs)/book.tsx` — "Book Screen" text
   - `app/(tabs)/services.tsx` — "Services Screen" text
   - `app/(tabs)/info.tsx` — "Info Screen" text
3. Tab bar styling uses theme tokens
4. Active tab indicator uses accent color
**Acceptance Criteria:**
- App boots with 4 visible tabs
- Tapping each tab shows the correct placeholder
- Tab bar is styled consistently with theme
- Tab icons render correctly
**Files Modified:** `app/(tabs)/_layout.tsx`
**Files Created:** `app/(tabs)/index.tsx`, `app/(tabs)/book.tsx`, `app/(tabs)/services.tsx`, `app/(tabs)/info.tsx`

### Step 1.7 — Configure EAS Build
**Agent:** Haiku 4.5
**Purpose:** Set up cloud build config so iOS builds work without a Mac
**Actions:**
1. Run `eas init` to link the project to an Expo account
2. Create `eas.json` with profiles:
   - `development` — for Expo Go / dev client
   - `preview` — for internal testing (APK + iOS simulator)
   - `production` — for store submission
3. Update `app.json` with:
   - `ios.bundleIdentifier`: `com.ajsbarbershop.app`
   - `android.package`: `com.ajsbarbershop.app`
   - `name`: "A.J's Barbershop"
   - `slug`: `ajs-barbershop`
4. Verify config with `eas build --platform all --profile preview --dry-run`
**Acceptance Criteria:**
- `eas.json` is valid with 3 build profiles
- `app.json` has correct identifiers
- Dry run completes without config errors
**Files Created:** `eas.json`
**Files Modified:** `app.json`

## Quality Gates (Sonnet Review)
After all 7 steps, Sonnet must verify:
- [ ] App boots without errors in Expo Go
- [ ] TypeScript compiles with zero errors (`npx tsc --noEmit`)
- [ ] All config modules are importable and type-safe
- [ ] UI components render and meet accessibility requirements
- [ ] Tab navigation works across all 4 tabs
- [ ] No hardcoded values outside config files
- [ ] No backend, auth, or API code introduced
- [ ] EAS config is valid for cloud builds
- [ ] Folder structure matches spec.md

## Deliverables
1. Working Expo project with 4-tab navigation
2. Typed business config module
3. Theme tokens module
4. Utility modules for linking and hours
5. 4 reusable UI components
6. EAS build configuration

## Exit Criteria
Phase 1 is complete when:
- The app boots on both iOS (Expo Go) and Android (Expo Go)
- All config, utility, and component modules compile without errors
- The tab navigation shell is functional
- Sonnet has reviewed and approved all 7 steps
- No architectural issues or dependency problems remain