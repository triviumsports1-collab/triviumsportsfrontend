export default function JobsLoading() {
  return (
    <main>
      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="h-4 w-24 rounded bg-line" />
          <div className="mt-6 h-12 max-w-xl rounded bg-line" />
          <div className="mt-5 h-6 max-w-lg rounded bg-line" />
        </div>
      </section>
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="h-36 rounded-3xl border border-line bg-white" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="min-h-[17.5rem] rounded-3xl border border-line bg-white" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
