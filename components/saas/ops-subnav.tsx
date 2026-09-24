"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/dashboard/ops", label: "Overview" },
  { href: "/dashboard/ops/jobs", label: "Jobs" },
  { href: "/dashboard/ops/placements", label: "Placements" },
  { href: "/dashboard/ops/compliance", label: "Compliance" },
] as const;

export function OpsSubnav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-line bg-white" aria-label="Operations">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-1 px-4 py-2">
        {tabs.map((tab) => {
          const active =
            tab.href === "/dashboard/ops"
              ? pathname === "/dashboard/ops"
              : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={
                active
                  ? "inline-flex min-h-11 items-center rounded-full bg-brand px-4 text-sm font-semibold text-ink"
                  : "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-ink-muted hover:bg-canvas hover:text-ink"
              }
              aria-current={active ? "page" : undefined}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
