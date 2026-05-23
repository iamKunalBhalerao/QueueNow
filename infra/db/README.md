# @infra/db — Database Layer

Prisma ORM configuration and database schema for QueueNow. Shared database access across all applications.

## 📦 What's Included

- **Prisma schema** — Database model definitions
- **Migrations** — Version-controlled schema changes
- **Generated types** — Auto-generated Prisma Client

## 🔧 Setup

```bash
# Install dependencies
pnpm install

# Create/migrate database
pnpm prisma:migrate

# Generate Prisma Client (auto-run after install)
pnpm prisma:generate

# View database with Prisma Studio
pnpm prisma:studio
```

## 📁 Project Structure

- `prisma/schema.prisma` — Database schema definitions
- `prisma/migrations/` — Migration history
- `generated/prisma/` — Auto-generated Prisma Client
- `src/index.ts` — Prisma Client export

## 🔧 Environment Variables

Create `.env` at workspace root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/queuenow
```

## 📦 Available Scripts

```bash
pnpm prisma:migrate     # Create and apply migrations
pnpm prisma:generate    # Generate Prisma Client
pnpm prisma:studio      # Open Prisma Studio (GUI)
```

## 📊 Database Schema

Key models:
- **User** — User accounts with OAuth profiles
- **Account** — Connected social media accounts
- **Post** — Posts created and published
- **LinkedInProfile** — LinkedIn account details

## 🔄 Workflow

1. **Schema update** — Edit `prisma/schema.prisma`
2. **Create migration** — `pnpm prisma:migrate dev --name descriptive_name`
3. **Review migration** — Check generated SQL in `prisma/migrations/`
4. **Commit** — Include migration files in git

## 📝 Notes

- Prisma Client is auto-generated on install
- All apps import Prisma from this package
- Migrations are version-controlled
- PostgreSQL 12+ required
