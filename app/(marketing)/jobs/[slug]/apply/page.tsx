import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JobApplyForm } from "@/components/forms/job-apply-form";
import { PageHero, Section } from "@/components/marketing/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/schema";
import { getPublishedJob } from "@/lib/jobs/public";
import { absoluteUrl } from "@/lib/seo";
import { jobsBoardPublic, routes } from "@/lib/site";

export const revalidate = 120;

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
  return {
    title: `Apply · ${job.title}`,
    description: `Apply for the ${job.title} tennis coaching role at a U.S. club.`,
    alternates: { canonical: absoluteUrl(`/jobs/${job.slug}`) },
    robots: { index: false, follow: true },
  };
}

export default async function JobApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!jobsBoardPublic) {
    notFound();
  }
  const { slug } = await params;
  const job = await getPublishedJob(slug);
  if (!job) {
    notFound();
  }
  const place = [job.city, job.state].filter(Boolean).join(", ");
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: routes.home },
          { name: "Open roles", path: routes.jobsBoard },
          { name: job.title, path: `/jobs/${job.slug}` },
          { name: "Apply", path: `/jobs/${job.slug}/apply` },
        ])}
      />
      <PageHero
        crumbs={[
          { name: "Open roles", href: routes.jobsBoard },
          { name: job.title, href: `/jobs/${job.slug}` },
          { name: "Apply", href: `/jobs/${job.slug}/apply` },
        ]}
        kicker="Apply"
        title={`Apply for ${job.title}`}
        lede={
          place
            ? `${place}. Tell the club about your tennis coaching background and attach a resume.`
            : "Tell the club about your tennis coaching background and attach a resume."
        }
      />
      <Section>
        <div className="max-w-2xl">
          <JobApplyForm slug={job.slug} jobTitle={job.title} />
        </div>
      </Section>
    </main>
  );
}
