import { FaqBlock, MediaSplit, PageHero, Section } from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { faqGroups } from "@/lib/content/marketing";
import { allFaqItems, faqJsonLd } from "@/lib/schema";
import { pageMetadata, pages } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("faq");

export default function FaqPage() {
  return (
    <main>
      <PageSeo
        page="faq"
        crumbName="FAQ"
        extras={[faqJsonLd(allFaqItems(), pages.faq.path)]}
      />
      <PageHero
        crumbs={[{ name: "FAQ", href: routes.faq }]}
        kicker="FAQ"
        title="Straight answers, grouped by audience."
        lede="If your question is about immigration, contact us and we will help you find the right next step. Tennis and process questions are answered here."
        image="/images/after-college-hero.jpg"
        imageAlt="An outdoor tennis court in the evening"
      />

      {faqGroups.map((group, index) => (
        <Section key={group.title} tone={index % 2 === 0 ? "elevated" : "default"}>
          <h2 className="text-3xl font-semibold tracking-tight">{group.title}</h2>
          <div className="mt-8 max-w-3xl">
            <FaqBlock items={group.items} />
          </div>
        </Section>
      ))}

      <Section>
        <MediaSplit
          src="/images/after-college-body.jpg"
          alt="A player hitting on an outdoor hard court"
          reverse
        >
          <h2 className="text-3xl font-semibold tracking-tight">Still looking?</h2>
          <p className="mt-4 text-base leading-7 text-ink-muted">
            <a className="inline-flex min-h-11 items-center font-semibold text-brand-deep" href={routes.contact}>
              Contact us
            </a>{" "}
            or{" "}
            <a className="inline-flex min-h-11 items-center font-semibold text-brand-deep" href={routes.getStarted}>
              start an intake
            </a>
            .
          </p>
        </MediaSplit>
      </Section>
    </main>
  );
}
