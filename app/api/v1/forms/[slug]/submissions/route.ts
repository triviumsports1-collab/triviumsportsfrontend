/**
 * Public form submission proxy — POST /api/v1/forms/[slug]/submissions
 *
 * ## Why this Route Handler exists (belt-and-suspenders approach)
 *
 * Next.js rewrites in next.config.ts are transparent HTTP proxies: they forward
 * the browser's Origin header verbatim to Spring.  If the site runs at
 * https://www.triviumsports.com but CORS_ALLOWED_ORIGINS only lists
 * https://triviumsports.com, Spring's CORS filter returns 403 Forbidden for
 * every rewrite-proxied POST — even though the endpoint is marked permitAll()
 * in SecurityConfig.
 *
 * By handling this path as a Route Handler (which has higher priority than
 * rewrites in Next.js), the request to Spring becomes a server-to-server fetch
 * with NO Origin header.  Spring's CORS filter does not fire, so the request
 * succeeds regardless of the CORS_ALLOWED_ORIGINS value.
 *
 * The primary fix is in CorsConfig.java (setAllowedOriginPatterns) and the
 * CORS_ALLOWED_ORIGINS env var must still include both www and non-www for the
 * remaining rewrite-proxied endpoints (GET /api/v1/jobs, etc.).
 *
 * ## Security
 * No authentication is required — coach, player, and club intake forms are public.
 * The Spring endpoint validates the payload and stores it encrypted (AES-256-GCM).
 */
import { NextRequest, NextResponse } from "next/server";
import { resolveSpringBase } from "@/lib/api/spring-base";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // Parse the request body; return 400 on malformed JSON.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        title: "Bad Request",
        detail: "Request body must be valid JSON.",
        status: 400,
        type: "https://triviumsports.example/problems/bad-request",
      },
      { status: 400 },
    );
  }

  // Forward the submission to Spring server-to-server.
  // No Origin header is included, so CORS is never triggered on the Spring side.
  const upstream = await fetch(
    `${resolveSpringBase()}/api/v1/forms/${encodeURIComponent(slug)}/submissions`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  const payload: unknown = await upstream.json().catch(() => null);

  const response = NextResponse.json(payload, { status: upstream.status });

  // Pass through the Location header on 201 Created so callers can optionally
  // follow the resource URL (even though the public intake form does not use it).
  const location = upstream.headers.get("Location");
  if (location) {
    response.headers.set("Location", location);
  }

  return response;
}
