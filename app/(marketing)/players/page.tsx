import { IntakeSection } from "@/components/forms/intake-section";
import {
  Card,
  CtaBand,
  PageHero,
  PillarGrid,
  PrimaryLink,
  SecondaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { playerLanding } from "@/lib/content/landings";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("players");

export default function PlayersPage() {
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
            <PrimaryLink href="#player-intake">Share your goals</PrimaryLink>
            <SecondaryLink href={routes.howItWorks}>How it works</SecondaryLink>
          </>
        }
      />

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">Player management for a U.S. tennis stay</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">
          Player management here means one professional point of contact for an adult who wants
          academy placement, a defined training block, or competition planning in the United States.
          It is not college recruiting, and it is not a program for minors.
        </p>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {playerLanding.help.map((item) => (
            <Card key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section tone="elevated">
        <PillarGrid
          heading={playerLanding.pillarHeading}
          lede={playerLanding.pillarLede}
          items={playerLanding.pillars}
        />
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">Choose the shape of the stay</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {playerLanding.compare.map((item) => (
            <Card key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section tone="elevated" id="player-intake">
        <IntakeSection lockedPath="player" />
      </Section>

      <CtaBand
        title="Share your goals"
        lede="Level, dates, and whether you want a training block, an academy season, or a competition calendar."
        href="#player-intake"
        label="Share your goals"
      />
    </main>
  );
}
