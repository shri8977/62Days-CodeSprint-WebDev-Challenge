export default function FavoritesPanel({ favorites, onRemove, onClear }) {
  if (!favorites.length) {
    return (
      <div className="rounded-2xl border border-[#1a5c45]/12 bg-white/60 p-5 text-sm text-[var(--color-stone)]">
        Saved issues will appear here for quick access later.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[#1a5c45]/12 bg-white/70 p-5 shadow-[0_8px_28px_rgba(15,28,23,0.05)]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="font-display text-lg font-semibold">
          Favorites ({favorites.length})
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-medium text-[var(--color-clay)] hover:underline"
        >
          Clear all
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {favorites.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-3 rounded-xl bg-[var(--color-sand)]/70 px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate text-xs text-[var(--color-leaf)]">
                {item.repoFullName}
              </p>
              <a
                href={item.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-[var(--color-ink)] hover:underline"
              >
                #{item.number} {item.title}
              </a>
            </div>
            <button
              type="button"
              onClick={() => onRemove(item)}
              className="shrink-0 text-xs text-[var(--color-stone)] hover:text-[var(--color-clay)]"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
