import { JobPagination, jobBoardHref } from "@/components/marketing/job-pagination";
import { ROLE_TYPE_LABELS, type PublishedJob } from "@/lib/jobs/public";
import { routes } from "@/lib/site";

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
] as const;

function locationLabel(job: PublishedJob): string {
  const place = [job.city, job.state].filter(Boolean).join(", ");
  if (place) {
    return place;
  }
  return job.remoteFlag ? "Remote · United States" : "United States";
}

function excerpt(text: string): string {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= 160) {
    return compact;
  }
  return `${compact.slice(0, 157).trimEnd()}…`;
}

function postedLabel(iso: string | null): string | null {
  if (!iso) {
    return null;
  }
  const parsed = Date.parse(iso);
  if (Number.isNaN(parsed)) {
    return null;
  }
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(parsed),
  );
}

export function JobBoard({
  jobs,
  total,
  page,
  totalPages,
  q,
  state,
  roleType,
}: {
  jobs: PublishedJob[];
  total: number;
  page: number;
  totalPages: number;
  q: string;
  state: string;
  roleType: string;
}) {
  const filters = { q, state, roleType };
  return (
    <div>
      <form
        method="get"
        action={routes.jobsBoard}
        className="grid gap-3 rounded-3xl border border-line bg-white p-4 shadow-[0_12px_40px_rgba(15,28,22,0.06)] sm:grid-cols-2 lg:grid-cols-4"
      >
        <label className="text-sm font-medium text-ink lg:col-span-2">
          Search roles
          <input
            type="search"
            name="q"
            defaultValue={q}
            maxLength={80}
            placeholder="Title, city, or state"
            className="mt-1.5 min-h-11 w-full rounded-xl border border-line bg-canvas px-3 text-base text-ink placeholder:text-ink-muted/70"
          />
        </label>
        <label className="text-sm font-medium text-ink">
          Role type
          <select
            name="roleType"
            defaultValue={roleType}
            className="mt-1.5 min-h-11 w-full rounded-xl border border-line bg-canvas px-3 text-base text-ink"
          >
            <option value="">All types</option>
            {Object.entries(ROLE_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-ink">
          State
          <select
            name="state"
            defaultValue={state}
            className="mt-1.5 min-h-11 w-full rounded-xl border border-line bg-canvas px-3 text-base text-ink"
          >
            <option value="">All states</option>
            {US_STATES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap items-end gap-3 sm:col-span-2 lg:col-span-4">
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated"
          >
            Show roles
          </button>
          {q || state || roleType ? (
            <a href={routes.jobsBoard} className="inline-flex min-h-11 items-center text-sm font-medium text-ink-muted hover:text-ink">
              Clear filters
            </a>
          ) : null}
        </div>
      </form>

      <p className="mt-8 text-sm text-ink-muted" aria-live="polite">
        {total === 0
          ? "No published tennis roles match these filters."
          : `${total} published ${total === 1 ? "role" : "roles"} · newest first`}
      </p>

      <div className="mt-4 min-h-[32rem]">
        {jobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold text-ink">No openings on this page yet.</p>
            <p className="mt-2 text-sm text-ink-muted">
              Clubs publish tennis coaching roles here. Check back soon, or tell us about you for an introduction.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={routes.getStarted}
                className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-ink"
              >
                Get started
              </a>
              {page > 1 ? (
                <a
                  href={jobBoardHref({ ...filters, page: page - 1 })}
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-medium"
                >
                  Previous page
                </a>
              ) : null}
            </div>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {jobs.map((job) => {
              const posted = postedLabel(job.publishedAt);
              return (
                <li key={job.id}>
                  <article className="flex h-full min-h-[17.5rem] flex-col rounded-3xl border border-line bg-white p-6 shadow-[0_10px_30px_rgba(15,28,22,0.05)]">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex min-h-8 items-center rounded-full bg-canvas px-3 text-xs font-medium text-ink">
                        {locationLabel(job)}
                      </span>
                      <span className="inline-flex min-h-8 items-center rounded-full bg-canvas px-3 text-xs font-medium text-ink">
                        {ROLE_TYPE_LABELS[job.roleType] ?? "Tennis"}
                      </span>
                      {job.remoteFlag ? (
                        <span className="inline-flex min-h-8 items-center rounded-full bg-canvas px-3 text-xs font-medium text-ink">
                          Remote
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-4 text-xl font-semibold tracking-tight text-ink">
                      <a href={`/jobs/${job.slug}`} className="hover:text-brand-deep">
                        {job.title}
                      </a>
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{excerpt(job.description)}</p>
                    {posted ? <p className="mt-3 text-xs text-ink-muted">Posted {posted}</p> : null}
                    <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href={`/jobs/${job.slug}/apply`}
                        className="inline-flex min-h-11 items-center rounded-full bg-brand px-4 text-sm font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated"
                      >
                        Apply
                      </a>
                      <a
                        href={`/jobs/${job.slug}`}
                        className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium text-ink hover:border-brand"
                      >
                        View role
                      </a>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <JobPagination page={page} totalPages={totalPages} q={q} state={state} roleType={roleType} />
    </div>
  );
}
