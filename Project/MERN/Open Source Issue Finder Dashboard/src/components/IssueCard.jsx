function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

function contrastText(hex) {
  if (!hex) return '#0f1c17'
  const c = hex.replace('#', '')
  const full = c.length === 3 ? c.split('').map((ch) => ch + ch).join('') : c
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55 ? '#0f1c17' : '#ffffff'
}

export default function IssueCard({ issue, favorited, onToggleFavorite, index = 0 }) {
  const delayClass =
    index % 3 === 0 ? 'stagger-1' : index % 3 === 1 ? 'stagger-2' : 'stagger-3'

  return (
    <article
      className={`group flex flex-col rounded-2xl border border-[#1a5c45]/12 bg-white/80 p-5 shadow-[0_8px_28px_rgba(15,28,23,0.05)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[var(--color-leaf)]/40 hover:shadow-[0_16px_40px_rgba(26,92,69,0.12)] animate-fade-up ${delayClass}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <a
            href={issue.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-[var(--color-leaf)] hover:underline"
          >
            {issue.repoFullName}
          </a>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-[var(--color-ink)]">
            <a
              href={issue.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--color-moss)]"
            >
              #{issue.number} {issue.title}
            </a>
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onToggleFavorite(issue)}
          aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
          className={`shrink-0 rounded-lg px-2.5 py-1.5 text-sm transition ${
            favorited
              ? 'bg-[var(--color-clay)]/15 text-[var(--color-clay)]'
              : 'bg-[var(--color-sand)] text-[var(--color-stone)] hover:bg-[var(--color-mint)]'
          }`}
        >
          {favorited ? '★ Saved' : '☆ Save'}
        </button>
      </div>

      {issue.labels.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {issue.labels.slice(0, 6).map((label) => (
            <span
              key={label.name}
              className="rounded-md px-2 py-0.5 text-[11px] font-medium"
              style={{
                backgroundColor: `#${label.color}`,
                color: contrastText(label.color),
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-[#1a5c45]/10 pt-3 text-xs text-[var(--color-stone)]">
        <div className="flex items-center gap-2">
          {issue.user.avatarUrl ? (
            <img
              src={issue.user.avatarUrl}
              alt=""
              className="h-5 w-5 rounded-full"
            />
          ) : null}
          <span>{issue.user.login}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(issue.createdAt)}</span>
          <span aria-hidden>·</span>
          <span>{issue.comments} comments</span>
        </div>
        <a
          href={issue.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-[var(--color-moss)] hover:underline"
        >
          Contribute →
        </a>
      </div>
    </article>
  )
}
