# @repo/shared — Shared Types & Utilities

Common TypeScript types, constants, and utility functions used across all QueueNow apps.

## 📦 What's Included

- **Types** — Shared TypeScript interfaces and types
- **Constants** — Application-wide constants
- **Utilities** — Helper functions and validators

## 🔧 Usage

Import from `@repo/shared`:

```typescript
import { UserType, PostStatus } from '@repo/shared';
```

## 📁 Project Structure

- `auth.types.ts` — Authentication and user types
- `zod.types.ts` — Zod validation schemas
- `index.ts` — Main export file

## 🚀 Available Scripts

```bash
pnpm lint   # Run ESLint
```

## 📝 Contributing

When adding new shared types or utilities:
1. Add to appropriate file or create new one
2. Export from `index.ts`
3. Update this README if needed

## 📝 Notes

- Use for cross-app consistency
- Keep it lightweight
- Don't add external dependencies without discussion
