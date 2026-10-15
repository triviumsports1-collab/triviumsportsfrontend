import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { jobsBoardPublic, site } from "@/lib/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";
  if (host.endsWith(".vercel.app")) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: jobsBoardPublic ? ["/", "/jobs", "/jobs/", "/organizations"] : ["/", "/organizations"],
      disallow: jobsBoardPublic
        ? ["/dashboard", "/login", "/register", "/api"]
        : ["/dashboard", "/login", "/register", "/api", "/jobs"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
