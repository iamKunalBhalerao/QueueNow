export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_USERNAME = process.env.REDIS_USERNAME;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const DATABASE_URL = process.env.DATABASE_URL;

if (!REDIS_HOST || !REDIS_PASSWORD) {
  console.error(
    "REDIS_HOST or REDIS_PASSWORD environment variable is not set. Please check your configuration.",
  );
  process.exit(1);
}

if (!DATABASE_URL) {
  console.error(
    "DATABASE_URL environment variable is not set. Please check your configuration.",
  );
  process.exit(1);
}
