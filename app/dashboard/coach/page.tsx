import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { Placement, Shift, Timesheet } from "@/lib/api/types";

export default async function CoachHomePage() {
  await requireRoles(["COACH"]);
  const [timesheetsRes, shiftsRes, placementsRes] = await Promise.all([
    springFetch("/api/v1/me/timesheets"),
    springFetch("/api/v1/me/shifts"),
    springFetch("/api/v1/me/placements"),
  ]);
  const timesheets = timesheetsRes.ok ? await readJson<Timesheet[]>(timesheetsRes) : [];
  const shifts = shiftsRes.ok ? await readJson<Shift[]>(shiftsRes) : [];
  const placements = placementsRes.ok ? await readJson<Placement[]>(placementsRes) : [];
  return (
    <DashboardPage title="Coach workspace">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Hours entries" value={String(timesheets.length)} />
        <Stat label="Upcoming shifts" value={String(shifts.filter((shift) => shift.status === "SCHEDULED").length)} />
        <Stat label="Clubs" value={String(placements.length)} />
      </div>
      {placements.length === 0 ? (
        <EmptyState title="No club assignment yet" body="When a club places you, shifts and hours will show here." />
      ) : null}
    </DashboardPage>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <p className="text-sm text-ink-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
