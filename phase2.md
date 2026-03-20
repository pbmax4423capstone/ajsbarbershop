# phase2.md — Core Screens

## Objective
Implement all four app screens with real content, business data, and interactive features. This is the phase where the app goes from a shell to a usable product.

## Scope
- Home screen with hero, booking CTA, quick actions, and today's hours
- Book screen with Square booking handoff
- Services screen with service list and prices
- Info screen with full hours, address, and contact details
- Feature components: HoursDisplay, ContactActions, ServiceCard, Header

## Non-Scope
- App icon and splash screen (Phase 3)
- Accessibility deep pass (Phase 3)
- Store submission materials (Phase 4)

## Dependencies
- Phase 1 must be complete and Sonnet-approved
- Business config, theme, utilities, and UI primitives must be stable

## Step-by-Step Implementation Plan

### Step 2.1 — Build Header Component
**Agent:** Haiku 4.5
**Purpose:** Create a reusable screen header with optional logo
**Actions:**
1. Create `components/Header.tsx`
   - Props: `title: string`, `showLogo?: boolean`
   - Renders logo image (if `showLogo`) and title text
   - Uses theme typography for heading style
   - `accessibilityRole="header"`
**Acceptance Criteria:**
- Renders with and without logo
- Accessible as a heading
**Files Created:** `components/Header.tsx`

### Step 2.2 — Build HoursDisplay Component
**Agent:** Haiku 4.5
**Purpose:** Render the weekly hours table with today highlighted
**Actions:**
1. Create `components/HoursDisplay.tsx`
   - Props: `hours: DayHours[]`, `highlightToday?: boolean`
   - Renders each day as a row: day name + hours or "Closed"
   - Today's row gets a highlight background color
   - "Closed" days use error/muted color
   - Uses `getTodayHours()` and `getDayOfWeek()` from utils
**Acceptance Criteria:**
- All 7 days render correctly
- Today is visually distinguished
- Closed days are clearly marked
- Screen reader reads "Monday, 9 AM to 5 PM" (not raw data)
**Files Created:** `components/HoursDisplay.tsx`

### Step 2.3 — Build ContactActions Component
**Agent:** Haiku 4.5
**Purpose:** Row of icon buttons for call, email, and directions
**Actions:**
1. Create `components/ContactActions.tsx`
   - Uses `IconButton` component
   - Three actions: Call (phone icon), Email (mail icon), Directions (map icon)
   - Each calls the corresponding function from `utils/linking.ts`
   - Data sourced from `BUSINESS` config
**Acceptance Criteria:**
- Three buttons render in a horizontal row
- Each button has correct accessibility label ("Call A.J's Barbershop", etc.)
- Tapping triggers the correct linking function
**Files Created:** `components/ContactActions.tsx`

### Step 2.4 — Build ServiceCard Component
**Agent:** Haiku 4.5
**Purpose:** Individual service display card
**Actions:**
1. Create `components/ServiceCard.tsx`
   - Props: `service: Service`
   - Renders service name, price, optional duration, optional description
   - Uses `Card` component as container
   - Clean typography with price visually prominent
**Acceptance Criteria:**
- Renders all provided service fields
- Handles missing optional fields gracefully
- Consistent card styling via theme
**Files Created:** `components/ServiceCard.tsx`

### Step 2.5 — Implement Home Screen
**Agent:** Haiku 4.5
**Purpose:** Primary landing screen with hero and quick actions
**Actions:**
1. Replace placeholder in `app/(tabs)/index.tsx`
2. Layout (top to bottom):
   - `Header` with logo and shop name
   - `StatusBadge` showing Open/Closed
   - Today's hours (single line)
   - Primary `Button`: "Book Appointment" (calls `openBooking()`)
   - `ContactActions` row (Call, Directions, Email)
   - Small "View Services" text link navigating to Services tab
3. Use `ScrollView` for content
4. All data from `BUSINESS` config
**Acceptance Criteria:**
- Screen renders all sections without errors
- "Book Appointment" opens the Square site
- Open/Closed badge reflects current day/time
- Contact actions trigger correct deep links
- Screen scrolls on small devices
**Files Modified:** `app/(tabs)/index.tsx`

### Step 2.6 — Implement Book Screen
**Agent:** Haiku 4.5
**Purpose:** Booking handoff to Square
**Actions:**
1. Replace placeholder in `app/(tabs)/book.tsx`
2. Layout:
   - Header: "Book an Appointment"
   - Descriptive text: "Schedule your next visit with A.J's Barbershop"
   - Primary `Button`: "Book Now" (calls `openBooking()` via `expo-web-browser`)
   - Secondary fallback: "Or call to book: (720) 725-6444" with tap-to-call
   - Info text: brief booking instructions
3. Handle the case where the browser fails to open
**Acceptance Criteria:**
- "Book Now" opens an in-app browser to the Square booking URL
- Phone fallback works via tap-to-call
- Error state shows if browser open fails
**Files Modified:** `app/(tabs)/book.tsx`

### Step 2.7 — Implement Services Screen
**Agent:** Haiku 4.5
**Purpose:** Display services and prices
**Actions:**
1. Replace placeholder in `app/(tabs)/services.tsx`
2. Layout:
   - Header: "Our Services"
   - `FlatList` of `ServiceCard` components
   - Data from `BUSINESS.services`
   - Bottom CTA: "Book an Appointment" button
3. If services array uses placeholder data, show a subtle note
**Acceptance Criteria:**
- All services render as cards in a scrollable list
- FlatList is used (not map inside ScrollView) for performance
- Booking CTA at bottom works
**Files Modified:** `app/(tabs)/services.tsx`

### Step 2.8 — Implement Info Screen
**Agent:** Haiku 4.5
**Purpose:** Full business info with hours, address, and contact
**Actions:**
1. Replace placeholder in `app/(tabs)/info.tsx`
2. Layout (scrollable):
   - Header: "Visit Us"
   - `HoursDisplay` component (full week, today highlighted)
   - Address section with formatted address + "Get Directions" button
   - Contact section: phone (tap-to-call) + email (tap-to-email)
   - Optional: small about/bio section (can be empty initially)
3. All data from `BUSINESS` config
**Acceptance Criteria:**
- Full weekly hours display correctly
- Today is highlighted
- Address, phone, and email are tappable
- Directions button opens Google Maps
**Files Modified:** `app/(tabs)/info.tsx`

## Quality Gates (Sonnet Review)
After all 8 steps, Sonnet must verify:
- [ ] All 4 screens render with real business data
- [ ] Booking handoff to Square works (in-app browser or fallback)
- [ ] Deep links work: phone, email, directions
- [ ] Open/Closed badge logic is correct for current day/time
- [ ] Services list renders from config data
- [ ] Hours display highlights today correctly
- [ ] No hardcoded data outside config modules
- [ ] No new dependencies introduced without justification
- [ ] No backend, auth, or API code introduced
- [ ] Code is clean enough for Patrick to maintain

## Deliverables
1. Four fully implemented screens (Home, Book, Services, Info)
2. Five feature components (Header, HoursDisplay, ContactActions, ServiceCard + any helpers)
3. Working deep links for booking, phone, email, and maps

## Exit Criteria
Phase 2 is complete when:
- All screens show real business data
- A user can book an appointment from the Home or Book screen
- All contact actions (call, email, directions) work
- Sonnet has reviewed and approved all architecture decisions