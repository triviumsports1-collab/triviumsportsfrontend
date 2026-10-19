import {
  Card,
  CtaBand,
  MediaSplit,
  PageHero,
  PrimaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { jobsLanding } from "@/lib/content/landings";
import { jobRoles } from "@/lib/content/marketing";
import { jobRolesItemListJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("jobs");

export default function TennisCoachingJobsPage() {
  return (
    <main>
      <PageSeo page="jobs" crumbName="Tennis coaching jobs USA" extras={[jobRolesItemListJsonLd()]} />
      <PageHero
        crumbs={[{ name: "Tennis coaching jobs USA", href: routes.jobs }]}
        kicker={jobsLanding.kicker}
        title={jobsLanding.title}
        lede={jobsLanding.lede}
        image="/images/jobs-hero.jpg"
        imageAlt="A tennis coach standing by the net on a sunlit club court"
        actions={<PrimaryLink href={`${routes.getStarted}?path=coach`}>I am a Coach</PrimaryLink>}
      />

      <Section>
        <MediaSplit
          src="/images/jobs-body.jpg"
          alt="A coach and player talking beside the net after practice"
          reverse
        >
          <h2 className="text-3xl font-semibold tracking-tight">Role types U.S. clubs ask us about</h2>
          <p className="mt-4 text-base leading-7 text-ink-muted">
            These are the tennis jobs directors describe to us. They are not live listings, and there
            is no public apply button until a role is actually open.
          </p>
        </MediaSplit>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {jobRoles.map((role) => (
            <Card key={role.title} title={role.title}>
              <p>{role.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Tell us how you coach."
        lede="A considered introduction to a U.S. club starts with your tennis background, not a scraped ad."
        href={`${routes.getStarted}?path=coach`}
        label="I am a Coach"
      />
    </main>
  );
}
