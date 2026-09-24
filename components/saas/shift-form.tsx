"use client";

import { useState } from "react";
import { assignShiftAction } from "@/lib/saas/actions";
import { ProblemAlert } from "@/components/saas/problem-alert";

export function ShiftForm({ organizationId }: { organizationId: string }) {
  const [pending, setPending] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    const result = await assignShiftAction({
      organizationId,
      coachUserId: String(data.get("coachUserId")),
      startsAt: new Date(String(data.get("startsAt"))).toISOString(),
      endsAt: new Date(String(data.get("endsAt"))).toISOString(),
      location: String(data.get("location") ?? ""),
      activityType: String(data.get("activityType") ?? ""),
    });
    setPending(false);
    if (!result.ok) {
      setDetail(result.problem?.detail ?? "Could not assign shift");
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
      <label className="text-sm font-medium sm:col-span-2">
        Coach user id
        <input name="coachUserId" required className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium">
        Starts
        <input name="startsAt" type="datetime-local" required className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium">
        Ends
        <input name="endsAt" type="datetime-local" required className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium">
        Court / location
        <input name="location" className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium">
        Activity
        <input name="activityType" className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <button type="submit" disabled={pending} className="min-h-12 rounded-full bg-brand px-5 font-semibold text-ink sm:col-span-2">
        {pending ? "Assigning…" : "Assign shift"}
      </button>
    </form>
  );
}
