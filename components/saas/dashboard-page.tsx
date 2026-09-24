export function DashboardPage({
  title,
  children,
  wide,
}: {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`mx-auto w-full px-4 py-8 ${wide ? "max-w-[1600px]" : "max-w-6xl"}`}>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}
