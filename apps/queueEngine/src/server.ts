import "dotenv/config";
import redisConnection from "./lib/redis";
import { startWorker } from "./worker";
import { startPoller } from "./poller";

const bootstrap = async () => {
  console.log("Starting QueueEngine Background Services...");

  // Start the background worker process
  const worker = startWorker();

  // Start the background database poller
  const cleanupPoller = startPoller();

  // Setup graceful shutdown
  const shutdown = async () => {
    console.log("Shutting down QueueEngine...");
    cleanupPoller();
    await worker.close();
    await redisConnection.quit();
    console.log("Graceful shutdown complete.");
    process.exit(0);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
};

bootstrap().catch((err) => {
  console.error("Critical error in QueueEngine bootstrap:", err);
  process.exit(1);
});
