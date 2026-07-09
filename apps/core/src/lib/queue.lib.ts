import { Queue } from "bullmq";
import connection from "../jobs/redis";
import { QUEUE_NAME } from "../config/app.config";

export const postQueue = new Queue(QUEUE_NAME, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true, // Optionally configure string to retain last N jobs e.g. { count: 100 }
    removeOnFail: false, // Keep failed jobs for inspection
  },
});
