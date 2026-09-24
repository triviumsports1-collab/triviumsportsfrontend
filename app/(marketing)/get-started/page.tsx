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
        title="Select your path before we ask a single tennis question."
        lede="Coach, player, or club — the form stays closed until you choose. That is how we keep the conversation professional and relevant."
      />
      <Section tone="elevated">
        <IntakeSection />
      </Section>
    </main>
  );
}
