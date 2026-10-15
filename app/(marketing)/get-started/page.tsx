import { IntakeSection } from "@/components/forms/intake-section";
import { PageHero, Section } from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("getStarted");

export default function GetStartedPage() {
  return (
    <main>
      <PageSeo page="getStarted" crumbName="Get started" />
      <PageHero
        crumbs={[{ name: "Get started", href: routes.getStarted }]}
        kicker="Get started"
        title="Tell us whether you coach, play, or run a club."
        lede="Choose coach, player, or club. We will ask the tennis questions that fit that path."
      />
      <Section tone="elevated">
        <IntakeSection />
      </Section>
    </main>
  );
}
