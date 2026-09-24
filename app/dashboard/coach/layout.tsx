import type { ReactNode } from "react";
import { requireRoles } from "@/lib/api/server";

export default async function CoachLayout({ children }: { children: ReactNode }) {
  await requireRoles(["COACH"]);
  return children;
}
