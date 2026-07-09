import "dotenv/config";
import app from "./app";
import connection from "./jobs/redis";
import startWorker from "./jobs/worker";
import { PORT } from "./config/env.config";
import { startPoller } from "./jobs/poller";

async function bootUp() {
  console.log("Starting QueueEngine Background Services...");

  const worker = startWorker();
  const cleanupPoller = startPoller();

  const shutdown = async () => {
    console.log("Shutting down...");
    cleanupPoller();
    await worker.close();
    await connection.quit();
    console.log("Graceful shutdown complete.");
    process.exit(0);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  if (!PORT) {
    console.error("PORT is not defined");
    process.exit(1);
  }

  app.listen(PORT, (err) => {
    if (err) {
      console.error("Server startup error", err);
      process.exit(1);
    }

    console.log(`Server is running on port ${PORT}`);
  });
}

bootUp().catch((err) => {
  console.error("Error during startup:", err);
  process.exit(1);
});
