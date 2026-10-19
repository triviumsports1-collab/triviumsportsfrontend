import type { ReactNode } from "react";
import Image from "next/image";
import { routes } from "@/lib/site";
import { Breadcrumbs, type Crumb } from "@/components/seo/breadcrumbs";
import { CourtBackdrop } from "@/components/marketing/tennis-mark";
import { trustPills, type Pillar, type PillarIcon } from "@/lib/content/landings";

export function PageHero({
  kicker,
  title,
  lede,
  actions,
  crumbs,
  image,
  imageAlt,
}: {
  kicker: string;
  title: string;
  lede: string;
  actions?: ReactNode;
  crumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
}) {
  const copy = (
    <>
      {crumbs?.length ? (
        <div className="[&_a]:text-brand [&_a:hover]:text-canvas-elevated [&_li]:text-white/70 [&_nav]:text-white/70 [&_span]:text-canvas-elevated">
          <Breadcrumbs items={crumbs} />
        </div>
      ) : null}
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">{kicker}</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-canvas-elevated sm:text-5xl sm:leading-[1.08]">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{lede}</p>
      {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
      <ul className="mt-10 flex max-w-3xl flex-wrap gap-2">
        {trustPills.map((pill) => (
          <li
            key={pill}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/85"
          >
            {pill}
          </li>
        ))}
      </ul>
    </>
  );

  if (image) {
    return (
      <section className="border-b border-line bg-ink text-canvas-elevated">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 lg:py-16">
          <div>{copy}</div>
          <FramedPhoto src={image} alt={imageAlt ?? ""} priority tone="dark" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-line bg-ink text-canvas-elevated">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] opacity-90 lg:block" aria-hidden="true">
        <CourtBackdrop />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-20">{copy}</div>
    </section>
  );
}

export function FramedPhoto({
  src,
  alt,
  priority = false,
  tone = "light",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <figure
      className={
        tone === "dark"
          ? "rounded-[1.75rem] border border-white/15 bg-white/5 p-2 sm:p-3"
          : "rounded-[1.75rem] border border-line bg-canvas p-2 shadow-[0_18px_40px_rgba(15,28,22,0.08)] sm:p-3"
      }
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={900}
        priority={priority}
        sizes="(min-width: 1024px) 34rem, 100vw"
        className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
      />
    </figure>
  );
}

export function MediaSplit({
  src,
  alt,
  children,
  reverse = false,
}: {
  src: string;
  alt: string;
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <div className={reverse ? "lg:order-2" : undefined}>{children}</div>
      <div className={reverse ? "lg:order-1" : undefined}>
        <FramedPhoto src={src} alt={alt} />
      </div>
    </div>
  );
}

export function PillarIconMark({ name }: { name: PillarIcon }) {
  const common = "h-7 w-7 text-brand";
  if (name === "architecture") {
    return (
      <svg className={common} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 26V12l10-6 10 6v14H6Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M13 26v-8h6v8" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    );
  }
  if (name === "professionals") {
    return (
      <svg className={common} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="10" r="4" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 26c1.5-5 4.2-7.5 8-7.5S22.5 21 24 26" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "compliance") {
    return (
      <svg className={common} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.75" />
        <path d="M5 16h22M16 5c3.2 3.4 4.8 7.2 4.8 11S19.2 23.6 16 27c-3.2-3.4-4.8-7.2-4.8-11S12.8 8.4 16 5Z" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 9c5 3 8 7 8 14M24 9c-5 3-8 7-8 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function PillarGrid({
  kicker = "The standard",
  heading,
  lede,
  items,
}: {
  kicker?: string;
  heading: string;
  lede?: string;
  items: readonly Pillar[];
}) {
  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">{kicker}</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight">{heading}</h2>
      {lede ? <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">{lede}</p> : null}
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.title}>
            <article className="flex h-full flex-col rounded-3xl border border-line bg-canvas-elevated p-6 transition duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_16px_40px_rgba(18,38,26,0.08)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15">
                <PillarIconMark name={item.icon} />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-ink-muted">{item.body}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}

export function StepGrid({
  steps,
}: {
  steps: readonly { n: string; t: string; d: string }[];
}) {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((step) => (
        <li
          key={step.n}
          className="rounded-3xl border border-line bg-canvas-elevated p-6 shadow-[0_1px_0_rgba(18,38,26,0.04)]"
        >
          <p className="text-3xl font-semibold tabular-nums text-brand">{step.n}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight">{step.t}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{step.d}</p>
        </li>
      ))}
    </ol>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-3xl rounded-2xl border border-line bg-canvas px-5 py-4 text-sm leading-6 text-ink-muted">
      {children}
    </p>
  );
}

export function FaqBlock({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-canvas-elevated">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-ink">
            <span>{item.q}</span>
            <span className="text-brand group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-base leading-7 text-ink-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Section({
  id,
  children,
  tone = "default",
}: {
  id?: string;
  children: ReactNode;
  tone?: "default" | "elevated" | "ink";
}) {
  const tones = {
    default: "bg-canvas text-ink",
    elevated: "bg-canvas-elevated text-ink",
    ink: "bg-ink text-canvas-elevated",
  } as const;

  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-line ${tones[tone]}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">{children}</div>
    </section>
  );
}

export function Card({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-line bg-canvas-elevated p-6 text-ink transition duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_16px_40px_rgba(18,38,26,0.08)]">
      {kicker ? (
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-deep">{kicker}</p>
      ) : null}
      <h3 className="mt-2 text-xl font-semibold tracking-tight">{title}</h3>
      <div className="mt-3 flex-1 text-sm leading-6 text-ink-muted">{children}</div>
    </article>
  );
}

export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated"
    >
      {children}
    </a>
  );
}

export function SecondaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-canvas-elevated px-7 text-base font-semibold text-ink hover:border-brand"
    >
      {children}
    </a>
  );
}

export function CtaBand({
  title,
  lede,
  href = routes.getStarted,
  label = "Get started",
}: {
  title: string;
  lede: string;
  href?: string;
  label?: string;
}) {
  return (
    <Section tone="ink">
      <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-white/75">{lede}</p>
        </div>
        <div className="lg:justify-self-end">
          <a
            href={href}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-8 text-base font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated"
          >
            {label}
          </a>
        </div>
      </div>
    </Section>
  );
}

export const fieldClassName =
  "mt-1.5 w-full min-h-11 rounded-xl border border-line bg-canvas px-3 text-base text-ink placeholder:text-ink-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export const labelClassName = "block text-sm font-medium text-ink";
