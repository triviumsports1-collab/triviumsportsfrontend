import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { ApiProblemError, isRecord, parseProblem } from "@/lib/api/problem";
import type { Me } from "@/lib/api/types";
import { isRole, type Role } from "@/lib/auth/roles";
import { homeForRole } from "@/lib/auth/roles";
import { readAccessToken } from "@/lib/auth/session";

function apiBase(): string {
  return process.env.API_BASE_URL ?? "http://127.0.0.1:8080";
}

export async function springFetch(path: string, init: RequestInit = {}): Promise<Response> {
  await connection();
  const access = await readAccessToken();
  const requestHeaders = new Headers(init.headers);
  if (!requestHeaders.has("Content-Type") && init.body) {
    requestHeaders.set("Content-Type", "application/json");
  }
  if (access) {
    requestHeaders.set("Authorization", `Bearer ${access}`);
  }
  if (!requestHeaders.has("Cookie")) {
    const cookieHeader = (await cookies())
      .getAll()
      .map((item) => `${item.name}=${item.value}`)
      .join("; ");
    if (cookieHeader) {
      requestHeaders.set("Cookie", cookieHeader);
    }
  }
  const headerRecord: Record<string, string> = {};
  requestHeaders.forEach((value, key) => {
    headerRecord[key] = value;
  });
  return fetch(`${apiBase()}${path}`, {
    ...init,
    headers: headerRecord,
    cache: "no-store",
    next: { revalidate: 0 },
  });
}

export async function readJson<T>(response: Response, options?: { redirectOn401?: boolean }): Promise<T> {
  const payload: unknown = await response.json().catch(() => null);
  if (response.status === 401 && options?.redirectOn401 !== false) {
    redirect("/login");
  }
  if (!response.ok) {
    const problem = parseProblem(payload);
    const detail =
      problem?.detail ??
      problem?.title ??
      `Could not complete the request (${response.status}).`;
    throw new ApiProblemError({ ...(problem ?? {}), detail, status: response.status }, response.status);
  }
  return payload as T;
}

export async function getMe(): Promise<Me | null> {
  const access = await readAccessToken();
  if (!access) {
    return null;
  }
  const response = await springFetch("/api/v1/me");
  if (response.status === 401) {
    return null;
  }
  if (!response.ok) {
    return null;
  }
  const payload = await readJson<Me>(response);
  if (!isRole(payload.role)) {
    return null;
  }
  return payload;
}

export async function requireMe(): Promise<Me> {
  const me = await getMe();
  if (!me) {
    redirect("/login");
  }
  return me;
}

export async function requireRoles(allowed: readonly Role[]): Promise<Me> {
  const me = await requireMe();
  if (!allowed.includes(me.role)) {
    redirect(homeForRole(me.role));
  }
  return me;
}

export function asMe(value: unknown): Me | null {
  if (!isRecord(value) || typeof value.email !== "string" || typeof value.role !== "string") {
    return null;
  }
  if (!isRole(value.role)) {
    return null;
  }
  return {
    publicId: String(value.publicId ?? ""),
    email: value.email,
    role: value.role,
    status: String(value.status ?? ""),
    emailVerified: Boolean(value.emailVerified),
    mfaRequired: Boolean(value.mfaRequired),
  };
}
