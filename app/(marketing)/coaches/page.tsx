import { IntakeSection } from "@/components/forms/intake-section";
import {
  CtaBand,
  FaqBlock,
  PageHero,
  PillarGrid,
  PrimaryLink,
  SecondaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { legacyCoachFaqs, legacyCoaches, legacyHome } from "@/lib/content/legacy";
import { howToFromSteps } from "@/lib/schema";
import { pageMetadata, pages } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("coaches");

export default function CoachesPage() {
  return (
    <main>
      <PageSeo
        page="coaches"
        crumbName="Coaches"
        extras={[
          howToFromSteps(
            "How Trivium Sports works with tennis coaches",
            pages.coaches.description,
            legacyCoaches.pillars.map((item) => ({ t: item.title, d: item.body })),
          ),
        ]}
      />
      <PageHero
        crumbs={[{ name: "Coaches", href: routes.coaches }]}
        kicker={legacyCoaches.kicker}
        title={legacyCoaches.title}
        lede={legacyCoaches.lede}
        actions={
          <>
            <PrimaryLink href="#coach-intake">Begin your coaching journey</PrimaryLink>
            <SecondaryLink href={routes.howItWorks}>How it works →</SecondaryLink>
          </>
        }
      />

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">{legacyCoaches.whatYouGetHeading}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {legacyCoaches.whatYouGet.map((item) => (
            <li
              key={item}
              className="rounded-3xl border border-line bg-canvas-elevated p-6 text-base leading-7 text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="elevated">
        <PillarGrid
          heading={legacyCoaches.expectHeading}
          lede={`${legacyCoaches.expectP1} ${legacyCoaches.expectP2}`}
          items={legacyCoaches.pillars}
        />
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">{legacyCoaches.lookingHeading}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyCoaches.lookingP1}</p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyCoaches.lookingP2}</p>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">Already in the United States</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyHome.forCoaches}</p>
        <div className="mt-8">
          <FaqBlock items={legacyCoachFaqs} />
        </div>
      </Section>

      <Section id="coach-intake">
        <IntakeSection lockedPath="coach" />
      </Section>

      <CtaBand
        title={legacyCoaches.ctaTitle}
        lede={legacyCoaches.ctaLede}
        href="#coach-intake"
        label="Tell us about you"
      />
    </main>
  );
}
