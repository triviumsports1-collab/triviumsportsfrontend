import { Suspense, type ComponentProps } from "react";
import { IntakeForm } from "@/components/forms/intake-form";

export function IntakeSection(props: ComponentProps<typeof IntakeForm>) {
  return (
    <Suspense
      fallback={
        <div className="rounded-3xl border border-line bg-canvas-elevated p-8 text-ink-muted">
          Loading intake…
        </div>
      }
    >
      <IntakeForm {...props} />
    </Suspense>
  );
}
