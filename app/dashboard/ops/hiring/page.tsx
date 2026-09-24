import Link from "next/link";
import { AtsWorkspace } from "@/components/saas/ats-workspace";
import { DashboardPage } from "@/components/saas/dashboard-page";
import { HiringExcelExportButton } from "@/components/saas/hiring-excel-export-button";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { Organization, PipelineApplication, PipelineApplicationDetail } from "@/lib/api/types";
import { OPS_ROLES } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";

export default async function OpsHiringPage({
  searchParams,
}: {
  searchParams: Promise<{
    applicationId?: string;
    view?: string;
    q?: string;
    stage?: string;
    jobId?: string;
    organizationId?: string;
  }>;
}) {
  await requireRoles(OPS_ROLES);
  const defaults = await searchParams;
  const view = defaults.view === "list" ? "list" : "board";
  const [orgsRes, appsRes] = await Promise.all([
    springFetch("/api/v1/organizations"),
    springFetch("/api/v1/applications"),
  ]);
  const orgs = await readJson<Organization[]>(orgsRes);
  const applications = await readJson<PipelineApplication[]>(appsRes);
  let detail: PipelineApplicationDetail | null = null;
  if (defaults.applicationId) {
    const detailRes = await springFetch(`/api/v1/applications/${defaults.applicationId}`);
    if (detailRes.ok) {
      detail = await readJson<PipelineApplicationDetail>(detailRes);
    }
  }
  return (
    <DashboardPage title="Hiring" wide>
      <p className="max-w-2xl text-sm leading-6 text-ink-muted">
        Move tennis coaches through Applied, Phone screen, Interview, Background check, Offer, Hired, and Rejected.
        After an offer or hire, assign the coach to a club from their card. Live assignments live in{" "}
        <Link href="/dashboard/ops/placements" className="font-medium text-ink underline decoration-brand underline-offset-4">
          Placements
        </Link>
        .
      </p>
      <AtsWorkspace
        applications={applications}
        initialDetail={detail}
        organizations={orgs}
        view={view}
        selectedId={defaults.applicationId}
        path="/dashboard/ops/hiring"
        showPlacement
        initialQuery={defaults.q ?? ""}
        initialStage={defaults.stage ?? ""}
        initialJobId={defaults.jobId ?? ""}
        initialOrgId={defaults.organizationId ?? ""}
        toolbar={<HiringExcelExportButton />}
      />
    </DashboardPage>
  );
}
