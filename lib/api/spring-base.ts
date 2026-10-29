/**
 * Resolves the Spring Boot API base URL for **server-side** code only.
 *
 * ## Why this file exists
 * `next.config.ts` rewrites `/api/:path*` → Spring at the edge level, but
 * Next.js Route Handlers (app/api/session/…) have higher priority than
 * rewrites and therefore intercept those paths directly.  Those handlers
 * must call Spring over HTTPS themselves — they cannot rely on the rewrite.
 *
 * ## Priority chain
 * 1. `API_BASE_URL` env var  — explicit, set in Vercel Dashboard / .env
 *    Example: `API_BASE_URL=https://api.triviumsports.com`
 *
 * 2. Production auto-detect — when `NODE_ENV=production` and `API_BASE_URL`
 *    is not set, fall back to the canonical production URL so the app never
 *    silently points at localhost in production.
 *
 * 3. Local dev            — `http://127.0.0.1:8080` (Spring default port).
 *
 * ## NEVER use this in client-side code
 * This module is server-only.  Do not import it in Client Components.
 * Client-side forms use relative `/api/…` URLs which are handled by the
 * Next.js rewrite or by Route Handlers — no Spring URL is ever exposed to
 * the browser.
 */
export function resolveSpringBase(): string {
  const explicit = process.env.API_BASE_URL?.trim();
  if (explicit) {
    return explicit;
  }

  // In production (Vercel deployment) without an explicit API_BASE_URL,
  // use the canonical Spring backend domain.  This prevents a silent
  // fallback to localhost that produces a cryptic 500 error.
  if (process.env.NODE_ENV === "production") {
    return "https://api.triviumsports.com";
  }

  // Local development: Spring runs on 8080 by default.
  return "http://127.0.0.1:8080";
}
