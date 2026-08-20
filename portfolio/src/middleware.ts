import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  // NextAuth stores cookies securely in prod, or normally in dev
  const isAuthenticated = !!(
    cookies.get("authjs.session-token") || 
    cookies.get("__Secure-authjs.session-token") || 
    cookies.get("next-auth.session-token") || 
    cookies.get("__Secure-next-auth.session-token")
  );
  
  // Allow access to login page
  if (nextUrl.pathname.startsWith("/admin/login")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (nextUrl.pathname.startsWith("/admin") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
