"use client";

import { useState } from "react";
import { saveVisaAction } from "@/lib/saas/actions";
import type { VisaSnapshot } from "@/lib/api/types";
import { ProblemAlert } from "@/components/saas/problem-alert";

const PATHWAYS = ["F_1", "OPT", "O_1", "P_1"] as const;

export function VisaForm({ snapshot }: { snapshot: VisaSnapshot | null }) {
  const [pending, setPending] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    const result = await saveVisaAction({
      currentStatus: data.get("currentStatus") || null,
      targetPathway: data.get("targetPathway") || null,
      workAuthorizedNow: data.get("workAuthorizedNow") === "on",
      counselEngaged: data.get("counselEngaged") === "on",
      shareWithClubs: data.get("shareWithClubs") === "on",
      statusStartsOn: data.get("statusStartsOn") || null,
      statusExpiresOn: data.get("statusExpiresOn") || null,
      eadExpiresOn: data.get("eadExpiresOn") || null,
      passportExpiresOn: data.get("passportExpiresOn") || null,
      petitionStage: data.get("petitionStage") || null,
      notes: data.get("notes") || null,
      disclaimerAccepted: data.get("disclaimerAccepted") === "on",
    });
    setPending(false);
    if (!result.ok) {
      setDetail(result.problem?.detail ?? "Could not save timeline");
      setFields(result.fieldErrors ?? {});
      return;
    }
    setDetail(null);
    setFields({});
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-line bg-white p-4 sm:grid-cols-2">
      <ProblemAlert detail={detail} fieldErrors={fields} />
      <p className="sm:col-span-2 rounded-xl bg-canvas px-3 py-2 text-sm text-ink-muted">
        {snapshot?.disclaimer ??
          "Trivium Sports is not a law firm and does not provide legal advice. Consult licensed immigration counsel."}
      </p>
      <label className="text-sm font-medium">
        Current status
        <select name="currentStatus" defaultValue={snapshot?.currentStatus ?? ""} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3">
          <option value="">Select</option>
          {PATHWAYS.map((item) => (
            <option key={item} value={item}>
              {item.replace("_", "-")}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium">
        Target pathway
        <select name="targetPathway" defaultValue={snapshot?.targetPathway ?? ""} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3">
          <option value="">Select</option>
          {PATHWAYS.map((item) => (
            <option key={item} value={item}>
              {item.replace("_", "-")}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium">
        Status starts
        <input name="statusStartsOn" type="date" defaultValue={snapshot?.statusStartsOn ?? ""} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium">
        Status expires
        <input name="statusExpiresOn" type="date" defaultValue={snapshot?.statusExpiresOn ?? ""} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium">
        EAD expires
        <input name="eadExpiresOn" type="date" defaultValue={snapshot?.eadExpiresOn ?? ""} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium">
        Passport expires
        <input name="passportExpiresOn" type="date" defaultValue={snapshot?.passportExpiresOn ?? ""} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="flex min-h-11 items-center gap-2 text-sm font-medium">
        <input type="checkbox" name="workAuthorizedNow" defaultChecked={snapshot?.workAuthorizedNow} />
        Currently authorized to work
      </label>
      <label className="flex min-h-11 items-center gap-2 text-sm font-medium">
        <input type="checkbox" name="counselEngaged" defaultChecked={snapshot?.counselEngaged} />
        Licensed counsel engaged
      </label>
      <label className="flex min-h-11 items-center gap-2 text-sm font-medium sm:col-span-2">
        <input type="checkbox" name="shareWithClubs" defaultChecked={snapshot?.shareWithClubs} />
        Share authorization flags with my club
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        Private notes
        <textarea name="notes" defaultValue={snapshot?.notes ?? ""} className="mt-1 min-h-24 w-full rounded-xl border border-line px-3 py-2" />
      </label>
      <label className="flex min-h-11 items-center gap-2 text-sm font-medium sm:col-span-2">
        <input type="checkbox" name="disclaimerAccepted" required defaultChecked={Boolean(snapshot)} />
        I understand Trivium Sports is not a law firm
      </label>
      <button type="submit" disabled={pending} className="min-h-12 rounded-full bg-brand px-5 font-semibold text-ink sm:col-span-2">
        {pending ? "Saving…" : "Save timeline"}
      </button>
    </form>
  );
}
