import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate(location.state?.from || '/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 animate-fade-up">
      <h1 className="font-display text-3xl font-bold">Log in</h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        No account?{' '}
        <Link to="/register" className="font-semibold text-[var(--color-sea)] hover:underline">
          Register
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-[#102a43]/08 bg-white/90 p-6">
        {error ? <p className="text-sm text-[var(--color-accent)]">{error}</p> : null}
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#102a43]/12 px-3 py-2.5 outline-none focus:border-[var(--color-sea)]"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Password</span>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#102a43]/12 px-3 py-2.5 outline-none focus:border-[var(--color-sea)]"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[var(--color-ocean)] py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Log in'}
        </button>
      </form>
    </div>
  )
}
