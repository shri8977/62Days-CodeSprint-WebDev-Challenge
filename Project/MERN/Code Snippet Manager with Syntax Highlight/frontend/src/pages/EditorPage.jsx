import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api/client'
import CodeBlock from '../components/CodeBlock'
import { LANGUAGES } from '../utils/languages'

const emptyForm = {
  title: '',
  code: '',
  language: 'javascript',
  description: '',
  tags: '',
  isPublic: false,
}

export default function EditorPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return

    api
      .get(`/snippets/${id}`)
      .then((res) => {
        const s = res.data.snippet
        setForm({
          title: s.title || '',
          code: s.code || '',
          language: s.language || 'javascript',
          description: s.description || '',
          tags: (s.tags || []).join(', '),
          isPublic: Boolean(s.isPublic),
        })
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to load snippet.')
      })
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = {
      title: form.title.trim(),
      code: form.code,
      language: form.language,
      description: form.description.trim(),
      tags: form.tags,
      isPublic: form.isPublic,
    }

    try {
      const res = isEdit
        ? await api.put(`/snippets/${id}`, payload)
        : await api.post('/snippets', payload)
      navigate(`/snippets/${res.data.snippet._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save snippet.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <p className="py-20 text-center text-[var(--color-muted)]">Loading editor…</p>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? 'Edit snippet' : 'New snippet'}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Write, tag, and optionally share a public link.
          </p>
        </div>
        <Link
          to={isEdit ? `/snippets/${id}` : '/library'}
          className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          Cancel
        </Link>
      </div>

      <form
        onSubmit={onSubmit}
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-4 rounded-2xl border border-[var(--color-line)] bg-white p-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Title</span>
            <input
              required
              value={form.title}
              onChange={update('title')}
              placeholder="Debounce helper"
              className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-tide)]"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Language</span>
              <select
                value={form.language}
                onChange={update('language')}
                className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-tide)]"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Tags</span>
              <input
                value={form.tags}
                onChange={update('tags')}
                placeholder="utils, async, frontend"
                className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-tide)]"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Description</span>
            <textarea
              rows={2}
              value={form.description}
              onChange={update('description')}
              placeholder="Optional note about when to use this"
              className="w-full resize-y rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-tide)]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Code</span>
            <textarea
              required
              rows={16}
              value={form.code}
              onChange={update('code')}
              spellCheck={false}
              className="w-full resize-y rounded-xl border border-[var(--color-line)] bg-[#f8fafc] px-3.5 py-3 font-mono text-sm leading-relaxed outline-none focus:border-[var(--color-tide)]"
            />
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3">
            <input
              type="checkbox"
              checked={form.isPublic}
              onChange={update('isPublic')}
              className="h-4 w-4 accent-[var(--color-ember)]"
            />
            <span className="text-sm">
              <strong className="font-semibold">Make public</strong>
              <span className="text-[var(--color-muted)]">
                {' '}
                — generate a short shareable link
              </span>
            </span>
          </label>

          {error && (
            <p className="rounded-lg bg-[var(--color-ember-soft)] px-3 py-2 text-sm text-[var(--color-ember)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[var(--color-ember)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {saving ? 'Saving…' : isEdit ? 'Update snippet' : 'Save snippet'}
          </button>
        </div>

        <div className="animate-fade lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-sm font-semibold text-[var(--color-muted)]">
            Live highlight preview
          </p>
          <CodeBlock
            code={form.code || '// Start typing your snippet…'}
            language={form.language}
          />
        </div>
      </form>
    </div>
  )
}
