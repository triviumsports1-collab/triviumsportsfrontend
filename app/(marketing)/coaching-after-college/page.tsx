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
import { legacyHome, legacyOptFaqs, legacyStudentAthletes } from "@/lib/content/legacy";
import { faqJsonLd } from "@/lib/schema";
import { pageMetadata, pages } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("afterCollege");

export default function AfterCollegePage() {
  return (
    <main>
      <PageSeo
        page="afterCollege"
        crumbName="Coaching after college"
        extras={[faqJsonLd(legacyOptFaqs, pages.afterCollege.path)]}
      />
      <PageHero
        crumbs={[{ name: "Coaching after college", href: routes.afterCollege }]}
        kicker={legacyStudentAthletes.kicker}
        title={legacyStudentAthletes.title}
        lede={legacyHome.forStudentAthletes}
        actions={
          <>
            <PrimaryLink href={`${routes.getStarted}?path=coach`}>Start the conversation</PrimaryLink>
            <SecondaryLink href={routes.coaches}>Join Our Network</SecondaryLink>
          </>
        }
      />

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">{legacyHome.clearPath.h2}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyHome.clearPath.p1}</p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyHome.clearPath.p2}</p>
      </Section>

      <Section tone="elevated">
        <PillarGrid
          heading={legacyStudentAthletes.expectHeading}
          lede={legacyStudentAthletes.expect}
          items={legacyStudentAthletes.pillars}
        />
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">Legal and Process Questions</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">
          Find clear guidance on OPT, O1, P1, and our compliant placement workflow, delivered in
          collaboration with licensed immigration attorneys.
        </p>
        <div className="mt-8">
          <FaqBlock items={legacyOptFaqs} />
        </div>
      </Section>

      <CtaBand
        title={legacyStudentAthletes.ctaTitle}
        lede={legacyStudentAthletes.ctaLede}
        href={`${routes.getStarted}?path=coach`}
        label="Tell us about you →"
      />
    </main>
  );
}
