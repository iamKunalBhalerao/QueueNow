# Surface — QueueNow Frontend

Modern web interface for managing scheduled posts and social media accounts. Built with Next.js, React, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

## 📁 Project Structure

- `app/` — Next.js 14 app router pages and layouts
- `components/` — Reusable React components
- `handlers/` — API request handlers and utilities
- `hooks/` — Custom React hooks
- `lib/` — Utility functions
- `store/` — State management (Zustand)
- `types/` — TypeScript type definitions
- `public/` — Static assets

## 🔧 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_NAME=QueueNow
```

## 📦 Available Scripts

```bash
pnpm dev         # Start dev server with hot reload
pnpm build       # Build for production
pnpm start       # Run production server
pnpm lint        # Run ESLint
pnpm check-types # Type check
```

## 🎨 Tech Stack

- **Next.js 16** — React framework with SSR
- **React 19** — UI library
- **Tailwind CSS 4** — Utility-first styling
- **shadcn/ui** — Pre-built components
- **Zustand** — State management
- **TypeScript** — Type safety

## 🔐 Key Features

- OAuth 2.0 login with LinkedIn
- Schedule and publish posts
- Multi-platform publishing (LinkedIn, Twitter)
- Real-time job status tracking
- Responsive design
- Dark mode support

## 📝 Notes

- Connects to Core API at `http://localhost:5000/api/v1`
- Authentication via JWT tokens stored in cookies
- Runs on port 3000
- Next.js 14 App Router structure
