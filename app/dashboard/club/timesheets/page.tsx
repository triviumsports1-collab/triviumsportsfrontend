import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { TimesheetReview } from "@/components/saas/timesheet-review";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { Organization, Timesheet } from "@/lib/api/types";

export default async function ClubTimesheetsPage() {
  await requireRoles(["EMPLOYER", "CLUB_DIRECTOR"]);
  const orgsRes = await springFetch("/api/v1/organizations");
  const orgs = orgsRes.ok ? await readJson<Organization[]>(orgsRes) : [];
  const org = orgs[0];
  if (!org) {
    return (
      <DashboardPage title="Hours to review">
        <EmptyState title="No club" body="Hours appear after your club profile exists." />
      </DashboardPage>
    );
  }
  const response = await springFetch(`/api/v1/organizations/${org.id}/timesheets`);
  const rows = response.ok ? await readJson<Timesheet[]>(response) : [];
  return (
    <DashboardPage title="Hours to review">
      {rows.length === 0 ? (
        <EmptyState title="Nothing to review" body="Submitted coach hours will land here." />
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
          {rows.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="font-medium">
                  {row.periodStart} → {row.periodEnd} · {row.minutesWorked} min
                </p>
                <p className="text-sm text-ink-muted">{row.status}</p>
              </div>
              <TimesheetReview timesheet={row} />
            </li>
          ))}
        </ul>
      )}
    </DashboardPage>
  );
}
