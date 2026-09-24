import { AtsWorkspace } from "@/components/saas/ats-workspace";
import { DashboardPage } from "@/components/saas/dashboard-page";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { Organization, PipelineApplication, PipelineApplicationDetail } from "@/lib/api/types";
import { CLUB_ROLES } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";

export default async function ClubHiringPage({
  searchParams,
}: {
  searchParams: Promise<{ applicationId?: string; view?: string }>;
}) {
  await requireRoles(CLUB_ROLES);
  const defaults = await searchParams;
  const view = defaults.view === "list" ? "list" : "board";
  const [orgsRes, appsRes] = await Promise.all([
    springFetch("/api/v1/organizations"),
    springFetch("/api/v1/applications"),
  ]);
  const orgs = orgsRes.ok ? await readJson<Organization[]>(orgsRes) : [];
  const applications = appsRes.ok ? await readJson<PipelineApplication[]>(appsRes) : [];
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
        Applicants for your club tennis jobs. Update stages on your roster only — Trivium handles club assignment after hire.
      </p>
      <AtsWorkspace
        applications={applications}
        initialDetail={detail}
        organizations={orgs}
        view={view}
        selectedId={defaults.applicationId}
        path="/dashboard/club/hiring"
        showPlacement={false}
      />
    </DashboardPage>
  );
}
