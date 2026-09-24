import { PageHero, Section } from "@/components/marketing/page-shell";
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
        lede="If your question is immigration-specific, we will still send you to the right advisor. Tennis and process questions we answer here."
      />

      {faqGroups.map((group, index) => (
        <Section key={group.title} tone={index % 2 === 0 ? "elevated" : "default"}>
          <h2 className="text-3xl font-semibold tracking-tight">{group.title}</h2>
          <dl className="mt-8 max-w-3xl space-y-8">
            {group.items.map((item) => (
              <div key={item.q}>
                <dt className="text-lg font-semibold text-ink">{item.q}</dt>
                <dd className="mt-2 text-base leading-7 text-ink-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ))}

      <Section>
        <p className="text-base text-ink-muted">
          Still looking?{" "}
          <a className="font-semibold text-brand-deep" href={routes.contact}>
            Contact the desk
          </a>{" "}
          or{" "}
          <a className="font-semibold text-brand-deep" href={routes.getStarted}>
            start an intake
          </a>
          .
        </p>
      </Section>
    </main>
  );
}
