import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { OpsVisaRow } from "@/lib/api/types";
import { OPS_ROLES } from "@/lib/auth/roles";

export default async function OpsCompliancePage() {
  await requireRoles(OPS_ROLES);
  const rows = await readJson<OpsVisaRow[]>(await springFetch("/api/v1/ops/visa-snapshots"));
  const disclaimer =
    rows[0]?.disclaimer ??
    "Trivium Sports is not a law firm and does not provide legal advice. Consult licensed immigration counsel.";
  return (
    <DashboardPage title="Compliance & visas">
      <p className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-muted">{disclaimer}</p>
      {rows.length === 0 ? (
        <EmptyState
          title="No timelines yet"
          body="Coaches save work-authorization dates from their dashboard. Alerts flag dates within 90 days."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-canvas text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Coach</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Authorized now</th>
                <th className="px-4 py-3 font-medium">Status expires</th>
                <th className="px-4 py-3 font-medium">EAD expires</th>
                <th className="px-4 py-3 font-medium">Alert</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.userId} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <p>{row.email || row.userId}</p>
                  </td>
                  <td className="px-4 py-3">
                    {row.currentStatus ?? "—"} → {row.targetPathway ?? "—"}
                  </td>
                  <td className="px-4 py-3">{row.workAuthorizedNow ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 tabular-nums">{row.statusExpiresOn ?? "—"}</td>
                  <td className="px-4 py-3 tabular-nums">{row.eadExpiresOn ?? "—"}</td>
                  <td className="px-4 py-3">{row.alert ? "Due within 90 days" : "On track"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardPage>
  );
}
