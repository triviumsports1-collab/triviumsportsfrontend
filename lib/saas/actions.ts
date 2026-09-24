"use server";

import { revalidatePath } from "next/cache";
import { ApiProblemError, fieldErrorMap, parseProblem, type ProblemJson } from "@/lib/api/problem";
import { springFetch, readJson } from "@/lib/api/server";

export type ActionResult = {
  ok: boolean;
  problem?: ProblemJson;
  fieldErrors?: Record<string, string>;
  id?: string;
  slug?: string;
};

function isNextRedirect(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    String((error as { digest: string }).digest).startsWith("NEXT_REDIRECT")
  );
}

function fail(error: unknown): ActionResult {
  if (isNextRedirect(error)) {
    throw error;
  }
  if (error instanceof ApiProblemError) {
    const detail =
      error.problem.detail ?? error.problem.title ?? `Request failed (${error.status}).`;
    return {
      ok: false,
      problem: { ...error.problem, detail },
      fieldErrors: fieldErrorMap(error.problem),
    };
  }
  if (error instanceof Error && error.message && error.message !== "Request failed") {
    return { ok: false, problem: { detail: error.message } };
  }
  return { ok: false, problem: { detail: "Could not complete this action. Try again." } };
}

function revalidateHours() {
  revalidatePath("/dashboard/coach");
  revalidatePath("/dashboard/coach/timesheets");
  revalidatePath("/dashboard/club");
  revalidatePath("/dashboard/club/timesheets");
}

export async function createTimesheetAction(input: {
  organizationId: string;
  periodStart: string;
  periodEnd: string;
  minutesWorked: number;
  notes?: string;
}): Promise<ActionResult> {
  try {
    const response = await springFetch("/api/v1/me/timesheets", {
      method: "POST",
      body: JSON.stringify(input),
    });
    await readJson(response);
    revalidateHours();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function submitTimesheetAction(timesheetId: string): Promise<ActionResult> {
  try {
    const response = await springFetch(`/api/v1/me/timesheets/${timesheetId}/submit`, { method: "POST" });
    await readJson(response);
    revalidateHours();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function approveTimesheetAction(timesheetId: string): Promise<ActionResult> {
  try {
    const response = await springFetch(`/api/v1/timesheets/${timesheetId}/approve`, { method: "POST" });
    await readJson(response);
    revalidateHours();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function rejectTimesheetAction(timesheetId: string, reason: string): Promise<ActionResult> {
  try {
    const response = await springFetch(`/api/v1/timesheets/${timesheetId}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
    await readJson(response);
    revalidateHours();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function assignShiftAction(input: {
  organizationId: string;
  coachUserId: string;
  startsAt: string;
  endsAt: string;
  location?: string;
  activityType?: string;
}): Promise<ActionResult> {
  try {
    const { organizationId, ...body } = input;
    const response = await springFetch(`/api/v1/organizations/${organizationId}/shifts`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    await readJson(response);
    revalidatePath("/dashboard/club");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function saveVisaAction(input: Record<string, unknown>): Promise<ActionResult> {
  try {
    const response = await springFetch("/api/v1/me/visa-snapshot", {
      method: "PUT",
      body: JSON.stringify(input),
    });
    await readJson(response);
    revalidatePath("/dashboard/coach/compliance");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function generateInvoiceAction(organizationId: string): Promise<ActionResult> {
  try {
    const response = await springFetch(`/api/v1/organizations/${organizationId}/invoices/from-approved-hours`, {
      method: "POST",
    });
    await readJson(response);
    revalidatePath("/dashboard/club");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function saveFormDefinitionAction(input: {
  id?: string;
  slug: string;
  schemaJson: Record<string, unknown>;
}): Promise<ActionResult> {
  try {
    const path = input.id ? `/api/v1/admin/form-definitions/${input.id}` : "/api/v1/admin/form-definitions";
    const response = await springFetch(path, {
      method: input.id ? "PUT" : "POST",
      body: JSON.stringify({ slug: input.slug, schemaJson: input.schemaJson }),
    });
    await readJson(response);
    revalidatePath("/dashboard/admin/forms");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function publishFormAction(id: string): Promise<ActionResult> {
  try {
    const response = await springFetch(`/api/v1/admin/form-definitions/${id}/publish`, { method: "POST" });
    await readJson(response);
    revalidatePath("/dashboard/admin/forms");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

function revalidateOpsJobs() {
  revalidatePath("/dashboard/ops");
  revalidatePath("/dashboard/ops/jobs");
}

export async function createOpsJobAction(input: {
  organizationId: string;
  title: string;
  description: string;
  requirements?: string;
  city?: string;
  state?: string;
  remoteFlag?: boolean;
  roleType: "PLAYER_TRIAL" | "PLAYER_SEASON" | "COACH_STAFF" | "OTHER";
  published: boolean;
}): Promise<ActionResult> {
  try {
    const response = await springFetch("/api/v1/jobs", {
      method: "POST",
      body: JSON.stringify(input),
    });
    const created = await readJson<{ id: string; slug: string }>(response);
    revalidateOpsJobs();
    return { ok: true, id: created.id, slug: created.slug };
  } catch (error) {
    return fail(error);
  }
}

export async function updateOpsJobAction(
  jobId: string,
  input: { published?: boolean; title?: string },
): Promise<ActionResult> {
  try {
    const response = await springFetch(`/api/v1/jobs/${jobId}`, {
      method: "PUT",
      body: JSON.stringify(input),
    });
    await readJson(response);
    revalidateOpsJobs();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function assignPlacementAction(input: {
  organizationId: string;
  coachUserId: string;
  jobId?: string;
  billCentsPerHour: number;
  payCentsPerHour: number;
  startsOn: string;
}): Promise<ActionResult> {
  try {
    const body: Record<string, unknown> = {
      organizationId: input.organizationId,
      coachUserId: input.coachUserId,
      billCentsPerHour: input.billCentsPerHour,
      payCentsPerHour: input.payCentsPerHour,
      startsOn: input.startsOn,
    };
    if (input.jobId) {
      body.jobId = input.jobId;
    }
    const response = await springFetch("/api/v1/placements", {
      method: "POST",
      body: JSON.stringify(body),
    });
    await readJson(response);
    revalidatePath("/dashboard/ops");
    revalidatePath("/dashboard/ops/hiring");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

function revalidateHiring() {
  revalidatePath("/dashboard/ops/hiring");
  revalidatePath("/dashboard/club/hiring");
}

export async function updateApplicationStageAction(
  applicationId: string,
  stage: string,
): Promise<ActionResult> {
  try {
    const response = await springFetch(`/api/v1/applications/${applicationId}/stage`, {
      method: "PUT",
      body: JSON.stringify({ stage }),
    });
    await readJson(response);
    revalidateHiring();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function addApplicationNoteAction(applicationId: string, body: string): Promise<ActionResult> {
  try {
    const response = await springFetch(`/api/v1/applications/${applicationId}/notes`, {
      method: "POST",
      body: JSON.stringify({ body }),
    });
    await readJson(response);
    revalidateHiring();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function upsertApplicationRatingAction(
  applicationId: string,
  score: number,
): Promise<ActionResult> {
  try {
    const response = await springFetch(`/api/v1/applications/${applicationId}/rating`, {
      method: "PUT",
      body: JSON.stringify({ score }),
    });
    await readJson(response);
    revalidateHiring();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function loadPipelineApplicationAction(
  applicationId: string,
): Promise<ActionResult & { detail?: import("@/lib/api/types").PipelineApplicationDetail }> {
  try {
    const response = await springFetch(`/api/v1/applications/${applicationId}`);
    const detail = await readJson<import("@/lib/api/types").PipelineApplicationDetail>(response);
    return { ok: true, detail };
  } catch (error) {
    return fail(error);
  }
}

export async function convertLeadToApplicationAction(
  leadId: string,
  jobId: string,
): Promise<ActionResult> {
  try {
    const response = await springFetch(`/api/v1/ops/leads/${leadId}/applications`, {
      method: "POST",
      body: JSON.stringify({ jobId }),
    });
    const payload = await readJson<{ applicationId?: string; id?: string }>(response, { redirectOn401: false });
    const applicationId = payload.applicationId ?? payload.id;
    if (!applicationId) {
      return { ok: false, problem: { detail: "The hiring candidate was not returned. Refresh and try again." } };
    }
    revalidatePath("/dashboard/ops/leads");
    revalidatePath("/dashboard/ops/players");
    revalidateHiring();
    return { ok: true, id: applicationId };
  } catch (error) {
    return fail(error);
  }
}

export async function updateLeadStatusAction(leadId: string, status: string): Promise<ActionResult> {
  try {
    await readJson(
      await springFetch(`/api/v1/ops/leads/${leadId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      }),
    );
    revalidatePath("/dashboard/ops");
    revalidatePath("/dashboard/ops/leads");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export { parseProblem };
