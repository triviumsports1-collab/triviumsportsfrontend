import { IntakeSection } from "@/components/forms/intake-section";
import {
  Card,
  CtaBand,
  Disclaimer,
  FaqBlock,
  PageHero,
  PrimaryLink,
  SecondaryLink,
  Section,
  PillarGrid,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { playerLanding } from "@/lib/content/landings";
import { faqGroups } from "@/lib/content/marketing";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("players");

export default function PlayersPage() {
  const playerFaqs = faqGroups[1].items;

  return (
    <main>
      <PageSeo page="players" crumbName="Players" />
      <PageHero
        crumbs={[{ name: "Players", href: routes.players }]}
        kicker={playerLanding.kicker}
        title={playerLanding.title}
        lede={playerLanding.lede}
        actions={
          <>
            <PrimaryLink href="#player-intake">Player intake</PrimaryLink>
            <SecondaryLink href={routes.howItWorks}>How it works</SecondaryLink>
          </>
        }
      />

      <Section>
        <PillarGrid
          heading={playerLanding.pillarHeading}
          lede={playerLanding.pillarLede}
          items={playerLanding.pillars}
        />
      </Section>

      <Section tone="elevated">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">Support</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">What we help with</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {playerLanding.help.map((item) => (
            <Card key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </ul>
        <div className="mt-8">
          <Disclaimer>
            Accounts and placements on this site are for adults 18 and older. Family inquiries for
            younger players should use the contact form so we can route them separately.
          </Disclaimer>
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">Choose the shape of the stay</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
          Tell us which of these you need. Mixing all three without a plan is how a tourist week
          happens by accident.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {playerLanding.compare.map((item) => (
            <Card key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">Player questions</h2>
        <div className="mt-8">
          <FaqBlock items={playerFaqs} />
        </div>
      </Section>

      <Section id="player-intake">
        <IntakeSection lockedPath="player" />
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
