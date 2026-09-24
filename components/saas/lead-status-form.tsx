"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProblemAlert } from "@/components/saas/problem-alert";
import { updateLeadStatusAction } from "@/lib/saas/actions";

export function LeadStatusForm({ leadId, current }: { leadId: string; current: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);

  async function onChange(status: string) {
    setPending(true);
    setDetail(null);
    const result = await updateLeadStatusAction(leadId, status);
    setPending(false);
    if (!result.ok) {
      setDetail(result.problem?.detail ?? "Could not update lead");
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-2">
      <ProblemAlert detail={detail} />
      <label className="text-sm font-medium">
        Status
        <select
          className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3"
          defaultValue={current}
          disabled={pending}
          onChange={(event) => void onChange(event.target.value)}
        >
          <option value="NEW">New</option>
          <option value="REVIEWING">Reviewing</option>
          <option value="CLOSED">Closed</option>
        </select>
      </label>
    </div>
  );
}
