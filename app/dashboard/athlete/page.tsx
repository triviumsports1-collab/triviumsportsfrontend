import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { requireRoles } from "@/lib/api/server";

export default async function AthleteHomePage() {
  await requireRoles(["ATHLETE", "CANDIDATE"]);
  return (
    <DashboardPage title="Player workspace">
      <EmptyState
        title="Profile in progress"
        body="Player tools stay on this workspace. Coaching hours and club invoices live on coach and club dashboards."
      />
    </DashboardPage>
  );
}
