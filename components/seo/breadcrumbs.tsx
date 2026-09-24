import { routes } from "@/lib/site";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", href: routes.home }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-ink-muted">
        {trail.map((item, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {last ? (
                <span className="text-ink" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a className="hover:text-ink" href={item.href}>
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
