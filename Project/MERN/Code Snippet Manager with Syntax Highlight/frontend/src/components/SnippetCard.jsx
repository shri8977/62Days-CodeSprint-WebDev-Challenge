import { Link } from 'react-router-dom'
import CodeBlock from './CodeBlock'

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

export default function SnippetCard({ snippet, style }) {
  const preview = snippet.code.slice(0, 220)

  return (
    <article
      className="animate-rise group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_8px_24px_rgba(26,31,54,0.04)] transition hover:-translate-y-0.5 hover:border-[var(--color-tide)] hover:shadow-[0_14px_32px_rgba(26,31,54,0.08)]"
      style={style}
    >
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-line)] px-4 py-3">
        <span className="rounded-md bg-[var(--color-tide-soft)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--color-tide)]">
          {snippet.language}
        </span>
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          {snippet.isPublic && (
            <span className="rounded-md bg-[var(--color-ember-soft)] px-2 py-0.5 font-medium text-[var(--color-ember)]">
              Public
            </span>
          )}
          <span>{formatDate(snippet.updatedAt)}</span>
        </div>
      </div>

      <Link to={`/snippets/${snippet._id}`} className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-ember)]">
          {snippet.title}
        </h3>
        {snippet.description ? (
          <p className="mt-1 line-clamp-2 text-sm text-[var(--color-muted)]">
            {snippet.description}
          </p>
        ) : null}

        <div className="mt-3 max-h-28 overflow-hidden opacity-90">
          <CodeBlock code={preview} language={snippet.language} />
        </div>

        {snippet.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {snippet.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-line)] px-2 py-0.5 text-[11px] text-[var(--color-muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  )
}
