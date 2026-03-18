import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "@repo/errors";
import { verifyToken } from "../helper/auth.helper";

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return next(
        new UnauthorizedError("Unauthorized: No Token provided!"),
      );
    }

    const decoded = await verifyToken(token);
    req.user = decoded;

    next();
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError("Unauthorized: Token has expierd!"));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError("Forbiden: Invalid Token!"));
    }
    return next(error);
  }
};
