import "server-only";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = (request: NextRequest) => {
  const token = request.cookies.get("auth-token")?.value;

  // Verify if the user is trying to access a protected route
  const authRequiredPaths = ["/dashboard", "/admin"];
  const requiresAuth = authRequiredPaths.some((path) =>
    request.nextUrl.pathname.includes(path)
  );

  const locale = request.nextUrl.pathname.split("/")[1];

  if (requiresAuth && !token) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }

  const isAuthPage = request.nextUrl.pathname.includes("/auth");

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }
};
