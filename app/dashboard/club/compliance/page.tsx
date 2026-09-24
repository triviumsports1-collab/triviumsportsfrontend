import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { VisaTimeline } from "@/components/saas/visa-timeline";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import { CLUB_ROLES } from "@/lib/auth/roles";
import type { Organization, VisaSnapshot } from "@/lib/api/types";

type ClubVisa = {
  userId: string;
  shareWithClubs: boolean;
  disclaimer: string;
  currentStatus?: VisaSnapshot["currentStatus"];
  targetPathway?: VisaSnapshot["targetPathway"];
  workAuthorizedNow?: boolean;
  statusExpiresOn?: string | null;
  eadExpiresOn?: string | null;
};

export default async function ClubCompliancePage({
  searchParams,
}: {
  searchParams: Promise<{ coachUserId?: string }>;
}) {
  await requireRoles(CLUB_ROLES);
  const { coachUserId } = await searchParams;
  const orgsRes = await springFetch("/api/v1/organizations");
  const orgs = orgsRes.ok ? await readJson<Organization[]>(orgsRes) : [];
  const org = orgs[0];
  const snapshot =
    org && coachUserId
      ? await (async () => {
          const response = await springFetch(
            `/api/v1/organizations/${org.id}/coaches/${coachUserId}/visa-snapshot`,
          );
          return response.ok ? readJson<ClubVisa>(response) : null;
        })()
      : null;
  return (
    <DashboardPage title="Coach authorization flags">
      <p className="text-sm text-ink-muted">
        Clubs only see flags a coach has chosen to share. Notes and passport details stay private.
      </p>
      {!org ? <EmptyState title="No club" body="Authorization flags need a club profile." /> : null}
      {org ? (
        <form className="flex flex-wrap gap-2" action="/dashboard/club/compliance">
          <label className="text-sm font-medium">
            Coach user id
            <input
              name="coachUserId"
              defaultValue={coachUserId ?? ""}
              className="mt-1 min-h-11 min-w-72 rounded-xl border border-line px-3"
            />
          </label>
          <button type="submit" className="mt-6 min-h-11 rounded-full bg-brand px-5 font-semibold text-ink">
            View flags
          </button>
        </form>
      ) : null}
      {coachUserId && !snapshot ? (
        <EmptyState title="Not available" body="This coach has not shared a timeline with the club, or is not placed here." />
      ) : null}
      {snapshot && snapshot.shareWithClubs === false ? (
        <EmptyState title="Not shared" body="This coach has not enabled club visibility on their work-authorization flags." />
      ) : null}
      {snapshot && snapshot.shareWithClubs ? (
        <div className="rounded-2xl border border-line bg-white p-4">
          <p className="text-sm text-ink-muted">{snapshot.disclaimer}</p>
          <p className="mt-3 text-sm">
            Status {snapshot.currentStatus ?? "—"} · Target {snapshot.targetPathway ?? "—"} · Authorized now{" "}
            {snapshot.workAuthorizedNow ? "yes" : "no"}
          </p>
          <div className="mt-4">
            <VisaTimeline
              snapshot={{
                userId: snapshot.userId,
                currentStatus: snapshot.currentStatus ?? null,
                targetPathway: snapshot.targetPathway ?? null,
                workAuthorizedNow: snapshot.workAuthorizedNow ?? false,
                counselEngaged: false,
                shareWithClubs: true,
                statusStartsOn: null,
                statusExpiresOn: snapshot.statusExpiresOn ?? null,
                eadExpiresOn: snapshot.eadExpiresOn ?? null,
                passportExpiresOn: null,
                petitionStage: null,
                notes: null,
                disclaimer: snapshot.disclaimer,
              }}
            />
          </div>
        </div>
      ) : null}
    </DashboardPage>
  );
}
