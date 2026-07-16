import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && isAuthenticated) {
    return <Navigate to="/library" replace />
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await register(name, email, password)
      navigate('/library')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="animate-rise rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[0_12px_40px_rgba(26,31,54,0.06)] sm:p-8">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Create account</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Start building your personal snippet vault.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--color-tide)]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--color-tide)]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Password</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--color-tide)]"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-[var(--color-ember-soft)] px-3 py-2 text-sm text-[var(--color-ember)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-[var(--color-ember)] py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? 'Creating…' : 'Sign up'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--color-muted)]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[var(--color-ember)]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
