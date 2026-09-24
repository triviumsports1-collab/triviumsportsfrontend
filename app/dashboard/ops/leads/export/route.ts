import { NextResponse } from "next/server";
import { requireRoles, springFetch } from "@/lib/api/server";
import { OPS_ROLES } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await requireRoles(OPS_ROLES);
  const audience = new URL(request.url).searchParams.get("audience")?.trim() ?? "";
  const query = audience ? `?audience=${encodeURIComponent(audience)}` : "";
  const response = await springFetch(`/api/v1/ops/leads/export${query}`);
  if (!response.ok) {
    return NextResponse.json({ detail: "Could not export leads" }, { status: response.status });
  }
  const bytes = await response.arrayBuffer();
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.ms-excel",
      "Content-Disposition": 'attachment; filename="trivium-leads.xls"',
      "Cache-Control": "no-store",
    },
  });
}
