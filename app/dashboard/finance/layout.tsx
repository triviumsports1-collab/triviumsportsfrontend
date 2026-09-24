import type { ReactNode } from "react";
import { requireRoles } from "@/lib/api/server";
import { FINANCE_ROLES } from "@/lib/auth/roles";

export default async function FinanceLayout({ children }: { children: ReactNode }) {
  await requireRoles(FINANCE_ROLES);
  return children;
}
