import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/settings",
];
const AUTH_ROUTES = ["/auth/signin", "/auth/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.pathname = "/auth/signin";
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
