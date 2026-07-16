import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'
import SnippetCard from '../components/SnippetCard'
import { LANGUAGES } from '../utils/languages'

export default function LibraryPage() {
  const [snippets, setSnippets] = useState([])
  const [tags, setTags] = useState([])
  const [q, setQ] = useState('')
  const [language, setLanguage] = useState('')
  const [tag, setTag] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = {}
      if (q.trim()) params.q = q.trim()
      if (language) params.language = language
      if (tag) params.tag = tag

      const [listRes, tagsRes] = await Promise.all([
        api.get('/snippets', { params }),
        api.get('/snippets/tags/mine'),
      ])

      setSnippets(listRes.data.snippets || [])
      setTotal(listRes.data.pagination?.total || 0)
      setTags(tagsRes.data.tags || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load snippets.')
    } finally {
      setLoading(false)
    }
  }, [q, language, tag])

  useEffect(() => {
    const timer = setTimeout(load, 250)
    return () => clearTimeout(timer)
  }, [load])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="animate-rise flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-ink)]">
            Your library
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {total} snippet{total === 1 ? '' : 's'} saved
          </p>
        </div>
        <Link
          to="/new"
          className="inline-flex items-center justify-center rounded-xl bg-[var(--color-ember)] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          + New snippet
        </Link>
      </div>

      <div className="mt-8 grid gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Search
          </span>
          <input
            type="search"
            placeholder="Title, code, tags…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-tide)]"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Language
          </span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-tide)]"
          >
            <option value="">All languages</option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Tag
          </span>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-tide)]"
          >
            <option value="">All tags</option>
            {tags.map((t) => (
              <option key={t.name} value={t.name}>
                #{t.name} ({t.count})
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-[var(--color-ember-soft)] px-4 py-3 text-sm text-[var(--color-ember)]">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-10 text-center text-[var(--color-muted)]">Loading snippets…</p>
      ) : snippets.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-[var(--color-line)] bg-white/70 px-6 py-14 text-center">
          <p className="text-lg font-semibold text-[var(--color-ink)]">No snippets yet</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Create your first snippet or adjust your filters.
          </p>
          <Link
            to="/new"
            className="mt-5 inline-flex rounded-xl bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white"
          >
            Add snippet
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {snippets.map((snippet, i) => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              style={{ animationDelay: `${Math.min(i, 8) * 0.04}s` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
