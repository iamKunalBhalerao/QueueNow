import { NextFunction, Request, Response } from "express";
import { findUserById } from "../dao/auth.dao";
import { UnauthorizedError } from "@repo/errors";
import { getAllPostsService } from "../services/user.service";

export const userProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    if (!user) throw new UnauthorizedError("User not authenticated");
    const userInfo = await findUserById(user.id);
    if (!userInfo)
      throw new UnauthorizedError("Failed to retrieve user information");

    res.status(200).json({
      success: true,
      isAuthenticated: true,
      user: {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  if (!user) throw new UnauthorizedError("User not authenticated");

  try {
    const posts = await getAllPostsService(user.id);

    res.status(200).json({
      success: true,
      totalPosts: posts.length,
      posts: posts,
    });
  } catch (error) {
    next(error);
  }
};
