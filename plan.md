## Plan: Cursor Delivery Plan for Barbershop App

Build the app in a separate Expo/React Native repository and run the delivery process in Cursor with a strict orchestration model: Claude Sonnet owns the master plan, architecture, dependencies, and phase gates; specialized Claude Haiku 4.5 agents execute narrowly scoped task cards; completed work returns to Sonnet for architectural review and approval before the next phase begins. Keep V1 intentionally small: booking stays in Square, while the app adds native convenience with hours, address, call/email/maps actions, service info, and polished branding.

**Steps**
1. **Project framing and repo setup**
   Create a new standalone repository for the mobile app rather than using the current Salesforce workspace. Use Expo, React Native, TypeScript, and Expo Router. Define V1 scope before any code generation: Home, Book, Visit, and Info flows; no backend; no auth; no custom scheduling.
2. **Master-plan generation in Cursor with Sonnet**
   Use Claude Sonnet to produce the canonical implementation plan, architecture notes, component map, data/config model, accessibility checklist, release checklist, and acceptance criteria. Sonnet should also define the task-card template, task sequencing, dependencies, and phase gates.
3. **Task-card decomposition**
   Break the work into narrow task cards that each modify one concern only. Recommended cards:
   Phase 1 Foundation:
   - Initialize Expo app shell and routing
   - Add theme tokens and brand assets
   - Add static business config module
   - Create shared layout primitives and button/card components
   Phase 2 Core screens:
   - Build Home screen
   - Build Book screen handoff to Square
   - Build Visit screen with hours and directions
   - Build Info screen with services, policies, and contact details
   Phase 3 Native polish:
   - Add app icon, splash screen, and metadata
   - Add link handling for phone, email, and maps
   - Add offline-safe fallback states for static content
   - Add accessibility pass for labels, contrast, text scaling, and focus order
   Phase 4 Release readiness:
   - Add privacy policy/support links
   - Prepare store copy, screenshots, and submission checklist
   - Create Android internal build and iOS preview/TestFlight build path
4. **Haiku execution model in Cursor**
   Assign each task card to a specialized Haiku 4.5 agent with a narrow goal and explicit boundaries. Each task prompt should include: objective, files allowed to change, files not to change, acceptance criteria, testing required, and what to return. Haiku should not make cross-cutting architecture changes; that remains with Sonnet.
5. **Sonnet review loop after every task or small batch**
   After Haiku finishes a card, Sonnet performs the gate review before merge or progression:
   - validates architecture consistency
   - checks dependency impact
   - ensures the task stayed within scope
   - verifies no accidental backend/auth complexity was introduced
   - confirms the card's acceptance criteria are met
   Only after approval should the next dependent card begin.
6. **Phase-gate approvals**
   Use four explicit phase gates:
   Gate 1 Foundation complete: app boots, routes exist, branding/config system is stable.
   Gate 2 Core UX complete: all core screens exist and booking handoff works.
   Gate 3 Quality complete: accessibility, device links, and fallback/error states are finished.
   Gate 4 Release complete: store materials, privacy policy, icons, splash, and preview builds are ready.
7. **Architecture rules Sonnet should enforce**
   - Booking remains in Square; never duplicate booking logic.
   - V1 uses local static configuration for business info and hours.
   - No monthly-cost backend in V1.
   - Prefer composition and small reusable UI primitives.
   - Use explicit URL handlers for booking, maps, phone, and email.
   - Keep app-review risk low by adding native convenience beyond a plain wrapper.
8. **Testing and verification strategy**
   Require each task card to include its own verification. Across the project, validate:
   - iPhone and Android device behavior for booking handoff
   - maps, call, and email deep links
   - large-text and screen-reader friendliness
   - offline readability of static content screens
   - graceful failure if the Square booking page is unreachable
   - preview builds install cleanly
9. **Cost-control strategy**
   Use Expo Free for initial development and internal builds. Avoid paid backend, auth, analytics, notifications, and CI subscriptions. The expected unavoidable public-launch costs remain roughly: Google Play developer account about $25 one-time and Apple Developer Program $99 per year. All other costs should remain optional.
10. **Proposal and commercial packaging**
   Present the client with a V1 fixed-scope proposal, not an open-ended app estimate. Position it as a lightweight booking companion app that uses her existing Square investment. Offer one base package and one optional add-on package for store submission support.

**Relevant files**
- No existing workspace files should be modified; implementation should live in a new standalone mobile-app repository.
- The session plan is stored at `/memories/session/plan.md` for future revision and handoff.

**Verification**
1. Sonnet approves the master architecture and task-card list before any implementation starts.
2. Each Haiku task card returns a concise completion report with changed files, tests run, and unresolved risks.
3. Sonnet signs off each phase gate before any downstream dependent card begins.
4. A real-device pass confirms booking handoff, maps, phone, email, text scaling, and content readability.
5. Release-readiness review confirms privacy policy, support contact, screenshots, icon, splash, and store descriptions are complete.

**Decisions**
- Delivery environment: Cursor.
- Planning/orchestration model: Sonnet for master plan and approvals, Haiku 4.5 for scoped execution.
- Recommended app stack: Expo + React Native + TypeScript.
- Recommended scope: V1 convenience app only, with Square as the booking system.
- Recommended commercial structure: fixed-price build for V1, optional separate fee for store submission and later enhancements.
- Excluded scope: loyalty, login, push notifications, payments, CRM, custom scheduler, live backend, and subscriptions beyond store fees.

**Further Considerations**
1. If Apple-review risk becomes a concern, launch Android first and offer iPhone home-screen install until the app has enough native differentiation.
2. If the client later wants loyalty or account features, treat that as V2 and re-estimate separately with backend/API costs.
3. Keep task cards intentionally small enough that Sonnet can review them quickly and reject drift before it becomes expensive.