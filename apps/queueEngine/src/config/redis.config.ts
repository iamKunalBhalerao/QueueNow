import {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USERNAME,
} from "./env.config";

const redisPort = Number(REDIS_PORT);

export const redisConfig = {
  host: REDIS_HOST!,
  port:
    Number.isFinite(redisPort) && redisPort >= 0 && redisPort < 65536
      ? redisPort
      : 6379,
  username: REDIS_USERNAME || "default",
  password: REDIS_PASSWORD!,

  tls: {
    rejectUnauthorized: false,
    servername: process.env.REDIS_HOST!,
  },

  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  enableOfflineQueue: false,
  lazyConnect: true,

  // Reconnection

  retryStrategy(times: number) {
    if (times > 10) {
      console.log("[Redis] Too many retries, giving up.");
    }
    return Math.min(times * 500, 2000);
  },
};

console.log(redisConfig);
