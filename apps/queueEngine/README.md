# QueueEngine — BullMQ Background Worker

The scheduling and job processing engine for QueueNow. Uses Redis and BullMQ to manage background tasks like scheduled post publishing and retries.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start background worker
pnpm dev

# Worker monitors Redis queues for jobs
```

## 📁 Project Structure

- `config/` — Redis and application configuration
- `handlers/` — Platform-specific job processors (LinkedIn, Twitter, etc.)
- `lib/` — Queue definitions and utilities
- `server.ts` — Worker initialization
- `worker.ts` — BullMQ worker setup
- `redis.ts` — Redis client configuration

## 🔧 Environment Variables

Create `.env`:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=
REDIS_PASSWORD=
REDIS_USE_TLS=false
DATABASE_URL=postgresql://user:pass@localhost:5432/queuenow
```

## 📦 Available Scripts

```bash
pnpm dev         # Start worker with tsx watch
pnpm build       # Compile TypeScript
pnpm start       # Run compiled code
pnpm lint        # Run ESLint
pnpm check-types # Type check
```

## 🔄 How It Works

1. **Core API** schedules posts and creates jobs in Redis
2. **QueueEngine** polls Redis for pending jobs
3. **Handlers** process jobs based on platform (LinkedIn, Twitter, etc.)
4. **Failed jobs** are automatically retried with configurable backoff
5. **Results** are synced back to the database

## 📝 Key Features

- Fault-tolerant job processing
- Automatic retry with exponential backoff
- Platform-specific handlers
- Real-time job status tracking
- Concurrency control for rate limiting

## ⚙️ Job Types

- Post publishing to platforms
- Retrying failed posts
- Scheduled post processing
- Platform account sync

## 📝 Notes

- Uses BullMQ for job queue management
- Connects to same PostgreSQL database as Core
- Runs as a background service (no HTTP server)
