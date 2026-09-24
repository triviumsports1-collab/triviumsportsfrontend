"use client";

import { useRouter } from "next/navigation";
import type { Role } from "@/lib/auth/roles";

const links: Record<string, { href: string; label: string }[]> = {
  COACH: [
    { href: "/dashboard/coach", label: "Home" },
    { href: "/dashboard/coach/timesheets", label: "Hours" },
    { href: "/dashboard/coach/shifts", label: "Shifts" },
    { href: "/dashboard/coach/compliance", label: "Work authorization" },
    { href: "/dashboard/coach/pay", label: "Pay" },
  ],
  CLUB: [
    { href: "/dashboard/club", label: "Home" },
    { href: "/dashboard/club/hiring", label: "Hiring" },
    { href: "/dashboard/club/timesheets", label: "Hours" },
    { href: "/dashboard/club/shifts", label: "Shifts" },
    { href: "/dashboard/club/invoices", label: "Invoices" },
    { href: "/dashboard/club/compliance", label: "Authorization" },
  ],
  OPS: [
    { href: "/dashboard/ops", label: "Overview" },
    { href: "/dashboard/ops/jobs", label: "Jobs" },
    { href: "/dashboard/ops/placements", label: "Placements" },
    { href: "/dashboard/ops/compliance", label: "Compliance" },
  ],
  FINANCE: [{ href: "/dashboard/finance", label: "Remittance" }],
  ADMIN: [
    { href: "/dashboard/admin/forms", label: "Forms" },
    { href: "/dashboard/ops", label: "Ops" },
    { href: "/dashboard/finance", label: "Finance" },
  ],
};

function navFor(role: Role) {
  if (role === "COACH") return links.COACH;
  if (role === "EMPLOYER" || role === "CLUB_DIRECTOR" || role === "CLUB_BILLING") return links.CLUB;
  if (role === "TRIVIUM_FINANCE") return links.FINANCE;
  if (role === "SUPER_ADMIN") return links.ADMIN;
  if (role === "ATHLETE" || role === "CANDIDATE") return [{ href: "/dashboard/athlete", label: "Home" }];
  return links.OPS;
}

export function DashboardNav({ role, email }: { role: Role; email: string }) {
  const router = useRouter();
  const items = navFor(role);

  async function logout() {
    await fetch("/api/session/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <a href="/dashboard" className="font-semibold tracking-tight text-ink">
          Trivium Sports
        </a>
        <nav className="flex flex-wrap gap-2" aria-label="Workspace">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-ink-muted hover:bg-canvas hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm text-ink-muted">
          <span className="hidden sm:inline">{email}</span>
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex min-h-11 items-center rounded-full border border-line px-4 font-medium text-ink"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
