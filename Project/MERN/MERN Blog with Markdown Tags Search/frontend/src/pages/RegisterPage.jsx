import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/write')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 animate-fade-up">
      <h1 className="font-display text-3xl font-bold">Create account</h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Already registered?{' '}
        <Link to="/login" className="font-semibold text-[var(--color-sea)] hover:underline">
          Log in
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-[#102a43]/08 bg-white/90 p-6">
        {error ? <p className="text-sm text-[var(--color-accent)]">{error}</p> : null}
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[#102a43]/12 px-3 py-2.5 outline-none focus:border-[var(--color-sea)]"
          />
        </label>
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
          {loading ? 'Creating…' : 'Register'}
        </button>
      </form>
    </div>
  )
}
