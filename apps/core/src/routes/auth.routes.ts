import { Router } from "express";
import {
  logoutController,
  refreshTokenController,
  signInController,
  signUpController,
} from "../controllers/auth.controller";
import {
  linkedInCallbackController,
  linkedInSetupController,
} from "../controllers/linkedIn.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter: Router = Router();

authRouter.route("/signup").post(signUpController);
authRouter.route("/signin").post(signInController);
authRouter.route("/logout").post(logoutController);
authRouter.route("/refresh-account").post(refreshTokenController);

// LinkedIn Routes
authRouter.route("/linkedin").get(authMiddleware, linkedInSetupController);
authRouter
  .route("/linkedin/callback")
  .get(authMiddleware, linkedInCallbackController);

export default authRouter;
