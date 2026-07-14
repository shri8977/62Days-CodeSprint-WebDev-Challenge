import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api/client'
import MarkdownPreview from '../components/MarkdownPreview'
import { useAuth } from '../context/AuthContext'

export default function PostDetailPage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api
      .get(`/posts/${slug}`)
      .then((res) => setPost(res.data.post))
      .catch((err) => setError(err.response?.data?.message || 'Post not found.'))
      .finally(() => setLoading(false))
  }, [slug])

  const isOwner = user && post && String(user.id) === String(post.author?._id || post.author)

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return
    try {
      await api.delete(`/posts/${post._id}`)
      navigate('/my-posts')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete.')
    }
  }

  if (loading) {
    return <p className="px-4 py-12 text-center text-[var(--color-muted)]">Loading…</p>
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="font-semibold">{error || 'Post not found.'}</p>
        <Link to="/" className="mt-4 inline-block text-[var(--color-sea)] hover:underline">
          ← Back home
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 animate-fade-up">
      <Link to="/" className="text-sm text-[var(--color-sea)] hover:underline">
        ← All posts
      </Link>

      <header className="mt-4 mb-8">
        <h1 className="font-display text-3xl font-bold leading-tight text-[var(--color-ink)] sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          By {post.author?.name || 'Author'} ·{' '}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        {post.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/?tag=${encodeURIComponent(tag)}`}
                className="rounded-md bg-[var(--color-foam)] px-2 py-0.5 text-xs font-medium text-[var(--color-ocean)]"
              >
                #{tag}
              </Link>
            ))}
          </div>
        ) : null}

        {isOwner ? (
          <div className="mt-4 flex gap-2">
            <Link
              to={`/edit/${post._id}`}
              className="rounded-lg bg-[var(--color-ocean)] px-3 py-2 text-sm font-semibold text-white"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-[var(--color-accent)]/10 px-3 py-2 text-sm font-semibold text-[var(--color-accent)]"
            >
              Delete
            </button>
          </div>
        ) : null}
      </header>

      <MarkdownPreview content={post.content} />
    </article>
  )
}
