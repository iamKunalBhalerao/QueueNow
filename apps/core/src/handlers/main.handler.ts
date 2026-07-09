import { handleLinkedInPost } from "./linkedin.handler";
import { handleTwitterPost } from "./twitter.handler";

export type Platform = "LINKEDIN" | "TWITTER";

export const platformHandlers: Record<
  Platform,
  (
    postId: string,
    // userId: string,
    platformAccountId: string,
  ) => Promise<{
    success: boolean;
    externalId?: string;
    url?: string | null;
    error?: string;
  }>
> = {
  LINKEDIN: handleLinkedInPost,
  TWITTER: handleTwitterPost,
};