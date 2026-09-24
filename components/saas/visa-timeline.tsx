import type { VisaSnapshot } from "@/lib/api/types";

type Milestone = { label: string; date: string | null };

export function VisaTimeline({ snapshot }: { snapshot: VisaSnapshot | null }) {
  const items: Milestone[] = [
    { label: "Status start", date: snapshot?.statusStartsOn ?? null },
    { label: "Status expiry", date: snapshot?.statusExpiresOn ?? null },
    { label: "EAD expiry", date: snapshot?.eadExpiresOn ?? null },
    { label: "Passport expiry", date: snapshot?.passportExpiresOn ?? null },
  ];
  return (
    <ol className="relative space-y-4 border-l border-brand pl-6">
      {items.map((item) => (
        <li key={item.label}>
          <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-brand" aria-hidden />
          <p className="text-sm font-semibold text-ink">{item.label}</p>
          <p className="text-sm text-ink-muted">{item.date ?? "Not set"}</p>
        </li>
      ))}
    </ol>
  );
}
