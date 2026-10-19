import { IntakeSection } from "@/components/forms/intake-section";
import { FramedPhoto, PageHero, Section } from "@/components/marketing/page-shell";
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
        image="/images/players-body.jpg"
        imageAlt="Players training on outdoor academy courts"
      />
      <Section tone="elevated">
        <div className="grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <FramedPhoto
            src="/images/coaches-body.jpg"
            alt="A basket of tennis balls next to the net"
          />
          <IntakeSection />
        </div>
      </Section>
    </main>
  );
}
