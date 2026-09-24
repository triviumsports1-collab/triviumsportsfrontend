import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { GenerateInvoiceButton } from "@/components/saas/generate-invoice-button";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import { CLUB_ROLES } from "@/lib/auth/roles";
import type { Invoice, Organization } from "@/lib/api/types";

export default async function ClubInvoicesPage() {
  await requireRoles(CLUB_ROLES);
  const orgsRes = await springFetch("/api/v1/organizations");
  const orgs = orgsRes.ok ? await readJson<Organization[]>(orgsRes) : [];
  const org = orgs[0];
  if (!org) {
    return (
      <DashboardPage title="Invoices">
        <EmptyState title="No club" body="Invoices appear for your club profile." />
      </DashboardPage>
    );
  }
  const response = await springFetch(`/api/v1/organizations/${org.id}/invoices`);
  const invoices = response.ok ? await readJson<Invoice[]>(response) : [];
  return (
    <DashboardPage title="Invoices">
      <GenerateInvoiceButton organizationId={org.id} />
      {invoices.length === 0 ? (
        <EmptyState title="No invoices yet" body="Create one from approved hours when the period closes." />
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
          {invoices.map((invoice) => (
            <li key={invoice.id} className="flex justify-between px-4 py-3 text-sm">
              <span>
                {invoice.periodStart} → {invoice.periodEnd} · {invoice.status}
              </span>
              <span className="tabular-nums font-medium">
                {(invoice.totalCents / 100).toFixed(2)} {invoice.currency}
              </span>
            </li>
          ))}
        </ul>
      )}
    </DashboardPage>
  );
}
