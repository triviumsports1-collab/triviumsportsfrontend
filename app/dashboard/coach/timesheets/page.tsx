import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { SubmitTimesheetButton, TimesheetForm } from "@/components/saas/timesheet-form";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { Organization, Placement, Timesheet } from "@/lib/api/types";

export default async function CoachTimesheetsPage() {
  await requireRoles(["COACH"]);
  const [timesheetsRes, placementsRes, orgsRes] = await Promise.all([
    springFetch("/api/v1/me/timesheets"),
    springFetch("/api/v1/me/placements"),
    springFetch("/api/v1/organizations"),
  ]);
  const timesheets = timesheetsRes.ok ? await readJson<Timesheet[]>(timesheetsRes) : [];
  const placements = placementsRes.ok ? await readJson<Placement[]>(placementsRes) : [];
  const orgs = orgsRes.ok ? await readJson<Organization[]>(orgsRes) : [];
  const organizationId = placements[0]?.organizationId ?? orgs[0]?.id;
  return (
    <DashboardPage title="Hours">
      {organizationId ? (
        <TimesheetForm organizationId={organizationId} />
      ) : (
        <EmptyState title="No club to log hours against" body="Hours can be saved once you are placed with a club." />
      )}
      {timesheets.length === 0 ? (
        <EmptyState title="No hour entries" body="Save a draft, then submit for club review." />
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
          {timesheets.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="font-medium">
                  {row.periodStart} → {row.periodEnd}
                </p>
                <p className="text-sm text-ink-muted">
                  {row.minutesWorked} min · {row.status}
                </p>
              </div>
              <SubmitTimesheetButton timesheet={row} />
            </li>
          ))}
        </ul>
      )}
    </DashboardPage>
  );
}
