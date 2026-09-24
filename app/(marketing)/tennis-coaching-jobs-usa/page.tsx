import {
  Card,
  CtaBand,
  PageHero,
  PrimaryLink,
  SecondaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { jobRoles } from "@/lib/content/marketing";
import { jobRolesItemListJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("jobs");

export default function JobsPage() {
  return (
    <main>
      <PageSeo page="jobs" crumbName="Tennis coaching jobs USA" extras={[jobRolesItemListJsonLd()]} />
      <PageHero
        crumbs={[{ name: "Tennis coaching jobs USA", href: routes.jobs }]}
        kicker="Tennis coaching jobs, USA"
        title="The roles U.S. clubs actually need filled."
        lede="This is not a live job board. We describe the tennis work first — club professional and high-performance — then ask you to tell us about you so we can make a considered introduction."
        actions={
          <>
            <PrimaryLink href={`${routes.getStarted}?path=coach`}>Tell us about you</PrimaryLink>
            <SecondaryLink href={routes.jobsBoard}>See open roles</SecondaryLink>
          </>
        }
      />

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">Types of roles</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {jobRoles.map((role) => (
            <Card key={role.title} title={role.title}>
              <p>{role.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section>
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
