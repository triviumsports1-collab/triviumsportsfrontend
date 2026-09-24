import { DashboardPage } from "@/components/saas/dashboard-page";
import { VisaForm } from "@/components/saas/visa-form";
import { VisaTimeline } from "@/components/saas/visa-timeline";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { VisaSnapshot } from "@/lib/api/types";

export default async function CoachCompliancePage() {
  await requireRoles(["COACH"]);
  const response = await springFetch("/api/v1/me/visa-snapshot");
  const snapshot = response.ok ? await readJson<VisaSnapshot>(response) : null;
  return (
    <DashboardPage title="Work authorization">
      <VisaTimeline snapshot={snapshot} />
      <VisaForm snapshot={snapshot} />
    </DashboardPage>
  );
}
