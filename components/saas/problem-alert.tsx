"use client";

export function ProblemAlert({
  detail,
  fieldErrors,
}: {
  detail?: string | null;
  fieldErrors?: Record<string, string>;
}) {
  const extras = fieldErrors ? Object.values(fieldErrors) : [];
  if (!detail && extras.length === 0) {
    return null;
  }
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
      {detail ? <p>{detail}</p> : null}
      {extras.length > 0 ? (
        <ul className="mt-2 list-disc pl-5">
          {extras.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
