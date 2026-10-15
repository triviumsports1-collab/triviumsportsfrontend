import type { MetadataRoute } from "next";
import { listAllPublishedJobSlugs } from "@/lib/jobs/public";
import { pages } from "@/lib/seo";
import { jobsBoardPublic, site } from "@/lib/site";

const priorityByPath: Record<string, number> = {
  "/": 1,
  "/coaching-after-college": 0.95,
  "/jobs": 0.92,
  "/tennis-coaching-jobs-usa": 0.9,
  "/coaches": 0.9,
  "/clubs": 0.85,
  "/players": 0.8,
  "/how-it-works": 0.75,
  "/faq": 0.7,
  "/get-started": 0.65,
  "/about": 0.6,
  "/contact": 0.6,
  "/privacy": 0.3,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-09-22");
  const marketing = Object.values(pages)
    .filter((page) => jobsBoardPublic || page.path !== "/jobs")
    .map((page) => ({
    url: page.path === "/" ? site.url : `${site.url}${page.path}`,
    lastModified,
    changeFrequency:
      page.path === "/" || page.path === "/coaching-after-college" || page.path === "/jobs" ? "weekly" : "monthly",
    priority: priorityByPath[page.path] ?? 0.5,
  })) as MetadataRoute.Sitemap;

  const jobs = jobsBoardPublic ? await listAllPublishedJobSlugs() : [];
  const jobEntries: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${site.url}/jobs/${job.slug}`,
    lastModified: job.publishedAt ? new Date(job.publishedAt) : lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...marketing, ...jobEntries];
}
