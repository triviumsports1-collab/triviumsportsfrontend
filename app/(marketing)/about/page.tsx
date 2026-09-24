import {
  Card,
  CtaBand,
  PageHero,
  PrimaryLink,
  SecondaryLink,
  Section,
  PillarGrid,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { aboutLanding } from "@/lib/content/landings";
import { sportsOrgAboutJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <main>
      <PageSeo
        page="about"
        crumbName="About"
        type="AboutPage"
        extras={[sportsOrgAboutJsonLd()]}
      />
      <PageHero
        crumbs={[{ name: "About", href: routes.about }]}
        kicker={aboutLanding.kicker}
        title={aboutLanding.title}
        lede={aboutLanding.lede}
        actions={
          <>
            <PrimaryLink href={routes.contact}>Contact</PrimaryLink>
            <SecondaryLink href={routes.howItWorks}>How it works</SecondaryLink>
          </>
        }
      />

      <Section>
        <PillarGrid
          heading={aboutLanding.pillarHeading}
          lede={aboutLanding.pillarLede}
          items={aboutLanding.highlightPillars}
        />
      </Section>

      <Section tone="elevated">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">Background</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Tennis, not a generic agency</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">
          We have lived dual matches, early-morning clinics, and the quiet gap after eligibility
          ends. International coaches already in the United States should not have to explain a
          kick serve in a spreadsheet. Club directors should not have to learn immigration from
          a forum. Trivium exists so those two conversations meet with a professional standard.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {aboutLanding.pillars.map((item) => (
            <Card key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">Compliance standards</h2>
        <ol className="mt-8 max-w-3xl space-y-5">
          {aboutLanding.standards.map((item, index) => (
            <li key={item} className="flex gap-4">
              <span className="text-lg font-semibold tabular-nums text-brand">0{index + 1}</span>
              <p className="text-base leading-7 text-ink-muted">{item}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-ink-muted">
          Read how we handle information in our{" "}
          <a className="font-medium text-brand-deep underline" href={routes.privacy}>
            Privacy Policy
          </a>
          .
        </p>
      </Section>

      <CtaBand
        title="Work with a tennis-exclusive desk."
        lede="Tell us who you are. We will answer as people who have been on court."
      />
    </main>
  );
}
