import {
  Card,
  CtaBand,
  PageHero,
  PrimaryLink,
  SecondaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
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
        kicker="Coaching after college"
        title="OPT and STEM OPT, explained for tennis players."
        lede="Eligibility ends. The dual-match language you spent four years learning does not. Trivium helps former college players understand how Optional Practical Training can support a coaching chapter at U.S. clubs — and then makes the introduction."
        actions={
          <>
            <PrimaryLink href={`${routes.getStarted}?path=coach`}>Start coach intake</PrimaryLink>
            <SecondaryLink href={routes.coaches}>Coaches already in the U.S.</SecondaryLink>
          </>
        }
      />

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">What OPT is (in tennis terms)</h2>
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
        <p className="mt-8 max-w-3xl text-sm leading-6 text-ink-muted">
          This page is educational, not legal advice. Your Designated School Official and, where
          appropriate, licensed immigration counsel are the authorities on your case. Trivium does
          not file petitions and does not tell you which category you “should” use.
        </p>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">How Trivium helps the transition</h2>
        <ol className="mt-8 max-w-3xl space-y-6">
          {[
            {
              t: "Translate the college game",
              d: "Directors do not need another highlight reel of match wins. They need to know you can run a clinic, hold a standard, and show up for the 7 a.m. court.",
            },
            {
              t: "Time the calendar",
              d: "College seasons and club calendars do not automatically match. We talk about when you can actually be on court.",
            },
            {
              t: "Introduce you to tennis homes",
              d: "U.S. clubs and academies that want dedicated coaches — not a one-week trial advertised as a career.",
            },
          ].map((item, index) => (
            <li key={item.t} className="border-b border-line pb-6">
              <p className="text-sm font-semibold tabular-nums text-brand">0{index + 1}</p>
              <h3 className="mt-1 text-xl font-semibold">{item.t}</h3>
              <p className="mt-2 text-base leading-7 text-ink-muted">{item.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">OPT questions, answered plainly</h2>
        <dl className="mt-8 max-w-3xl space-y-8">
          {optFaqs.map((item) => (
            <div key={item.q}>
              <dt className="text-lg font-semibold text-ink">{item.q}</dt>
              <dd className="mt-2 text-base leading-7 text-ink-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
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
