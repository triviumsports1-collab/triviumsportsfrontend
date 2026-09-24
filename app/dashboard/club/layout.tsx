import type { ReactNode } from "react";
import { requireRoles } from "@/lib/api/server";
import { CLUB_ROLES } from "@/lib/auth/roles";

export default async function ClubLayout({ children }: { children: ReactNode }) {
  await requireRoles(CLUB_ROLES);
  return children;
}
