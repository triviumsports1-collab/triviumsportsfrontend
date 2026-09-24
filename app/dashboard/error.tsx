"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-ink">Workspace error</h1>
      <p className="mt-3 text-sm text-ink-muted">
        {error.message || "Refresh this view or sign in again if your session expired."}
      </p>
      <button type="button" onClick={() => reset()} className="mt-6 min-h-12 rounded-full bg-brand px-6 font-semibold text-ink">
        Try again
      </button>
    </main>
  );
}
