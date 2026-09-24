import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { parseProblem } from "@/lib/api/problem";
import type { AuthSessionBody } from "@/lib/api/types";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  accessCookieOptions,
  cookieSecureFromUrl,
  refreshCookieOptions,
} from "@/lib/auth/cookies";

function ttlSeconds(expiresIn: unknown): number {
  const value = typeof expiresIn === "number" && Number.isFinite(expiresIn) ? expiresIn : 900;
  return Math.max(60, value);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const response = await fetch(`${process.env.API_BASE_URL ?? "http://127.0.0.1:8080"}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: body.email, password: body.password }),
    cache: "no-store",
  });
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    return NextResponse.json(parseProblem(payload) ?? { detail: "Sign-in failed", status: response.status }, {
      status: response.status,
    });
  }
  const session = payload as AuthSessionBody;
  const secure = cookieSecureFromUrl(request.url);
  const accessOpts = accessCookieOptions(ttlSeconds(session.expiresIn), secure);
  const refreshOpts = refreshCookieOptions(secure);
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, session.accessToken, accessOpts);
  jar.set(REFRESH_COOKIE, session.refreshToken, refreshOpts);
  const result = NextResponse.json({ role: session.role, publicId: session.publicId });
  result.cookies.set(ACCESS_COOKIE, session.accessToken, accessOpts);
  result.cookies.set(REFRESH_COOKIE, session.refreshToken, refreshOpts);
  result.headers.set("Cache-Control", "no-store");
  return result;
}
