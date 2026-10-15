import {
  CtaBand,
  PageHero,
  PrimaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { howItWorksAudiences } from "@/lib/content/marketing";
import { howToJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("howItWorks");

export default function HowItWorksPage() {
  return (
    <main>
      <PageSeo page="howItWorks" crumbName="How it works" extras={howToJsonLd()} />
      <PageHero
        crumbs={[{ name: "How it works", href: routes.howItWorks }]}
        kicker="How it works"
        title="Three audiences. One tennis standard."
        lede="The process is simple on purpose. We do not run a public job board. Each path starts with a conversation, then a human review."
        actions={<PrimaryLink href={routes.getStarted}>Get started</PrimaryLink>}
      />

      <Section tone="elevated">
        <div className="grid gap-10 lg:grid-cols-3">
          {howItWorksAudiences.map((audience) => (
            <div key={audience.id}>
              <h2 className="text-2xl font-semibold tracking-tight">{audience.title}</h2>
              <ol className="mt-6 space-y-5">
                {audience.steps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="text-lg font-semibold tabular-nums text-brand">
                      0{index + 1}
                    </span>
                    <span className="text-sm leading-6 text-ink-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Begin with the correct intake."
        lede="Coach, player, or club. Start with the path that matches you."
      />
    </main>
  );
}
