import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/auth/cookies";
import { jobsBoardPublic } from "@/lib/site";

function isDashboardPath(pathname: string) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

function isHeldJobsPath(pathname: string) {
  return pathname === "/jobs" || pathname.startsWith("/jobs/");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!jobsBoardPublic && isHeldJobsPath(pathname)) {
    return new NextResponse(
      `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="robots" content="noindex, nofollow"/><title>Page not found | Trivium Sports</title></head><body style="font-family:Inter,sans-serif;background:#f7f6f2;color:#12261a;margin:0"><main style="max-width:32rem;margin:0 auto;padding:5rem 1rem;text-align:center"><h1 style="font-size:1.875rem">Page not found</h1><p>That court is empty. Return home or start an intake.</p><p><a href="/">Home</a></p></main></body></html>`,
      {
        status: 404,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow",
        },
      },
    );
  }
  if (!isDashboardPath(pathname)) {
    return NextResponse.next();
  }
  const access = request.cookies.get(ACCESS_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  if (access || refresh) {
    return NextResponse.next();
  }
  const login = request.nextUrl.clone();
  login.pathname = "/login";
  login.search = "";
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/jobs", "/jobs/:path*"],
};
