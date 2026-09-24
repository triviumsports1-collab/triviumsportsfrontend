import { IntakeSection } from "@/components/forms/intake-section";
import {
  CtaBand,
  PageHero,
  PillarGrid,
  PrimaryLink,
  SecondaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { legacyHome, legacyStudentAthletes } from "@/lib/content/legacy";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("players");

export default function PlayersPage() {
  return (
    <main>
      <PageSeo page="players" crumbName="Players" />
      <PageHero
        crumbs={[{ name: "Players", href: routes.players }]}
        kicker={legacyStudentAthletes.kicker}
        title={legacyStudentAthletes.title}
        lede={legacyStudentAthletes.lede}
        actions={
          <>
            <PrimaryLink href="#player-intake">Tell us about you →</PrimaryLink>
            <SecondaryLink href={routes.afterCollege}>How it works</SecondaryLink>
          </>
        }
      />

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">{legacyStudentAthletes.youBringHeading}</h2>
        <p className="mt-4 text-xl font-semibold tracking-tight">{legacyStudentAthletes.advantage}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {legacyStudentAthletes.youBring.map((item) => (
            <li
              key={item}
              className="rounded-3xl border border-line bg-canvas-elevated p-6 text-base leading-7 text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-base leading-7 text-ink-muted">{legacyHome.forStudentAthletes}</p>
      </Section>

      <Section tone="elevated">
        <PillarGrid
          heading={legacyStudentAthletes.expectHeading}
          lede={legacyStudentAthletes.expect}
          items={legacyStudentAthletes.pillars}
        />
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">{legacyStudentAthletes.lookHeading}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyStudentAthletes.lookP1}</p>
        <h3 className="mt-8 text-xl font-semibold tracking-tight">{legacyStudentAthletes.lookH3}</h3>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-base leading-7 text-ink-muted">
          {legacyStudentAthletes.lookItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-base leading-7 text-ink-muted">{legacyStudentAthletes.lookClose}</p>
      </Section>

      <Section tone="elevated" id="player-intake">
        <IntakeSection lockedPath="player" />
      </Section>

      <CtaBand
        title={legacyStudentAthletes.ctaTitle}
        lede={legacyStudentAthletes.ctaLede}
        href="#player-intake"
        label="share your goals"
      />
    </main>
  );
}
