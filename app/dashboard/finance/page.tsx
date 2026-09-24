import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import { FINANCE_ROLES } from "@/lib/auth/roles";
import type { PayrollRun } from "@/lib/api/types";

export default async function FinancePage() {
  await requireRoles(FINANCE_ROLES);
  const response = await springFetch("/api/v1/payroll/runs");
  const runs = response.ok ? await readJson<PayrollRun[]>(response) : [];
  return (
    <DashboardPage title="Remittance runs">
      <p className="text-sm text-ink-muted">
        Live money movement stays off until dual-control flags and MFA are enabled on the API.
      </p>
      {runs.length === 0 ? (
        <EmptyState title="No runs yet" body="Paid club invoices create remittance rows at coach pay amounts." />
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
          {runs.map((run) => (
            <li key={run.id} className="flex justify-between px-4 py-3 text-sm">
              <span>
                {run.status} · live={String(run.liveMoneyEnabled)}
              </span>
              <span className="tabular-nums">
                {(run.totalPayCents / 100).toFixed(2)} {run.currency}
              </span>
            </li>
          ))}
        </ul>
      )}
    </DashboardPage>
  );
}
