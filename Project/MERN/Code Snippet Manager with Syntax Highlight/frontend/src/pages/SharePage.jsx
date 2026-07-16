import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/client'
import CodeBlock from '../components/CodeBlock'
import CopyButton from '../components/CopyButton'

export default function SharePage() {
  const { shareId } = useParams()
  const [snippet, setSnippet] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get(`/snippets/share/${shareId}`)
      .then((res) => setSnippet(res.data.snippet))
      .catch((err) => {
        setError(err.response?.data?.message || 'Shared snippet not found.')
      })
      .finally(() => setLoading(false))
  }, [shareId])

  if (loading) {
    return (
      <p className="py-20 text-center text-[var(--color-muted)]">Loading shared snippet…</p>
    )
  }

  if (error || !snippet) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Link unavailable</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{error}</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white"
        >
          Go home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="animate-rise rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-7">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-tide)]">
          Public snippet
        </p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-ink)]">
              {snippet.title}
            </h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Shared by {snippet.owner?.name || 'a developer'} · {snippet.language}
            </p>
            {snippet.description ? (
              <p className="mt-3 text-[var(--color-muted)]">{snippet.description}</p>
            ) : null}
          </div>
          <CopyButton text={snippet.code} label="Copy code" />
        </div>

        {snippet.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {snippet.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-line)] px-2.5 py-0.5 text-xs text-[var(--color-muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5">
          <CodeBlock code={snippet.code} language={snippet.language} />
        </div>
      </div>
    </div>
  )
}
