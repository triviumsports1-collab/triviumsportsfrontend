import type { ReactNode } from "react";
import { requireRoles } from "@/lib/api/server";
import { FORM_ADMIN_ROLES } from "@/lib/auth/roles";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireRoles(FORM_ADMIN_ROLES);
  return children;
}
