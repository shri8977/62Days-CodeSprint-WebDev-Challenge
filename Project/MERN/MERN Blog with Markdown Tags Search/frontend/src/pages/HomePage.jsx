import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api/client'
import PostCard from '../components/PostCard'

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [q, setQ] = useState(searchParams.get('q') || '')
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })

  const activeTag = searchParams.get('tag') || ''
  const activeQ = searchParams.get('q') || ''
  const page = Number(searchParams.get('page') || 1)

  useEffect(() => {
    api
      .get('/posts/tags/all')
      .then((res) => setTags(res.data.tags || []))
      .catch(() => setTags([]))
  }, [])

  useEffect(() => {
    setLoading(true)
    setError('')
    const params = { page, limit: 8 }
    if (activeQ) params.q = activeQ
    if (activeTag) params.tag = activeTag

    api
      .get('/posts', { params })
      .then((res) => {
        setPosts(res.data.posts || [])
        setPagination(res.data.pagination || { page: 1, pages: 1, total: 0 })
      })
      .catch((err) => {
        setPosts([])
        setError(err.response?.data?.message || 'Failed to load posts. Is the API running?')
      })
      .finally(() => setLoading(false))
  }, [activeQ, activeTag, page])

  const submitSearch = (e) => {
    e.preventDefault()
    const next = {}
    if (q.trim()) next.q = q.trim()
    if (activeTag) next.tag = activeTag
    setSearchParams(next)
  }

  const selectTag = (tag) => {
    const next = {}
    if (activeQ) next.q = activeQ
    if (tag && tag !== activeTag) next.tag = tag
    setSearchParams(next)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <section className="mb-8 animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-sea)]">
          MERN · Markdown · Tags · Search
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
          Stories written in Markdown
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          Full-stack blog with JWT auth, CRUD posts, live Markdown preview, tags, and MongoDB full-text search.
        </p>
      </section>

      <form onSubmit={submitSearch} className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts…"
          className="flex-1 rounded-xl border border-[#102a43]/12 bg-white px-4 py-3 outline-none focus:border-[var(--color-sea)] focus:ring-2 focus:ring-[var(--color-sea)]/20"
        />
        <button
          type="submit"
          className="rounded-xl bg-[var(--color-ocean)] px-5 py-3 text-sm font-semibold text-white hover:bg-[#095c42]"
        >
          Search
        </button>
      </form>

      {tags.length > 0 ? (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => selectTag('')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
              !activeTag
                ? 'bg-[var(--color-ink)] text-white'
                : 'bg-white text-[var(--color-muted)] ring-1 ring-[#102a43]/10'
            }`}
          >
            All tags
          </button>
          {tags.map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => selectTag(t.name)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                activeTag === t.name
                  ? 'bg-[var(--color-sea)] text-white'
                  : 'bg-white text-[var(--color-muted)] ring-1 ring-[#102a43]/10'
              }`}
            >
              #{t.name} ({t.count})
            </button>
          ))}
        </div>
      ) : null}

      {loading ? (
        <p className="text-[var(--color-muted)]">Loading posts…</p>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-[var(--color-accent)]/30 bg-red-50 px-5 py-8 text-center">
          <p className="font-semibold text-[var(--color-ink)]">{error}</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Start MongoDB and run the backend from the <code>backend</code> folder.
          </p>
        </div>
      ) : null}

      {!loading && !error && posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#102a43]/20 bg-white/60 px-5 py-12 text-center">
          <p className="font-display text-xl font-semibold">No posts yet</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Be the first to{' '}
            <Link to="/write" className="font-semibold text-[var(--color-sea)] hover:underline">
              write a post
            </Link>
            .
          </p>
        </div>
      ) : null}

      {!loading && !error && posts.length > 0 ? (
        <>
          <p className="mb-4 text-sm text-[var(--color-muted)]">
            {pagination.total} post{pagination.total === 1 ? '' : 's'}
            {activeQ ? ` matching “${activeQ}”` : ''}
            {activeTag ? ` tagged #${activeTag}` : ''}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {pagination.pages > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => {
                  const next = Object.fromEntries(searchParams.entries())
                  next.page = String(page - 1)
                  setSearchParams(next)
                }}
                className="rounded-xl border border-[#102a43]/12 bg-white px-4 py-2 text-sm disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-[var(--color-muted)]">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                type="button"
                disabled={page >= pagination.pages}
                onClick={() => {
                  const next = Object.fromEntries(searchParams.entries())
                  next.page = String(page + 1)
                  setSearchParams(next)
                }}
                className="rounded-xl border border-[#102a43]/12 bg-white px-4 py-2 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
