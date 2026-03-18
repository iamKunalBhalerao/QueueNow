const isProduction = process.env.NODE_ENV === "production";

export const httpOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  path: "/",
};
