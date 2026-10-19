"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Something went wrong</h1>
      <p className="mt-4 text-base leading-7 text-ink-muted">
        Please refresh or return home. If this continues, email info@triviumsports.com.
      </p>
      <button
        type="button"
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 font-semibold text-ink"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
