"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Role } from "@/lib/auth/roles";

const coreLinks = [
  { href: "/dashboard/ops", label: "Overview" },
  { href: "/dashboard/ops/jobs", label: "Jobs" },
  { href: "/dashboard/ops/hiring", label: "Hiring" },
  { href: "/dashboard/ops/placements", label: "Placements" },
  { href: "/dashboard/ops/leads", label: "Leads" },
  { href: "/dashboard/ops/players", label: "Players" },
  { href: "/dashboard/ops/compliance", label: "Compliance" },
  { href: "/dashboard/ops/directory", label: "Directory" },
] as const;

function isActive(pathname: string, href: string, audience: string | null) {
  if (href === "/dashboard/ops") {
    return pathname === "/dashboard/ops";
  }
  if (href === "/dashboard/ops/players") {
    return pathname === "/dashboard/ops/players" || (pathname === "/dashboard/ops/leads" && audience === "PLAYER");
  }
  if (href === "/dashboard/ops/leads") {
    return (pathname === "/dashboard/ops/leads" || pathname.startsWith("/dashboard/ops/leads/")) && audience !== "PLAYER";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function OpsWorkspace({
  email,
  role,
  children,
}: {
  email: string;
  role: Role;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const audience = searchParams.get("audience");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const extra =
    role === "SUPER_ADMIN"
      ? [
          { href: "/dashboard/admin/forms", label: "Forms" },
          { href: "/dashboard/finance", label: "Finance" },
        ]
      : [];
  const links = [...coreLinks, ...extra];

  async function logout() {
    await fetch("/api/session/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const nav = (
    <nav className="flex flex-col gap-1 p-3" aria-label="Admin">
      {links.map((item) => {
        const active = isActive(pathname, item.href, audience);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={
              active
                ? "inline-flex min-h-11 items-center rounded-xl bg-brand px-3 text-sm font-semibold text-ink"
                : "inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-ink-muted hover:bg-canvas hover:text-ink"
            }
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-full">
      <aside className="hidden w-60 shrink-0 border-r border-line bg-white md:block">
        <div className="border-b border-line px-4 py-4">
          <p className="text-sm font-semibold tracking-tight text-ink">Trivium Sports</p>
          <p className="text-xs text-ink-muted">Admin workspace</p>
        </div>
        {nav}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3">
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            Menu
          </button>
          <p className="hidden text-sm text-ink-muted md:block">Operations</p>
          <div className="ml-auto flex items-center gap-3 text-sm text-ink-muted">
            <span className="hidden sm:inline">{email}</span>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 font-medium text-ink"
            >
              Sign out
            </button>
          </div>
        </header>
        {open ? (
          <div className="border-b border-line bg-white md:hidden">{nav}</div>
        ) : null}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
