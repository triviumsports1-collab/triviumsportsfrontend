import { CreateJobForm } from "@/components/saas/create-job-form";
import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { Organization } from "@/lib/api/types";
import { OPS_ROLES } from "@/lib/auth/roles";

export default async function NewOpsJobPage() {
  await requireRoles(OPS_ROLES);
  const orgsRes = await springFetch("/api/v1/organizations");
  const organizations = await readJson<Organization[]>(orgsRes);
  return (
    <DashboardPage title="Create job">
      <p className="text-sm text-ink-muted">
        Assign the listing to a club. Publishing makes it visible on the public tennis job pages.
      </p>
      {organizations.length === 0 ? (
        <EmptyState title="No clubs yet" body="A club profile is required before ops can post a job." />
      ) : (
        <CreateJobForm organizations={organizations} />
      )}
    </DashboardPage>
  );
}
