import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getAllPostsController,
  userProfileController,
} from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.route("/profile").get(authMiddleware, userProfileController);
userRouter.route("/all-posts").get(authMiddleware, getAllPostsController);

export default userRouter;
