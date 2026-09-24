import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { ShiftForm } from "@/components/saas/shift-form";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import { CLUB_ROLES } from "@/lib/auth/roles";
import type { Organization, Shift } from "@/lib/api/types";

export default async function ClubShiftsPage() {
  const me = await requireRoles(CLUB_ROLES);
  const canAssign = me.role === "EMPLOYER" || me.role === "CLUB_DIRECTOR";
  const orgsRes = await springFetch("/api/v1/organizations");
  const orgs = orgsRes.ok ? await readJson<Organization[]>(orgsRes) : [];
  const org = orgs[0];
  if (!org) {
    return (
      <DashboardPage title="Shifts">
        <EmptyState title="No club" body="Assign courts after a club profile exists." />
      </DashboardPage>
    );
  }
  const response = await springFetch(`/api/v1/organizations/${org.id}/shifts`);
  const shifts = response.ok ? await readJson<Shift[]>(response) : [];
  return (
    <DashboardPage title="Shifts">
      {canAssign ? <ShiftForm organizationId={org.id} /> : null}
      {shifts.length === 0 ? (
        <EmptyState title="No shifts" body="Assign a coach to a court time above." />
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
          {shifts.map((shift) => (
            <li key={shift.id} className="px-4 py-3 text-sm">
              <p className="font-medium">{shift.status} · {shift.location ?? "Court"}</p>
              <p className="text-ink-muted">
                {new Date(shift.startsAt).toLocaleString()} – {new Date(shift.endsAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </DashboardPage>
  );
}
