# @repo/ui — React Component Library

Reusable UI components built with React, TypeScript, and Tailwind CSS. Powers the QueueNow frontend.

## 📦 Components

- **Button** — Customizable button with variants
- **Card** — Container with optional header/footer
- **Code** — Syntax highlighted code display

## 🔧 Usage

Import components from `@repo/ui`:

```typescript
import { Button, Card } from '@repo/ui';

export function MyComponent() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

## 📁 Project Structure

- `src/` — Component source files
- Components follow naming convention: `component-name.tsx`

## 🚀 Available Scripts

```bash
pnpm dev         # Start Storybook for component development
pnpm build       # Build component library
pnpm lint        # Run ESLint
pnpm check-types # Type check
```

## 🎨 Tech Stack

- **React 19** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Styling
- **shadcn/ui** — Component base

## 🎯 Design Principles

- Accessible (WCAG AA compliant)
- Responsive and mobile-first
- Composable and flexible
- Well-documented

## 📝 Contributing

When adding new components:
1. Follow naming convention
2. Export from component file
3. Include TypeScript types
4. Test responsiveness
5. Add to Storybook if available

## 📝 Notes

- Used by Surface app
- Maintained for consistency
- Consider accessibility in all components
