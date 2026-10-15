import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero, Section } from "@/components/marketing/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, jobPostingJsonLd } from "@/lib/schema";
import { getPublishedJob } from "@/lib/jobs/public";
import { absoluteUrl } from "@/lib/seo";
import { jobsBoardPublic, routes, site } from "@/lib/site";

export const revalidate = 120;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}


function locationLabel(city: string | null, state: string | null) {
  return [city, state].filter(Boolean).join(", ");
}

function visaCopy(stance: string) {
  if (stance === "MUST_BE_AUTHORIZED") {
    return "U.S. work authorization required.";
  }
  if (stance === "OPEN_TO_DISCUSSION") {
    return "The club is open to discussing work authorization. We work with immigration counsel. Trivium Sports is not a law firm.";
  }
  return "Work authorization details are discussed case by case. Trivium Sports is not a law firm.";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  if (!jobsBoardPublic) {
    return { title: "Roles", robots: { index: false, follow: false } };
  }
  const { slug } = await params;
  const job = await getPublishedJob(slug);
  if (!job) {
    return { title: "Role not found", robots: { index: false, follow: false } };
  }
  const place = locationLabel(job.city, job.state);
  const title = place ? `${job.title} · ${place}` : job.title;
  const description = `${job.title} tennis coaching role${place ? ` in ${place}` : " in the United States"}. ${visaCopy(job.visaStance)}`.slice(
    0,
    160,
  );
  const url = absoluteUrl(`/jobs/${job.slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!jobsBoardPublic) {
    notFound();
  }
  const { slug } = await params;
  const job = await getPublishedJob(slug);
  if (!job) {
    notFound();
  }
  const place = locationLabel(job.city, job.state);
  return (
    <main>
      <JsonLd data={jobPostingJsonLd(job)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: routes.home },
          { name: "Open roles", path: routes.jobsBoard },
          { name: job.title, path: `/jobs/${job.slug}` },
        ])}
      />
      <PageHero
        crumbs={[
          { name: "Open roles", href: routes.jobsBoard },
          { name: job.title, href: `/jobs/${job.slug}` },
        ]}
        kicker="Tennis coaching role"
        title={job.title}
        lede={place ? `${place} · United States` : "United States"}
      />
      <Section>
        <p className="whitespace-pre-wrap text-base leading-7 text-ink">{job.description}</p>
        <p className="mt-6 text-sm text-ink-muted">{visaCopy(job.visaStance)}</p>
        {job.applyBy ? <p className="mt-2 text-sm text-ink-muted">Apply by {job.applyBy}.</p> : null}
        <p className="mt-8">
          <a
            href={`/jobs/${job.slug}/apply`}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated"
          >
            Apply now
          </a>
        </p>
      </Section>
    </main>
  );
}
