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
import { afterCollegeLanding, visaDisclaimer } from "@/lib/content/landings";
import { optFaqs } from "@/lib/content/marketing";
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
        extras={[faqJsonLd(optFaqs, pages.afterCollege.path)]}
      />
      <PageHero
        crumbs={[{ name: "Coaching after college", href: routes.afterCollege }]}
        kicker={afterCollegeLanding.kicker}
        title={afterCollegeLanding.title}
        lede={afterCollegeLanding.lede}
        actions={
          <>
            <PrimaryLink href={`${routes.getStarted}?path=coach`}>Start coach intake</PrimaryLink>
            <SecondaryLink href={routes.coaches}>Coaches already in the U.S.</SecondaryLink>
          </>
        }
      />

      <Section>
        <PillarGrid
          heading={afterCollegeLanding.pillarHeading}
          lede={afterCollegeLanding.pillarLede}
          items={afterCollegeLanding.pillars}
        />
      </Section>

      <Section tone="elevated">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">Education</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">What OPT is (in tennis terms)</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">
          Optional Practical Training (OPT) is a form of work authorization available to many
          F-1 students after (or in some cases during) a qualifying U.S. degree. STEM OPT is an
          extension available only in specific degree categories. Neither is a tennis visa, and
          neither is guaranteed. They are time-bound authorizations that some former college
          players use to coach at U.S. clubs while they plan the next professional step.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          <Card title="OPT">
            <p>
              Typically associated with a 12-month window of practical training related to your
              field of study. Some student-athletes use this period to coach — if the role and
              their DSO’s guidance align.
            </p>
          </Card>
          <Card title="STEM OPT">
            <p>
              An additional period available only if your degree is on the official STEM list and
              you meet every condition. It is not a shortcut, and it is not available to every
              tennis player who competed in college.
            </p>
          </Card>
        </ul>
        <div className="mt-8">
          <Disclaimer>{visaDisclaimer}</Disclaimer>
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">How Trivium helps the transition</h2>
        <ol className="mt-8 max-w-3xl space-y-6">
          {afterCollegeLanding.help.map((item, index) => (
            <li key={item.t} className="border-b border-line pb-6 last:border-0">
              <p className="text-sm font-semibold tabular-nums text-brand">0{index + 1}</p>
              <h3 className="mt-1 text-xl font-semibold">{item.t}</h3>
              <p className="mt-2 text-base leading-7 text-ink-muted">{item.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">OPT questions, answered plainly</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
          Educational answers only. Your DSO and licensed counsel remain the authorities on your case.
        </p>
        <div className="mt-8">
          <FaqBlock items={optFaqs} />
        </div>
      </Section>

      <CtaBand
        title="If you are already on OPT, start as a coach."
        lede="The coach intake is built for people in the country now. Tell us about your college tennis and when you can teach."
        href={`${routes.getStarted}?path=coach`}
        label="Tell us about you"
      />
    </main>
  );
}
