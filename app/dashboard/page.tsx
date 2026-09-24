import { redirect } from "next/navigation";
import { requireMe } from "@/lib/api/server";
import { homeForRole } from "@/lib/auth/roles";

export default async function DashboardIndexPage() {
  const me = await requireMe();
  redirect(homeForRole(me.role));
}
