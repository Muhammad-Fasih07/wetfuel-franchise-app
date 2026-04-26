import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/forgot-password"];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Check for authentication token in cookies
  const authToken = request.cookies.get("auth-token");

  // If accessing a public route and already authenticated, redirect to dashboard
  if (isPublicRoute && authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If accessing a protected route without authentication, redirect to login
  if (!isPublicRoute && !authToken) {
    const loginUrl = new URL("/login", request.url);
    // Store the original URL to redirect back after login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|wetfeullogo.png|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff|woff2|ttf|otf)$).*)",
  ],
};
