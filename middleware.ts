import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  // Check if request is targeting the dedicated Admin Portal:
  // 1. Subdomain: admin.veshara.com, admin.localhost:3000
  // 2. Vercel deployment: veshara-admin.vercel.app
  // 3. Environment flag: NEXT_PUBLIC_APP_MODE === "admin"
  const isAdminDomain =
    host.startsWith("admin.") ||
    host.startsWith("veshara-admin.") ||
    process.env.NEXT_PUBLIC_APP_MODE === "admin";

  if (isAdminDomain) {
    // Avoid rewriting internal Next.js assets, API routes, or paths already starting with /admin
    if (
      !pathname.startsWith("/_next") &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/static") &&
      !pathname.includes(".")
    ) {
      if (pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.rewrite(url);
      }
      if (!pathname.startsWith("/admin")) {
        const url = request.nextUrl.clone();
        url.pathname = `/admin${pathname}`;
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, svg, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
