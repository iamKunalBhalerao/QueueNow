<div align="center">

<br />

```
  ██████  ██    ██ ███████ ██    ██ ███████     ███    ██  ██████  ██     ██
 ██    ██ ██    ██ ██      ██    ██ ██          ████   ██ ██    ██ ██     ██
 ██    ██ ██    ██ █████   ██    ██ █████       ██ ██  ██ ██    ██ ██  █  ██
 ██ ▄▄ ██ ██    ██ ██      ██    ██ ██          ██  ██ ██ ██    ██ ██ ███ ██
  ██████   ██████  ███████  ██████  ███████     ██   ████  ██████   ███ ███
     ▀▀
```

### **Schedule Once. Publish Everywhere. Grow Consistently.**

*The all-in-one social media scheduling platform built for creators, students, and anyone building their online presence.*

<br />

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![BullMQ](https://img.shields.io/badge/BullMQ-FF6B6B?style=for-the-badge)](https://docs.bullmq.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

<br />

[🚀 Live Demo](#) · [📖 Docs](#) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

<br />

</div>

---

## 📌 Table of Contents

- [What is QueueNow?](#-what-is-queuenow)
- [Why QueueNow?](#-why-queuenow)
- [Key Features](#-key-features)
- [Supported Platforms](#-supported-platforms)
- [Architecture Overview](#-architecture-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Roadmap](#%EF%B8%8F-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Community & Support](#-community--support)

---

## 🌟 What is QueueNow?

**QueueNow** is a powerful, open-source social media scheduling platform designed for **content creators, students, solopreneurs, and anyone building a consistent online presence**. Instead of logging into multiple platforms at odd hours, you plan your content once — QueueNow handles the rest.

Whether you're a student growing your personal brand, a freelancer managing client accounts, or a creator posting daily — QueueNow puts your entire content calendar on autopilot.

> *"Your content should work for you — not the other way around."*

---

## 💡 Why QueueNow?

| Problem | QueueNow Solution |
|---|---|
| Juggling 5+ social platforms daily | One unified dashboard for everything |
| Forgetting to post at peak hours | Smart scheduling with best-time recommendations |
| Losing track of planned content | Visual drag-and-drop content calendar |
| Posts failing without you knowing | Auto-retry engine with failure alerts |
| Managing team content is chaotic | Role-based collaboration built-in |

---

## ✨ Key Features

### 📅 Smart Scheduling
- Schedule posts across **multiple platforms simultaneously**
- **Best-time-to-post AI recommendations** based on your audience engagement data
- **Recurring posts** — weekly, monthly, or custom intervals
- Drag-and-drop **visual content calendar**

### ✍️ Content Creation
- **AI-powered caption suggestions** to beat writer's block
- **Media library** — upload, organize, and reuse images & videos
- **Bulk upload** via CSV for batching dozens of posts at once
- Rich text editor with hashtag & mention support

### ⚙️ Reliable Post Engine
- Built on **Redis + BullMQ** for fault-tolerant, scalable scheduling
- **Auto-retry** on failed posts with configurable retry policies
- Real-time post **status tracking** (queued → processing → published / failed)
- **Webhook support** for post lifecycle events

### 📊 Analytics & Insights
- Post performance tracking (likes, shares, reach, impressions)
- Audience growth trends over time
- Platform-by-platform breakdown
- Exportable reports (CSV / PDF)

### 👥 Team Collaboration
- Invite teammates with **role-based access** (Admin, Editor, Viewer)
- Post approval workflows before publishing
- Shared media library across team

### 🔗 Platform Integrations
- OAuth-based secure connections — your credentials never stored in plaintext
- Instant reconnect if token expires
- Connection health status dashboard

---

## 📱 Supported Platforms

<div align="center">

| Platform | Status | Post Types |
|---|---|---|
| LinkedIn | ✅ Live | Posts, Articles |
| 𝕏 (Twitter) | 🗓️ Coming Soon | Text, Images, Threads |
| Instagram | 🗓️ Coming Soon | Feed, Stories, Reels |
| Facebook | 🗓️ Coming Soon | Posts, Stories, Pages |
| TikTok | 🗓️ Coming Soon | Videos |
| Pinterest | 🗓️ Coming Soon | Pins, Boards |
| YouTube | 🗓️ Coming Soon | Shorts, Videos |
| Threads | 🗓️ Coming Soon | Text, Images |

</div>

---

## 🏗️ Architecture Overview

QueueNow is a **Turborepo monorepo** containing three specialized apps that work together seamlessly:

```
                    ┌─────────────────────────────────────┐
                    │            QueueNow Platform         │
                    └─────────────────────────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
    ┌─────────▼─────────┐  ┌──────────▼──────────┐  ┌────────▼────────┐
    │    🖥️  surface     │  │      ⚙️  core        │  │  🔁 queueEngine │
    │                   │  │                     │  │                 │
    │   Next.js App     │  │   Express + TS      │  │  Redis + BullMQ │
    │   Zustand State   │◄─►   REST API          │◄─►  Job Processor  │
    │   Tailwind CSS    │  │   Business Logic    │  │  Retry Engine   │
    │   Modern UI/UX    │  │   Auth & OAuth      │  │  Queue Monitor  │
    └───────────────────┘  └─────────────────────┘  └─────────────────┘
```

### 🖥️ `surface` — The Frontend
The user-facing Next.js application. Built with a modern component architecture, Zustand for lightweight global state management, and Tailwind CSS for a responsive, polished UI. Features server-side rendering for SEO and blazing-fast page loads.

### ⚙️ `core` — The Backend API
A scalable Express.js + TypeScript REST API with a clean, modular file structure. Handles authentication (JWT + OAuth), business logic, database operations, and acts as the central orchestrator between the frontend and the queue engine.

### 🔁 `queueEngine` — The Scheduling Brain
The powerhouse of QueueNow. A dedicated Redis + BullMQ service that manages the entire post scheduling pipeline — from queuing scheduled posts to processing them at exactly the right time, with built-in retries, concurrency control, and job prioritization.

---

## 🛠️ Tech Stack

### Frontend — `surface`
| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework with App Router & SSR |
| [Zustand](https://zustand-demo.pmnd.rs/) | Lightweight, scalable state management |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [React Query](https://tanstack.com/query) | Server state & data fetching |
| [Shadcn/UI](https://ui.shadcn.com/) | Accessible, composable component library |

### Backend — `core`
| Technology | Purpose |
|---|---|
| [Express.js](https://expressjs.com/) | Fast, minimal Node.js web framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe, scalable codebase |
| [Prisma ORM](https://www.prisma.io/) | Type-safe database access |
| [PostgreSQL](https://www.postgresql.org/) | Primary relational database |
| [JWT + OAuth 2.0](https://oauth.net/2/) | Authentication & social platform auth |
| [Zod](https://zod.dev/) | Runtime schema validation |

### Queue Engine — `queueEngine`
| Technology | Purpose |
|---|---|
| [Redis](https://redis.io/) | In-memory data store & job persistence |
| [BullMQ](https://docs.bullmq.io/) | Production-grade job & message queue |
| [Bull Board](https://github.com/felixmosh/bull-board) | Queue monitoring dashboard |

### Monorepo & DevOps
| Technology | Purpose |
|---|---|
| [Turborepo](https://turbo.build/) | High-performance monorepo build system |
| [pnpm](https://pnpm.io/) | Fast, efficient package manager |
| [Docker](https://www.docker.com/) | Containerization |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |

---

## 📂 Project Structure

```
queuenow/
├── apps/
│   ├── surface/                  # 🖥️  Next.js Frontend
│   │   ├── app/                  # App Router pages & layouts
│   │   │   ├── (auth)/           # Authentication routes
│   │   │   ├── (dashboard)/      # Protected dashboard routes
│   │   │   └── api/              # Next.js API routes
│   │   ├── components/           # Reusable UI components
│   │   │   ├── ui/               # Base design system components
│   │   │   ├── calendar/         # Content calendar components
│   │   │   └── posts/            # Post creation & management
│   │   ├── store/                # Zustand state stores
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Utilities & helpers
│   │   └── styles/               # Global styles & Tailwind config
│   │
│   ├── core/                     # ⚙️  Express.js Backend API
│   │   ├── src/
│   │   │   ├── controllers/      # Route handler logic
│   │   │   ├── routes/           # API route definitions
│   │   │   ├── services/         # Business logic layer
│   │   │   ├── middlewares/      # Auth, validation, error handling
│   │   │   ├── models/           # Prisma models & DB schemas
│   │   │   ├── integrations/     # Social platform API clients
│   │   │   │   ├── twitter/
│   │   │   │   ├── instagram/
│   │   │   │   └── linkedin/
│   │   │   ├── utils/            # Shared utilities
│   │   │   └── config/           # App configuration
│   │   └── prisma/               # Database schema & migrations
│   │
│   └── queueEngine/              # 🔁  BullMQ Scheduling Engine
│       ├── src/
│       │   ├── queues/           # Queue definitions
│       │   ├── workers/          # Job processor workers
│       │   │   ├── post.worker.ts
│       │   │   └── retry.worker.ts
│       │   ├── handlers/         # Platform handlers and processors
│       │   ├── lib/              # Utilities and helpers
│       │   └── config/           # App configuration
│
├── packages/
│   ├── shared/                   # Shared types, constants, utils
│   ├── errors/                   # Shared error handling utilities
│   ├── eslint-config/            # Shared ESLint configs
│   ├── typescript-config/        # Shared TypeScript configs
│   └── ui/                       # Reusable UI components
│
├── infra/
│   └── db/                      # Prisma database layer
├── docker-compose.yml            # Local dev services
├── turbo.json                    # Turborepo pipeline config
├── pnpm-workspace.yaml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 18.x`
- **pnpm** `>= 8.x` — `npm install -g pnpm`
- **Docker** (for Redis locally)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/queuenow.git
cd queuenow
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Local Services (Redis)

```bash
docker-compose up -d
```

### 4. Set Up Environment Variables

```bash
# Copy example env files for each app
cp apps/surface/.env.example apps/surface/.env.local
cp apps/core/.env.example apps/core/.env
cp apps/queueEngine/.env.example apps/queueEngine/.env
```

> Fill in the required values — see [Environment Variables](#-environment-variables) section.

### 5. Set Up the Database

```bash
pnpm --filter @infra/db prisma:migrate
pnpm --filter @infra/db prisma:generate
```

### 6. Run the Development Servers

```bash
# Start all three apps simultaneously with Turborepo
pnpm dev
```

| App | URL |
|---|---|
| 🖥️ Surface (Frontend) | http://localhost:3000 |
| ⚙️ Core (API) | http://localhost:5000 |

> 🔁 `queueEngine` runs as a background worker process and does not expose a browser UI by default.

---

## 🔐 Environment Variables

### `apps/surface/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### `apps/core/.env`

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=postgresql://postgres:password@localhost:5432/queuenow

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=your_linkedin_redirect_uri
LINKEDIN_STATE=your_linkedin_state
```

### `apps/queueEngine/.env`

```env
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_USERNAME=your_redis_username
REDIS_PASSWORD=your_redis_password
REDIS_USE_TLS=false
DATABASE_URL=postgres://user:pass@host:5432/db
```

> ⚠️ **Never commit `.env` files.** They are `.gitignore`d by default.

---

## 🌐 API Overview

Base URL: `http://localhost:5000/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create a new account |
| `POST` | `/auth/login` | Login and get JWT token |
| `GET` | `/posts` | List all scheduled posts |
| `POST` | `/posts` | Create and schedule a post |
| `PATCH` | `/posts/:id` | Update a scheduled post |
| `DELETE` | `/posts/:id` | Cancel a scheduled post |
| `GET` | `/analytics/overview` | Get analytics summary |
| `GET` | `/platforms` | List connected platforms |
| `POST` | `/platforms/:name/connect` | OAuth connect a platform |
| `DELETE` | `/platforms/:name/disconnect` | Disconnect a platform |

Full API documentation available at `/api/docs` (Swagger UI) when running locally.

---

## 🛣️ Roadmap

### ✅ Done
- [x] Core scheduling engine (Redis + BullMQ)
- [x] LinkedIn integration
- [x] Visual content calendar
- [x] Post creation & bulk CSV upload
- [x] JWT-based authentication
- [x] Auto-retry on failed posts
- [x] Basic post analytics

### 🔄 In Progress
- [ ] Twitter/X integration
- [ ] Instagram integration
- [ ] Facebook integration
- [ ] TikTok & Pinterest integration
- [ ] AI caption suggestions
- [ ] Best-time-to-post recommendations
- [ ] Team collaboration & roles

### 🗓️ Planned
- [ ] YouTube Shorts scheduling
- [ ] Threads support
- [ ] Mobile app (React Native)
- [ ] Zapier & Make integration
- [ ] White-label / agency mode
- [ ] AI image generation for posts
- [ ] Link-in-bio page builder
- [ ] Browser extension for quick scheduling

---

## 🤝 Contributing

Contributions are what make QueueNow better — and they're very welcome!

Whether you're fixing a bug, improving docs, adding a new platform integration, or suggesting a feature — we'd love your help. Please read our full **[Contributing Guide →](CONTRIBUTING.md)** before getting started. It covers everything: forking the repo, setting up your local environment, branch naming, commit conventions, and opening a PR.

> Quick start: `fork → clone → pnpm install → pnpm dev` — detailed steps in [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

```
MIT License — Copyright (c) 2024 QueueNow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software...
```

---

## 💬 Community & Support

| Channel | Link |
|---|---|
| 📖 Documentation | [docs.queuenow.app](#) |
| 💬 Discord Server | [Join Community](#) |
| 🐦 Twitter/X | [@QueueNowApp](#) |
| 📧 Email Support | support@queuenow.app |
| 🐛 Bug Reports | [GitHub Issues](../../issues) |
| 💡 Feature Requests | [GitHub Discussions](../../discussions) |

---

## 🙌 Acknowledgements

QueueNow is built on the shoulders of giants. Huge thanks to:

- [Next.js](https://nextjs.org/) — The React framework for production
- [Turborepo](https://turbo.build/) — Blazing fast monorepo tooling
- [BullMQ](https://docs.bullmq.io/) — The most reliable Node.js queue library
- [Zustand](https://zustand-demo.pmnd.rs/) — Bear necessities for state management
- [Tailwind CSS](https://tailwindcss.com/) — Rapid, beautiful UI development
- [Prisma](https://www.prisma.io/) — Next-generation ORM for TypeScript
- Every open-source contributor who makes tools like these possible 💙

---

<div align="center">

Built with ❤️ for every creator who deserves to post smarter, not harder.

**[⭐ Star QueueNow on GitHub](#)** — it means the world to us!

<br />

*QueueNow — Schedule Once. Publish Everywhere. Grow Consistently.*

</div>