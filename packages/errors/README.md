# @repo/errors — Error Handling Utilities

Centralized error handling and custom error classes for QueueNow applications.

## 📦 What's Included

- **Custom error classes** — Application-specific error types
- **Error utilities** — Error handling helpers and formatters
- **Status codes** — Standardized HTTP and error codes

## 🔧 Usage

Import from `@repo/errors`:

```typescript
import { AppError, ValidationError } from '@repo/errors';

throw new ValidationError('Invalid input');
throw new AppError('Something went wrong', 500);
```

## 📁 Project Structure

- `core.ts` — Base error classes and utilities
- `index.ts` — Main export file

## 🚀 Available Scripts

```bash
pnpm lint   # Run ESLint
```

## 🛠️ Common Error Classes

- `AppError` — Generic application error
- `ValidationError` — Input validation errors
- `AuthenticationError` — Auth-related errors
- `DatabaseError` — Database operation errors

## 📝 Contributing

When adding new error types:
1. Extend from base `AppError` class
2. Define appropriate status code
3. Export from `index.ts`
4. Use consistently across apps

## 📝 Notes

- Centralized for consistency
- Helps with error handling and logging
- Used by Core API for response formatting
