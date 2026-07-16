import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api/client'
import CodeBlock from '../components/CodeBlock'
import CopyButton from '../components/CopyButton'
import { shareUrl } from '../utils/languages'

export default function SnippetDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [snippet, setSnippet] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    api
      .get(`/snippets/${id}`)
      .then((res) => setSnippet(res.data.snippet))
      .catch((err) => {
        setError(err.response?.data?.message || 'Snippet not found.')
      })
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this snippet permanently?')) return
    setDeleting(true)
    try {
      await api.delete(`/snippets/${id}`)
      navigate('/library')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete.')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <p className="py-20 text-center text-[var(--color-muted)]">Loading snippet…</p>
    )
  }

  if (error || !snippet) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-[var(--color-ember)]">{error || 'Not found'}</p>
        <Link to="/library" className="mt-4 inline-block text-sm font-semibold text-[var(--color-ink)]">
          Back to library
        </Link>
      </div>
    )
  }

  const publicLink = snippet.isPublic ? shareUrl(snippet.shareId) : ''

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="animate-rise">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[var(--color-tide-soft)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--color-tide)]">
                {snippet.language}
              </span>
              {snippet.isPublic ? (
                <span className="rounded-md bg-[var(--color-ember-soft)] px-2 py-0.5 text-xs font-medium text-[var(--color-ember)]">
                  Public
                </span>
              ) : (
                <span className="rounded-md border border-[var(--color-line)] px-2 py-0.5 text-xs text-[var(--color-muted)]">
                  Private
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-ink)]">
              {snippet.title}
            </h1>
            {snippet.description ? (
              <p className="mt-2 text-[var(--color-muted)]">{snippet.description}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <CopyButton text={snippet.code} label="Copy code" />
            <Link
              to={`/edit/${snippet._id}`}
              className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-1.5 text-sm font-medium transition hover:border-[var(--color-ink)]"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:border-red-300 disabled:opacity-60"
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>

        {snippet.tags?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
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

        {publicLink && (
          <div className="mb-5 flex flex-col gap-2 rounded-xl border border-[var(--color-line)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                Shareable link
              </p>
              <a
                href={publicLink}
                className="mt-1 break-all font-mono text-sm text-[var(--color-tide)] hover:underline"
              >
                {publicLink}
              </a>
            </div>
            <CopyButton text={publicLink} label="Copy link" />
          </div>
        )}

        <CodeBlock code={snippet.code} language={snippet.language} />
      </div>
    </div>
  )
}
