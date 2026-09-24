import { IntakeSection } from "@/components/forms/intake-section";
import {
  Card,
  CtaBand,
  Disclaimer,
  FaqBlock,
  PageHero,
  PrimaryLink,
  SecondaryLink,
  Section,
  PillarGrid,
  StepGrid,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { coachLanding, visaDisclaimer } from "@/lib/content/landings";
import { faqGroups } from "@/lib/content/marketing";
import { howToFromSteps } from "@/lib/schema";
import { pageMetadata, pages } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("coaches");

export default function CoachesPage() {
  const coachFaqs = faqGroups[0].items;

  return (
    <main>
      <PageSeo
        page="coaches"
        crumbName="Coaches"
        extras={[
          howToFromSteps(
            "How Trivium Sports works with tennis coaches",
            pages.coaches.description,
            coachLanding.steps.map((step) => ({ t: step.t, d: step.d })),
          ),
        ]}
      />
      <PageHero
        crumbs={[{ name: "Coaches", href: routes.coaches }]}
        kicker={coachLanding.kicker}
        title={coachLanding.title}
        lede={coachLanding.lede}
        actions={
          <>
            <PrimaryLink href="#coach-intake">Open coach intake</PrimaryLink>
            <SecondaryLink href={routes.afterCollege}>Coaching after college</SecondaryLink>
          </>
        }
      />

      <Section>
        <PillarGrid
          heading={coachLanding.pillarHeading}
          lede={coachLanding.pillarLede}
          items={coachLanding.pillars}
        />
      </Section>

      <Section tone="elevated">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">Audience</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight">
          Who this page is for
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
          We focus on coaches who are already in the country with a defined practical-training
          window. You do not need to explain tennis to us. You do need a clean story: where you
          trained, how you teach, and when you can be on court.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {coachLanding.audience.map((item) => (
            <Card key={item.title} kicker={item.kicker} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">How Trivium works with coaches</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
          Three steps. No scraped listings. Introductions happen with tennis directors whose
          calendars match how you actually coach.
        </p>
        <div className="mt-10">
          <StepGrid steps={coachLanding.steps} />
        </div>
        <div className="mt-10">
          <Disclaimer>{visaDisclaimer}</Disclaimer>
        </div>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">A professional standard</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {coachLanding.proof.map((block) => (
            <article key={block.title} className="rounded-3xl border border-line bg-canvas p-6">
              <h3 className="text-xl font-semibold tracking-tight">{block.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-muted">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">Coach questions</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
          Straight answers before you spend time on the intake.
        </p>
        <div className="mt-8">
          <FaqBlock items={coachFaqs} />
        </div>
      </Section>

      <Section tone="elevated" id="coach-intake">
        <IntakeSection lockedPath="coach" />
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
