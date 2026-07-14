import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-[var(--color-ocean)] text-white'
        : 'text-[var(--color-muted)] hover:bg-[var(--color-foam)] hover:text-[var(--color-ink)]'
    }`

  return (
    <header className="sticky top-0 z-20 border-b border-[#102a43]/08 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="font-display text-xl font-bold text-[var(--color-ink)]">
          Markdown<span className="text-[var(--color-sea)]">Blog</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/write" className={linkClass}>
                Write
              </NavLink>
              <NavLink to="/my-posts" className={linkClass}>
                My posts
              </NavLink>
              <span className="ml-1 hidden text-xs text-[var(--color-muted)] sm:inline">
                {user?.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-accent)] hover:bg-red-50"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Log in
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
