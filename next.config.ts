import type { NextConfig } from "next";

// Resolved at server startup — mirrors the logic in lib/api/spring-base.ts so
// that next.config rewrites and Route Handler fetch calls always agree on the
// same Spring base URL.
const springBase: string =
  process.env.API_BASE_URL?.trim() ??
  (process.env.NODE_ENV === "production"
    ? "https://api.triviumsports.com"
    : "http://127.0.0.1:8080");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

if (process.env.NODE_ENV === "production") {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  });
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  compress: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<previewHost>.*\\.vercel\\.app)" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/signin", destination: "/login", permanent: false },
      { source: "/sign-in", destination: "/login", permanent: false },
    ];
  },
  async rewrites() {
    // Rewrites run AFTER Route Handlers in the Next.js request pipeline, so
    // `/api/session/login` and `/api/session/logout` are handled by their
    // Route Handlers (app/api/session/…/route.ts) and never reach this rule.
    // All other /api/* paths (e.g. /api/v1/jobs, /api/v1/auth/refresh) are
    // proxied directly to Spring.
    return [
      {
        source: "/api/:path*",
        destination: `${springBase}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
