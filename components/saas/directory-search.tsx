export function DirectorySearch({ defaultQuery }: { defaultQuery: string }) {
  return (
    <form className="flex flex-wrap gap-2" action="/dashboard/ops/directory" method="get">
      <label className="min-w-64 flex-1 text-sm font-medium">
        Search
        <input
          name="q"
          defaultValue={defaultQuery}
          placeholder="Coach email or club name"
          className="mt-1 min-h-11 w-full rounded-xl border border-line px-3"
        />
      </label>
      <button type="submit" className="mt-6 min-h-11 rounded-full bg-brand px-5 font-semibold text-ink">
        Search
      </button>
    </form>
  );
}
