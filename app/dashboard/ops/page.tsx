import Link from "next/link";
import { DashboardPage } from "@/components/saas/dashboard-page";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { OpsSummary } from "@/lib/api/types";
import { OPS_ROLES } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";

export default async function OpsHomePage() {
  await requireRoles(OPS_ROLES);
  const summary = await readJson<OpsSummary>(await springFetch("/api/v1/ops/summary"));
  return (
    <DashboardPage title="Dashboard">
      <p className="text-sm text-ink-muted">
        Post roles for clubs, assign coaches, and watch work-authorization dates. This workspace is not the public site.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Active jobs" value={String(summary.activeJobs)} href="/dashboard/ops/jobs" />
        <Card label="Placements" value={String(summary.totalPlacements)} href="/dashboard/ops/hiring" />
        <Card label="Pending timesheets" value={String(summary.pendingTimesheets)} href="/dashboard/ops/hiring" />
        <Card label="New leads" value={String(summary.newLeads ?? 0)} href="/dashboard/ops/leads" />
        <Card label="Compliance alerts" value={String(summary.complianceAlerts)} href="/dashboard/ops/compliance" />
      </div>
      <p className="text-xs text-ink-muted">{summary.disclaimer}</p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/ops/jobs/new"
          className="inline-flex min-h-11 items-center rounded-full bg-brand px-4 text-sm font-semibold text-ink"
        >
          Create job
        </Link>
        <Link
          href="/dashboard/ops/hiring"
          className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium text-ink"
        >
          Assign coach
        </Link>
      </div>
    </DashboardPage>
  );
}

function Card({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-line bg-white p-4 hover:border-brand-deep">
      <p className="text-sm text-ink-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </Link>
  );
}
