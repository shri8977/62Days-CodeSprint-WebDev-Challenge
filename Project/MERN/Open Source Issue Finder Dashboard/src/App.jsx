import { useCallback, useEffect, useState } from 'react'
import Filters from './components/Filters'
import IssueCard from './components/IssueCard'
import FavoritesPanel from './components/FavoritesPanel'
import { EmptyState, ErrorState, LoadingGrid } from './components/StatusViews'
import { useFavorites } from './hooks/useFavorites'
import { searchIssues } from './services/githubApi'

const DEFAULT_FILTERS = {
  query: '',
  labels: ['good first issue'],
  language: 'any',
  minStars: 100,
}

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [issues, setIssues] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [lastQuery, setLastQuery] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('discover')
  const { favorites, isFavorite, toggleFavorite, clearFavorites } =
    useFavorites()

  const runSearch = useCallback(
    async (nextPage = 1) => {
      setLoading(true)
      setError(null)
      try {
        const result = await searchIssues(filters, {
          page: nextPage,
          perPage: 12,
        })
        setIssues(result.items)
        setTotalCount(result.totalCount)
        setLastQuery(result.query)
        setPage(nextPage)
      } catch (err) {
        setIssues([])
        setTotalCount(0)
        setError(err.message || 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    },
    [filters]
  )

  useEffect(() => {
    runSearch(1)
    // Initial load only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPages = Math.max(1, Math.ceil(Math.min(totalCount, 1000) / 12))

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-leaf)]">
          SSoC · Open Source
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          Issue Finder Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-stone)]">
          Discover beginner-friendly GitHub issues with filters for labels,
          language, and repository stars — built for SSoC contributors.
        </p>
      </header>

      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => setTab('discover')}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            tab === 'discover'
              ? 'bg-[var(--color-moss)] text-white'
              : 'bg-white/70 text-[var(--color-stone)] hover:bg-[var(--color-mint)]'
          }`}
        >
          Discover
        </button>
        <button
          type="button"
          onClick={() => setTab('favorites')}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            tab === 'favorites'
              ? 'bg-[var(--color-moss)] text-white'
              : 'bg-white/70 text-[var(--color-stone)] hover:bg-[var(--color-mint)]'
          }`}
        >
          Favorites ({favorites.length})
        </button>
      </div>

      {tab === 'discover' ? (
        <div className="flex flex-col gap-6">
          <Filters
            filters={filters}
            onChange={setFilters}
            onSearch={() => runSearch(1)}
            loading={loading}
          />

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold">Results</h2>
              {!loading && !error ? (
                <p className="text-sm text-[var(--color-stone)]">
                  {totalCount.toLocaleString()} open issues matched
                  {lastQuery ? (
                    <>
                      {' '}
                      ·{' '}
                      <code className="text-xs text-[var(--color-moss)]">
                        {lastQuery}
                      </code>
                    </>
                  ) : null}
                </p>
              ) : null}
            </div>
          </div>

          {loading ? <LoadingGrid /> : null}
          {!loading && error ? (
            <ErrorState message={error} onRetry={() => runSearch(page)} />
          ) : null}
          {!loading && !error && issues.length === 0 ? (
            <EmptyState query={lastQuery} />
          ) : null}
          {!loading && !error && issues.length > 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {issues.map((issue, index) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    index={index}
                    favorited={isFavorite(issue.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  disabled={page <= 1 || loading}
                  onClick={() => runSearch(page - 1)}
                  className="rounded-xl border border-[#1a5c45]/20 bg-white/80 px-4 py-2 text-sm font-medium disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-sm text-[var(--color-stone)]">
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages || loading}
                  onClick={() => runSearch(page + 1)}
                  className="rounded-xl border border-[#1a5c45]/20 bg-white/80 px-4 py-2 text-sm font-medium disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </>
          ) : null}
        </div>
      ) : (
        <FavoritesPanel
          favorites={favorites}
          onRemove={toggleFavorite}
          onClear={clearFavorites}
        />
      )}

      <footer className="mt-12 border-t border-[#1a5c45]/10 pt-6 text-center text-xs text-[var(--color-stone)]">
        Open Source Issue Finder Dashboard · GitHub public API · Optional token
        via <code>VITE_GITHUB_TOKEN</code>
      </footer>
    </div>
  )
}
