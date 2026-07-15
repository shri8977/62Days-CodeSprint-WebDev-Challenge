import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'

export default function MyPostsPage() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    api
      .get('/posts/mine/list')
      .then((res) => setPosts(res.data.posts || []))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load posts.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return
    try {
      await api.delete(`/posts/${id}`)
      setPosts((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.')
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 animate-fade-up">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold">My posts</h1>
        <Link
          to="/write"
          className="rounded-xl bg-[var(--color-ocean)] px-4 py-2 text-sm font-semibold text-white"
        >
          New post
        </Link>
      </div>

      {loading ? <p className="text-[var(--color-muted)]">Loading…</p> : null}
      {error ? <p className="text-[var(--color-accent)]">{error}</p> : null}

      {!loading && posts.length === 0 ? (
        <p className="text-[var(--color-muted)]">You haven&apos;t written anything yet.</p>
      ) : null}

      <ul className="space-y-3">
        {posts.map((post) => (
          <li
            key={post._id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#102a43]/08 bg-white/85 p-4"
          >
            <div>
              <Link
                to={`/posts/${post.slug}`}
                className="font-semibold text-[var(--color-ink)] hover:text-[var(--color-ocean)]"
              >
                {post.title}
              </Link>
              <p className="text-xs text-[var(--color-muted)]">
                {(post.tags || []).map((t) => `#${t}`).join(' ') || 'No tags'}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/edit/${post._id}`}
                className="rounded-lg bg-[var(--color-foam)] px-3 py-1.5 text-sm font-medium text-[var(--color-ocean)]"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(post._id)}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--color-accent)] hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
