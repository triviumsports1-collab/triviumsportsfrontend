import Link from "next/link";
import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { OpsJobTable } from "@/components/saas/ops-job-table";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { JobPosting, Organization, PageResponse } from "@/lib/api/types";
import { OPS_ROLES } from "@/lib/auth/roles";

export default async function OpsJobsPage() {
  await requireRoles(OPS_ROLES);
  const [orgsRes, jobsRes] = await Promise.all([
    springFetch("/api/v1/organizations"),
    springFetch("/api/v1/ops/jobs?size=50"),
  ]);
  const orgs = await readJson<Organization[]>(orgsRes);
  const jobsPage = await readJson<PageResponse<JobPosting>>(jobsRes);
  return (
    <DashboardPage title="Job management">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          {jobsPage.totalElements} listing{jobsPage.totalElements === 1 ? "" : "s"} across all clubs.
        </p>
        <Link
          href="/dashboard/ops/jobs/new"
          className="inline-flex min-h-11 items-center rounded-full bg-brand px-4 text-sm font-semibold text-ink"
        >
          Create job
        </Link>
      </div>
      {jobsPage.content.length === 0 ? (
        <EmptyState title="No jobs yet" body="Create a listing, choose the club, and publish it when it should appear on /jobs." />
      ) : (
        <OpsJobTable jobs={jobsPage.content} organizations={orgs} />
      )}
    </DashboardPage>
  );
}
