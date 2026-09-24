import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardNav } from "@/components/saas/dashboard-nav";
import { OpsWorkspace } from "@/components/saas/ops-workspace";
import { requireMe } from "@/lib/api/server";
import { OPS_ROLES } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const me = await requireMe();
  if (OPS_ROLES.includes(me.role)) {
    return (
      <div className="min-h-full bg-canvas">
        <OpsWorkspace email={me.email} role={me.role}>
          {children}
        </OpsWorkspace>
      </div>
    );
  }
  return (
    <div className="min-h-full bg-canvas">
      <DashboardNav role={me.role} email={me.email} />
      {children}
    </div>
  );
}
