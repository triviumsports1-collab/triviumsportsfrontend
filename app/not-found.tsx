import { routes } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-4 text-base text-ink-muted">
        That court is empty. Return home or start an intake.
      </p>
      <a
        href={routes.home}
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 font-semibold text-ink"
      >
        Home
      </a>
    </main>
  );
}
