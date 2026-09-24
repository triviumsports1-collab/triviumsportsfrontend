"use client";

import { useMemo, useState } from "react";
import type { FormDefinition, JsonSchema } from "@/lib/api/types";
import { publishFormAction, saveFormDefinitionAction } from "@/lib/saas/actions";
import { ProblemAlert } from "@/components/saas/problem-alert";
import { SchemaForm } from "@/components/saas/schema-form";

const starter: JsonSchema = {
  type: "object",
  title: "Club intake",
  properties: {
    clubName: { type: "string", title: "Club name" },
    city: { type: "string", title: "City" },
    courts: { type: "number", title: "Number of courts" },
  },
  required: ["clubName"],
};

export function FormBuilder({ forms }: { forms: FormDefinition[] }) {
  const [selected, setSelected] = useState<FormDefinition | null>(forms[0] ?? null);
  const [slug, setSlug] = useState(selected?.slug ?? "club-intake");
  const [raw, setRaw] = useState(JSON.stringify(selected?.schemaJson ?? starter, null, 2));
  const [detail, setDetail] = useState<string | null>(null);
  const schema = useMemo(() => {
    try {
      return JSON.parse(raw) as JsonSchema;
    } catch {
      return null;
    }
  }, [raw]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <ProblemAlert detail={detail} />
        <label className="block text-sm font-medium">
          Slug
          <input value={slug} onChange={(event) => setSlug(event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
        </label>
        <label className="block text-sm font-medium">
          JSON Schema
          <textarea
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            className="mt-1 min-h-64 w-full rounded-xl border border-line px-3 py-2 font-mono text-sm"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="min-h-11 rounded-full bg-brand px-5 font-semibold text-ink"
            onClick={async () => {
              if (!schema) {
                setDetail("Schema JSON is invalid");
                return;
              }
              const result = await saveFormDefinitionAction({
                id: selected?.id,
                slug,
                schemaJson: schema as Record<string, unknown>,
              });
              setDetail(result.ok ? null : (result.problem?.detail ?? "Save failed"));
            }}
          >
            Save draft
          </button>
          {selected ? (
            <button
              type="button"
              className="min-h-11 rounded-full border border-line px-5 font-medium"
              onClick={async () => {
                const result = await publishFormAction(selected.id);
                setDetail(result.ok ? null : (result.problem?.detail ?? "Publish failed"));
              }}
            >
              Publish
            </button>
          ) : null}
        </div>
        <ul className="space-y-2 text-sm">
          {forms.map((form) => (
            <li key={form.id}>
              <button
                type="button"
                className="min-h-11 w-full rounded-xl border border-line px-3 text-left"
                onClick={() => {
                  setSelected(form);
                  setSlug(form.slug);
                  setRaw(JSON.stringify(form.schemaJson, null, 2));
                }}
              >
                {form.slug} · v{form.version} · {form.status}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Live preview</h2>
        {schema ? <SchemaForm schema={schema} /> : <p className="mt-2 text-sm text-red-700">Fix JSON to preview.</p>}
      </div>
    </div>
  );
}
