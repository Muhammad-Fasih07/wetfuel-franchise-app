import { NextResponse } from "next/server";

// TODO: re-enable next-auth route protection once real auth wiring is done.
// For now (UI build phase) the middleware is a passthrough so all pages
// — login, forgot-password, and the full dashboard — are reachable
// without a real session token.
export default function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff|woff2|ttf|otf)$).*)",
  ],
};
