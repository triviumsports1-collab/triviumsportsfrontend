import Link from "next/link";
import { JobPublishToggle } from "@/components/saas/job-publish-toggle";
import type { JobPosting, Organization } from "@/lib/api/types";

function location(job: JobPosting) {
  const parts = [job.city, job.state].filter(Boolean);
  if (job.remoteFlag) {
    parts.push("Remote");
  }
  return parts.length > 0 ? parts.join(", ") : "—";
}

export function OpsJobTable({
  jobs,
  organizations,
}: {
  jobs: JobPosting[];
  organizations: Organization[];
}) {
  const names = new Map(organizations.map((org) => [org.id, org.name]));
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-line bg-canvas text-ink-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Club</th>
            <th className="px-4 py-3 font-medium">Location</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Listing</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3 font-medium text-ink">{job.title}</td>
              <td className="px-4 py-3 text-ink-muted">{names.get(job.organizationId) ?? job.organizationId}</td>
              <td className="px-4 py-3 text-ink-muted">{location(job)}</td>
              <td className="px-4 py-3 tabular-nums">{job.status}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <JobPublishToggle jobId={job.id} published={job.status === "PUBLISHED"} />
                  {job.status === "PUBLISHED" ? (
                    <Link href={`/jobs/${job.slug}`} className="text-sm font-medium text-brand-deep underline">
                      Public page
                    </Link>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
