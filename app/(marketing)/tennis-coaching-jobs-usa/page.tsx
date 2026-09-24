import {
  Card,
  CtaBand,
  PageHero,
  PrimaryLink,
  SecondaryLink,
  Section,
  PillarGrid,
} from "@/components/marketing/page-shell";
import { PublishedRolesPreview } from "@/components/marketing/published-roles-preview";
import { PageSeo } from "@/components/seo/page-seo";
import { jobsLanding } from "@/lib/content/landings";
import { jobRoles } from "@/lib/content/marketing";
import { listPublishedJobs } from "@/lib/jobs/public";
import { jobPostingJsonLd, jobRolesItemListJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("jobs");

export default async function JobsPage() {
  const published = await listPublishedJobs({ page: 0, size: 3, roleType: "COACH_STAFF" });
  const live = published.content.slice(0, 3);

  return (
    <main>
      <PageSeo
        page="jobs"
        crumbName="Tennis coaching jobs USA"
        extras={[jobRolesItemListJsonLd(), ...live.map((job) => jobPostingJsonLd(job))]}
      />
      <PageHero
        crumbs={[{ name: "Tennis coaching jobs USA", href: routes.jobs }]}
        kicker={jobsLanding.kicker}
        title={jobsLanding.title}
        lede={jobsLanding.lede}
        actions={
          <>
            <PrimaryLink href={`${routes.getStarted}?path=coach`}>Tell us about you</PrimaryLink>
            <SecondaryLink href={routes.jobsBoard}>See open roles</SecondaryLink>
          </>
        }
      />

      <Section>
        <PillarGrid
          heading={jobsLanding.pillarHeading}
          lede={jobsLanding.pillarLede}
          items={jobsLanding.pillars}
        />
      </Section>

      <Section tone="elevated">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">Live board</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Recently published roles</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
          Titles and locations are rendered on the server. Club names stay off this page. Full
          listings live on the jobs board.
        </p>
        <div className="mt-8">
          <PublishedRolesPreview jobs={live} />
        </div>
        {live.length > 0 ? (
          <a
            href={routes.jobsBoard}
            className="mt-8 inline-flex min-h-11 items-center font-semibold text-brand-deep hover:text-ink"
          >
            Browse all published roles →
          </a>
        ) : null}
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">Types of roles</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
          Even when a listing is not live, this is the tennis work U.S. clubs ask us to fill.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {jobRoles.map((role) => (
            <Card key={role.title} title={role.title}>
              <p>{role.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">What we will not do here</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
          We will not publish a scraped list of expired ads. Tennis directors talk to us about
          calendars, culture, and the kind of professional who should walk onto their courts.
          If that sounds slower than a job board, that is intentional.
        </p>
      </Section>

      <CtaBand
        title="Tell us about you."
        lede="College tennis, certifications, OPT or STEM OPT timing, and the kind of court you want to own. We will follow up personally."
        href={`${routes.getStarted}?path=coach`}
        label="Tell us about you"
      />
    </main>
  );
}
