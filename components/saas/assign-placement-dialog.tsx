"use client";

import { useEffect, useId, useState } from "react";
import { ProblemAlert } from "@/components/saas/problem-alert";
import type { Organization, PipelineApplication } from "@/lib/api/types";
import { assignPlacementAction } from "@/lib/saas/actions";
import { initials } from "@/lib/saas/ats-stages";

const fieldClass =
  "mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink";
const labelClass = "block text-sm font-medium text-ink";

export function AssignPlacementDialog({
  open,
  candidate,
  organizations,
  onClose,
  onAssigned,
}: {
  open: boolean;
  candidate: PipelineApplication | null;
  organizations: Organization[];
  onClose: () => void;
  onAssigned: () => void;
}) {
  const titleId = useId();
  const [step, setStep] = useState<1 | 2>(1);
  const [pending, setPending] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) {
      return;
    }
    setStep(1);
    setPending(false);
    setDetail(null);
    setFields({});
  }, [open, candidate?.id]);

  useEffect(() => {
    if (!open) {
      return;
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !candidate) {
    return null;
  }

  const ready = Boolean(candidate.applicantUserId);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = candidate;
    if (!target?.applicantUserId) {
      setDetail("This applicant needs a coach account before a club assignment.");
      return;
    }
    if (step === 1) {
      setStep(2);
      return;
    }
    const data = new FormData(event.currentTarget);
    setPending(true);
    const result = await assignPlacementAction({
      organizationId: String(data.get("organizationId") ?? ""),
      coachUserId: target.applicantUserId,
      jobId: target.jobId || undefined,
      billCentsPerHour: Math.round(Number(data.get("billUsd") ?? 0) * 100),
      payCentsPerHour: Math.round(Number(data.get("payUsd") ?? 0) * 100),
      startsOn: String(data.get("startsOn") ?? ""),
    });
    setPending(false);
    if (!result.ok) {
      setDetail(result.problem?.detail ?? "Could not assign this coach to a club.");
      setFields(result.fieldErrors ?? {});
      return;
    }
    onAssigned();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-3 sm:items-center" role="presentation">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close assignment" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg rounded-3xl border border-line bg-white p-5 shadow-2xl sm:p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-deep">Post-hire</p>
        <h2 id={titleId} className="mt-1 text-xl font-semibold tracking-tight text-ink">
          Assign to a club
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Placement rates and start date stay on the operations record. They are not shown on public tennis pages.
        </p>
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-canvas px-3 py-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-sm font-semibold text-ink">
            {initials(candidate.displayName)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium text-ink">{candidate.displayName || "Candidate"}</p>
            <p className="truncate text-xs text-ink-muted">
              {candidate.jobTitle} · {candidate.organizationName || "Club to confirm"}
            </p>
          </div>
        </div>
        <ol className="mt-4 flex gap-2 text-xs font-medium" aria-label="Assignment steps">
          <li className={`rounded-full px-3 py-1 ${step === 1 ? "bg-brand text-ink" : "bg-canvas text-ink-muted"}`}>
            1 · Club
          </li>
          <li className={`rounded-full px-3 py-1 ${step === 2 ? "bg-brand text-ink" : "bg-canvas text-ink-muted"}`}>
            2 · Terms
          </li>
        </ol>
        <form onSubmit={(event) => void onSubmit(event)} className="mt-4 space-y-3">
          <ProblemAlert detail={detail} fieldErrors={fields} />
          {!ready ? (
            <p className="rounded-xl border border-line bg-canvas px-3 py-3 text-sm text-ink-muted">
              Guest applicant — create a coach account for this person before assigning a club.
            </p>
          ) : null}
          <label className={labelClass} hidden={step !== 1}>
            Club or employer
            <select
              name="organizationId"
              required
              defaultValue={candidate.organizationId ?? ""}
              className={fieldClass}
              disabled={!ready}
            >
              <option value="">Select a club</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </label>
          <div className={step === 2 ? "grid gap-3 sm:grid-cols-2" : "hidden"} aria-hidden={step !== 2}>
            <label className={labelClass}>
              Club bill rate (USD / hour)
              <input name="billUsd" type="number" min={0} step="0.01" required={step === 2} className={fieldClass} />
            </label>
            <label className={labelClass}>
              Coach pay rate (USD / hour)
              <input name="payUsd" type="number" min={0} step="0.01" required={step === 2} className={fieldClass} />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Start date
              <input name="startsOn" type="date" required={step === 2} className={fieldClass} />
            </label>
          </div>
          <div className="flex flex-wrap justify-end gap-2 pt-2">
            {step === 2 ? (
              <button
                type="button"
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium"
                onClick={() => setStep(1)}
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium"
                onClick={onClose}
              >
                Not now
              </button>
            )}
            <button
              type="submit"
              disabled={pending || !ready}
              className="inline-flex min-h-11 items-center rounded-full bg-brand px-4 text-sm font-semibold text-ink disabled:opacity-60"
            >
              {pending ? "Saving…" : step === 1 ? "Continue" : "Create assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
