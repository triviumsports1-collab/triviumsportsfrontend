import type { ReactNode } from "react";
import { requireRoles } from "@/lib/api/server";
import { OPS_ROLES } from "@/lib/auth/roles";

export default async function OpsLayout({ children }: { children: ReactNode }) {
  await requireRoles(OPS_ROLES);
  return children;
}
