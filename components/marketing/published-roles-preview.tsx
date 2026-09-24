import { ROLE_TYPE_LABELS, type PublishedJob } from "@/lib/jobs/public";
import { routes } from "@/lib/site";

function locationLabel(job: PublishedJob): string {
  const place = [job.city, job.state].filter(Boolean).join(", ");
  if (place) {
    return place;
  }
  return job.remoteFlag ? "United States (flexible)" : "United States";
}

export function PublishedRolesPreview({ jobs }: { jobs: PublishedJob[] }) {
  if (jobs.length === 0) {
    return (
      <p className="max-w-2xl text-base leading-7 text-ink-muted">
        No published listings are live right now. Role types below still describe the tennis work
        U.S. clubs ask us to fill — tell us about you and we will make a considered introduction.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {jobs.map((job) => (
        <li key={job.slug}>
          <a
            href={`${routes.jobsBoard}/${job.slug}`}
            className="flex h-full flex-col rounded-3xl border border-line bg-canvas-elevated p-6 hover:border-brand"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-deep">
              {ROLE_TYPE_LABELS[job.roleType] ?? "Coaching"}
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{job.title}</h3>
            <p className="mt-2 text-sm text-ink-muted">{locationLabel(job)}</p>
            <span className="mt-6 text-sm font-semibold text-brand-deep">View role →</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
