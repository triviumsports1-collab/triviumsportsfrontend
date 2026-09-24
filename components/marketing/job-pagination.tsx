import { routes } from "@/lib/site";

export function jobBoardHref(input: {
  page?: number;
  q?: string;
  state?: string;
  roleType?: string;
}): string {
  const params = new URLSearchParams();
  if (input.q?.trim()) {
    params.set("q", input.q.trim());
  }
  if (input.state?.trim()) {
    params.set("state", input.state.trim());
  }
  if (input.roleType?.trim()) {
    params.set("roleType", input.roleType.trim());
  }
  if (input.page && input.page > 1) {
    params.set("page", String(input.page));
  }
  const query = params.toString();
  return query ? `${routes.jobsBoard}?${query}` : routes.jobsBoard;
}

function pageWindow(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  const pages = new Set([1, total, current, current - 1, current + 1]);
  if (current <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }
  if (current >= total - 2) {
    pages.add(total - 1);
    pages.add(total - 2);
    pages.add(total - 3);
  }
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
  const items: Array<number | "ellipsis"> = [];
  for (const page of sorted) {
    const last = items[items.length - 1];
    if (typeof last === "number" && page - last > 1) {
      items.push("ellipsis");
    }
    items.push(page);
  }
  return items;
}

export function JobPagination({
  page,
  totalPages,
  q,
  state,
  roleType,
}: {
  page: number;
  totalPages: number;
  q?: string;
  state?: string;
  roleType?: string;
}) {
  if (totalPages <= 1) {
    return null;
  }
  const filters = { q, state, roleType };
  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 ? (
        <a
          href={jobBoardHref({ ...filters, page: page - 1 })}
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-ink hover:border-brand"
        >
          Previous
        </a>
      ) : (
        <span className="inline-flex min-h-11 items-center rounded-full border border-transparent px-4 text-sm text-ink-muted">
          Previous
        </span>
      )}
      {pageWindow(page, totalPages).map((item, index) =>
        item === "ellipsis" ? (
          <span key={`e-${index}`} className="px-1 text-ink-muted" aria-hidden="true">
            …
          </span>
        ) : (
          <a
            key={item}
            href={jobBoardHref({ ...filters, page: item })}
            aria-current={item === page ? "page" : undefined}
            className={
              item === page
                ? "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-brand px-3 text-sm font-semibold text-ink"
                : "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-white px-3 text-sm font-medium text-ink hover:border-brand"
            }
          >
            {item}
          </a>
        ),
      )}
      {page < totalPages ? (
        <a
          href={jobBoardHref({ ...filters, page: page + 1 })}
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-ink hover:border-brand"
        >
          Next
        </a>
      ) : (
        <span className="inline-flex min-h-11 items-center rounded-full border border-transparent px-4 text-sm text-ink-muted">
          Next
        </span>
      )}
    </nav>
  );
}
