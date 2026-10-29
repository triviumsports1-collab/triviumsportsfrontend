// Server-only. Uses the shared resolver so the Spring URL is configured in one place.
import { resolveSpringBase } from "@/lib/api/spring-base";

export type PublishedJob = {
  id: string;
  slug: string;
  title: string;
  description: string;
  sport: string | null;
  roleType: "PLAYER_TRIAL" | "COACH_STAFF" | string;
  city: string | null;
  state: string | null;
  remoteFlag: boolean;
  compensationNotes: string | null;
  visaStance: "MUST_BE_AUTHORIZED" | "OPEN_TO_DISCUSSION" | "UNSPECIFIED" | string;
  startsOn: string | null;
  applyBy: string | null;
  status?: string;
  publishedAt: string | null;
  createdAt?: string | null;
};

export type JobPage = {
  content: PublishedJob[];
  page: number;
  size: number;
  totalElements: number;
};

export type JobListQuery = {
  page?: number;
  size?: number;
  q?: string;
  state?: string;
  roleType?: string;
};

export const JOB_BOARD_PAGE_SIZE = 12;

export const ROLE_TYPE_LABELS: Record<string, string> = {
  COACH_STAFF: "Coaching",
  PLAYER_TRIAL: "Player trial",
  PLAYER_SEASON: "Player season",
  OTHER: "Other",
};

function apiBase(): string {
  return resolveSpringBase();
}

function postedMillis(job: PublishedJob): number {
  const raw = job.publishedAt ?? job.createdAt;
  if (!raw) {
    return 0;
  }
  const value = Date.parse(raw);
  return Number.isNaN(value) ? 0 : value;
}

export function sortPublishedNewestFirst(jobs: PublishedJob[]): PublishedJob[] {
  return [...jobs].sort((left, right) => postedMillis(right) - postedMillis(left));
}

function omitClubIdentity(job: PublishedJob): PublishedJob {
  const copy = { ...job } as Record<string, unknown>;
  delete copy.organizationId;
  delete copy.organizationName;
  delete copy.metadata;
  return copy as PublishedJob;
}

export async function listPublishedJobs(query: JobListQuery = {}): Promise<JobPage> {
  const page = Math.max(query.page ?? 0, 0);
  const size = Math.min(Math.max(query.size ?? JOB_BOARD_PAGE_SIZE, 1), 50);
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("size", String(size));
  const q = query.q?.trim();
  if (q) {
    params.set("q", q.slice(0, 80));
  }
  const state = query.state?.trim();
  if (state) {
    params.set("state", state);
  }
  const roleType = query.roleType?.trim();
  if (roleType) {
    params.set("roleType", roleType);
  }
  try {
    const response = await fetch(`${apiBase()}/api/v1/jobs?${params.toString()}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return { content: [], page, size, totalElements: 0 };
    }
    const payload = (await response.json()) as JobPage;
    return {
      ...payload,
      content: sortPublishedNewestFirst((payload.content ?? []).map(omitClubIdentity)),
    };
  } catch {
    return { content: [], page, size, totalElements: 0 };
  }
}

export async function getPublishedJob(slug: string): Promise<PublishedJob | null> {
  try {
    const response = await fetch(`${apiBase()}/api/v1/jobs/${encodeURIComponent(slug)}`, {
      next: { revalidate: 120 },
    });
    if (!response.ok) {
      return null;
    }
    return omitClubIdentity((await response.json()) as PublishedJob);
  } catch {
    return null;
  }
}

export async function listAllPublishedJobSlugs(limit = 200): Promise<PublishedJob[]> {
  const first = await listPublishedJobs({ page: 0, size: 50 });
  const jobs = [...first.content];
  const total = Math.min(first.totalElements, limit);
  const pages = Math.ceil(total / 50);
  for (let page = 1; page < pages; page += 1) {
    const next = await listPublishedJobs({ page, size: 50 });
    jobs.push(...next.content);
  }
  return jobs.slice(0, limit);
}
