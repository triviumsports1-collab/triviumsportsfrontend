"use client";

import { useState } from "react";
import { approveTimesheetAction, rejectTimesheetAction } from "@/lib/saas/actions";
import type { Timesheet } from "@/lib/api/types";

export function TimesheetReview({ timesheet }: { timesheet: Timesheet }) {
  const [error, setError] = useState<string | null>(null);
  if (timesheet.status !== "SUBMITTED") {
    return <span className="text-sm text-ink-muted">{timesheet.status}</span>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {error ? <p className="w-full text-sm text-red-700">{error}</p> : null}
      <button
        type="button"
        className="min-h-11 rounded-full bg-brand px-4 text-sm font-semibold text-ink"
        onClick={async () => {
          const result = await approveTimesheetAction(timesheet.id);
          if (!result.ok) setError(result.problem?.detail ?? "Approve failed");
        }}
      >
        Approve
      </button>
      <button
        type="button"
        className="min-h-11 rounded-full border border-line px-4 text-sm font-medium"
        onClick={async () => {
          const reason = window.prompt("Reason for sending back?");
          if (!reason) return;
          const result = await rejectTimesheetAction(timesheet.id, reason);
          if (!result.ok) setError(result.problem?.detail ?? "Could not send back");
        }}
      >
        Send back
      </button>
    </div>
  );
}
