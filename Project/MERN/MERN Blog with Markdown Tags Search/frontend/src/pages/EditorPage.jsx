import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/client'
import MarkdownPreview from '../components/MarkdownPreview'

const SAMPLE = `# Hello Markdown

Write your post here. You can use **bold**, _italic_, lists, and code.

\`\`\`js
console.log('Hello MERN Blog')
\`\`\`
`

export default function EditorPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState(isEdit ? '' : SAMPLE)
  const [tags, setTags] = useState('mern, markdown')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)

  useEffect(() => {
    if (!isEdit) return
    setFetching(true)
    api
      .get(`/posts/${id}`)
      .then((res) => {
        const post = res.data.post
        setTitle(post.title)
        setContent(post.content)
        setTags((post.tags || []).join(', '))
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load post.'))
      .finally(() => setFetching(false))
  }, [id, isEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      title,
      content,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }

    try {
      const res = isEdit
        ? await api.put(`/posts/${id}`, payload)
        : await api.post('/posts', payload)
      navigate(`/posts/${res.data.post.slug}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post.')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return <p className="px-4 py-12 text-center text-[var(--color-muted)]">Loading editor…</p>
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 animate-fade-up">
      <h1 className="font-display text-3xl font-bold">
        {isEdit ? 'Edit post' : 'Write a post'}
      </h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Markdown on the left · live preview on the right
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error ? <p className="text-sm text-[var(--color-accent)]">{error}</p> : null}

        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full rounded-xl border border-[#102a43]/12 bg-white px-4 py-3 text-lg font-semibold outline-none focus:border-[var(--color-sea)]"
        />

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated): mern, react, tips"
          className="w-full rounded-xl border border-[#102a43]/12 bg-white px-4 py-3 outline-none focus:border-[var(--color-sea)]"
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={18}
            className="w-full rounded-2xl border border-[#102a43]/12 bg-[#102a43] p-4 font-mono text-sm text-[#f0f4f8] outline-none focus:ring-2 focus:ring-[var(--color-sea)]/40"
            placeholder="Write Markdown…"
          />
          <div className="max-h-[32rem] overflow-y-auto rounded-2xl border border-[#102a43]/08 bg-white/90 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              Preview
            </p>
            <MarkdownPreview content={content} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[var(--color-ocean)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? 'Saving…' : isEdit ? 'Update post' : 'Publish post'}
        </button>
      </form>
    </div>
  )
}
