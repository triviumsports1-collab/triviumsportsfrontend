import Link from "next/link";
import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { OpsPlacement, Organization } from "@/lib/api/types";
import { OPS_ROLES } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";

export default async function OpsPlacementsPage() {
  await requireRoles(OPS_ROLES);
  const [orgsRes, placementsRes] = await Promise.all([
    springFetch("/api/v1/organizations"),
    springFetch("/api/v1/placements"),
  ]);
  const orgs = await readJson<Organization[]>(orgsRes);
  const placements = await readJson<OpsPlacement[]>(placementsRes);
  const names = new Map(orgs.map((org) => [org.id, org.name]));
  return (
    <DashboardPage title="Placements" wide>
      <p className="max-w-2xl text-sm leading-6 text-ink-muted">
        Post-hire club assignments. Screening and stage changes stay on{" "}
        <Link href="/dashboard/ops/hiring" className="font-medium text-ink underline decoration-brand underline-offset-4">
          Hiring
        </Link>
        .
      </p>
      {placements.length === 0 ? (
        <EmptyState
          title="No active assignments"
          body="When a candidate is offered or hired, assign them to a club from their hiring card. Completed assignments appear here."
        />
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-line bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-canvas text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Club</th>
                <th className="px-4 py-3 font-medium">Coach</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Dates</th>
              </tr>
            </thead>
            <tbody>
              {placements.map((row) => (
                <tr key={row.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{names.get(row.organizationId) ?? "Club"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-ink-muted">{shortId(row.coachUserId)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-brand/20 px-2.5 py-1 text-xs font-semibold text-ink">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {row.startsOn ?? "—"} → {row.endsOn ?? "open"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardPage>
  );
}

function shortId(value: string): string {
  if (value.length <= 12) {
    return value;
  }
  return `${value.slice(0, 8)}…`;
}
