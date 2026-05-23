# Core — Express.js Backend API

The central API server for QueueNow. Handles authentication, business logic, platform integrations, and database operations.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Server runs on http://localhost:5000
```

## 📁 Project Structure

- `controllers/` — Route handler logic
- `services/` — Business logic and platform operations
- `middlewares/` — Authentication, validation, error handling
- `routes/` — API route definitions
- `config/` — Environment and app configuration
- `helpers/` — Utility functions

## 🔧 Environment Variables

Create `.env`:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=postgresql://user:pass@localhost:5432/queuenow
LINKEDIN_CLIENT_ID=your_id
LINKEDIN_CLIENT_SECRET=your_secret
LINKEDIN_REDIRECT_URI=your_redirect_uri
LINKEDIN_STATE=your_state
```

## 📦 Available Scripts

```bash
pnpm dev         # Start dev server with tsx watch
pnpm build       # Compile TypeScript
pnpm start       # Run compiled code
pnpm lint        # Run ESLint
pnpm check-types # Type check
```

## 🔑 Key Features

- JWT-based authentication
- OAuth 2.0 integration with LinkedIn
- RESTful API design
- Zod validation for all inputs
- Layered architecture (routes → controllers → services)

## 🗄️ Database

- Uses Prisma ORM via `@infra/db`
- PostgreSQL database
- Run migrations from workspace root: `pnpm --filter @infra/db prisma:migrate`

## 📝 Notes

- All route handlers are wrapped in error middleware
- No raw database errors exposed to clients
- Strict TypeScript mode enabled
