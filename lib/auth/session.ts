import { cookies } from "next/headers";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  accessCookieOptions,
  cookieSecureFromUrl,
  refreshCookieOptions,
} from "@/lib/auth/cookies";

export async function readAccessToken(): Promise<string | undefined> {
  const jar = await cookies();
  return normalizeAccessToken(jar.get(ACCESS_COOKIE)?.value);
}

export function normalizeAccessToken(raw: string | undefined): string | undefined {
  if (!raw) {
    return undefined;
  }
  let token = raw.trim();
  if (token.length >= 2 && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1).trim();
  }
  if (token.includes("%")) {
    try {
      token = decodeURIComponent(token).trim();
    } catch {
      // keep the compact JWT if the cookie was not percent-encoded
    }
  }
  if (token.toLowerCase().startsWith("bearer ")) {
    token = token.slice(7).trim();
  }
  return token || undefined;
}

export async function readRefreshToken(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(REFRESH_COOKIE)?.value;
}

export async function writeSession(accessToken: string, refreshToken: string, expiresIn: number, requestUrl?: string) {
  const secure = cookieSecureFromUrl(requestUrl ?? "http://127.0.0.1");
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, accessToken, accessCookieOptions(expiresIn, secure));
  jar.set(REFRESH_COOKIE, refreshToken, refreshCookieOptions(secure));
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(ACCESS_COOKIE);
  jar.delete(REFRESH_COOKIE);
}
