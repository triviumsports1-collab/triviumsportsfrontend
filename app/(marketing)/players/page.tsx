import { IntakeSection } from "@/components/forms/intake-section";
import {
  Card,
  CtaBand,
  MediaSplit,
  PageHero,
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
        image="/images/players-hero.jpg"
        imageAlt="A professional tennis player practicing on an outdoor hard court"
        actions={
          <>
            <PrimaryLink href="#player-intake">Share your goals</PrimaryLink>
            <SecondaryLink href={routes.howItWorks}>How it works</SecondaryLink>
          </>
        }
      />

      <Section>
        <MediaSplit
          src="/images/players-body.jpg"
          alt="Professional players practicing on adjacent outdoor hard courts"
        >
          <h2 className="text-3xl font-semibold tracking-tight">Player management for a U.S. tennis stay</h2>
          <p className="mt-4 text-base leading-7 text-ink-muted">
            Player management here means one professional point of contact for an international
            professional athlete who wants academy placement, a defined training block, or competition
            planning in the United States. It is not college recruiting.
          </p>
        </MediaSplit>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {playerLanding.help.map((item) => (
            <Card key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">How we support professional athletes</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          <Card title="Professional management">
            <p>One point of contact for the athlete’s season and career.</p>
          </Card>
          <Card title="Competition oversight">
            <p>Tournament schedule, entries, travel, and training planned together.</p>
          </Card>
          <Card title="Immigration support through counsel">
            <p>We work with immigration counsel so athletes can train and compete in the U.S.</p>
          </Card>
        </ul>
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
