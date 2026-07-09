export const redisConfig = {
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT!),
  username: process.env.REDIS_USERNAME! || "default",
  password: process.env.REDIS_PASSWORD!,

  ...(process.env.REDIS_USE_TLS === "true" && {
    tls: {
      rejectUnauthorized: false,
      servername: process.env.REDIS_HOST!,
    },
    ssl: true,
  }),

  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  enableOfflineQueue: true,
  lazyConnect: false,

  // Reconnection

  retryStrategy(times: number): number | null {
    if (times > 10) {
      console.log("[Redis] Too many retries, giving up.");
      return null;
    }
    return Math.min(times * 500, 2000);
  },
};
