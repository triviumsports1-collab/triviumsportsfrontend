import { NextResponse } from "next/server";
import { asMe, springFetch } from "@/lib/api/server";
import { OPS_ROLES } from "@/lib/auth/roles";
import { readAccessToken } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await readAccessToken();
  if (!access) {
    return NextResponse.json({ detail: "Sign in required to export the hiring pipeline." }, { status: 401 });
  }
  const meResponse = await springFetch("/api/v1/me");
  if (!meResponse.ok) {
    return NextResponse.json({ detail: "Could not verify session for export." }, { status: meResponse.status });
  }
  const me = asMe(await meResponse.json().catch(() => null));
  if (!me || !OPS_ROLES.includes(me.role)) {
    return NextResponse.json({ detail: "You cannot export the hiring pipeline." }, { status: 403 });
  }
  const response = await springFetch("/api/v1/ops/hiring/export");
  if (!response.ok) {
    return NextResponse.json({ detail: "Could not export the hiring pipeline." }, { status: response.status });
  }
  const bytes = await response.arrayBuffer();
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.ms-excel",
      "Content-Disposition": 'attachment; filename="trivium-hiring.xls"',
      "Cache-Control": "no-store",
    },
  });
}
