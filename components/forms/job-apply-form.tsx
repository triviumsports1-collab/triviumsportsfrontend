"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { fieldClassName, labelClassName } from "@/components/marketing/page-shell";
import { ProblemAlert } from "@/components/saas/problem-alert";
import { fieldErrorMap, parseProblem } from "@/lib/api/problem";

const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
]);

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function JobApplyForm({ slug, jobTitle }: { slug: string; jobTitle: string }) {
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const localErrors: Record<string, string> = {};
    if (firstName.trim().length < 2) {
      localErrors.firstName = "Enter your first name.";
    }
    if (lastName.trim().length < 2) {
      localErrors.lastName = "Enter your last name.";
    }
    if (!email.trim().includes("@") || email.trim().length < 5) {
      localErrors.email = "Enter a valid email.";
    }
    if (phone.replace(/\D/g, "").length < 7) {
      localErrors.phone = "Enter a phone number we can reach.";
    }
    if (coverLetter.trim().length < 8) {
      localErrors.coverLetter = "Add a short cover letter for this tennis role.";
    }
    if (!resume || resume.size === 0) {
      localErrors.resume = "Attach a resume (PDF, Word, JPEG, or PNG).";
    } else if (resume.size > MAX_RESUME_BYTES) {
      localErrors.resume = "Resume must be 10 MB or smaller.";
    } else if (!resumeLooksAllowed(resume)) {
      localErrors.resume = "Use PDF, Word (.docx), JPEG, or PNG.";
    }
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      setDetail("Please correct the highlighted fields.");
      return;
    }
    setPending(true);
    setDetail(null);
    setFieldErrors({});
    const file = resume;
    if (!file) {
      setPending(false);
      setFieldErrors({ resume: "Attach a resume (PDF, Word, JPEG, or PNG)." });
      return;
    }
    try {
      const contentType = resumeContentType(file);
      const uploadRes = await fetch(`/api/v1/jobs/${encodeURIComponent(slug)}/apply/uploads`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType }),
      });
      const uploadPayload: unknown = await uploadRes.json().catch(() => null);
      if (!uploadRes.ok) {
        const problem = parseProblem(uploadPayload);
        setDetail(problem?.detail ?? "Could not start the resume upload.");
        setFieldErrors(fieldErrorMap(problem));
        return;
      }
      if (!isUploadTicket(uploadPayload)) {
        setDetail("Could not start the resume upload.");
        return;
      }
      const put = await fetch(uploadPayload.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body: file,
      });
      if (!put.ok) {
        setDetail("The resume could not be stored. Try a PDF under 10 MB.");
        return;
      }
      const applyRes = await fetch(`/api/v1/jobs/${encodeURIComponent(slug)}/apply`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          experience: experience.trim() || undefined,
          coverLetter: coverLetter.trim(),
          resumeObjectId: uploadPayload.objectId,
        }),
      });
      const applyPayload: unknown = await applyRes.json().catch(() => null);
      if (applyRes.status === 409) {
        setDetail("You have already applied to this role.");
        return;
      }
      if (!applyRes.ok) {
        const problem = parseProblem(applyPayload);
        setDetail(problem?.detail ?? "The application could not be sent.");
        setFieldErrors(fieldErrorMap(problem));
        return;
      }
      setSubmitted(true);
    } catch {
      setDetail("The application could not be sent. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-line bg-canvas-elevated p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">Received</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">Thank you, {jobTitle} has your application.</h2>
        <p className="mt-3 text-base leading-7 text-ink-muted">
          Trivium Sports will review your materials and follow up by email. Keep an eye on the inbox you listed.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5 rounded-3xl border border-line bg-canvas-elevated p-5 sm:p-8" onSubmit={onSubmit} noValidate>
      <ProblemAlert detail={detail} fieldErrors={fieldErrors} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="apply-first-name"
          label="First name"
          required
          error={fieldErrors.firstName}
        >
          <input
            id="apply-first-name"
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            aria-invalid={Boolean(fieldErrors.firstName)}
            aria-describedby={fieldErrors.firstName ? "apply-first-name-error" : undefined}
            className={inputClass(fieldErrors.firstName)}
            required
          />
        </Field>
        <Field id="apply-last-name" label="Last name" required error={fieldErrors.lastName}>
          <input
            id="apply-last-name"
            name="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            aria-invalid={Boolean(fieldErrors.lastName)}
            aria-describedby={fieldErrors.lastName ? "apply-last-name-error" : undefined}
            className={inputClass(fieldErrors.lastName)}
            required
          />
        </Field>
      </div>
      <Field id="apply-email" label="Email" required error={fieldErrors.email}>
        <input
          id="apply-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "apply-email-error" : undefined}
          className={inputClass(fieldErrors.email)}
          required
        />
      </Field>
      <Field id="apply-phone" label="Phone" required error={fieldErrors.phone}>
        <input
          id="apply-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={fieldErrors.phone ? "apply-phone-error" : undefined}
          className={inputClass(fieldErrors.phone)}
          required
        />
      </Field>
      <Field
        id="apply-experience"
        label="Tennis coaching experience"
        hint="Optional. Clubs, college teams, certifications, ages you coach."
        error={fieldErrors.experience}
      >
        <textarea
          id="apply-experience"
          name="experience"
          rows={4}
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
          aria-invalid={Boolean(fieldErrors.experience)}
          aria-describedby={fieldErrors.experience ? "apply-experience-error" : undefined}
          className={`${inputClass(fieldErrors.experience)} py-3`}
          placeholder="Head pro at a USTA club, 4.5+ clinics, college tennis."
        />
      </Field>
      <Field id="apply-cover" label="Cover letter" required error={fieldErrors.coverLetter}>
        <textarea
          id="apply-cover"
          name="coverLetter"
          rows={6}
          value={coverLetter}
          onChange={(event) => setCoverLetter(event.target.value)}
          aria-invalid={Boolean(fieldErrors.coverLetter)}
          aria-describedby={fieldErrors.coverLetter ? "apply-cover-error" : undefined}
          className={`${inputClass(fieldErrors.coverLetter)} py-3`}
          placeholder="Why this tennis role, and when you can start."
        />
      </Field>
      <Field
        id="apply-resume"
        label="Resume"
        required
        hint="PDF, Word, JPEG, or PNG. 10 MB maximum."
        error={fieldErrors.resume}
      >
        <input
          id="apply-resume"
          name="resume"
          type="file"
          accept=".pdf,.docx,.png,.jpg,.jpeg,application/pdf"
          onChange={(event) => setResume(event.target.files?.[0] ?? null)}
          aria-invalid={Boolean(fieldErrors.resume)}
          aria-describedby={fieldErrors.resume ? "apply-resume-error" : undefined}
          className="mt-1.5 block w-full min-h-11 text-sm text-ink file:me-3 file:min-h-11 file:rounded-full file:border-0 file:bg-brand file:px-4 file:font-semibold file:text-ink"
        />
      </Field>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand px-7 text-base font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className={labelClassName} htmlFor={id}>
        {label}
        {required ? <span className="text-brand-deep"> *</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="mt-1.5 text-xs text-ink-muted">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(error?: string) {
  return `${fieldClassName} ${focusRing} ${error ? "border-red-400" : ""}`;
}

function resumeLooksAllowed(file: File): boolean {
  if (!file.type || ALLOWED_TYPES.has(file.type)) {
    return true;
  }
  const name = file.name.toLowerCase();
  return [".pdf", ".docx", ".png", ".jpg", ".jpeg"].some((ext) => name.endsWith(ext));
}

function resumeContentType(file: File): string {
  if (file.type && ALLOWED_TYPES.has(file.type)) {
    return file.type;
  }
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) {
    return "application/pdf";
  }
  if (name.endsWith(".docx")) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  if (name.endsWith(".png")) {
    return "image/png";
  }
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) {
    return "image/jpeg";
  }
  return "application/pdf";
}

function isUploadTicket(value: unknown): value is { objectId: string; uploadUrl: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { objectId?: unknown }).objectId === "string" &&
    typeof (value as { uploadUrl?: unknown }).uploadUrl === "string"
  );
}
