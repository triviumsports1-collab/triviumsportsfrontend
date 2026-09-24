"use client";

import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { ProblemAlert } from "@/components/saas/problem-alert";
import type { JobPosting } from "@/lib/api/types";
import { convertLeadToApplicationAction } from "@/lib/saas/actions";

export function ConvertLeadButton({
  leadId,
  leadName,
  jobs,
}: {
  leadId: string;
  leadName: string;
  jobs: JobPosting[];
}) {
  const router = useRouter();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [jobId, setJobId] = useState(jobs[0]?.id ?? "");
  const [pending, setPending] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    setDetail(null);
    setJobId((current) => current || jobs[0]?.id || "");
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jobs, open]);

  async function onConvert(event: React.FormEvent) {
    event.preventDefault();
    if (!jobId) {
      setDetail("Select a published job opening.");
      return;
    }
    if (!/^[0-9a-fA-F-]{36}$/.test(jobId)) {
      setDetail("Select a published job opening.");
      return;
    }
    setPending(true);
    setDetail(null);
    const result = await convertLeadToApplicationAction(leadId, jobId);
    setPending(false);
    if (!result.ok || !result.id) {
      setDetail(result.problem?.detail ?? result.problem?.title ?? "Could not move this lead into hiring.");
      return;
    }
    setOpen(false);
    router.push(`/dashboard/ops/hiring?applicationId=${result.id}`);
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex min-h-11 items-center rounded-full border border-line px-3 text-sm font-semibold text-ink hover:border-brand"
        onClick={() => setOpen(true)}
      >
        Move to hiring
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-3 sm:items-center" role="presentation">
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close" onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-md rounded-3xl border border-line bg-white p-5 shadow-2xl sm:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-deep">Hiring</p>
            <h2 id={titleId} className="mt-1 text-xl font-semibold tracking-tight text-ink">
              Move to hiring
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {leadName} will appear on the ATS board in Applied, with their intake name, contact, experience, and notes.
            </p>
            <form onSubmit={(event) => void onConvert(event)} className="mt-4 space-y-3">
              <ProblemAlert detail={detail} />
              {jobs.length === 0 ? (
                <p className="rounded-xl border border-line bg-canvas px-3 py-3 text-sm text-ink-muted">
                  Publish a tennis job opening first, then convert this lead.
                </p>
              ) : (
                <label className="block text-sm font-medium text-ink">
                  Job opening
                  <select
                    required
                    value={jobId}
                    onChange={(event) => setJobId(event.target.value)}
                    className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm"
                  >
                    <option value="">Select a published job</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                        {job.city ? ` · ${job.city}` : ""}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div className="flex flex-wrap justify-end gap-2 pt-1">
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending || jobs.length === 0}
                  className="inline-flex min-h-11 items-center rounded-full bg-brand px-4 text-sm font-semibold text-ink disabled:opacity-60"
                >
                  {pending ? "Moving…" : "Add to Applied"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
