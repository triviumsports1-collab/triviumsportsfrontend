"use client";

import { useState } from "react";
import { createTimesheetAction, submitTimesheetAction } from "@/lib/saas/actions";
import { ProblemAlert } from "@/components/saas/problem-alert";
import type { Timesheet } from "@/lib/api/types";

export function TimesheetForm({ organizationId }: { organizationId: string }) {
  const [pending, setPending] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    const result = await createTimesheetAction({
      organizationId,
      periodStart: String(data.get("periodStart")),
      periodEnd: String(data.get("periodEnd")),
      minutesWorked: Number(data.get("minutesWorked")),
      notes: String(data.get("notes") ?? ""),
    });
    setPending(false);
    if (!result.ok) {
      setDetail(result.problem?.detail ?? "Could not save hours");
      setFields(result.fieldErrors ?? {});
      return;
    }
    event.currentTarget.reset();
    setDetail(null);
    setFields({});
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-line bg-white p-4 sm:grid-cols-2">
      <ProblemAlert detail={detail} fieldErrors={fields} />
      <label className="text-sm font-medium">
        Period start
        <input name="periodStart" type="date" required className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium">
        Period end
        <input name="periodEnd" type="date" required className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium">
        Minutes worked
        <input name="minutesWorked" type="number" min={1} required className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        Notes
        <textarea name="notes" className="mt-1 min-h-24 w-full rounded-xl border border-line px-3 py-2" />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="min-h-12 rounded-full bg-brand px-5 font-semibold text-ink sm:col-span-2"
      >
        {pending ? "Saving…" : "Save draft"}
      </button>
    </form>
  );
}

export function SubmitTimesheetButton({ timesheet }: { timesheet: Timesheet }) {
  const [error, setError] = useState<string | null>(null);
  if (timesheet.status !== "DRAFT" && timesheet.status !== "REJECTED") {
    return null;
  }
  return (
    <div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="button"
        className="min-h-11 rounded-full border border-line px-4 text-sm font-medium"
        onClick={async () => {
          const result = await submitTimesheetAction(timesheet.id);
          if (!result.ok) setError(result.problem?.detail ?? "Submit failed");
        }}
      >
        Submit
      </button>
    </div>
  );
}
