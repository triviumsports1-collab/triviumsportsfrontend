"use client";

import { FormEvent, useState } from "react";
import { fieldClassName, labelClassName } from "@/components/marketing/page-shell";
import { parseProblem } from "@/lib/api/problem";
import { site } from "@/lib/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!email.includes("@") || message.length < 8) {
      setError("Please include a valid email and a short message.");
      return;
    }
    const name = String(data.get("name") ?? "").trim();
    const audience = String(data.get("audience") ?? "").trim();

    // Build the payload — omit optional fields when blank.
    const payload: Record<string, string> = { email, message };
    if (name) payload.name = name;
    if (audience) payload.audience = audience;

    setError(null);
    setPending(true);
    try {
      // POST goes through the Route Handler at app/api/v1/forms/[slug]/submissions/route.ts,
      // which forwards the call to Spring server-to-server (no CORS issues).
      const response = await fetch("/api/v1/forms/contact/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      });
      const body: unknown = await response.json().catch(() => null);
      if (response.status !== 201) {
        const problem = parseProblem(body);
        setError(problem?.detail ?? "Could not send your message. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError(
        "Could not reach Trivium Sports. Try again, or email " + site.email + " directly.",
      );
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <p className="rounded-3xl border border-line bg-canvas p-6 text-base leading-7 text-ink-muted">
        Message sent. Our tennis team will follow up at the email you provided. You can also
        reach us directly at{" "}
        <a className="font-medium text-ink underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </p>
    );
  }

  return (
    <form className="space-y-5" onSubmit={(event) => void onSubmit(event)} noValidate>
      <div>
        <label className={labelClassName} htmlFor="contact-name">
          Name
        </label>
        <input id="contact-name" name="name" className={fieldClassName} autoComplete="name" />
      </div>
      <div>
        <label className={labelClassName} htmlFor="contact-email">
          Email <span className="text-brand-deep">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className={fieldClassName}
          autoComplete="email"
        />
      </div>
      <div>
        <label className={labelClassName} htmlFor="contact-audience">
          I am a
        </label>
        <select id="contact-audience" name="audience" className={fieldClassName} defaultValue="">
          <option value="" disabled>
            Select
          </option>
          <option value="coach">Coach</option>
          <option value="player">Player</option>
          <option value="club">Club or academy</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className={labelClassName} htmlFor="contact-message">
          Message <span className="text-brand-deep">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className={`${fieldClassName} py-3`}
        />
      </div>
      {error ? (
        <p className="text-sm font-medium text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
