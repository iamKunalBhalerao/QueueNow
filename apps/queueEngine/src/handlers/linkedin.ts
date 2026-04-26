import { prisma } from "@infra/db";
import axios from "axios";
import { uploadImageToLinkedIn } from "../lib/linkedin";

/**
 * Handles posting to LinkedIn
 * @param postId ID of the Post from the database
 * @param userId ID of the User
 * @param platformAccountId The ID of the SocialAccount for this platform
 * @returns Result of the posting action
 */

export async function handleLinkedInPost(
  postId: string,
  userId: string,
  platformAccountId: string,
) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { linkedInPost: true },
  });

  if (!post) {
    throw new Error(`Post with ID ${postId} not found`);
  }

  if (!post.linkedInPost) {
    throw new Error(`LinkedIn post data not found for post ${postId}`);
  }

  const socialAccount = await prisma.socialAccount.findUnique({
    where: { id: platformAccountId },
  });

  if (!socialAccount || !socialAccount.accessToken) {
    throw new Error(`LinkedIn account not found or token missing`);
  }

  // Build the LinkedIn API request payload

  // Map through your ImageKit URLs to get LinkedIn Assets
  const mediaAssets = await Promise.all(
    post.linkedInPost.media.map((url) =>
      uploadImageToLinkedIn(
        url,
        socialAccount.accessToken,
        `urn:li:person:${socialAccount.platformAccountId}`,
      ),
    ),
  );

  const shareContent: Record<string, unknown> = {
    shareCommentary: {
      text: post.linkedInPost.content,
    },
    shareMediaCategory: post.linkedInPost.media?.length ? "IMAGE" : "NONE",
  };

  // Add media if present
  if (post.linkedInPost.media?.length) {
    shareContent.media = mediaAssets.map((assetUrn) => ({
      status: "READY",
      media: assetUrn, // This is now the URN, not the URL
      title: { text: "Image Title" },
    }));
  }

  const linkedInPayload = {
    author: `urn:li:person:${socialAccount.platformAccountId}`,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": shareContent,
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  // Make Axios request to LinkedIn API to create the post
  const response = await axios.post(
    "https://api.linkedin.com/v2/ugcPosts",
    linkedInPayload,
    {
      headers: {
        Authorization: `Bearer ${socialAccount.accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    },
  );

  // Extract the LinkedIn post ID from the response
  const linkedinPostId = response.data?.id;
  const linkedInUrl = linkedinPostId
    ? `https://www.linkedin.com/feed/update/urn:li:ugc:${linkedinPostId}`
    : null;

  // Update the LinkedInPost record with the response
  await prisma.linkedInPost.update({
    where: { postId },
    data: {
      linkedinPostId,
      url: linkedInUrl,
      publishedAt: new Date(),
      rawResponse: JSON.stringify(response.data),
      error: null,
    },
  });

  // Update the main Post status to PUBLISHED
  await prisma.post.update({
    where: { id: postId },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  console.log(
    `[LinkedIn Handler] Successfully posted ${postId} for user ${userId} on account ${platformAccountId}`,
  );

  return {
    success: true,
    externalId: linkedinPostId,
    url: linkedInUrl,
  };
}
