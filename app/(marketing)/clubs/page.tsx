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

export const metadata = pageMetadata("clubs");

export default function ClubsPage() {
  return (
    <main>
      <PageSeo page="clubs" crumbName="Clubs & academies" />
      <PageHero
        crumbs={[{ name: "Clubs & academies", href: routes.clubs }]}
        kicker="Clubs & academies"
        title="Trivium coaches work at clubs. You keep the tennis standard."
        lede="We source international and post-collegiate tennis coaches for U.S. clubs and academies, then coordinate work authorization so directors can put professionals on court with a clear, compliant structure."
        actions={
          <>
            <PrimaryLink href="#club-intake">Club intake</PrimaryLink>
            <SecondaryLink href={routes.howItWorks}>How it works</SecondaryLink>
          </>
        }
      />

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">What directors ask us for</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          <Card title="Source tennis coaches">
            <p>
              Club professionals and high-performance coaches who can run clinics and private
              lessons — not generalist “sports staff.”
            </p>
          </Card>
          <Card title="Coordinate work authorization">
            <p>
              Timing, documentation, and a professional process so your club is not improvising
              immigration questions in a group chat.
            </p>
          </Card>
          <Card title="Stay tennis-first">
            <p>
              You set the on-court direction. Trivium coaches work at your club, inside your
              culture and your calendar.
            </p>
          </Card>
        </ul>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">How the relationship is framed</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">
          Members should meet a Trivium coach on your courts, wearing your club’s standard. You
          direct the tennis. We make sure the professional arrangement behind that presence is
          orderly — including work authorization coordination with the appropriate advisors.
        </p>
      </Section>

      <Section tone="elevated">
        <IntakeSection lockedPath="club" id="club-intake" />
      </Section>

      <CtaBand
        title="Tell us about the courts you need covered."
        lede="A short club intake: location, role mix, and timing. We follow up with a tennis conversation, not a generic sales deck."
        href="#club-intake"
        label="Open club intake"
      />
    </main>
  );
}
