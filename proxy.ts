import { NextResponse, type NextRequest } from "next/server";
import { resolveSchoolIdFromHostname } from "@/lib/tenant-host";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin & health routes are not tenant-page-blocked by hostname
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin") || pathname === "/api/health") {
    return NextResponse.next();
  }

  const host = request.headers.get("host");
  const schoolId = resolveSchoolIdFromHostname(host);

  if (!schoolId) {
    return new NextResponse("Unknown school domain", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and Next.js internals.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|avif|jfif|svg|pdf|mp4|css|js|ico)$).*)",
  ],
};
