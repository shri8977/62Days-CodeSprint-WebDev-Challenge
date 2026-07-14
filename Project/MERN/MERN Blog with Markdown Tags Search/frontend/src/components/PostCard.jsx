import { Link } from 'react-router-dom'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

export default function PostCard({ post }) {
  return (
    <article className="animate-fade-up rounded-2xl border border-[#102a43]/08 bg-white/85 p-5 shadow-[0_10px_30px_rgba(16,42,67,0.05)] transition hover:-translate-y-0.5 hover:border-[var(--color-sea)]/35">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
        <span>{post.author?.name || 'Author'}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </div>

      <h2 className="font-display text-xl font-bold leading-snug text-[var(--color-ink)]">
        <Link to={`/posts/${post.slug}`} className="hover:text-[var(--color-ocean)]">
          {post.title}
        </Link>
      </h2>

      {post.excerpt ? (
        <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">{post.excerpt}</p>
      ) : null}

      {post.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/?tag=${encodeURIComponent(tag)}`}
              className="rounded-md bg-[var(--color-foam)] px-2 py-0.5 text-xs font-medium text-[var(--color-ocean)] hover:bg-[#d3efed]"
            >
              #{tag}
            </Link>
          ))}
        </div>
      ) : null}

      <Link
        to={`/posts/${post.slug}`}
        className="mt-4 inline-block text-sm font-semibold text-[var(--color-sea)] hover:underline"
      >
        Read more →
      </Link>
    </article>
  )
}
