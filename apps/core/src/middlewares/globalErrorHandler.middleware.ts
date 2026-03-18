import type { NextFunction, Request, Response } from "express";
import { CoreError } from "@repo/errors";

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CoreError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Debug line - baad mein remove kar dena
  console.log("Error type:", err.constructor.name);
  console.log(err);
  console.log("Is CoreError:", err instanceof CoreError);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error! ",
  });
};
