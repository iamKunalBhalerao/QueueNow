import { Job, Worker } from "bullmq";
import { QUEUE_NAME } from "../config/app.config";
import connection from "./redis";
import { PostStatus, prisma } from "@infra/db";
import { platformHandlers } from "../handlers/main.handler";

export default function startWorker() {
  // console.log(
  //   `[Worker] Starting background worker for queue: ${QUEUE_NAME}...`,
  // );

  const worker = new Worker(
    QUEUE_NAME,
    async (job: Job) => {
      const postId = job.id;

      if (!postId) {
        throw new Error("Job is missing a valid ID (postId).");
      }

      // console.log(`[Worker] Processing job for post ${postId}`);

      // 1. Fetch post
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { user: true },
      });

      if (!post) {
        // console.warn(
        //   `[Worker] Post ${postId} not found in database. Skipping.`,
        // );
        return; // Complete silently if it doesn't exist anymore
      }

      // If it's already published or failed, skip it (prevent double execution)
      if (
        post.status !== PostStatus.SCHEDULED &&
        post.status !== PostStatus.DRAFT
      ) {
        // console.log(
        //   `[Worker] Post ${postId} is in status ${post.status}. Skipping.`,
        // );
        return;
      }

      // Get correct handler for platform
      const platformHandler =
        platformHandlers[
          post.platform as unknown as keyof typeof platformHandlers
        ];

      if (!platformHandler) {
        throw new Error(`Unsupported platform: ${post.platform}`);
      }

      // console.log("platform handler is ", platformHandler);

      // fetch user's social account
      const socialAccount = await prisma.socialAccount.findFirst({
        where: {
          userId: post.userId,
          platform: post.platform,
        },
      });

      if (!socialAccount) {
        throw new Error(
          `No connected ${post.platform} account found for user ${post.userId}`,
        );
      }

      try {
        // Call the strategy pattern handler
        const result = await platformHandler(
          post.id,
          // post.userId,
          socialAccount.id,
        );

        if (result.success) {
          // Mark PUBLISHED on success
          await prisma.post.update({
            where: { id: post.id },
            data: {
              status: PostStatus.PUBLISHED,
              publishedAt: new Date(),
              error: null,
            },
          });
          // console.log(`[Worker] Successfully published post ${post.id}`);
        } else {
          throw new Error(
            result.error || "Unknown error occurred during posting",
          );
        }
      } catch (error: any) {
        // console.error(
        //   `[Worker] Failed to publish post ${post.id}:`,
        //   error.message,
        // );

        await prisma.post.update({
          where: { id: post.id },
          data: {
            status: PostStatus.FAILED,
            error: error.message,
          },
        });

        throw error;
      }
    },
    {
      connection,
      concurrency: 5, // Process up to 5 posts simultaneously
    },
  );

  // worker.on("failed", (job, err) => {
  //   console.error(
  //     `[Worker] Job ${job?.id} has failed with error: ${err.message}`,
  //   );
  // });

  // worker.on("completed", (job) => {
  //   console.log(`[Worker] Job ${job.id} has completed successfully`);
  // });

  return worker;
}
