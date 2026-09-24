import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { Timesheet } from "@/lib/api/types";

export default async function CoachPayPage() {
  await requireRoles(["COACH"]);
  const response = await springFetch("/api/v1/me/timesheets");
  const rows = response.ok ? await readJson<Timesheet[]>(response) : [];
  const posted = rows.filter((row) => row.status === "APPROVED" || row.status === "LOCKED");
  return (
    <DashboardPage title="Pay statements">
      <p className="text-sm text-ink-muted">
        Approved hours become remittance lines after the club invoice is paid. Live payouts stay gated on the API.
      </p>
      {posted.length === 0 ? (
        <EmptyState title="No posted hours yet" body="Statements appear after a club approves your submitted hours." />
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
          {posted.map((row) => (
            <li key={row.id} className="flex justify-between px-4 py-3 text-sm">
              <span>
                {row.periodStart} → {row.periodEnd} · {row.status}
              </span>
              <span className="tabular-nums font-medium">{row.minutesWorked} min</span>
            </li>
          ))}
        </ul>
      )}
    </DashboardPage>
  );
}
