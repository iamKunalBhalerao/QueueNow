import { Worker, Job } from 'bullmq';
import { prisma, PostStatus, Platform } from '@infra/db';
import connection from './lib/redis';
import { QUEUE_NAME } from './lib/queue';
import { platformHandlers } from './handlers';

export const startWorker = () => {
  console.log(`[Worker] Starting background worker for queue: ${QUEUE_NAME}...`);

  const worker = new Worker(
    QUEUE_NAME,
    async (job: Job) => {
      // Job.id is the postId as configured in the poller
      const postId = job.id;
      
      if (!postId) {
        throw new Error('Job is missing a valid ID (postId).');
      }

      console.log(`[Worker] Processing job for post ${postId}`);

      // 1. Fetch the post from database to verify it exists and is still SCHEDULED
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { user: true },
      });

      if (!post) {
        console.warn(`[Worker] Post ${postId} not found in database. Skipping.`);
        return; // Complete silently if it doesn't exist anymore
      }

      // If it's already published or failed, we just skip it (prevent double execution)
      if (post.status !== PostStatus.SCHEDULED && post.status !== PostStatus.DRAFT) {
        console.log(`[Worker] Post ${postId} is in status ${post.status}. Skipping.`);
        return;
      }

      // Get the correct handler for the platform
      const platformHandler = platformHandlers[post.platform as Platform];
      
      if (!platformHandler) {
        throw new Error(`Unsupported platform: ${post.platform}`);
      }

      // We need to fetch the user's social account for this platform
      const socialAccount = await prisma.socialAccount.findFirst({
        where: {
          userId: post.userId,
          platform: post.platform,
        },
      });

      if (!socialAccount) {
        throw new Error(`No connected ${post.platform} account found for user ${post.userId}`);
      }

      try {
        // 2. Call the strategy pattern handler
        const result = await platformHandler(post.id, post.userId, socialAccount.id);

        if (result.success) {
          // 3. Mark as PUBLISHED on success
          await prisma.post.update({
            where: { id: post.id },
            data: {
              status: PostStatus.PUBLISHED,
              publishedAt: new Date(),
              error: null, // clear out any old errors
            },
          });
          console.log(`[Worker] Successfully published post ${post.id}`);
        } else {
          throw new Error(result.error || 'Unknown error occurred during posting');
        }
      } catch (error: any) {
        // 4. Mark as FAILED on failure
        console.error(`[Worker] Failed to publish post ${post.id}:`, error.message);
        
        await prisma.post.update({
          where: { id: post.id },
          data: {
            status: PostStatus.FAILED,
            error: error.message,
          },
        });
        
        throw error; // Rethrow to let BullMQ know the job failed
      }
    },
    {
      connection,
      concurrency: 5, // Process up to 5 posts simultaneously
    }
  );

  worker.on('failed', (job, err) => {
    console.error(`[Worker] Job ${job?.id} has failed with error: ${err.message}`);
  });

  worker.on('completed', (job) => {
    console.log(`[Worker] Job ${job.id} has completed successfully`);
  });

  return worker;
};
