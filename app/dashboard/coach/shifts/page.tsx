import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { Shift } from "@/lib/api/types";

export default async function CoachShiftsPage() {
  await requireRoles(["COACH"]);
  const response = await springFetch("/api/v1/me/shifts");
  const shifts = response.ok ? await readJson<Shift[]>(response) : [];
  return (
    <DashboardPage title="Shifts">
      {shifts.length === 0 ? (
        <EmptyState title="No shifts assigned" body="Your club will post court times here." />
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
          {shifts.map((shift) => (
            <li key={shift.id} className="px-4 py-3">
              <p className="font-medium">{shift.location ?? "Court"} · {shift.status}</p>
              <p className="text-sm text-ink-muted">
                {new Date(shift.startsAt).toLocaleString()} – {new Date(shift.endsAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </DashboardPage>
  );
}
