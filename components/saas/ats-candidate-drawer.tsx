"use client";

import { useEffect, useId, useState } from "react";
import { ProblemAlert } from "@/components/saas/problem-alert";
import type { Organization, PipelineApplicationDetail } from "@/lib/api/types";
import { addApplicationNoteAction, upsertApplicationRatingAction } from "@/lib/saas/actions";
import {
  BOARD_STAGES,
  formatWhen,
  initials,
  nextAdvanceStage,
  stageLabel,
  stagePillClass,
} from "@/lib/saas/ats-stages";

type DrawerTab = "profile" | "evaluate" | "activity";

export function AtsCandidateDrawer({
  loading,
  detail,
  organizations,
  showPlacement,
  busy,
  setBusy,
  detailText,
  setDetailText,
  onClose,
  onMoved,
  onRefresh,
  onAssign,
}: {
  loading: boolean;
  detail: PipelineApplicationDetail | null;
  organizations: Organization[];
  showPlacement: boolean;
  busy: boolean;
  setBusy: (value: boolean) => void;
  detailText: string | null;
  setDetailText: (value: string | null) => void;
  onClose: () => void;
  onMoved: (id: string, stage: string, previous: string) => void;
  onRefresh: (id: string) => Promise<void>;
  onAssign: () => void;
}) {
  const titleId = useId();
  const [tab, setTab] = useState<DrawerTab>("profile");
  const [note, setNote] = useState("");
  const orgName =
    detail == null
      ? ""
      : organizations.find((org) => org.id === detail.organizationId)?.name ?? detail.organizationName;
  const advance = detail ? nextAdvanceStage(detail.status) : null;
  const canAssign =
    showPlacement &&
    Boolean(detail) &&
    (detail?.status === "HIRED" || detail?.status === "OFFER") &&
    Boolean(detail?.applicantUserId);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    setTab("profile");
    setNote("");
  }, [detail?.id]);

  async function submitNote(event: React.FormEvent) {
    event.preventDefault();
    if (!detail || note.trim().length < 8) {
      setDetailText("Notes need at least 8 characters.");
      return;
    }
    setBusy(true);
    const result = await addApplicationNoteAction(detail.id, note.trim());
    setBusy(false);
    if (!result.ok) {
      setDetailText(result.problem?.detail ?? "Could not save note");
      return;
    }
    setNote("");
    setDetailText(null);
    await onRefresh(detail.id);
  }

  async function submitScore(score: number) {
    if (!detail) {
      return;
    }
    setBusy(true);
    const result = await upsertApplicationRatingAction(detail.id, score);
    setBusy(false);
    if (!result.ok) {
      setDetailText(result.problem?.detail ?? "Could not save score");
      return;
    }
    setDetailText(null);
    await onRefresh(detail.id);
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-ink/40" role="presentation">
      <button type="button" className="h-full flex-1 cursor-default" aria-label="Close candidate" onClick={onClose} />
      <aside
        className="flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="border-b border-line px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-ink">
              {initials(detail?.displayName)}
            </span>
            <div className="min-w-0 flex-1">
              <p id={titleId} className="truncate text-lg font-semibold tracking-tight text-ink">
                {detail?.displayName || "Candidate"}
              </p>
              <p className="truncate text-sm text-ink-muted">{detail?.jobTitle ?? "Loading…"}</p>
              <p className="mt-2">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${stagePillClass(detail?.status ?? "")}`}>
                  {detail ? stageLabel(detail.status) : "…"}
                </span>
              </p>
            </div>
            <button
              type="button"
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="mt-4 flex gap-1 rounded-full bg-canvas p-1" role="tablist" aria-label="Candidate sections">
            {(
              [
                ["profile", "Profile"],
                ["evaluate", "Evaluate"],
                ["activity", "Activity"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                className={`min-h-11 flex-1 rounded-full px-3 text-sm font-medium ${
                  tab === id ? "bg-white text-ink shadow-sm" : "text-ink-muted"
                }`}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <ProblemAlert detail={detailText} />
          {loading && !detail ? <p className="text-sm text-ink-muted">Loading candidate…</p> : null}
          {detail && tab === "profile" ? (
            <>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">Email</dt>
                  <dd className="mt-1 break-all">{detail.email ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">Phone</dt>
                  <dd className="mt-1">{detail.phone ?? "—"}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">Club</dt>
                  <dd className="mt-1">{orgName || "—"}</dd>
                </div>
              </dl>
              <div>
                <h3 className="text-sm font-semibold text-ink">Cover letter</h3>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-ink-muted">
                  {detail.coverLetter || "None provided."}
                </p>
              </div>
              {detail.experience ? (
                <div>
                  <h3 className="text-sm font-semibold text-ink">Experience</h3>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-ink-muted">{detail.experience}</p>
                </div>
              ) : null}
              {detail.resumeDownloadUrl ? (
                <a
                  href={detail.resumeDownloadUrl}
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium"
                >
                  Download resume
                </a>
              ) : (
                <p className="text-sm text-ink-muted">No resume on file.</p>
              )}
            </>
          ) : null}
          {detail && tab === "evaluate" ? (
            <>
              <label className="block text-sm font-medium">
                Stage
                <select
                  className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3"
                  value={detail.status}
                  disabled={busy}
                  onChange={(event) => onMoved(detail.id, event.target.value, detail.status)}
                >
                  {BOARD_STAGES.map((stage) => (
                    <option key={stage} value={stage}>
                      {stageIndexLabel(stage)}
                    </option>
                  ))}
                </select>
              </label>
              <div>
                <h3 className="text-sm font-semibold">Score</h3>
                <p className="text-xs text-ink-muted">
                  Average {detail.averageScore != null ? detail.averageScore.toFixed(1) : "—"} · {detail.ratings.length}{" "}
                  rating{detail.ratings.length === 1 ? "" : "s"}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      disabled={busy}
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line text-sm font-medium hover:border-brand"
                      onClick={() => void submitScore(score)}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
              <form onSubmit={(event) => void submitNote(event)} className="space-y-2">
                <h3 className="text-sm font-semibold">Internal notes</h3>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-line px-3 py-2 text-sm"
                  placeholder="Recruiter evaluation (not visible to the candidate)"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium"
                >
                  Add note
                </button>
              </form>
            </>
          ) : null}
          {detail && tab === "activity" ? (
            <>
              <div>
                <h3 className="text-sm font-semibold">Stage history</h3>
                <ol className="mt-3 space-y-3 text-sm">
                  {(detail.history ?? []).map((event, index) => (
                    <li key={event.id} className="relative border-l-2 border-brand/40 pl-4">
                      <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-brand" aria-hidden />
                      <p>
                        <span className="text-xs text-ink-muted">{index + 1}.</span>{" "}
                        {event.fromStatus ? `${stageLabel(String(event.fromStatus))} → ` : ""}
                        {stageLabel(String(event.toStatus))}
                      </p>
                      <p className="text-xs text-ink-muted">{formatWhen(event.createdAt)}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Notes</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {(detail.notes ?? []).length === 0 ? (
                    <li className="text-ink-muted">No notes yet.</li>
                  ) : (
                    (detail.notes ?? []).map((item) => (
                      <li key={item.id} className="rounded-xl bg-canvas px-3 py-2">
                        <p className="whitespace-pre-wrap">{item.body}</p>
                        <p className="mt-1 text-xs text-ink-muted">{formatWhen(item.createdAt)}</p>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </>
          ) : null}
        </div>
        {detail ? (
          <div className="flex flex-wrap gap-2 border-t border-line px-5 py-4">
            {advance ? (
              <button
                type="button"
                disabled={busy}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-brand px-4 text-sm font-semibold text-ink sm:flex-none"
                onClick={() => onMoved(detail.id, advance, detail.status)}
              >
                Advance to {stageLabel(advance)}
              </button>
            ) : null}
            {canAssign ? (
              <button
                type="button"
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-semibold"
                onClick={onAssign}
              >
                Assign to club
              </button>
            ) : null}
            {showPlacement && (detail.status === "HIRED" || detail.status === "OFFER") && !detail.applicantUserId ? (
              <p className="w-full text-xs text-ink-muted">Guest applicant — register the coach before creating a placement.</p>
            ) : null}
            {detail.status !== "REJECTED" ? (
              <button
                type="button"
                disabled={busy}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium"
                onClick={() => onMoved(detail.id, "REJECTED", detail.status)}
              >
                Reject
              </button>
            ) : null}
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function stageIndexLabel(stage: string): string {
  const numbered = BOARD_STAGES.indexOf(stage as (typeof BOARD_STAGES)[number]);
  if (numbered < 0) {
    return stageLabel(stage);
  }
  return `${numbered + 1}. ${stageLabel(stage)}`;
}
