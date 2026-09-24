export const BOARD_STAGES = [
  "APPLIED",
  "PHONE_SCREEN",
  "INTERVIEW",
  "BACKGROUND_CHECK",
  "OFFER",
  "HIRED",
  "REJECTED",
] as const;

export type BoardStage = (typeof BOARD_STAGES)[number];

const LABELS: Record<string, string> = {
  APPLIED: "Applied",
  PHONE_SCREEN: "Phone screen",
  INTERVIEW: "Interview",
  BACKGROUND_CHECK: "Background check",
  OFFER: "Offer",
  HIRED: "Hired",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
};

export const PIPELINE_PRESETS: ReadonlyArray<{
  id: "all" | "review" | "interview" | "offer" | "hired" | "out";
  label: string;
  stages: readonly string[] | null;
}> = [
  { id: "all", label: "All", stages: null },
  { id: "review", label: "To review", stages: ["APPLIED", "PHONE_SCREEN"] },
  { id: "interview", label: "Interviewing", stages: ["INTERVIEW", "BACKGROUND_CHECK"] },
  { id: "offer", label: "Offer", stages: ["OFFER"] },
  { id: "hired", label: "Hired", stages: ["HIRED"] },
  { id: "out", label: "Closed", stages: ["REJECTED", "WITHDRAWN"] },
];

export function isBoardStage(value: string): value is BoardStage {
  return (BOARD_STAGES as readonly string[]).includes(value);
}

export function stageLabel(status: string): string {
  return LABELS[status] ?? status.replaceAll("_", " ");
}

export function stageIndex(status: string): number {
  const index = BOARD_STAGES.indexOf(status as BoardStage);
  return index < 0 ? 0 : index;
}

export function nextAdvanceStage(status: string): BoardStage | null {
  if (!isBoardStage(status) || status === "HIRED" || status === "REJECTED") {
    return null;
  }
  const next = BOARD_STAGES[BOARD_STAGES.indexOf(status) + 1];
  return next && next !== "REJECTED" ? next : null;
}

export function initials(name: string | null | undefined): string {
  const parts = (name ?? "Applicant").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "A";
  }
  const first = parts[0]?.[0] ?? "A";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return `${first}${last}`.toUpperCase();
}

export function formatWhen(iso: string | null | undefined): string {
  if (!iso) {
    return "—";
  }
  const parsed = Date.parse(iso);
  if (Number.isNaN(parsed)) {
    return iso;
  }
  return new Date(parsed).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDay(iso: string | null | undefined): string {
  if (!iso) {
    return "—";
  }
  const parsed = Date.parse(iso);
  if (Number.isNaN(parsed)) {
    return iso;
  }
  return new Date(parsed).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function columnTone(stage: BoardStage): string {
  switch (stage) {
    case "APPLIED":
      return "border-t-ink-muted";
    case "PHONE_SCREEN":
    case "INTERVIEW":
      return "border-t-brand";
    case "BACKGROUND_CHECK":
    case "OFFER":
      return "border-t-brand-deep";
    case "HIRED":
      return "border-t-brand";
    case "REJECTED":
      return "border-t-line";
    default:
      return "border-t-line";
  }
}

export function stagePillClass(status: string): string {
  if (status === "HIRED") {
    return "bg-brand/20 text-ink";
  }
  if (status === "REJECTED" || status === "WITHDRAWN") {
    return "bg-canvas text-ink-muted";
  }
  if (status === "OFFER") {
    return "bg-brand-deep/10 text-ink";
  }
  return "bg-canvas text-ink";
}
