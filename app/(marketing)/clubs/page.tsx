import { IntakeSection } from "@/components/forms/intake-section";
import {
  Card,
  CtaBand,
  FaqBlock,
  MediaSplit,
  PageHero,
  PillarGrid,
  PrimaryLink,
  SecondaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { legacyClubFaqs, legacyClubs, legacyHome, legacyHowItWorks } from "@/lib/content/legacy";
import { sportsOrgAboutJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("clubs");

export default function ClubsPage() {
  return (
    <main>
      <PageSeo page="clubs" crumbName="Clubs & academies" extras={[sportsOrgAboutJsonLd()]} />
      <PageHero
        crumbs={[{ name: "Clubs & academies", href: routes.clubs }]}
        kicker={legacyClubs.kicker}
        title={legacyClubs.title}
        lede={legacyClubs.lede}
        image="/images/clubs-hero.jpg"
        imageAlt="Outdoor hard courts at a U.S. tennis club"
        actions={
          <>
            <PrimaryLink href="#club-intake">Share your staffing needs</PrimaryLink>
            <SecondaryLink href={routes.about}>Who we are</SecondaryLink>
          </>
        }
      />

      <Section>
        <MediaSplit
          src="/images/clubs-body.jpg"
          alt="A view from a tennis clubhouse out to the outdoor courts"
          reverse
        >
          <h2 className="text-3xl font-semibold tracking-tight">{legacyClubs.expectHeading}</h2>
          <p className="mt-4 text-base leading-7 text-ink-muted">{legacyClubs.expectP1}</p>
          <p className="mt-4 text-base leading-7 text-ink-muted">{legacyClubs.expectP2}</p>
          <p className="mt-4 text-base leading-7 text-ink-muted">{legacyClubs.expectP3}</p>
          <p className="mt-4 text-base leading-7 text-ink-muted">{legacyHome.forClubs}</p>
        </MediaSplit>
      </Section>

      <Section tone="elevated">
        <PillarGrid heading="Hire with Trivium" items={legacyClubs.pillars} />
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">{legacyClubs.whoHeading}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyClubs.whoBody}</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {legacyHowItWorks.clubSteps.map((item) => (
            <Card key={item.t} title={item.t}>
              <p>{item.d}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">For Employers and Clubs</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">
          Access pre-screened international tennis coaches. We help with introductions, timing, and
          fit, then stay available with retention check-ins so your program can focus on tennis.
        </p>
        <div className="mt-8">
          <FaqBlock items={legacyClubFaqs} />
        </div>
      </Section>

      <Section id="club-intake">
        <IntakeSection lockedPath="club" />
      </Section>

      <CtaBand
        title={legacyClubs.ctaTitle}
        lede={legacyClubs.ctaLede}
        href="#club-intake"
        label="Request coaches"
      />
    </main>
  );
}
