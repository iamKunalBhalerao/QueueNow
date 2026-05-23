<div align="center">

<br />

# 🤝 Contributing to QueueNow

Thank you for taking the time to contribute! QueueNow is built by people who care about creators, and every contribution — big or small — makes a real difference.

*This guide will get you from zero to a working local environment and a merged pull request.*

<br />

[🐛 Report a Bug](../../issues/new?template=bug_report.md) · [✨ Request a Feature](../../issues/new?template=feature_request.md) · [💬 Ask a Question](../../discussions)

</div>

---

## 📌 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Ways to Contribute](#-ways-to-contribute)
- [Prerequisites](#-prerequisites)
- [Fork & Clone](#-fork--clone)
- [Local Setup](#-local-setup)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Project Structure (Quick Reference)](#-project-structure-quick-reference)
- [Making Changes](#-making-changes)
- [Commit Convention](#-commit-convention)
- [Submitting a Pull Request](#-submitting-a-pull-request)
- [Code Style & Standards](#-code-style--standards)
- [Need Help?](#-need-help)

---

## 📜 Code of Conduct

By contributing to QueueNow, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). We're committed to keeping this a welcoming, inclusive, and respectful community for everyone.

---

## 💡 Ways to Contribute

You don't have to write code to contribute meaningfully:

| Type | Examples |
|---|---|
| 🐛 **Bug Reports** | Found something broken? Open a detailed issue |
| ✨ **Feature Requests** | Have an idea? Share it in Discussions |
| 📝 **Documentation** | Fix typos, improve clarity, add examples |
| 🔌 **Platform Integrations** | Help add support for a new social platform |
| 🎨 **UI / UX** | Improve the interface in `apps/surface/` |
| ⚙️ **Backend** | Optimize API logic in `apps/core/` |
| 🔁 **Queue Engine** | Improve job processing in `apps/queueEngine/` |
| 🌍 **Translations** | Help translate QueueNow into more languages |
| ⭐ **Spread the Word** | Star the repo, share it, write about it |

---

## 🛠️ Prerequisites

Make sure these are installed on your machine before getting started:

| Tool | Version | Install |
|---|---|---|
| **Node.js** | `>= 18.x` | [nodejs.org](https://nodejs.org/) |
| **pnpm** | `>= 8.x` | `npm install -g pnpm` |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |
| **Docker** | Latest | [docker.com](https://www.docker.com/) |
| **Docker Compose** | Latest | Included with Docker Desktop |

Verify your setup:

```bash
node --version    # v18.x.x or higher
pnpm --version    # 8.x.x or higher
git --version     # git version 2.x.x
docker --version  # Docker version 24.x.x or higher
```

---

## 🍴 Fork & Clone

### Step 1 — Fork the Repository

Click the **Fork** button at the top right of the [QueueNow repository](../../) on GitHub. This creates your personal copy of the project under your GitHub account.

### Step 2 — Clone Your Fork

```bash
# Replace YOUR_USERNAME with your GitHub username
git clone https://github.com/YOUR_USERNAME/queuenow.git
cd queuenow
```

### Step 3 — Add the Upstream Remote

This keeps your fork in sync with the original repo:

```bash
git remote add upstream https://github.com/queuenow/queuenow.git

# Verify both remotes exist
git remote -v
# origin    https://github.com/YOUR_USERNAME/queuenow.git (fetch)
# origin    https://github.com/YOUR_USERNAME/queuenow.git (push)
# upstream  https://github.com/queuenow/queuenow.git (fetch)
# upstream  https://github.com/queuenow/queuenow.git (push)
```

---

## ⚙️ Local Setup

### Step 1 — Install Dependencies

QueueNow uses **pnpm workspaces** via Turborepo. One command installs everything across all three apps:

```bash
pnpm install
```

### Step 2 — Start Infrastructure Services

We use Docker to run **Redis** locally. Start it with:

```bash
docker-compose up -d
```

Verify it's running:

```bash
docker ps
# You should see the Redis container
```

### Step 3 — Set Up Environment Variables

Each app needs its own `.env` file. Copy the examples:

```bash
cp apps/surface/.env.example   apps/surface/.env.local
cp apps/core/.env.example      apps/core/.env
cp apps/queueEngine/.env.example  apps/queueEngine/.env
```

> See the [Environment Variables](#-environment-variables) section below for what to fill in.

### Step 4 — Set Up the Database

QueueNow requires a PostgreSQL database plus Redis for background processing. Start Redis locally first, then run Prisma migrations:

```bash
# Start Redis locally
docker-compose up -d

# Run database migrations
pnpm --filter @infra/db prisma:migrate

# Generate Prisma client
pnpm --filter @infra/db prisma:generate
```

If you prefer a local PostgreSQL container, start one separately and set `DATABASE_URL` accordingly.

---

## 🔐 Environment Variables

### `apps/surface/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

### `apps/core/.env`

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=your_linkedin_redirect_uri
LINKEDIN_STATE=your_linkedin_state
DATABASE_URL=postgres://user:pass@localhost:5432/queuenow
```

### `apps/queueEngine/.env`

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=
REDIS_PASSWORD=
REDIS_USE_TLS=false
DATABASE_URL=postgres://user:pass@localhost:5432/queuenow
```

> ⚠️ **Never commit `.env` files.** They are already in `.gitignore`. If you accidentally commit secrets, rotate them immediately.

---

## 🚀 Running the Project

### Run All Apps Together (Recommended)

Turborepo runs all three apps in parallel with a single command:

```bash
pnpm dev
```

### Run Apps Individually

```bash
# Surface — Next.js frontend
pnpm --filter surface dev

# Core — Express API
pnpm --filter core dev

# QueueEngine — BullMQ worker
pnpm --filter queueengine dev
```

### Running URLs

| App | URL | Description |
|---|---|---|
| 🖥️ **Surface** | http://localhost:3000 | Main frontend UI |
| ⚙️ **Core API** | http://localhost:5000 | Backend API |

> 🔁 `queueEngine` runs as a background worker process and does not expose a browser UI by default.

### Useful Dev Commands

```bash
# Build all apps
pnpm build

# Lint all apps
pnpm lint

# Format code with Prettier
pnpm format

# Type-check all TypeScript
pnpm check-types
```

---

## 📂 Project Structure (Quick Reference)

```
queuenow/
├── apps/
│   ├── surface/          # 🖥️  Next.js frontend (port 3000)
│   ├── core/             # ⚙️  Express.js API (port 5000)
│   └── queueEngine/      # 🔁  BullMQ background worker
├── packages/
│   ├── shared/           # Shared TypeScript types & utilities
│   ├── errors/           # Shared error handling utilities
│   ├── eslint-config/    # Shared ESLint configs
│   ├── typescript-config/# Shared TypeScript configs
│   └── ui/               # Reusable UI components
├── infra/
│   └── db/               # Prisma database layer
├── docker-compose.yml    # Local dev services (Redis)
├── turbo.json            # Turborepo pipeline config
└── pnpm-workspace.yaml
```

Where to make changes:

- **UI / pages / components** → `apps/surface/`
- **API routes / business logic** → `apps/core/src/`
- **Social platform integrations** → `apps/core/src/`
- **Job scheduling / queue processing** → `apps/queueEngine/src/`
- **Shared types across apps** → `packages/shared/`
- **Database schema** → `infra/db/prisma/schema.prisma`

---

## 🌿 Making Changes

### Step 1 — Sync Your Fork

Always start from an up-to-date `main`:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

### Step 2 — Create a Feature Branch

Branch names should be descriptive and follow this format:

```bash
# Format: type/short-description
git checkout -b feat/instagram-integration
git checkout -b fix/post-retry-not-triggering
git checkout -b docs/update-env-variable-guide
git checkout -b chore/upgrade-bullmq-version
```

| Prefix | Use for |
|---|---|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation only |
| `refactor/` | Code restructuring, no behavior change |
| `test/` | Adding or updating tests |
| `chore/` | Tooling, dependencies, config |

### Step 3 — Write Your Code

- Keep changes focused — one feature or fix per PR
- Add or update tests if your change affects logic
- Update relevant documentation if needed
- Make sure `pnpm lint` and `pnpm typecheck` pass before committing

---

## ✍️ Commit Convention

We follow the **[Conventional Commits](https://www.conventionalcommits.org/)** specification. This keeps the git history clean and enables automatic changelog generation.

### Format

```
<type>(optional scope): <short description>

[optional body]

[optional footer]
```

### Examples

```bash
# ✅ Good commits
git commit -m "feat(queueengine): add exponential backoff for failed jobs"
git commit -m "fix(core): resolve token refresh race condition"
git commit -m "docs: add LinkedIn OAuth setup instructions"
git commit -m "chore(surface): upgrade Next.js to 14.2"
git commit -m "refactor(core): extract platform service into separate modules"

# ❌ Bad commits
git commit -m "fix stuff"
git commit -m "WIP"
git commit -m "updated files"
```

### Commit Types

| Type | Description |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, whitespace (no logic change) |
| `refactor` | Code restructure without feature/fix |
| `test` | Adding or updating tests |
| `chore` | Build process, tooling, dependencies |
| `perf` | Performance improvement |
| `ci` | CI/CD configuration changes |

> **Breaking changes:** Add `!` after the type and a `BREAKING CHANGE:` footer.
> ```bash
> git commit -m "feat(core)!: restructure auth middleware" -m "BREAKING CHANGE: token format changed"
> ```

---

## 📬 Submitting a Pull Request

### Step 1 — Push Your Branch

```bash
git push origin feat/your-feature-name
```

### Step 2 — Open a Pull Request

Go to your fork on GitHub and click **"Compare & pull request"**. Target the `main` branch of the upstream repo.

### Step 3 — Fill in the PR Template

Your PR description should include:

```markdown
## What does this PR do?
<!-- A clear description of the change -->

## Why is this change needed?
<!-- Context, motivation, or link to the issue -->

Closes #[issue-number]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactor
- [ ] Other

## How to Test
<!-- Step-by-step instructions to test your change -->
1. Run `pnpm dev`
2. Navigate to ...
3. Verify that ...

## Screenshots (if UI change)
<!-- Add before/after screenshots -->

## Checklist
- [ ] My code follows the project's code style
- [ ] I've run `pnpm lint` and `pnpm typecheck` with no errors
- [ ] I've added tests for my changes (if applicable)
- [ ] I've updated documentation (if applicable)
- [ ] My commits follow the Conventional Commits format
```

### PR Review Process

1. A maintainer will review your PR within a few days
2. They may request changes — address feedback with new commits (don't force-push)
3. Once approved, your PR will be squashed and merged into `main`
4. Your contribution will appear in the next release changelog 🎉

---

## 🎨 Code Style & Standards

### TypeScript

- **Strict mode** is enabled — no `any` types without explicit justification
- Use `interface` for object shapes, `type` for unions/intersections
- Always type function parameters and return values explicitly

### React / Next.js (`surface`)

- Use **functional components** with hooks only — no class components
- Co-locate component styles with the component file
- Use Zustand stores for global state; local `useState` for component-only state
- Follow the `app/` directory conventions of Next.js App Router

### Express / TypeScript (`core`)

- Follow the layered architecture: `route → controller → service → repository`
- Use `zod` for all request body and query validation
- All async route handlers must be wrapped in error-handling middleware
- Never expose raw database errors to API responses

### BullMQ (`queueengine`)

- Each social platform should have its own dedicated worker/processor file
- Always handle job failures gracefully and log with context
- Use `job.log()` to add progress notes visible in Bull Board

### General

```bash
# Run before every commit
pnpm lint       # ESLint — zero warnings policy
pnpm typecheck  # TypeScript — must pass with no errors
pnpm format     # Prettier formatting
```

> **Tip:** Install the recommended VS Code extensions (ESLint, Prettier, Prisma) for the best DX. A `.vscode/extensions.json` is included in the repo.

---

## 🆘 Need Help?

Stuck on setup? Not sure where to start? We're here for you:

| Channel | Link |
|---|---|
| 💬 Discord | [Join the QueueNow server](#) — best for real-time help |
| 💡 GitHub Discussions | [Ask a question](../../discussions) — good for async, detailed questions |
| 🐛 GitHub Issues | [Report a bug](../../issues) — for confirmed bugs |
| 📧 Email | contribute@queuenow.app |

We especially encourage **first-time contributors**. Look for issues tagged [`good first issue`](../../issues?q=label%3A%22good+first+issue%22) — they're scoped specifically to be approachable and well-documented.

---

<div align="center">

Thank you for helping build QueueNow 💙

*Every commit, comment, and conversation makes this project better for every creator.*

[← Back to README](README.md)

</div>