import { DashboardPage } from "@/components/saas/dashboard-page";
import { DirectorySearch } from "@/components/saas/directory-search";
import { EmptyState } from "@/components/saas/empty-state";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { OpsDirectory, OpsLead, PageResponse } from "@/lib/api/types";
import { OPS_ROLES } from "@/lib/auth/roles";

export default async function OpsDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireRoles(OPS_ROLES);
  const { q } = await searchParams;
  const query = q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : "";
  const directory = await readJson<OpsDirectory>(await springFetch(`/api/v1/ops/directory${query}`));
  const playerLeads = await readJson<PageResponse<OpsLead>>(
    await springFetch("/api/v1/ops/leads?audience=PLAYER&size=50"),
  );
  const players = Array.isArray(playerLeads.content) ? playerLeads.content : [];
  return (
    <DashboardPage title="User directory">
      <p className="text-sm text-ink-muted">
        Registered coaches and clubs. Player intakes from the public form are listed below — full CRM is under Leads / Players.
      </p>
      <DirectorySearch defaultQuery={q ?? ""} />
      <h2 className="text-lg font-semibold text-ink">Coaches</h2>
      {directory.coaches.length === 0 ? (
        <EmptyState title="No coaches match" body="Try another email, or wait for a coach to register." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-canvas text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {directory.coaches.map((coach) => (
                <tr key={coach.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">{coach.email}</td>
                  <td className="px-4 py-3">{coach.status}</td>
                  <td className="px-4 py-3 tabular-nums text-ink-muted">{coach.createdAt.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h2 className="text-lg font-semibold text-ink">Clubs</h2>
      {directory.clubs.length === 0 ? (
        <EmptyState title="No clubs match" body="Create a club profile from a club account, then it appears here." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-canvas text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Club</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Verification</th>
                <th className="px-4 py-3 font-medium">Contact</th>
              </tr>
            </thead>
            <tbody>
              {directory.clubs.map((club) => (
                <tr key={club.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium">{club.name}</td>
                  <td className="px-4 py-3 text-ink-muted">
                    {[club.city, club.state].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td className="px-4 py-3">{club.verificationStatus}</td>
                  <td className="px-4 py-3">{club.contactEmail ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h2 className="text-lg font-semibold text-ink">Player intakes</h2>
      {players.length === 0 ? (
        <EmptyState title="No player intakes" body="Public player questionnaires appear here and under Players in the sidebar." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-canvas text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <a href={`/dashboard/ops/leads?audience=PLAYER&leadId=${player.id}`} className="font-medium hover:text-brand-deep">
                      {player.displayName || "Player"}
                    </a>
                  </td>
                  <td className="px-4 py-3">{player.email ?? "—"}</td>
                  <td className="px-4 py-3">{player.phone ?? "—"}</td>
                  <td className="px-4 py-3">{player.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardPage>
  );
}
