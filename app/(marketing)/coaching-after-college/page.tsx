import {
  Card,
  CtaBand,
  FaqBlock,
  PageHero,
  PillarGrid,
  PrimaryLink,
  SecondaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { afterCollegeLanding } from "@/lib/content/landings";
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
            <PrimaryLink href={`${routes.getStarted}?path=coach`}>Start the conversation</PrimaryLink>
            <SecondaryLink href={routes.coaches}>For coaches already in the U.S.</SecondaryLink>
          </>
        }
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {afterCollegeLanding.explain.map((item) => (
            <Card key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="elevated">
        <PillarGrid
          heading={afterCollegeLanding.pillarHeading}
          lede={afterCollegeLanding.pillarLede}
          items={afterCollegeLanding.pillars}
        />
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">What we help with</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {afterCollegeLanding.help.map((item) => (
            <Card key={item.t} title={item.t}>
              <p>{item.d}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">OPT and STEM OPT questions</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">
          Plain-language answers for former college tennis players. We work with immigration counsel.
          We do not decide whether you qualify.
        </p>
        <div className="mt-8">
          <FaqBlock items={optFaqs} />
        </div>
      </Section>

      <CtaBand
        title="Start with your tennis story."
        lede="Tell us when you can be on court. Eligibility stays with your DSO."
        href={`${routes.getStarted}?path=coach`}
        label="Tell us about you"
      />
    </main>
  );
}
