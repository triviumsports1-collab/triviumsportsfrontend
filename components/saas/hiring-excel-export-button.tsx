"use client";

import { useState } from "react";
import { ProblemAlert } from "@/components/saas/problem-alert";

export function HiringExcelExportButton() {
  const [pending, setPending] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);

  async function onExport() {
    setPending(true);
    setDetail(null);
    try {
      const response = await fetch("/api/ops/hiring/export", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        redirect: "manual",
        headers: { Accept: "application/vnd.ms-excel" },
      });
      if (response.type === "opaqueredirect" || response.status === 307 || response.status === 302 || response.status === 303) {
        setDetail("Export could not complete without leaving this page. Refresh and try again.");
        return;
      }
      if (!response.ok) {
        const payload: unknown = await response.json().catch(() => null);
        const message =
          payload && typeof payload === "object" && payload !== null && "detail" in payload && typeof payload.detail === "string"
            ? payload.detail
            : "Could not export the hiring pipeline.";
        setDetail(message);
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "trivium-hiring.xls";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setDetail("Could not export the hiring pipeline.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex max-w-sm flex-col items-stretch gap-2 sm:items-end">
      <button
        type="button"
        onClick={() => void onExport()}
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink disabled:opacity-60"
      >
        {pending ? "Exporting…" : "Export to Excel"}
      </button>
      <ProblemAlert detail={detail} />
    </div>
  );
}
