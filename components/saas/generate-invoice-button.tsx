"use client";

import { generateInvoiceAction } from "@/lib/saas/actions";
import { useState } from "react";

export function GenerateInvoiceButton({ organizationId }: { organizationId: string }) {
  const [error, setError] = useState<string | null>(null);
  return (
    <div>
      {error ? <p className="mb-2 text-sm text-red-700">{error}</p> : null}
      <button
        type="button"
        className="min-h-12 rounded-full bg-brand px-6 font-semibold text-ink"
        onClick={async () => {
          const result = await generateInvoiceAction(organizationId);
          if (!result.ok) setError(result.problem?.detail ?? "Could not create invoice");
        }}
      >
        Invoice approved hours
      </button>
    </div>
  );
}
