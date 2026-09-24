import type { ReactNode } from "react";
import { requireRoles } from "@/lib/api/server";

export default async function AthleteLayout({ children }: { children: ReactNode }) {
  await requireRoles(["ATHLETE", "CANDIDATE"]);
  return children;
}
