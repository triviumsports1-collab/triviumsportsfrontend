"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fieldErrorMap, parseProblem } from "@/lib/api/problem";
import { homeForRole, isRole } from "@/lib/auth/roles";
import { ProblemAlert } from "@/components/saas/problem-alert";

export function LoginForm() {
  const params = useSearchParams();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [detail, setDetail] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setDetail(null);
    setFields({});
    const response = await fetch("/api/session/login", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const payload: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      setPending(false);
      const problem = parseProblem(payload);
      setDetail(problem?.detail ?? "Sign-in failed");
      setFields(fieldErrorMap(problem));
      return;
    }
    const roleValue =
      payload && typeof payload === "object" && "role" in payload ? String((payload as { role: string }).role) : "";
    const next = params.get("next");
    const destination =
      next && next.startsWith("/dashboard")
        ? next
        : isRole(roleValue)
          ? homeForRole(roleValue)
          : "/dashboard";
    window.location.assign(destination);
  }

  return (
    <form onSubmit={onSubmit} method="post" data-testid="login-form" data-ready={ready ? "true" : "false"} className="space-y-4">
      <ProblemAlert detail={detail} fieldErrors={fields} />
      <label className="block text-sm font-medium text-ink">
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-ink"
        />
        {fields.email ? <p className="mt-1 text-sm text-red-700">{fields.email}</p> : null}
      </label>
      <label className="block text-sm font-medium text-ink">
        Password
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-ink"
        />
        {fields.password ? <p className="mt-1 text-sm text-red-700">{fields.password}</p> : null}
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand px-6 font-semibold text-ink disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
