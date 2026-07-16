import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CodeBlock from '../components/CodeBlock'

const DEMO = `function debounce(fn, wait = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}`

export default function LandingPage() {
  const { isAuthenticated, loading } = useAuth()

  if (!loading && isAuthenticated) {
    return <Navigate to="/library" replace />
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <section className="animate-rise grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-tide)]">
            SnippetVault
          </p>
          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Keep reusable code close — highlighted, tagged, shareable.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            A personal library for developers. Save snippets by language and tags,
            search instantly, and publish short public links when you want to share.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="rounded-xl bg-[var(--color-ember)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Create free account
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-[var(--color-line)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-ink)]"
            >
              Log in
            </Link>
          </div>
        </div>

        <div className="animate-fade rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_20px_50px_rgba(26,31,54,0.08)] sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-[var(--color-tide)]">
              javascript
            </span>
            <span className="text-xs text-[var(--color-muted)]">live preview</span>
          </div>
          <CodeBlock code={DEMO} language="javascript" />
        </div>
      </section>

      <section className="mt-20 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: 'Secure library',
            body: 'JWT auth keeps your private snippets yours until you choose to share.',
          },
          {
            title: 'Search & filter',
            body: 'Find snippets by keyword, language, or tag without digging through notes.',
          },
          {
            title: 'Short share links',
            body: 'Flip a snippet public and copy a short URL — perfect for teammates.',
          },
        ].map((item, i) => (
          <div
            key={item.title}
            className="animate-rise rounded-2xl border border-[var(--color-line)] bg-white/80 p-5"
            style={{ animationDelay: `${0.1 * (i + 1)}s` }}
          >
            <h2 className="text-lg font-semibold text-[var(--color-ink)]">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {item.body}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
