# Task: Step 1.1 — Initialize Expo Project

## Context
You are building **A.J's Barbershop**, a React Native mobile app for a barbershop in Greenwood Village, Colorado. The app is a static, no-backend app that lets customers view hours, book appointments (via Square link), see services, and get contact info.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`
**Stack:** Expo SDK 52+, TypeScript (strict), Expo Router v4 (file-based routing)

## Current State
The Expo project has already been scaffolded with `npx create-expo-app@latest ajs-barbershop-app --template tabs` and `expo-web-browser` + `expo-linking` have been installed. The project directory exists at the path above.

## Your Task
Clean up the boilerplate so the project is a blank slate ready for Phase 1 components.

### Actions
1. Delete the following boilerplate files:
   - `app/(tabs)/two.tsx`
   - `app/modal.tsx`
   - `components/EditScreenInfo.tsx`
   - `components/ExternalLink.tsx`
   - `components/StyledText.tsx`
   - `components/Themed.tsx`
   - `components/useClientOnlyValue.ts`
   - `components/useClientOnlyValue.web.ts`
   - `components/useColorScheme.ts`
   - `components/useColorScheme.web.ts`
   - `constants/Colors.ts`

2. Update `app/_layout.tsx` — remove the `modal` Stack.Screen reference since modal.tsx is deleted, keep the root layout functional with just the `(tabs)` stack screen.

3. Create the required empty directories:
   - `config/`
   - `utils/`
   - `components/ui/`

4. Run `npx tsc --noEmit` to verify TypeScript compiles without errors. Fix any errors introduced by the cleanup.

## Acceptance Criteria
- [ ] Boilerplate files listed above are deleted
- [ ] `config/`, `utils/`, and `components/ui/` directories exist
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] No references to deleted files remain in any source file

## Files to Modify
- `app/_layout.tsx` — remove modal screen reference

## Files to Delete
- `app/(tabs)/two.tsx`
- `app/modal.tsx`
- `components/EditScreenInfo.tsx`
- `components/ExternalLink.tsx`
- `components/StyledText.tsx`
- `components/Themed.tsx`
- `components/useClientOnlyValue.ts`
- `components/useClientOnlyValue.web.ts`
- `components/useColorScheme.ts`
- `components/useColorScheme.web.ts`
- `constants/Colors.ts`

## Do NOT Change
- `package.json`
- `tsconfig.json`
- `app.json`
- `app/(tabs)/index.tsx` (keep as-is for now)
- `app/(tabs)/_layout.tsx` (will be rewritten in Step 1.6)
