export const ACCESS_COOKIE = "ts_access";
export const REFRESH_COOKIE = "ts_refresh";

export function cookieSecureFromUrl(url: string): boolean {
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

export function accessCookieOptions(maxAgeSeconds: number, secure: boolean) {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: Math.max(60, maxAgeSeconds),
  };
}

export function refreshCookieOptions(secure: boolean) {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  };
}
