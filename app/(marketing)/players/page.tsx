import { IntakeSection } from "@/components/forms/intake-section";
import {
  Card,
  CtaBand,
  PageHero,
  PrimaryLink,
  SecondaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("players");

export default function PlayersPage() {
  return (
    <main>
      <PageSeo page="players" crumbName="Players" />
      <PageHero
        crumbs={[{ name: "Players", href: routes.players }]}
        kicker="Players"
        title="U.S. tennis with a plan — not a tourist week."
        lede="For international players who want serious training in the United States: the right academy environment, a competition calendar that makes sense, and a professional point of contact."
        actions={
          <>
            <PrimaryLink href="#player-intake">Player intake</PrimaryLink>
            <SecondaryLink href={routes.howItWorks}>How it works</SecondaryLink>
          </>
        }
      />

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">What we help with</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          <Card title="U.S. training">
            <p>
              Structured blocks at clubs and academies that actually develop tennis — hitting,
              patterns, and physical work — rather than an unstructured “camp.”
            </p>
          </Card>
          <Card title="Academy placement">
            <p>
              Matching level, language, and living situation to a U.S. academy or high-performance
              environment that can host you properly.
            </p>
          </Card>
          <Card title="Competition planning">
            <p>
              USTA, ITF, and sectional calendars coordinated with training, not stacked as a
              random list of tournaments.
            </p>
          </Card>
        </ul>
        <p className="mt-8 max-w-2xl text-sm leading-6 text-ink-muted">
          Accounts and placements are for adults 18 and older on this site. Family inquiries for
          younger players should use the contact form so we can route them separately.
        </p>
      </Section>

      <Section tone="elevated">
        <IntakeSection lockedPath="player" id="player-intake" />
      </Section>

      <CtaBand
        title="Tell us your level and your aim."
        lede="A short player intake is enough to start a professional conversation."
        href="#player-intake"
        label="Open player intake"
      />
    </main>
  );
}
