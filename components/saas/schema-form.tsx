"use client";

import type { JsonSchema } from "@/lib/api/types";

function Field({ name, schema, required }: { name: string; schema: JsonSchema; required: boolean }) {
  const label = schema.title ?? name;
  const id = `schema-${name}`;
  if (schema.enum && schema.enum.length > 0) {
    return (
      <label className="block text-sm font-medium" htmlFor={id}>
        {label}
        <select id={id} name={name} required={required} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3">
          <option value="">Select</option>
          {schema.enum.map((option) => (
            <option key={String(option)} value={String(option)}>
              {String(option)}
            </option>
          ))}
        </select>
      </label>
    );
  }
  const inputType = schema.type === "number" || schema.type === "integer" ? "number" : schema.format === "date" ? "date" : "text";
  return (
    <label className="block text-sm font-medium" htmlFor={id}>
      {label}
      <input id={id} name={name} required={required} type={inputType} className="mt-1 min-h-11 w-full rounded-xl border border-line px-3" />
      {schema.description ? <span className="mt-1 block text-xs text-ink-muted">{schema.description}</span> : null}
    </label>
  );
}

export function SchemaForm({ schema }: { schema: JsonSchema }) {
  const properties = schema.properties ?? {};
  const required = new Set(schema.required ?? []);
  return (
    <form className="mt-4 space-y-3 rounded-2xl border border-line bg-white p-4" onSubmit={(event) => event.preventDefault()}>
      {schema.title ? <h3 className="font-semibold text-ink">{schema.title}</h3> : null}
      {Object.entries(properties).map(([name, field]) => (
        <Field key={name} name={name} schema={field} required={required.has(name)} />
      ))}
      <button type="submit" className="min-h-11 rounded-full bg-brand px-5 text-sm font-semibold text-ink">
        Preview only
      </button>
    </form>
  );
}
