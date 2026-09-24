"use client";

import { FormEvent, useState } from "react";
import { fieldClassName, labelClassName } from "@/components/marketing/page-shell";
import { site } from "@/lib/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "").trim();
    if (!email.includes("@") || message.length < 8) {
      setError("Please include a valid email and a short message.");
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="rounded-3xl border border-line bg-canvas p-6 text-base leading-7 text-ink-muted">
        Message received. We will reply from {site.email}.
      </p>
    );
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
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
        <textarea id="contact-message" name="message" rows={5} className={`${fieldClassName} py-3`} />
      </div>
      {error ? (
        <p className="text-sm font-medium text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated"
      >
        Send message
      </button>
    </form>
  );
}
