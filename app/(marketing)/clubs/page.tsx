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
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { clubLanding } from "@/lib/content/landings";
import { faqGroups } from "@/lib/content/marketing";
import { sportsOrgAboutJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("clubs");

export default function ClubsPage() {
  const clubFaqs = faqGroups[2].items;

  return (
    <main>
      <PageSeo
        page="clubs"
        crumbName="Clubs & academies"
        extras={[sportsOrgAboutJsonLd()]}
      />
      <PageHero
        crumbs={[{ name: "Clubs & academies", href: routes.clubs }]}
        kicker={clubLanding.kicker}
        title={clubLanding.title}
        lede={clubLanding.lede}
        actions={
          <>
            <PrimaryLink href="#club-intake">Club intake</PrimaryLink>
            <SecondaryLink href={routes.howItWorks}>How it works</SecondaryLink>
          </>
        }
      />

      <Section>
        <PillarGrid
          heading={clubLanding.pillarHeading}
          lede={clubLanding.pillarLede}
          items={clubLanding.pillars}
        />
      </Section>

      <Section tone="elevated">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">
          Leadership
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">What program leaders ask us for</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {clubLanding.needs.map((item) => (
            <Card key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">How the relationship is framed</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">
          Members should meet a Trivium coach on your courts, wearing your club’s standard. You
          direct the tennis. We make sure the professional arrangement behind that presence is
          orderly — including work authorization coordination with the appropriate advisors.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-line bg-canvas-elevated p-6">
            <h3 className="text-xl font-semibold tracking-tight">You keep</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-muted">
              {clubLanding.split.keep.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-line bg-canvas-elevated p-6">
            <h3 className="text-xl font-semibold tracking-tight">We handle</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-muted">
              {clubLanding.split.we.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">Club questions</h2>
        <div className="mt-8">
          <FaqBlock items={clubFaqs} />
        </div>
        <div className="mt-8">
          <Disclaimer>
            Trivium Sports is a tennis-exclusive desk. We source coaches and coordinate work
            authorization as a professional process. We are not a law firm.
          </Disclaimer>
        </div>
      </Section>

      <Section id="club-intake">
        <IntakeSection lockedPath="club" />
      </Section>

      <CtaBand
        title="Tell us about the courts you need covered."
        lede="A short club intake: location, role mix, and timing. We follow up with a tennis conversation, not a generic sales deck."
        href="#club-intake"
        label="Open club intake"
      />
    </main>
  );
}
