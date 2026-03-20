# brief.md — A.J's Barbershop Mobile App

## Problem Statement
A.J's Barbershop is appointment-only and uses Square for online booking via ajs-barbershop.square.site. The owner wants a branded mobile app so customers can easily book appointments, see business hours, view services and prices, and get directions. She does not want monthly subscription costs for backend services, scheduling platforms, or app infrastructure.

## Desired Outcome
A polished, cross-platform mobile app (iOS + Android) built from a single codebase that:
1. Provides a one-tap path to book an appointment via the existing Square booking flow
2. Displays business hours, address, phone, email, and a map/directions link
3. Shows a list of services with prices
4. Feels like a real native app, not a website wrapper
5. Costs near $0/month to operate after initial build

## Constraints
- **No Mac available** — all iOS builds must use cloud-based build services (Expo EAS)
- **No existing developer accounts** — both Apple Developer ($99/year) and Google Play ($25 one-time) accounts must be created
- **No custom backend** — no server, database, authentication, or API in V1
- **No monthly subscriptions** — avoid Firebase, Supabase, hosted analytics, push-notification services, or paid CI/CD
- **Booking stays in Square** — do not duplicate scheduling logic; the app hands off to Square's existing booking flow
- **Patrick maintains the app** — code must be clean, well-structured, and easy to update (e.g., hours change, service price update)
- **Services and prices must be displayed** — but they render as images on the Square site, so the client must provide a text list with pricing
- **Fast AND polished** — V1 must be both quick to deliver and production-quality

## Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Apple rejects the app as a thin wrapper | Medium | High | Add native-only features: offline hours, deep links, polished branding, services screen, app icon/splash |
| Services/prices data is not provided by client | Medium | Medium | Stub the services screen with placeholder data; mark as blocker for store submission |
| EAS free-tier build limits hit during development | Low | Low | Free tier allows 15 iOS + 15 Android builds/month; sufficient for this project |
| Square changes their booking page URL or structure | Low | Medium | Booking URL is a single config constant; easy to update |
| Client wants additional features mid-build | Medium | Medium | Strict V1 scope boundary; any additions become V2 |

## Assumptions (clearly labeled)
- **ASSUMPTION:** The client will provide a text list of services and prices that Patrick can hardcode into the app config
- **ASSUMPTION:** The Square booking URL (ajs-barbershop.square.site) will remain stable and functional
- **ASSUMPTION:** The client approves the app design based on her existing Square site branding (colors, logo)
- **ASSUMPTION:** Patrick has a Windows machine with Node.js, npm, and can run Expo CLI locally
- **ASSUMPTION:** The client does not need push notifications, customer accounts, or loyalty features in V1
- **ASSUMPTION:** No custom domain is required; a simple privacy policy can be hosted on a free static page (e.g., GitHub Pages)

## Discovery Answers Summary
| Question | Answer |
|----------|--------|
| Branding | Use existing Square site branding (logo, colors) |
| Developer accounts | Neither exists — create both |
| Mac available | No — cloud builds only (EAS) |
| Services display | Show services and prices in-app |
| Cancellation policy | None to display |
| Maintainer | Patrick Baker |
| Timeline priority | Fast AND polished |
| Distribution preference | Not decided — plan for both PWA and store paths |
| Booking model | Keep in Square; maybe add loyalty/login later (V2) |

## Business Details (confirmed from public site)
- **Shop name:** A.J's Barbershop
- **Address:** 9640 E Arapahoe Rd Ste 10, Greenwood Village, CO 80112-3703
- **Phone:** (720) 725-6444
- **Email:** ajsbbshop5280@gmail.com
- **Booking URL:** https://ajs-barbershop.square.site
- **Directions URL:** https://www.google.com/maps/dir/?api=1&destination=9640+E+Arapahoe+Rd+Ste+10+Greenwood+Village+CO+80112-3703
- **Hours:**
  - Monday: Closed
  - Tuesday: 9:00 AM – 5:00 PM
  - Wednesday: 9:00 AM – 5:00 PM
  - Thursday: 11:00 AM – 7:00 PM
  - Friday: 9:00 AM – 5:00 PM
  - Saturday: 9:00 AM – 5:00 PM
  - Sunday: Closed