export function LoadingGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-44 skeleton" />
      ))}
    </div>
  )
}

export function EmptyState({ query }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#1a5c45]/25 bg-white/50 px-6 py-14 text-center animate-fade-up">
      <p className="font-display text-xl font-semibold text-[var(--color-ink)]">
        No open issues found
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-stone)]">
        Try different labels, a lower star count, or broader keywords
        {query ? (
          <>
            . Last query: <code className="text-[var(--color-moss)]">{query}</code>
          </>
        ) : null}
        .
      </p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-[var(--color-clay)]/30 bg-[var(--color-clay)]/8 px-6 py-10 text-center animate-fade-up"
    >
      <p className="font-display text-xl font-semibold text-[var(--color-ink)]">
        Couldn’t load issues
      </p>
      <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--color-stone)]">
        {message}
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-xl bg-[var(--color-moss)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-leaf)]"
        >
          Try again
        </button>
      ) : null}
    </div>
  )
}
