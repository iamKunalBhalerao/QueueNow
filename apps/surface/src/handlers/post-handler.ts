import { PostOnLinkedIn, PostOnTwitter } from "@/lib/api";

async function postHandler(
  handler: "linkedin" | "twitter",
  data: { content: string; media: string[]; scheduledAt: Date },
) {
  try {
    if (handler === "linkedin") {
      const response = await PostOnLinkedIn(data);
      return response;
    } else if (handler === "twitter") {
      const response = await PostOnTwitter(data);
      return response;
    } else {
      throw new Error(`Unsupported platform: ${handler}`);
    }
  } catch (error) {
    console.error(`Error in postHandler for ${handler}:`, error);
    throw error;
  }
}

export default postHandler;
