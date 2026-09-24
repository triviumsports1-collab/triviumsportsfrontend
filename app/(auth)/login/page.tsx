import { LoginForm } from "@/components/saas/login-form";
import { routes } from "@/lib/site";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-16">
      <a href={routes.home} className="text-sm font-medium text-ink-muted">
        ← Trivium Sports
      </a>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink">Sign in</h1>
      <p className="mt-2 text-sm text-ink-muted">Use your workspace email. Public tennis pages stay separate.</p>
      <div className="mt-8">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
