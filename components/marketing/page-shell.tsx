import type { ReactNode } from "react";
import { routes } from "@/lib/site";
import { Breadcrumbs, type Crumb } from "@/components/seo/breadcrumbs";

export function PageHero({
  kicker,
  title,
  lede,
  actions,
  crumbs,
}: {
  kicker: string;
  title: string;
  lede: string;
  actions?: ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {crumbs?.length ? <Breadcrumbs items={crumbs} /> : null}
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">
          {kicker}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">{lede}</p>
        {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
      </div>
    </section>
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
    <article className="flex h-full flex-col rounded-3xl border border-line bg-canvas-elevated p-6 text-ink">
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
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-4 text-base leading-7 text-white/75">{lede}</p>
        <a
          href={href}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated"
        >
          {label}
        </a>
      </div>
    </Section>
  );
}

export const fieldClassName =
  "mt-1.5 w-full min-h-11 rounded-xl border border-line bg-canvas px-3 text-base text-ink placeholder:text-ink-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export const labelClassName = "block text-sm font-medium text-ink";
