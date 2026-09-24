import { IntakeSection } from "@/components/forms/intake-section";
import {
  Card,
  CtaBand,
  PageHero,
  PrimaryLink,
  SecondaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("coaches");

export default function CoachesPage() {
  return (
    <main>
      <PageSeo page="coaches" crumbName="Coaches" />
      <PageHero
        crumbs={[{ name: "Coaches", href: routes.coaches }]}
        kicker="Coaches"
        title="International tennis coaches already in the United States."
        lede="If you are on OPT or STEM OPT and ready to coach full tennis days — clinics, private lessons, junior development — Trivium is the professional introduction to U.S. clubs and academies."
        actions={
          <>
            <PrimaryLink href="#coach-intake">Open coach intake</PrimaryLink>
            <SecondaryLink href={routes.afterCollege}>Coaching after college</SecondaryLink>
          </>
        }
      />

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">Who this page is for</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
          We focus on coaches who are already in the country with a defined practical-training
          window. You do not need to explain tennis to us. You do need a clean story: where you
          trained, how you teach, and when you can be on court.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          <Card kicker="OPT" title="Optional Practical Training">
            <p>
              You finished (or are finishing) a U.S. degree and want the next chapter to be tennis
              coaching — not a holding pattern.
            </p>
          </Card>
          <Card kicker="STEM OPT" title="Extended training window">
            <p>
              You have additional time and want a club that can use a high-performance or academy
              professional with a longer horizon.
            </p>
          </Card>
          <Card kicker="On court" title="Club-ready habits">
            <p>
              Directors need people who can run a 4.0 clinic, a 10-and-under court, and a serious
              private without losing the room.
            </p>
          </Card>
        </ul>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">How Trivium works with coaches</h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Intake",
              d: "We collect résumé, certifications, status (at a high level), and where you can live.",
            },
            {
              n: "02",
              t: "Club conversations",
              d: "We introduce you to tennis directors whose calendar matches how you actually coach.",
            },
            {
              n: "03",
              t: "On-court chapter",
              d: "Trivium coaches work at clubs. We stay involved so the placement is professional, not informal.",
            },
          ].map((s) => (
            <li key={s.n}>
              <p className="text-3xl font-semibold tabular-nums text-brand">{s.n}</p>
              <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl text-sm leading-6 text-ink-muted">
          Trivium Sports is not a law firm and does not provide immigration advice. Status questions
          belong with your DSO and licensed counsel. We coordinate with clubs so tennis work is
          structured and transparent.
        </p>
      </Section>

      <Section tone="elevated">
        <IntakeSection lockedPath="coach" id="coach-intake" />
      </Section>

      <CtaBand
        title="Looking at roles, not only an introduction?"
        lede="Read how U.S. club professional and high-performance tennis roles typically show up — then tell us about you."
        href={routes.jobsBoard}
        label="See open tennis roles"
      />
    </main>
  );
}
