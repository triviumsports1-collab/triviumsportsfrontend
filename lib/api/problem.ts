export type ProblemError = {
  field: string;
  message: string;
};

export type ProblemJson = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  errors?: ProblemError[];
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseProblem(value: unknown): ProblemJson | null {
  if (!isRecord(value)) {
    return null;
  }
  const errors: ProblemError[] = [];
  if (Array.isArray(value.errors)) {
    for (const item of value.errors) {
      if (isRecord(item) && typeof item.field === "string" && typeof item.message === "string") {
        errors.push({ field: item.field, message: item.message });
      }
    }
  }
  return {
    type: typeof value.type === "string" ? value.type : undefined,
    title: typeof value.title === "string" ? value.title : undefined,
    status: typeof value.status === "number" ? value.status : undefined,
    detail: typeof value.detail === "string" ? value.detail : undefined,
    errors,
  };
}

export class ApiProblemError extends Error {
  readonly problem: ProblemJson;
  readonly status: number;

  constructor(problem: ProblemJson, status: number) {
    super(problem.detail ?? problem.title ?? "Request failed");
    this.problem = problem;
    this.status = status;
  }
}

export function fieldErrorMap(problem: ProblemJson | null): Record<string, string> {
  const map: Record<string, string> = {};
  if (!problem?.errors) {
    return map;
  }
  for (const err of problem.errors) {
    map[err.field] = err.message;
  }
  return map;
}
