import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import { CLUB_ROLES } from "@/lib/auth/roles";
import type { Invoice, Organization, Shift, Timesheet } from "@/lib/api/types";

export default async function ClubHomePage() {
  await requireRoles(CLUB_ROLES);
  const orgsRes = await springFetch("/api/v1/organizations");
  const orgs = orgsRes.ok ? await readJson<Organization[]>(orgsRes) : [];
  const org = orgs[0];
  if (!org) {
    return (
      <DashboardPage title="Club workspace">
        <EmptyState title="No club profile yet" body="Create a club from the API or ops desk to assign courts and hours." />
      </DashboardPage>
    );
  }
  const [hoursRes, shiftRes, invoiceRes] = await Promise.all([
    springFetch(`/api/v1/organizations/${org.id}/timesheets`),
    springFetch(`/api/v1/organizations/${org.id}/shifts`),
    springFetch(`/api/v1/organizations/${org.id}/invoices`),
  ]);
  const hours = hoursRes.ok ? await readJson<Timesheet[]>(hoursRes) : [];
  const shifts = shiftRes.ok ? await readJson<Shift[]>(shiftRes) : [];
  const invoices = invoiceRes.ok ? await readJson<Invoice[]>(invoiceRes) : [];
  return (
    <DashboardPage title={`${org.name} workspace`}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card label="Hour entries" value={String(hours.length)} />
        <Card label="Shifts" value={String(shifts.length)} />
        <Card label="Invoices" value={String(invoices.length)} />
      </div>
    </DashboardPage>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <p className="text-sm text-ink-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
