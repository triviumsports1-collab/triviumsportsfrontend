"use client";

import { useState } from "react";
import { updateOpsJobAction } from "@/lib/saas/actions";

export function JobPublishToggle({ jobId, published }: { jobId: string; published: boolean }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <div>
      {error ? (
        <p className="mb-1 text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="button"
        disabled={pending}
        className="inline-flex min-h-11 items-center rounded-full border border-line px-3 text-sm font-medium text-ink"
        onClick={async () => {
          setPending(true);
          const result = await updateOpsJobAction(jobId, { published: !published });
          setPending(false);
          if (!result.ok) {
            setError(result.problem?.detail ?? "Could not update listing");
          }
        }}
      >
        {published ? "Unpublish" : "Publish"}
      </button>
    </div>
  );
}
