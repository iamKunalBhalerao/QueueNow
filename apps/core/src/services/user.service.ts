import { findAllPosts } from "../dao/user.dao";

export const getAllPostsService = async (userId: string) => {
  const posts = await findAllPosts(userId);

  return posts;
};
