import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Setup Redis connection options to ensure stability for jobs
const connection = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    // Reconnect after
    return Math.min(times * 50, 2000);
  },
});

connection.on('error', (err) => {
  console.error('[Redis error]:', err);
});

export default connection;
