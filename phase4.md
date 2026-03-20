# phase4.md — Release & Store Submission

## Objective
Prepare all store submission materials, create developer accounts, generate production builds, and submit to Google Play and the Apple App Store.

## Scope
- Privacy policy page (free static hosting)
- App Store and Google Play listing content (description, screenshots, keywords)
- Developer account creation (Apple + Google)
- Production builds via EAS
- Store submission

## Non-Scope
- Feature changes (frozen after Phase 3)
- Custom analytics or crash reporting
- V2 planning

## Dependencies
- Phase 3 must be complete and Sonnet-approved
- All device test checklist items must pass
- Client must have approved the app experience
- Services/prices data must be finalized (not placeholder)

## Step-by-Step Implementation Plan

### Step 4.1 — Create Privacy Policy
**Agent:** Haiku 4.5
**Purpose:** Every published app needs a privacy policy URL
**Actions:**
1. Create `docs/privacy-policy.md` with content:
   - App name: A.J's Barbershop
   - Data collection: "This app does not collect, store, or transmit personal data."
   - Third-party services: "This app links to Square (squareup.com) for appointment booking. Square's privacy policy applies when using their booking service."
   - Contact: ajsbbshop5280@gmail.com
   - Last updated date
2. Host the privacy policy as a free static page:
   - Option A: GitHub Pages (free, requires a public repo or GitHub Pro)
   - Option B: Expo's free hosting via `npx expo export:web` and a static host
   - Option C: A simple page on her existing Square site (if possible)
3. Record the hosted URL for store submission
**Acceptance Criteria:**
- Privacy policy is publicly accessible at a stable URL
- Content accurately reflects the app's data practices (none)
- URL is ready to paste into store listings
**Files Created:** `docs/privacy-policy.md`

### Step 4.2 — Prepare Store Listing Content
**Agent:** Haiku 4.5
**Purpose:** Write copy for both app stores
**Actions:**
1. Create `docs/store-listing.md` with:
   - **App Name:** A.J's Barbershop
   - **Short Description (80 chars):** "Book appointments, view hours & get directions to A.J's Barbershop."
   - **Full Description (4000 chars max):**
     - What the app does
     - Key features (book, hours, services, directions, call, email)
     - About the shop
     - "Powered by Square for appointment scheduling"
   - **Keywords/Tags:** barbershop, haircut, appointments, booking, Greenwood Village, barbershop near me
   - **Category:** Lifestyle (iOS) / Beauty (Android)
   - **Content Rating:** Everyone / 4+
   - **Support Email:** ajsbbshop5280@gmail.com
   - **Privacy Policy URL:** (from Step 4.1)
2. Prepare screenshot list (to be captured from device):
   - Home screen
   - Book screen
   - Services screen
   - Info/Hours screen
   - Capture on iPhone 6.7" and Android phone sizes
3. Document required asset sizes:
   - iOS: 6.7" (1290×2796), 6.5" (1284×2778), 5.5" (1242×2208)
   - Android: phone (1080×1920 minimum), 7" tablet (optional), 10" tablet (optional)
**Acceptance Criteria:**
- Full listing copy ready for both stores
- Screenshot list documented
- All required metadata fields identified
**Files Created:** `docs/store-listing.md`

### Step 4.3 — Create Developer Accounts
**Agent:** Patrick (manual, not automatable)
**Purpose:** Register for Apple Developer and Google Play Console
**Actions:**
1. **Apple Developer Program:**
   - Go to https://developer.apple.com/programs/enroll/
   - Enroll as Individual (using client's legal name and Apple ID)
   - Pay $99/year
   - Enable two-factor authentication on Apple ID
   - Wait for approval (usually 24–48 hours)
2. **Google Play Console:**
   - Go to https://play.google.com/console/signup
   - Sign in with a Google account
   - Accept Developer Distribution Agreement
   - Pay $25 one-time registration fee
   - Choose "Personal" account type
   - Complete identity verification
   - Complete 20-tester requirement (Google requires 20 testers for 14 days before public release for new accounts)
**Acceptance Criteria:**
- Apple Developer account is active and can create App IDs
- Google Play Console account is active and can create app listings
- Both accounts are linked to the client's email/identity
**Files Created:** None (manual process)
**Estimated Time:** 1–3 days for account approvals

### Step 4.4 — Generate Production Builds
**Agent:** Haiku 4.5 (commands only; Patrick executes)
**Purpose:** Create store-ready binaries via EAS
**Actions:**
1. Verify `app.json` has final values:
   - `version`: "1.0.0"
   - `ios.buildNumber`: "1"
   - `android.versionCode`: 1
   - `ios.bundleIdentifier`: "com.ajsbarbershop.app"
   - `android.package`: "com.ajsbarbershop.app"
2. Run production builds:
   - Android: `eas build --platform android --profile production`
     - Outputs: `.aab` (Android App Bundle) for Play Store
   - iOS: `eas build --platform ios --profile production`
     - Outputs: `.ipa` for App Store Connect
     - Requires Apple Developer credentials during build
3. Download build artifacts from Expo dashboard
**Acceptance Criteria:**
- Android `.aab` file generated successfully
- iOS `.ipa` file generated successfully
- Both builds install and run correctly on test devices
**Files Modified:** `app.json` (version fields only)

### Step 4.5 — Submit to Google Play
**Agent:** Patrick (manual, guided by instructions)
**Purpose:** Publish the Android app
**Actions:**
1. Go to Google Play Console → Create App
2. Fill in:
   - App name: A.J's Barbershop
   - Default language: English (US)
   - App type: App
   - Free / Paid: Free
3. Complete Store Listing:
   - Paste descriptions from `docs/store-listing.md`
   - Upload screenshots
   - Upload app icon (512x512 for Play Store)
   - Set category: Beauty
   - Add privacy policy URL
4. Complete Content Rating questionnaire
5. Set up Pricing & Distribution (free, US only initially)
6. Upload the `.aab` file to Production track (or Internal Testing first)
7. Submit for review
**Acceptance Criteria:**
- App listing is complete with all required fields
- App is submitted for review
- Expected review time: 1–7 days for new apps
**Note:** New Google Play accounts require 20 testers for 14 days in closed testing before production release is allowed.

### Step 4.6 — Submit to Apple App Store
**Agent:** Patrick (manual, guided by instructions)
**Purpose:** Publish the iOS app
**Actions:**
1. Go to App Store Connect → My Apps → (+) New App
2. Fill in:
   - Platform: iOS
   - Name: A.J's Barbershop
   - Primary Language: English (US)
   - Bundle ID: com.ajsbarbershop.app
   - SKU: ajsbarbershop-v1
3. Complete App Information:
   - Paste description from `docs/store-listing.md`
   - Upload screenshots for required device sizes
   - Set category: Lifestyle
   - Add privacy policy URL
   - Add support URL (can be the Square site)
   - Set age rating: 4+
4. Submit the `.ipa` via EAS Submit:
   - `eas submit --platform ios --latest`
   - Or upload via Transporter app
5. Complete App Privacy section:
   - "Data Not Collected" (the app collects no data)
6. Submit for review
**Acceptance Criteria:**
- App listing is complete with all required fields
- App is submitted for review
- Expected review time: 1–3 days typically
**Risk:** Apple may request changes if app is considered a thin wrapper. Mitigation is covered in Phase 3.

## Quality Gates (Sonnet Review)
After all 6 steps, Sonnet must verify:
- [ ] Privacy policy is live and accessible
- [ ] Store listing copy is complete and accurate
- [ ] Production builds are generated and tested
- [ ] All placeholder data (services/prices) is replaced with real data
- [ ] App version is set to 1.0.0
- [ ] Both store submissions are complete or in review
- [ ] No code changes were made after Phase 3 freeze

## Deliverables
1. Hosted privacy policy page
2. Store listing document with copy, keywords, and asset list
3. Production `.aab` (Android) and `.ipa` (iOS) builds
4. Submitted app listings on both stores

## Exit Criteria
Phase 4 is complete when:
- The app is submitted to both Google Play and the Apple App Store
- OR the app is submitted to one store and the other is deferred by client decision
- Privacy policy is publicly hosted
- All store listing fields are complete
- Sonnet confirms no architectural or scope issues in the final build