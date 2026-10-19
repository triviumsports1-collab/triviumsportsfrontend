import {
  CtaBand,
  FramedPhoto,
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
        lede="The process is simple on purpose. We do not run a public job board. Each path starts with a conversation, then a person reviews it."
        image="/images/jobs-body.jpg"
        imageAlt="A coach and player beside the net"
        actions={<PrimaryLink href={routes.getStarted}>Get started</PrimaryLink>}
      />

      <Section tone="elevated">
        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <FramedPhoto
            src="/images/about-court.jpg"
            alt="Wide view of a tennis club’s outdoor courts"
          />
          <div className="grid gap-10">
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
        </div>
      </Section>

      <CtaBand
        title="Begin with the correct intake."
        lede="Coach, player, or club. Start with the path that matches you."
      />
    </main>
  );
}
