import { prisma } from "@infra/db";

export const findAllPosts = async (userId: string) => {
  return await prisma.post.findMany({
    where: { userId: userId },
    select: {
      id: true,
      platform: true,
      status: true,
      createdAt: true,
      linkedInPost: {
        select: {
          id: true,
          postId: true,
          content: true,
          media: true,
          url: true,
        },
      },
    },
  });
};
