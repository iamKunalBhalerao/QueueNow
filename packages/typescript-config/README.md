# @repo/typescript-config — Shared TypeScript Configuration

Standardized TypeScript configurations for all QueueNow projects.

## 📦 Included Configs

- **base.json** — Base TypeScript configuration
- **nextjs.json** — Next.js specific configuration
- **react-library.json** — React library configuration

## 🔧 Usage

Extend one of these configs in your project's `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

Or for Next.js:

```json
{
  "extends": "@repo/typescript-config/nextjs.json"
}
```

## 📝 Config Details

### base.json
- Target: ES2020
- Module: ESNext
- Strict mode: Enabled
- Resolves JSX as React

### nextjs.json
- Extends base config
- Optimized for Next.js 14+
- Includes Next.js specific compiler options

### react-library.json
- For building React components
- ES modules output
- Declaration files generated

## 🚀 Available Scripts

```bash
pnpm lint   # Run ESLint
```

## 📝 Contributing

When updating configs:
1. Test with affected projects
2. Update all relevant apps
3. Document breaking changes in commit message

## 📝 Notes

- Consistency across all TypeScript projects
- Strict mode helps catch errors early
- Regularly updated with TypeScript releases
