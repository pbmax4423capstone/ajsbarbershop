# Task: Step 2.4 — Build ServiceCard Component

## Context
You are building **A.J's Barbershop**, a React Native mobile app (Expo + TypeScript). This component displays a single service (name, price, optional duration/description) in a card format. Used in a list on the Services screen.

**Project directory:** `C:\Cursor Projects\AJsBarbershop\ajs-barbershop-app`

## Prerequisites
- Phase 1 complete
- `config/business.ts` — `Service` interface exported
- `config/theme.ts` — `COLORS`, `SPACING`, `TYPOGRAPHY`, `BORDER_RADIUS` exported
- `components/ui/Card.tsx` — exists and working

## Your Task
Create `components/ServiceCard.tsx`.

### Props Interface
```ts
import type { Service } from '../config/business'

interface ServiceCardProps {
  service: Service
}
```

### Service Interface (from config/business.ts)
```ts
interface Service {
  name: string
  price: string        // "$30" or "TBD — price coming soon"
  duration?: string    // "30 min" (optional)
  description?: string // Short description (optional)
}
```

### Layout (inside a Card)
```
[Service Name]                  [Price]
[Duration — optional]
[Description — optional, muted smaller text]
```

Example card:
```
Haircut                         TBD — price coming soon
30 min
A clean, precise cut tailored to your style.
```

### Styling Rules
- Service name: `TYPOGRAPHY.subheading` style, `COLORS.text`
- Price: bold, `COLORS.accent` (gold), right-aligned or on same row as name
- Duration: `TYPOGRAPHY.caption`, `COLORS.textSecondary`
- Description: `TYPOGRAPHY.body` reduced size, `COLORS.textSecondary`
- Use `Card` component as the outer container
- If price contains "TBD", display it in muted style (`COLORS.textSecondary`)

### Accessibility
- `accessibilityLabel`: `"{name}, {price}"` — e.g. `"Haircut, TBD — price coming soon"`

### Example Usage
```tsx
<ServiceCard service={{ name: 'Haircut', price: 'TBD — price coming soon', duration: '30 min' }} />
```

## Acceptance Criteria
- [ ] Renders name and price on every card
- [ ] Duration shows only when provided
- [ ] Description shows only when provided
- [ ] TBD prices are rendered in muted style
- [ ] Uses `Card` component as container
- [ ] Has meaningful `accessibilityLabel`
- [ ] `npx tsc --noEmit` passes with zero errors

## Files to Create
- `components/ServiceCard.tsx`

## Do NOT Change
- `config/business.ts`, `config/theme.ts`
- `components/ui/Card.tsx`
- Any file in `app/`, `utils/`
