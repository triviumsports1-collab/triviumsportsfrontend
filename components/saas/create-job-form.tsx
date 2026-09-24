"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProblemAlert } from "@/components/saas/problem-alert";
import type { Organization } from "@/lib/api/types";
import { createOpsJobAction } from "@/lib/saas/actions";

export function CreateJobForm({ organizations }: { organizations: Organization[] }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    const result = await createOpsJobAction({
      organizationId: String(data.get("organizationId") ?? ""),
      title: String(data.get("title") ?? ""),
      description: String(data.get("description") ?? ""),
      requirements: String(data.get("requirements") ?? ""),
      city: String(data.get("city") ?? ""),
      state: String(data.get("state") ?? ""),
      remoteFlag: data.get("remoteFlag") === "on",
      roleType: String(data.get("roleType") ?? "COACH_STAFF") as
        | "PLAYER_TRIAL"
        | "PLAYER_SEASON"
        | "COACH_STAFF"
        | "OTHER",
      published: data.get("published") === "on",
    });
    setPending(false);
    if (!result.ok) {
      setDetail(result.problem?.detail ?? result.problem?.title ?? "Could not create job");
      setFields(result.fieldErrors ?? {});
      return;
    }
    router.push("/dashboard/ops/jobs");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-white p-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <ProblemAlert detail={detail} fieldErrors={fields} />
      </div>
      <label className="text-sm font-medium sm:col-span-2">
        Club
        <select
          name="organizationId"
          required
          className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3"
        >
          <option value="">Select a club</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
              {org.city ? ` · ${org.city}` : ""}
              {org.state ? `, ${org.state}` : ""}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        Title
        <input name="title" required maxLength={255} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        Description
        <textarea name="description" required className="mt-1 min-h-32 w-full rounded-xl border border-line px-3 py-2" />
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        Requirements
        <textarea name="requirements" className="mt-1 min-h-24 w-full rounded-xl border border-line px-3 py-2" />
      </label>
      <label className="text-sm font-medium">
        City
        <input name="city" maxLength={128} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium">
        State
        <input name="state" maxLength={128} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      </label>
      <label className="text-sm font-medium">
        Role type
        <select name="roleType" defaultValue="COACH_STAFF" className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3">
          <option value="COACH_STAFF">Coach / staff</option>
          <option value="PLAYER_TRIAL">Player trial</option>
          <option value="PLAYER_SEASON">Player season</option>
          <option value="OTHER">Other</option>
        </select>
      </label>
      <label className="flex min-h-11 items-center gap-2 text-sm font-medium">
        <input name="remoteFlag" type="checkbox" className="h-5 w-5 accent-[#3e8f58]" />
        Remote possible
      </label>
      <label className="flex min-h-11 items-center gap-2 text-sm font-medium sm:col-span-2">
        <input name="published" type="checkbox" className="h-5 w-5 accent-[#3e8f58]" />
        Publish on the public job board
      </label>
      <button
        type="submit"
        disabled={pending || organizations.length === 0}
        className="min-h-12 rounded-full bg-brand px-5 font-semibold text-ink sm:col-span-2"
      >
        {pending ? "Saving…" : "Create job"}
      </button>
    </form>
  );
}
