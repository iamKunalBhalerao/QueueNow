import "dotenv/config";
import connection from "./redis";
import startWorker from "./worker";
import { startPoller } from "./poller";

const bootUp = async () => {
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
    await connection.quit();
    console.log("Graceful shutdown complete.");
    process.exit(0);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
};

bootUp().catch((err) => {
  console.error("Error during startup:", err);
  process.exit(1);
});
