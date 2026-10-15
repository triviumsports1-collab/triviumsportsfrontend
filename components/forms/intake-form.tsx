"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProblemAlert } from "@/components/saas/problem-alert";
import { fieldClassName, labelClassName } from "@/components/marketing/page-shell";
import { isRecord, fieldErrorMap, parseProblem } from "@/lib/api/problem";
import { site } from "@/lib/site";

export type AudiencePath = "coach" | "player" | "club";

const slugs: Record<AudiencePath, string> = {
  coach: "coach-intake",
  player: "player-intake",
  club: "club-intake",
};

const paths: { id: AudiencePath; title: string; lede: string }[] = [
  {
    id: "coach",
    title: "Coach",
    lede: "OPT, STEM OPT, or already coaching — tell us about your tennis résumé.",
  },
  {
    id: "player",
    title: "Player",
    lede: "Academy placement, training blocks, and competition planning. Adults 18 and older.",
  },
  {
    id: "club",
    title: "Club or academy",
    lede: "You need tennis coaches on court. We coordinate the rest professionally.",
  },
];

function isPath(value: string | null): value is AudiencePath {
  return value === "coach" || value === "player" || value === "club";
}

export function IntakeForm({
  lockedPath,
  id = "intake",
}: {
  lockedPath?: AudiencePath;
  id?: string;
}) {
  const searchParams = useSearchParams();
  const queryPath = searchParams.get("path");
  const initial = lockedPath ?? (isPath(queryPath) ? queryPath : null);
  const [path, setPath] = useState<AudiencePath | null>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  const heading = useMemo(() => {
    if (path === "coach") return "Coach intake";
    if (path === "player") return "Player intake";
    if (path === "club") return "Club intake";
    return "Choose your path";
  }, [path]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDetail(null);
    setFields({});
    if (!path) {
      setDetail("Select whether you are a coach, player, or club before continuing.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const payload: Record<string, string | number> = {};
    data.forEach((value, key) => {
      if (key === "path" || typeof value !== "string") {
        return;
      }
      const trimmed = value.trim();
      if (!trimmed) {
        return;
      }
      if (key === "openPositions") {
        payload[key] = Number(trimmed);
        return;
      }
      payload[key] = trimmed;
    });
    setPending(true);
    try {
      const response = await fetch(`/api/v1/forms/${slugs[path]}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      });
      const body: unknown = await response.json().catch(() => null);
      if (response.status !== 201 || !isRecord(body) || typeof body.id !== "string") {
        const problem = parseProblem(body) ?? { detail: "Could not send intake" };
        setDetail(problem.detail ?? "Could not send intake");
        setFields(fieldErrorMap(problem));
        return;
      }
      setSubmitted(true);
    } catch {
      setDetail("Could not reach Trivium Sports. Try again, or email " + site.email + ".");
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <div id={id} className="rounded-3xl border border-line bg-canvas-elevated p-8 text-ink">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">Received</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Thank you.</h2>
        <p className="mt-3 text-base leading-7 text-ink-muted">
          Our tennis team will review your intake and follow up at the email you provided. For a
          faster reply, you may also write {site.email}.
        </p>
      </div>
    );
  }

  return (
    <div id={id} className="rounded-3xl border border-line bg-canvas-elevated p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">Intake</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{heading}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {lockedPath
          ? "Complete the questions below. We do not ask you to upload immigration documents on this public form."
          : path
            ? "Answer the questions for this path. Use Change if you selected the wrong audience."
            : "Select a path first. Questions change so we can qualify the conversation properly."}
      </p>

      {!path ? (
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {paths.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="flex h-full min-h-28 w-full flex-col rounded-2xl border border-line bg-canvas p-5 text-left hover:border-brand"
                onClick={() => setPath(item.id)}
              >
                <span className="text-lg font-semibold text-ink">{item.title}</span>
                <span className="mt-2 text-sm leading-6 text-ink-muted">{item.lede}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <form className="mt-8 space-y-5" onSubmit={(event) => void onSubmit(event)} noValidate>
          <input type="hidden" name="path" value={path} />
          {!lockedPath ? (
            <p className="text-sm text-ink-muted">
              Path: <span className="font-semibold text-ink">{path}</span>{" "}
              <button
                type="button"
                className="min-h-11 font-medium text-brand-deep underline"
                onClick={() => setPath(null)}
              >
                Change
              </button>
            </p>
          ) : null}

          {path === "coach" ? <CoachFields /> : null}
          {path === "player" ? <PlayerFields /> : null}
          {path === "club" ? <ClubFields /> : null}

          <ProblemAlert detail={detail} fieldErrors={fields} />

          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated disabled:opacity-60"
          >
            {pending ? "Sending…" : "Submit intake"}
          </button>
        </form>
      )}
    </div>
  );
}

function CoachFields() {
  return (
    <>
      <Field label="Full name" name="fullName" required autoComplete="name" />
      <Field label="Country you are from" name="countryFrom" required />
      <Field label="Country of citizenship" name="citizenshipCountry" required />
      <Select label="Sport" name="sport" required options={["Tennis"]} />
      <Field label="E-mail" name="email" type="email" required autoComplete="email" />
      <Field label="Phone number (WhatsApp)" name="phone" required autoComplete="tel" hint="Include country code." />
      <Textarea
        label="Professional experiences"
        name="professionalExperience"
        required
        hint="Clubs, academies, college tennis, certifications."
      />
      <Field label="Years coaching" name="yearsCoaching" hint="Optional." />
      <Select label="Willing to relocate within the U.S." name="relocate" options={["Yes", "No", "Open to discussion"]} />
      <Field
        label="Preferred virtual call availability (days/times)"
        name="callAvailability"
        required
      />
      <Textarea label="Anything else you would like us to know?" name="notes" />
    </>
  );
}

function PlayerFields() {
  return (
    <>
      <Field label="Full name" name="fullName" required autoComplete="name" />
      <Field label="College you currently attend in the U.S." name="college" required />
      <Field label="Degree / major" name="major" required />
      <Field label="Expected graduation date" name="graduationDate" type="date" required />
      <Select label="Sport" name="sport" required options={["Tennis"]} />
      <Field label="Nationality" name="nationality" required />
      <Textarea label="Professional experience / athletic background" name="athleticBackground" required />
      <Field label="E-mail" name="email" type="email" required autoComplete="email" />
      <Field label="Phone number (U.S. or WhatsApp)" name="phone" required autoComplete="tel" />
      <Field label="Preferred availability for our virtual call (days/times)" name="callAvailability" required />
      <Select label="I confirm I am 18 or older" name="ageConfirm" required options={["Yes"]} />
      <Textarea label="Anything else you would like us to know?" name="notes" />
    </>
  );
}

function ClubFields() {
  return (
    <>
      <Field label="Club name" name="clubName" required hint="Tennis club or academy." />
      <Field label="Contact person name" name="contactName" required autoComplete="name" />
      <Field label="E-mail" name="email" type="email" required autoComplete="email" />
      <Field label="Contact number" name="phone" required autoComplete="tel" />
      <Field label="Location" name="location" required hint="City and state." />
      <Select label="Primary sport(s) offered" name="sports" required options={["Tennis"]} />
      <Field label="Number of open coaching positions to fill" name="openPositions" type="number" required />
      <Field label="Estimated weekly hours offered to a new coach" name="weeklyHours" required />
      <Field label="When do you need coaches on court?" name="timing" hint="Optional." />
      <Textarea label="Anything else you would like to mention?" name="notes" />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className={labelClassName} htmlFor={name}>
        {label}
        {required ? <span className="text-brand-deep"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        min={type === "number" ? 1 : undefined}
        className={fieldClassName}
      />
      {hint ? <p className="mt-1 text-xs leading-5 text-ink-muted">{hint}</p> : null}
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelClassName} htmlFor={name}>
        {label}
        {required ? <span className="text-brand-deep"> *</span> : null}
      </label>
      <select id={name} name={name} required={required} className={fieldClassName} defaultValue={options.length === 1 ? options[0] : ""}>
        {options.length === 1 ? null : (
          <option value="" disabled>
            Select
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({
  label,
  name,
  hint,
  required,
}: {
  label: string;
  name: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelClassName} htmlFor={name}>
        {label}
        {required ? <span className="text-brand-deep"> *</span> : null}
      </label>
      <textarea id={name} name={name} required={required} rows={5} className={`${fieldClassName} py-3`} />
      {hint ? <p className="mt-1 text-xs leading-5 text-ink-muted">{hint}</p> : null}
    </div>
  );
}
