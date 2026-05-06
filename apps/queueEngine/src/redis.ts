import Redis from "ioredis";
import { redisConfig } from "./config/redis.config";

const connection = new Redis(redisConfig);

connection.on("connect", () => {
  console.log("[Redis] Connected to Redis server.");
});

connection.on("error", (err) => {
  console.error("[Redis] Connection error:", err.message);
});

connection.on("close", () => {
  console.warn("[Redis] Connection closed.");
});

connection.on("reconnecting", (time: number) => {
  console.log(`[Redis] Attempting to reconnect in ${time}ms...`);
});

connection.on("end", () => {
  console.warn("[Redis] Connection ended.");
});

export default connection;
