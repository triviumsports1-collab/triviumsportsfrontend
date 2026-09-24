import {
  Card,
  CtaBand,
  PageHero,
  PrimaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <main>
      <PageSeo page="about" crumbName="About" type="AboutPage" />
      <PageHero
        crumbs={[{ name: "About", href: routes.about }]}
        kicker="About"
        title="Founded on court. Measured by compliance."
        lede="Trivium Sports is a tennis-exclusive agency. The founding team comes from collegiate competition, club coaching, and the unglamorous work of placing people inside U.S. tennis buildings the right way."
        actions={<PrimaryLink href={routes.contact}>Contact</PrimaryLink>}
      />

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">Tennis background</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">
          We have lived dual matches, early-morning clinics, and the quiet gap after eligibility
          ends. International coaches already in the United States should not have to explain a
          kick serve in a spreadsheet. Club directors should not have to learn immigration from
          a forum. Trivium exists so those two conversations meet with a professional standard.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          <Card title="Collegiate tennis">
            <p>
              The founding team competed in and around the U.S. college system — duals, travel,
              and the particular discipline of a season.
            </p>
          </Card>
          <Card title="Club coaching">
            <p>
              We have taught on public parks and high-performance courts. We know the difference
              between a résumé and a Saturday morning that works.
            </p>
          </Card>
          <Card title="International pathways">
            <p>
              OPT, STEM OPT, and related authorizations are part of how many tennis people stay
              on U.S. courts. We treat that reality with care, not slogans.
            </p>
          </Card>
        </ul>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">Compliance standards</h2>
        <ul className="mt-6 max-w-3xl list-disc space-y-3 pl-5 text-base leading-7 text-ink-muted">
          <li>
            We do not provide legal advice. Immigration outcomes belong with DSOs and licensed
            counsel.
          </li>
          <li>
            Sensitive immigration and form data are collected only as needed, stored with access
            control, and never used as marketing content.
          </li>
          <li>
            Work authorization is coordinated as a professional process with clubs — not as an
            informal side conversation.
          </li>
          <li>
            Trivium coaches work at clubs under a clear arrangement. We do not improvise status
            on the back of a lesson pad.
          </li>
        </ul>
        <p className="mt-8 text-sm text-ink-muted">
          Read how we handle information in our{" "}
          <a className="font-medium text-brand-deep underline" href={routes.privacy}>
            Privacy Policy
          </a>
          .
        </p>
      </Section>

      <CtaBand title="Work with a tennis-exclusive desk." lede="Tell us who you are. We will answer as people who have been on court." />
    </main>
  );
}
