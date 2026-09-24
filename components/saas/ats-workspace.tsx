"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AssignPlacementDialog } from "@/components/saas/assign-placement-dialog";
import { AtsCandidateDrawer } from "@/components/saas/ats-candidate-drawer";
import { ProblemAlert } from "@/components/saas/problem-alert";
import type { Organization, PipelineApplication, PipelineApplicationDetail } from "@/lib/api/types";
import { loadPipelineApplicationAction, updateApplicationStageAction } from "@/lib/saas/actions";
import {
  BOARD_STAGES,
  PIPELINE_PRESETS,
  columnTone,
  formatDay,
  initials,
  isBoardStage,
  stageLabel,
  stagePillClass,
  type BoardStage,
} from "@/lib/saas/ats-stages";

export function AtsWorkspace({
  applications,
  initialDetail,
  organizations,
  view,
  selectedId,
  path,
  showPlacement,
  toolbar,
  initialQuery = "",
  initialStage = "",
  initialJobId = "",
  initialOrgId = "",
}: {
  applications: PipelineApplication[];
  initialDetail: PipelineApplicationDetail | null;
  organizations: Organization[];
  view: "board" | "list";
  selectedId?: string;
  path: string;
  showPlacement: boolean;
  toolbar?: ReactNode;
  initialQuery?: string;
  initialStage?: string;
  initialJobId?: string;
  initialOrgId?: string;
}) {
  const router = useRouter();
  const [rows, setRows] = useState(applications);
  const [detail, setDetail] = useState<PipelineApplicationDetail | null>(initialDetail);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [detailText, setDetailText] = useState<string | null>(null);
  const [boardText, setBoardText] = useState<string | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [stageFilter, setStageFilter] = useState(initialStage);
  const [presetId, setPresetId] = useState<(typeof PIPELINE_PRESETS)[number]["id"]>("all");
  const [jobFilter, setJobFilter] = useState(initialJobId);
  const [orgFilter, setOrgFilter] = useState(initialOrgId);
  const [assignOpen, setAssignOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"board" | "list">(view);

  useEffect(() => {
    setRows(applications);
  }, [applications]);

  useEffect(() => {
    setDetail(initialDetail);
  }, [initialDetail]);

  useEffect(() => {
    setCurrentView(view);
  }, [view]);

  const jobs = useMemo(() => {
    const map = new Map<string, string>();
    for (const row of rows) {
      map.set(row.jobId, row.jobTitle);
    }
    return [...map.entries()].sort((left, right) => left[1].localeCompare(right[1]));
  }, [rows]);

  const clubs = useMemo(() => {
    const map = new Map<string, string>();
    for (const row of rows) {
      if (row.organizationId) {
        map.set(row.organizationId, row.organizationName);
      }
    }
    for (const org of organizations) {
      map.set(org.id, org.name);
    }
    return [...map.entries()].sort((left, right) => left[1].localeCompare(right[1]));
  }, [organizations, rows]);

  const scoped = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (jobFilter && row.jobId !== jobFilter) {
        return false;
      }
      if (orgFilter && row.organizationId !== orgFilter) {
        return false;
      }
      if (!needle) {
        return true;
      }
      const haystack = [row.displayName, row.email, row.jobTitle, row.organizationName, row.phone]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [jobFilter, orgFilter, query, rows]);

  const filtered = useMemo(() => {
    const preset = PIPELINE_PRESETS.find((item) => item.id === presetId);
    return scoped.filter((row) => {
      if (stageFilter && row.status !== stageFilter) {
        return false;
      }
      if (!stageFilter && preset?.stages && !preset.stages.includes(row.status)) {
        return false;
      }
      return true;
    });
  }, [presetId, scoped, stageFilter]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const row of scoped) {
      map.set(row.status, (map.get(row.status) ?? 0) + 1);
    }
    return map;
  }, [scoped]);

  const visibleStages = useMemo(() => {
    if (stageFilter && isBoardStage(stageFilter)) {
      return [stageFilter];
    }
    const preset = PIPELINE_PRESETS.find((item) => item.id === presetId);
    if (preset?.stages) {
      return BOARD_STAGES.filter((stage) => preset.stages?.includes(stage));
    }
    return BOARD_STAGES;
  }, [presetId, stageFilter]);

  function hrefFor(next: {
    view?: "board" | "list";
    applicationId?: string | null;
    q?: string;
    stage?: string;
    jobId?: string;
    organizationId?: string;
  }): string {
    const params = new URLSearchParams();
    const nextView = next.view ?? currentView;
    if (nextView === "list") {
      params.set("view", "list");
    }
    const id = next.applicationId === undefined ? selectedId : next.applicationId;
    if (id) {
      params.set("applicationId", id);
    }
    const nextQuery = next.q === undefined ? query : next.q;
    if (nextQuery.trim()) {
      params.set("q", nextQuery.trim());
    }
    const nextStage = next.stage === undefined ? stageFilter : next.stage;
    if (nextStage) {
      params.set("stage", nextStage);
    }
    const nextJob = next.jobId === undefined ? jobFilter : next.jobId;
    if (nextJob) {
      params.set("jobId", nextJob);
    }
    const nextOrg = next.organizationId === undefined ? orgFilter : next.organizationId;
    if (nextOrg) {
      params.set("organizationId", nextOrg);
    }
    const qs = params.toString();
    return qs ? `${path}?${qs}` : path;
  }

  function syncUrl(next: Parameters<typeof hrefFor>[0]) {
    router.replace(hrefFor(next), { scroll: false });
  }

  async function openCard(id: string) {
    setLoadingId(id);
    setDetailText(null);
    syncUrl({ applicationId: id });
    const result = await loadPipelineApplicationAction(id);
    setLoadingId(null);
    if (!result.ok || !result.detail) {
      setDetail(null);
      setDetailText(result.problem?.detail ?? "Could not load candidate");
      return;
    }
    setDetail(result.detail);
  }

  function closeDrawer() {
    setDetail(null);
    setDetailText(null);
    syncUrl({ applicationId: null });
  }

  async function moveTo(id: string, stage: string, previous: string) {
    if (stage === previous) {
      return;
    }
    setBoardText(null);
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status: stage } : row)));
    const result = await updateApplicationStageAction(id, stage);
    if (!result.ok) {
      setRows((current) => current.map((row) => (row.id === id ? { ...row, status: previous } : row)));
      setBoardText(result.problem?.detail ?? "Could not update stage");
      return;
    }
    let nextDetail = detail;
    if (detail?.id === id || (showPlacement && (stage === "HIRED" || stage === "OFFER"))) {
      const refreshed = await loadPipelineApplicationAction(id);
      if (refreshed.ok && refreshed.detail) {
        nextDetail = refreshed.detail;
        setDetail(refreshed.detail);
      }
    }
    if (showPlacement && (stage === "HIRED" || stage === "OFFER") && nextDetail?.applicantUserId) {
      setAssignOpen(true);
    }
    router.refresh();
  }

  const assignTarget = detail ?? rows.find((row) => row.id === selectedId) ?? null;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-deep">Recruiting</p>
            <p className="mt-1 text-sm text-ink-muted">
              {filtered.length} of {rows.length} candidate{rows.length === 1 ? "" : "s"} · screening through hire
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {toolbar}
            <div className="inline-flex rounded-full border border-line bg-canvas p-1 text-sm">
              <button
                type="button"
                className={`inline-flex min-h-11 items-center rounded-full px-4 font-medium ${
                  currentView === "board" ? "bg-brand text-ink" : "text-ink-muted"
                }`}
                aria-pressed={currentView === "board"}
                onClick={() => {
                  setCurrentView("board");
                  syncUrl({ view: "board" });
                }}
              >
                Board
              </button>
              <button
                type="button"
                className={`inline-flex min-h-11 items-center rounded-full px-4 font-medium ${
                  currentView === "list" ? "bg-brand text-ink" : "text-ink-muted"
                }`}
                aria-pressed={currentView === "list"}
                onClick={() => {
                  setCurrentView("list");
                  syncUrl({ view: "list" });
                }}
              >
                List
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="list" aria-label="Pipeline snapshot">
          {BOARD_STAGES.map((stage, index) => {
            const active = stageFilter === stage;
            return (
              <button
                key={stage}
                type="button"
                role="listitem"
                onClick={() => {
                  const next = active ? "" : stage;
                  setStageFilter(next);
                  setPresetId("all");
                  syncUrl({ stage: next });
                }}
                className={`min-w-[7.5rem] shrink-0 rounded-2xl border px-3 py-3 text-left ${
                  active ? "border-brand bg-brand/15" : "border-line bg-canvas"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                  {index + 1}. {stageLabel(stage)}
                </p>
                <p className="mt-1 text-xl font-semibold tabular-nums text-ink">{counts.get(stage) ?? 0}</p>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {PIPELINE_PRESETS.map((preset) => {
            const selected = presetId === preset.id && !stageFilter;
            return (
              <button
                key={preset.id}
                type="button"
                className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium ${
                  selected ? "bg-ink text-white" : "bg-canvas text-ink-muted"
                }`}
                onClick={() => {
                  setPresetId(preset.id);
                  setStageFilter("");
                  syncUrl({ stage: "" });
                }}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <label className="text-sm font-medium sm:col-span-1">
            Search
            <input
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setQuery(value);
                syncUrl({ q: value });
              }}
              placeholder="Name, email, job, club"
              className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm"
            />
          </label>
          <label className="text-sm font-medium">
            Role
            <select
              value={jobFilter}
              onChange={(event) => {
                setJobFilter(event.target.value);
                syncUrl({ jobId: event.target.value });
              }}
              className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm"
            >
              <option value="">All jobs</option>
              {jobs.map(([id, title]) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Club
            <select
              value={orgFilter}
              onChange={(event) => {
                setOrgFilter(event.target.value);
                syncUrl({ organizationId: event.target.value });
              }}
              className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm"
            >
              <option value="">All clubs</option>
              {clubs.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <ProblemAlert detail={boardText} />
      {currentView === "list" ? (
        <ListView rows={filtered} selectedId={selectedId} onOpen={(id) => void openCard(id)} onMove={moveTo} />
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-3">
          {visibleStages.map((stage) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              count={counts.get(stage) ?? 0}
              cards={filtered.filter((row) => row.status === stage)}
              selectedId={selectedId}
              onOpen={(id) => void openCard(id)}
              onDrop={(id, previous) => void moveTo(id, stage, previous)}
            />
          ))}
        </div>
      )}
      {selectedId || detail || detailText ? (
        <AtsCandidateDrawer
          loading={loadingId !== null}
          detail={detail}
          organizations={organizations}
          showPlacement={showPlacement}
          busy={busy}
          setBusy={setBusy}
          detailText={detailText}
          setDetailText={setDetailText}
          onClose={closeDrawer}
          onMoved={(id, stage, previous) => void moveTo(id, stage, previous)}
          onAssign={() => setAssignOpen(true)}
          onRefresh={async (id) => {
            const refreshed = await loadPipelineApplicationAction(id);
            if (refreshed.ok && refreshed.detail) {
              setDetail(refreshed.detail);
            }
            router.refresh();
          }}
        />
      ) : null}
      {showPlacement ? (
        <AssignPlacementDialog
          open={assignOpen}
          candidate={assignTarget}
          organizations={organizations}
          onClose={() => setAssignOpen(false)}
          onAssigned={() => {
            setAssignOpen(false);
            setBoardText(null);
            router.refresh();
          }}
        />
      ) : null}
    </div>
  );
}

function KanbanColumn({
  stage,
  count,
  cards,
  selectedId,
  onOpen,
  onDrop,
}: {
  stage: BoardStage;
  count: number;
  cards: PipelineApplication[];
  selectedId?: string;
  onOpen: (id: string) => void;
  onDrop: (id: string, previous: string) => void;
}) {
  const [over, setOver] = useState(false);
  const index = BOARD_STAGES.indexOf(stage) + 1;
  return (
    <section
      className={`flex w-[17.5rem] shrink-0 flex-col rounded-2xl border border-line border-t-4 bg-canvas ${columnTone(stage)} ${
        over ? "ring-2 ring-brand ring-offset-2" : ""
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setOver(false);
        const payload = event.dataTransfer.getData("text/plain");
        const [id, previous] = payload.split("|");
        if (id && previous) {
          onDrop(id, previous);
        }
      }}
    >
      <header className="flex items-start justify-between gap-2 px-3 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Stage {index}</p>
          <h2 className="text-sm font-semibold text-ink">{stageLabel(stage)}</h2>
        </div>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs tabular-nums text-ink-muted">{count}</span>
      </header>
      <div className="flex max-h-[68vh] flex-col gap-2 overflow-y-auto p-2">
        {cards.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line px-3 py-8 text-center text-xs text-ink-muted">
            Drop a candidate here
          </p>
        ) : null}
        {cards.map((card) => (
          <article
            key={card.id}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("text/plain", `${card.id}|${card.status}`);
              event.dataTransfer.effectAllowed = "move";
            }}
            className={`cursor-grab rounded-2xl border bg-white p-3 shadow-sm transition ${
              selectedId === card.id ? "border-brand shadow-md" : "border-line"
            }`}
          >
            <button type="button" className="w-full text-left" onClick={() => onOpen(card.id)}>
              <div className="flex items-start gap-2">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-canvas text-xs font-semibold">
                  {initials(card.displayName)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{card.displayName || "Applicant"}</p>
                  <p className="mt-0.5 truncate text-xs text-ink-muted">{card.jobTitle}</p>
                  <p className="truncate text-xs text-ink-muted">{card.organizationName}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-ink-muted">
                <span>{formatDay(card.createdAt)}</span>
                {card.averageScore != null ? (
                  <span className="tabular-nums font-medium text-ink">★ {card.averageScore.toFixed(1)}</span>
                ) : (
                  <span>Unscored</span>
                )}
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ListView({
  rows,
  selectedId,
  onOpen,
  onMove,
}: {
  rows: PipelineApplication[];
  selectedId?: string;
  onOpen: (id: string) => void;
  onMove: (id: string, stage: string, previous: string) => void;
}) {
  if (rows.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-line bg-white px-4 py-16 text-center text-sm text-ink-muted">
        No candidates match these filters. When people apply to published tennis jobs, they land here.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto rounded-3xl border border-line bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-line bg-canvas text-ink-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Candidate</th>
            <th className="px-4 py-3 font-medium">Job</th>
            <th className="px-4 py-3 font-medium">Club</th>
            <th className="px-4 py-3 font-medium">Applied</th>
            <th className="px-4 py-3 font-medium">Score</th>
            <th className="px-4 py-3 font-medium">Stage</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={`border-b border-line last:border-0 ${selectedId === row.id ? "bg-brand/10" : "hover:bg-canvas"}`}
            >
              <td className="px-4 py-3">
                <button type="button" className="flex min-h-11 items-center gap-3 text-left" onClick={() => onOpen(row.id)}>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-canvas text-xs font-semibold">
                    {initials(row.displayName)}
                  </span>
                  <span>
                    <span className="block font-medium text-ink">{row.displayName || "Applicant"}</span>
                    <span className="block text-xs text-ink-muted">{row.email ?? "—"}</span>
                  </span>
                </button>
              </td>
              <td className="px-4 py-3">{row.jobTitle}</td>
              <td className="px-4 py-3 text-ink-muted">{row.organizationName}</td>
              <td className="px-4 py-3 text-ink-muted">{formatDay(row.createdAt)}</td>
              <td className="px-4 py-3 tabular-nums">{row.averageScore != null ? row.averageScore.toFixed(1) : "—"}</td>
              <td className="px-4 py-3">
                <label className="sr-only" htmlFor={`stage-${row.id}`}>
                  Stage for {row.displayName || "applicant"}
                </label>
                <select
                  id={`stage-${row.id}`}
                  className={`min-h-11 rounded-full border border-line bg-white px-3 ${stagePillClass(row.status)}`}
                  value={isBoardStage(row.status) ? row.status : row.status}
                  onChange={(event) => onMove(row.id, event.target.value, row.status)}
                >
                  {BOARD_STAGES.map((stage) => (
                    <option key={stage} value={stage}>
                      {stageLabel(stage)}
                    </option>
                  ))}
                  {row.status === "WITHDRAWN" ? <option value="WITHDRAWN">Withdrawn</option> : null}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
