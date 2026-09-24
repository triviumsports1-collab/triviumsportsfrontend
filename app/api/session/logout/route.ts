import { NextResponse } from "next/server";
import { clearSession, readRefreshToken } from "@/lib/auth/session";

export async function POST() {
  const refreshToken = await readRefreshToken();
  if (refreshToken) {
    await fetch(`${process.env.API_BASE_URL ?? "http://127.0.0.1:8080"}/api/v1/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    }).catch(() => undefined);
  }
  await clearSession();
  return NextResponse.json({ ok: true });
}
