import { ConvertLeadButton } from "@/components/saas/convert-lead-button";
import { DashboardPage } from "@/components/saas/dashboard-page";
import { EmptyState } from "@/components/saas/empty-state";
import { LeadStatusForm } from "@/components/saas/lead-status-form";
import { parseProblem } from "@/lib/api/problem";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import type { JobPosting, OpsLead, PageResponse } from "@/lib/api/types";
import { OPS_ROLES } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const AUDIENCES = [
  { id: "", label: "All" },
  { id: "COACH", label: "Coaches" },
  { id: "CLUB", label: "Clubs" },
  { id: "PLAYER", label: "Players" },
] as const;

function labelFor(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase())
    .trim();
}

function receivedOn(value: string | undefined): string {
  if (!value) {
    return "—";
  }
  return value.slice(0, 10);
}

export default async function OpsLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string; leadId?: string }>;
}) {
  await requireRoles(OPS_ROLES);
  const params = await searchParams;
  const audience = params.audience?.trim() ?? "";
  const query = audience ? `?audience=${encodeURIComponent(audience)}&size=200` : "?size=200";
  const [listResponse, jobsRes] = await Promise.all([
    springFetch(`/api/v1/ops/leads${query}`),
    springFetch("/api/v1/ops/jobs?size=50"),
  ]);
  const publishedJobs = jobsRes.ok
    ? ((await readJson<PageResponse<JobPosting>>(jobsRes)).content ?? []).filter((job) => job.status === "PUBLISHED")
    : [];
  let loadError: string | null = null;
  let page: PageResponse<OpsLead> = { content: [], page: 0, size: 200, totalElements: 0 };
  if (!listResponse.ok) {
    const body: unknown = await listResponse.json().catch(() => null);
    loadError = parseProblem(body)?.detail ?? "Could not load leads";
  } else {
    page = await readJson<PageResponse<OpsLead>>(listResponse);
    if (!Array.isArray(page.content)) {
      page = { ...page, content: [] };
    }
  }
  let selected: OpsLead | null = null;
  if (params.leadId && !loadError) {
    const detail = await springFetch(`/api/v1/ops/leads/${params.leadId}`);
    if (detail.ok) {
      selected = await readJson<OpsLead>(detail);
    }
  }
  const exportHref = audience
    ? `/dashboard/ops/leads/export?audience=${encodeURIComponent(audience)}`
    : "/dashboard/ops/leads/export";
  const title = audience === "PLAYER" ? "Players" : "CRM / Leads";
  return (
    <DashboardPage title={title} wide>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="max-w-2xl text-sm text-ink-muted">
          Public coach, club, and player intakes. New submissions appear here immediately after
          submit — this is not the registered-user directory.
        </p>
        <a
          href={exportHref}
          className="inline-flex min-h-11 items-center rounded-full bg-brand px-4 text-sm font-semibold text-ink"
        >
          Export to Excel
        </a>
      </div>
      <nav className="flex flex-wrap gap-2" aria-label="Lead audience">
        {AUDIENCES.map((item) => {
          const href = item.id ? `/dashboard/ops/leads?audience=${item.id}` : "/dashboard/ops/leads";
          const active = audience === item.id;
          return (
            <a
              key={item.label}
              href={href}
              className={
                active
                  ? "inline-flex min-h-11 items-center rounded-full bg-brand px-4 text-sm font-semibold text-ink"
                  : "inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium"
              }
            >
              {item.label}
            </a>
          );
        })}
      </nav>
      {loadError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {loadError}
        </div>
      ) : null}
      {!loadError && page.content.length === 0 ? (
        <EmptyState title="No intakes yet" body="When someone submits a coach, club, or player form, they appear here." />
      ) : null}
      {!loadError && page.content.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-canvas text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Path</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Received</th>
                <th className="px-4 py-3 font-medium">Hiring</th>
              </tr>
            </thead>
            <tbody>
              {page.content.map((row) => {
                const href = `/dashboard/ops/leads?${new URLSearchParams({
                  ...(audience ? { audience } : {}),
                  leadId: row.id,
                }).toString()}`;
                return (
                  <tr key={row.id} className={`border-b border-line last:border-0 ${selected?.id === row.id ? "bg-canvas" : ""}`}>
                    <td className="px-4 py-3">
                      <a href={href} className="font-medium text-ink hover:text-brand-deep">
                        {row.displayName || "Intake"}
                      </a>
                    </td>
                    <td className="px-4 py-3">{row.audience}</td>
                    <td className="px-4 py-3">{row.email ?? "—"}</td>
                    <td className="px-4 py-3">{row.phone ?? "—"}</td>
                    <td className="px-4 py-3">{row.status}</td>
                    <td className="px-4 py-3 tabular-nums text-ink-muted">{receivedOn(row.createdAt)}</td>
                    <td className="px-4 py-3">
                      <ConvertLeadButton leadId={row.id} leadName={row.displayName || "this lead"} jobs={publishedJobs} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
      {selected ? (
        <article className="rounded-3xl border border-line bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-ink">{selected.displayName || "Lead"}</h2>
              <p className="text-sm text-ink-muted">
                {selected.audience} · {selected.slug}
              </p>
            </div>
            <a href={audience ? `/dashboard/ops/leads?audience=${audience}` : "/dashboard/ops/leads"} className="text-sm font-medium text-ink-muted">
              Close
            </a>
          </div>
          <div className="mt-4 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1">
              <LeadStatusForm leadId={selected.id} current={selected.status} />
            </div>
            <ConvertLeadButton leadId={selected.id} leadName={selected.displayName || "this lead"} jobs={publishedJobs} />
          </div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {Object.entries(selected.payload ?? {}).map(([key, value]) => (
              <div key={key}>
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">{labelFor(key)}</dt>
                <dd className="mt-1 whitespace-pre-wrap text-sm text-ink">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </article>
      ) : null}
    </DashboardPage>
  );
}
