import { NextResponse } from "next/server";
import { clearSession, readRefreshToken } from "@/lib/auth/session";
import { resolveSpringBase } from "@/lib/api/spring-base";

export async function POST() {
  const refreshToken = await readRefreshToken();
  if (refreshToken) {
    // Revoke the refresh token on Spring. Best-effort: we clear local cookies
    // regardless of whether the remote call succeeds.
    await fetch(`${resolveSpringBase()}/api/v1/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    }).catch(() => undefined);
  }
  await clearSession();
  return NextResponse.json({ ok: true });
}
