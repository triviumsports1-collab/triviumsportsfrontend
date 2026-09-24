import { DashboardPage } from "@/components/saas/dashboard-page";
import { FormBuilder } from "@/components/saas/form-builder";
import { readJson, requireRoles, springFetch } from "@/lib/api/server";
import { FORM_ADMIN_ROLES } from "@/lib/auth/roles";
import type { FormDefinition } from "@/lib/api/types";

export default async function AdminFormsPage() {
  await requireRoles(FORM_ADMIN_ROLES);
  const response = await springFetch("/api/v1/admin/form-definitions");
  const forms = response.ok ? await readJson<FormDefinition[]>(response) : [];
  return (
    <DashboardPage title="Form builder">
      <p className="text-sm text-ink-muted">
        Publish JSON Schema. Extra club or coach fields stay in schema documents — no new database columns.
      </p>
      <FormBuilder forms={forms} />
    </DashboardPage>
  );
}
