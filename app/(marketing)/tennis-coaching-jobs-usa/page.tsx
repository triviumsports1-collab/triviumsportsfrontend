import {
  CtaBand,
  PageHero,
  PillarGrid,
  PrimaryLink,
  SecondaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PublishedRolesPreview } from "@/components/marketing/published-roles-preview";
import { PageSeo } from "@/components/seo/page-seo";
import { legacyCoaches, legacyHome, legacyHowItWorks } from "@/lib/content/legacy";
import { listPublishedJobs } from "@/lib/jobs/public";
import { jobPostingJsonLd } from "@/lib/schema";
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
        extras={[...live.map((job) => jobPostingJsonLd(job))]}
      />
      <PageHero
        crumbs={[{ name: "Tennis coaching jobs USA", href: routes.jobs }]}
        kicker={legacyCoaches.whatYouGetHeading}
        title={legacyHome.h1}
        lede={legacyHome.lede}
        actions={
          <>
            <PrimaryLink href={`${routes.getStarted}?path=coach`}>I am a Coach</PrimaryLink>
            <SecondaryLink href={routes.jobsBoard}>vetted roles</SecondaryLink>
          </>
        }
      />

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">{legacyCoaches.whatYouGetHeading}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {legacyCoaches.whatYouGet.map((item) => (
            <li
              key={item}
              className="rounded-3xl border border-line bg-canvas-elevated p-6 text-base leading-7 text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="elevated">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">vetted roles</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Vetted coaching jobs nationwide with curated introductions</h2>
        <div className="mt-8">
          <PublishedRolesPreview jobs={live} />
        </div>
        {live.length > 0 ? (
          <a
            href={routes.jobsBoard}
            className="mt-8 inline-flex min-h-11 items-center font-semibold text-brand-deep hover:text-ink"
          >
            vetted roles
          </a>
        ) : null}
      </Section>

      <Section>
        <PillarGrid heading={legacyCoaches.expectHeading} items={legacyCoaches.pillars} />
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">{legacyHowItWorks.differentHeading}</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {legacyHowItWorks.different.map((item) => (
            <li key={item.title} className="rounded-3xl border border-line bg-canvas p-6">
              <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={legacyCoaches.ctaTitle}
        lede={legacyCoaches.ctaLede}
        href={`${routes.getStarted}?path=coach`}
        label="Tell us about you"
      />
    </main>
  );
}
