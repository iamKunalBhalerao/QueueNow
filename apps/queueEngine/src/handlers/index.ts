import { handleLinkedInPost } from "./linkedin";
import { handleTwitterPost } from "./twitter";

export type Platform = "LINKEDIN" | "TWITTER";

export const platformHandlers: Record<
  Platform,
  (
    postId: string,
    userId: string,
    platformAccountId: string,
  ) => Promise<{
    success: boolean;
    externalId?: string;
    url?: string;
    error?: string;
  }>
> = {
  LINKEDIN: handleLinkedInPost,
  TWITTER: handleTwitterPost,
};
