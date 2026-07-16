import { useRef, useState } from 'react'
import ShowcaseCard from './components/ShowcaseCard'
import { exportCardPng, exportCardSvg } from './utils/exportCard'
import { fetchRepoData, parseGitHubRepo } from './utils/github'
import { LAYOUTS, THEMES } from './utils/themes'

const SAMPLE = 'https://github.com/facebook/react'

export default function App() {
  const cardRef = useRef(null)
  const [url, setUrl] = useState('')
  const [repo, setRepo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [themeId, setThemeId] = useState('meadow')
  const [layoutId, setLayoutId] = useState('classic')
  const [showLanguages, setShowLanguages] = useState(true)
  const [showTopics, setShowTopics] = useState(true)
  const [exporting, setExporting] = useState('')

  const theme = THEMES[themeId]
  const layout = LAYOUTS[layoutId].id

  const loadRepo = async (input) => {
    setError('')
    setRepo(null)

    const parsed = parseGitHubRepo(input)
    if (!parsed) {
      setError('Enter a valid GitHub URL or owner/repo (e.g. facebook/react).')
      return
    }

    setLoading(true)
    try {
      const data = await fetchRepoData(parsed.owner, parsed.repo)
      setRepo(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch repository.')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    loadRepo(url)
  }

  const handleExport = async (type) => {
    if (!repo || !cardRef.current) return
    setExporting(type)
    setError('')
    try {
      if (type === 'png') {
        await exportCardPng(cardRef.current, repo.name)
      } else {
        await exportCardSvg(cardRef.current, repo.name)
      }
    } catch (err) {
      setError(err.message || 'Export failed. Try again.')
    } finally {
      setExporting('')
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--color-line)]/80 bg-[rgba(243,246,244,0.9)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-ink)] text-xs font-bold text-white">
              RC
            </span>
            <div>
              <p className="font-display text-xl leading-none text-[var(--color-ink)]">
                RepoCard
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--color-muted)]">
                Open Source Showcase Card Generator
              </p>
            </div>
          </div>
          <p className="hidden text-xs text-[var(--color-muted)] sm:block">
            Issue #199 · GitHub public API
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="animate-rise max-w-2xl">
          <h1 className="font-display text-4xl font-medium leading-tight text-[var(--color-ink)] sm:text-5xl">
            Turn any public repo into a shareable showcase card.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
            Paste a GitHub URL to auto-fetch stars, forks, languages, and metadata —
            then customize the theme and export PNG or SVG.
          </p>
        </section>

        <form
          onSubmit={onSubmit}
          className="mt-8 flex flex-col gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:flex-row sm:items-center"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/owner/repo"
            className="min-w-0 flex-1 rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-moss)]"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setUrl(SAMPLE)
                loadRepo(SAMPLE)
              }}
              className="rounded-xl border border-[var(--color-line)] px-3.5 py-2.5 text-sm font-semibold"
            >
              Try sample
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[var(--color-moss)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Fetching…' : 'Generate'}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-4 rounded-xl bg-[var(--color-ember-soft)] px-4 py-3 text-sm text-[var(--color-ember)]">
            {error}
          </p>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="animate-rise space-y-5 rounded-2xl border border-[var(--color-line)] bg-white p-5">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">
                Theme
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {Object.values(THEMES).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeId(t.id)}
                    className={`rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition ${
                      themeId === t.id
                        ? 'border-[var(--color-moss)] bg-[var(--color-moss-soft)] text-[var(--color-moss)]'
                        : 'border-[var(--color-line)] hover:border-[var(--color-ink)]'
                    }`}
                  >
                    <span
                      className="mb-1.5 block h-2 w-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${t.accent}, ${t.bg})`,
                      }}
                    />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">
                Layout
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.values(LAYOUTS).map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLayoutId(l.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold ${
                      layoutId === l.id
                        ? 'border-[var(--color-ember)] bg-[var(--color-ember-soft)] text-[var(--color-ember)]'
                        : 'border-[var(--color-line)]'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={showLanguages}
                  onChange={(e) => setShowLanguages(e.target.checked)}
                  className="accent-[var(--color-moss)]"
                />
                Show language breakdown
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={showTopics}
                  onChange={(e) => setShowTopics(e.target.checked)}
                  className="accent-[var(--color-moss)]"
                />
                Show topics
              </label>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-4">
              <button
                type="button"
                disabled={!repo || Boolean(exporting)}
                onClick={() => handleExport('png')}
                className="rounded-xl bg-[var(--color-ink)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {exporting === 'png' ? 'Exporting PNG…' : 'Export PNG'}
              </button>
              <button
                type="button"
                disabled={!repo || Boolean(exporting)}
                onClick={() => handleExport('svg')}
                className="rounded-xl border border-[var(--color-line)] px-4 py-2.5 text-sm font-semibold disabled:opacity-50"
              >
                {exporting === 'svg' ? 'Exporting SVG…' : 'Export SVG'}
              </button>
            </div>
          </aside>

          <section className="animate-rise">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">
              Live preview
            </h2>

            {loading && (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-[var(--color-line)] bg-white/70 text-sm text-[var(--color-muted)]">
                Fetching repository from GitHub…
              </div>
            )}

            {!loading && !repo && (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-line)] bg-white/70 px-6 text-center">
                <p className="font-display text-2xl text-[var(--color-ink)]">
                  Your card preview appears here
                </p>
                <p className="mt-2 max-w-sm text-sm text-[var(--color-muted)]">
                  Generate a card from a public repo URL to customize themes and export.
                </p>
              </div>
            )}

            {!loading && repo && (
              <div className="overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-[rgba(255,255,255,0.55)] p-4 sm:p-6">
                <div className="mx-auto w-fit" ref={cardRef}>
                  <ShowcaseCard
                    repo={repo}
                    theme={theme}
                    layout={layout}
                    showLanguages={showLanguages}
                    showTopics={showTopics}
                  />
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-xs text-[var(--color-muted)]">
        RepoCard · Open Source Project Showcase Card Generator · Issue #199
      </footer>
    </div>
  )
}
