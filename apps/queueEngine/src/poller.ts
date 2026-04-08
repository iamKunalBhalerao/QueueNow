import { prisma, PostStatus } from '@infra/db';
import { postQueue } from './lib/queue';

const POLL_INTERVAL_MS = 60 * 1000; // 1 minute

export const startPoller = () => {
  console.log('[Poller] Starting background database poller...');

  let isPolling = false;

  const poll = async () => {
    if (isPolling) return; // Prevent overlapping polls
    isPolling = true;

    try {
      // Find all posts that are SCHEDULED and whose time has arrived
      const duePosts = await prisma.post.findMany({
        where: {
          status: PostStatus.SCHEDULED,
          scheduledAt: {
             // Anything scheduled up to now
            lte: new Date(),
          },
        },
      });

      if (duePosts.length > 0) {
        console.log(`[Poller] Found ${duePosts.length} posts to schedule.`);

        // Enqueue each post to BullMQ
        for (const post of duePosts) {
          await postQueue.add(
            'publish-post', // name of the job
            { platform: post.platform, userId: post.userId },
            { 
              // Using post.id as jobId guarantees that if the poller runs again
              // before the worker processes it, we don't enqueue a duplicate.
              jobId: post.id 
            }
          );
          
          console.log(`[Poller] Enqueued post ${post.id} for publishing.`);
        }
      }
    } catch (error) {
      console.error('[Poller] Error occurred while polling database:', error);
    } finally {
      isPolling = false;
    }
  };

  // Run immediately on start
  poll();

  // Schedule interval
  const interval = setInterval(poll, POLL_INTERVAL_MS);

  // Return a cleanup function
  return () => {
    clearInterval(interval);
    console.log('[Poller] Stopped poller.');
  };
};
