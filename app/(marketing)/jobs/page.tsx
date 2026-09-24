import { JobBoard } from "@/components/marketing/job-board";
import { PageHero, Section } from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { JOB_BOARD_PAGE_SIZE, listPublishedJobs } from "@/lib/jobs/public";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const revalidate = 0;

export const metadata = pageMetadata("jobsBoard");

function parsePage(raw: string | undefined): number {
  const value = Number(raw ?? "1");
  if (!Number.isFinite(value) || value < 1) {
    return 1;
  }
  return Math.floor(value);
}

export default async function JobsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; state?: string; roleType?: string }>;
}) {
  const params = await searchParams;
  const page = parsePage(params.page);
  const q = (params.q ?? "").trim();
  const state = (params.state ?? "").trim().toUpperCase();
  const roleType = (params.roleType ?? "").trim();
  const listing = await listPublishedJobs({
    page: page - 1,
    size: JOB_BOARD_PAGE_SIZE,
    q,
    state,
    roleType,
  });
  const size = listing.size || JOB_BOARD_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(listing.totalElements / size) || 1);
  return (
    <main>
      <PageSeo page="jobsBoard" crumbName="Jobs" />
      <PageHero
        crumbs={[{ name: "Jobs", href: routes.jobsBoard }]}
        kicker="Jobs"
        title="Open tennis coaching roles at U.S. clubs."
        lede="Newest listings first. Each card is a published tennis role — title, city, and apply path are in this HTML for you and for search engines."
      />
      <Section>
        <JobBoard
          jobs={listing.content}
          total={listing.totalElements}
          page={page}
          totalPages={totalPages}
          q={q}
          state={state}
          roleType={roleType}
        />
      </Section>
    </main>
  );
}
