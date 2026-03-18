# QueueUp - Turborepo Monorepo

A modern full-stack application built with Turborepo, Next.js, and comprehensive API integration.

## 🎯 Project Overview

QueueUp is a monorepo project containing multiple applications and shared packages. This repository includes a complete signup implementation with form validation, API integration, and error handling.

## 🚀 Quick Start - Signup Feature

The signup feature is fully implemented and ready to use! Follow these steps:

### 1. Configure Environment
Create `.env.local` in project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 2. View Signup Page
Navigate to `http://localhost:3000/signup` to see the form.

### 3. Implement Backend
Create a `POST /api/auth/signup` endpoint that accepts:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

See `BACKEND_ENDPOINT_GUIDE.md` for complete implementation examples.

### 📚 Documentation
- **Quick Start**: `SIGNUP_QUICK_START.md` - 5-minute setup guide
- **Detailed Guide**: `SIGNUP_IMPLEMENTATION.md` - Complete implementation details
- **Backend Guide**: `BACKEND_ENDPOINT_GUIDE.md` - Backend endpoint implementation
- **Summary**: `SIGNUP_SUMMARY.md` - Feature overview
- **Checklist**: `SETUP_CHECKLIST.md` - Setup verification

## What's Inside

This Turborepo includes the following packages/apps:

### Apps and Packages

- `surface`: a [Next.js](https://nextjs.org/) app with signup implementation
- `core`: core backend/utilities
- `@repo/ui`: a stub React component library
- `@repo/eslint-config`: `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Signup Feature Implementation

The `surface` app includes a complete signup system:
- ✅ React Hook Form integration
- ✅ Zod validation schemas
- ✅ Axios API client with error handling
- ✅ Real-time form validation
- ✅ User-friendly error messages
- ✅ Loading states and feedback
- ✅ Type-safe TypeScript implementation
- ✅ Comprehensive documentation

**Files:**
- `apps/surface/src/lib/api.ts` - Axios API service
- `apps/surface/src/lib/validations.ts` - Zod validation schemas
- `apps/surface/src/components/signup-form.tsx` - Form component

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
