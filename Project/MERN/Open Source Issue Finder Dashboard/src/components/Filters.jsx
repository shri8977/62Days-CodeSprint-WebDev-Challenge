const LANGUAGE_OPTIONS = [
  { value: 'any', label: 'Any language' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'Python', label: 'Python' },
  { value: 'Java', label: 'Java' },
  { value: 'Go', label: 'Go' },
  { value: 'Rust', label: 'Rust' },
  { value: 'C++', label: 'C++' },
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
]

const LABEL_PRESETS = [
  { id: 'good-first-issue', value: 'good first issue', label: 'good first issue' },
  { id: 'help-wanted', value: 'help wanted', label: 'help wanted' },
  { id: 'beginner', value: 'beginner', label: 'beginner' },
  { id: 'documentation', value: 'documentation', label: 'documentation' },
]

const STAR_OPTIONS = [
  { value: 0, label: 'Any stars' },
  { value: 50, label: '50+' },
  { value: 100, label: '100+' },
  { value: 500, label: '500+' },
  { value: 1000, label: '1k+' },
  { value: 5000, label: '5k+' },
]

export default function Filters({ filters, onChange, onSearch, loading }) {
  const toggleLabel = (value) => {
    const has = filters.labels.includes(value)
    onChange({
      ...filters,
      labels: has
        ? filters.labels.filter((l) => l !== value)
        : [...filters.labels, value],
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#1a5c45]/15 bg-white/70 p-5 shadow-[0_12px_40px_rgba(15,28,23,0.06)] backdrop-blur-sm animate-fade-up"
    >
      <div className="flex flex-col gap-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-stone)]">
            Search keywords
          </span>
          <input
            type="search"
            value={filters.query}
            onChange={(e) => onChange({ ...filters, query: e.target.value })}
            placeholder="e.g. react dashboard, docs, bug..."
            className="w-full rounded-xl border border-[#1a5c45]/20 bg-[#f7f4ed] px-4 py-3 text-[var(--color-ink)] outline-none transition focus:border-[var(--color-leaf)] focus:ring-2 focus:ring-[var(--color-leaf)]/25"
          />
        </label>

        <div>
          <span className="mb-2 block text-sm font-medium text-[var(--color-stone)]">
            Beginner-friendly labels
          </span>
          <div className="flex flex-wrap gap-2">
            {LABEL_PRESETS.map((preset) => {
              const active = filters.labels.includes(preset.value)
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => toggleLabel(preset.value)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    active
                      ? 'bg-[var(--color-moss)] text-white'
                      : 'bg-[var(--color-mint)] text-[var(--color-moss)] hover:bg-[#d4ebe0]'
                  }`}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[var(--color-stone)]">
              Language
            </span>
            <select
              value={filters.language}
              onChange={(e) =>
                onChange({ ...filters, language: e.target.value })
              }
              className="w-full rounded-xl border border-[#1a5c45]/20 bg-[#f7f4ed] px-4 py-3 outline-none transition focus:border-[var(--color-leaf)] focus:ring-2 focus:ring-[var(--color-leaf)]/25"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[var(--color-stone)]">
              Minimum stars
            </span>
            <select
              value={filters.minStars}
              onChange={(e) =>
                onChange({
                  ...filters,
                  minStars: Number(e.target.value),
                })
              }
              className="w-full rounded-xl border border-[#1a5c45]/20 bg-[#f7f4ed] px-4 py-3 outline-none transition focus:border-[var(--color-leaf)] focus:ring-2 focus:ring-[var(--color-leaf)]/25"
            >
              {STAR_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[var(--color-moss)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-leaf)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Searching…' : 'Find issues'}
          </button>
          <p className="text-xs text-[var(--color-stone)]">
            Uses the public GitHub Search API · unauthenticated limit is low
          </p>
        </div>
      </div>
    </form>
  )
}
