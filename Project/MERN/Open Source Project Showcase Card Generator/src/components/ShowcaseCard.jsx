import { formatCount } from '../utils/github'

export default function ShowcaseCard({ repo, theme, layout, showLanguages, showTopics }) {
  const isCompact = layout === 'compact'
  const isBanner = layout === 'banner'

  return (
    <div
      style={{
        width: isBanner ? 720 : 560,
        background: theme.bg,
        color: theme.ink,
        border: `1px solid ${theme.border}`,
        borderRadius: 24,
        padding: isCompact ? 22 : 28,
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {isBanner && (
        <div
          style={{
            height: 8,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}55)`,
            marginBottom: 20,
          }}
        />
      )}

      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        {repo.owner?.avatarUrl ? (
          <img
            src={repo.owner.avatarUrl}
            alt=""
            crossOrigin="anonymous"
            width={isCompact ? 44 : 56}
            height={isCompact ? 44 : 56}
            style={{
              borderRadius: 14,
              border: `2px solid ${theme.border}`,
              objectFit: 'cover',
              background: theme.panel,
            }}
          />
        ) : (
          <div
            style={{
              width: isCompact ? 44 : 56,
              height: isCompact ? 44 : 56,
              borderRadius: 14,
              background: theme.accentSoft,
              color: theme.accent,
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
            }}
          >
            {(repo.owner?.login || '?').slice(0, 1).toUpperCase()}
          </div>
        )}

        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: theme.accent,
            }}
          >
            Open Source Showcase
          </p>
          <h2
            style={{
              margin: '6px 0 0',
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: isCompact ? 26 : 32,
              fontWeight: 500,
              lineHeight: 1.15,
              color: theme.ink,
            }}
          >
            {repo.name}
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: theme.muted }}>
            {repo.fullName}
          </p>
        </div>
      </div>

      <p
        style={{
          margin: isCompact ? '14px 0 0' : '18px 0 0',
          fontSize: isCompact ? 14 : 15,
          lineHeight: 1.55,
          color: theme.muted,
          display: '-webkit-box',
          WebkitLineClamp: isCompact ? 2 : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {repo.description}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isBanner ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
          gap: 10,
          marginTop: isCompact ? 16 : 20,
        }}
      >
        {[
          { label: 'Stars', value: formatCount(repo.stars) },
          { label: 'Forks', value: formatCount(repo.forks) },
          { label: 'Language', value: repo.language },
          ...(isBanner
            ? [{ label: 'Issues', value: formatCount(repo.openIssues) }]
            : []),
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: theme.panel,
              border: `1px solid ${theme.border}`,
              borderRadius: 14,
              padding: '10px 12px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: theme.muted,
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: 18,
                fontWeight: 700,
                color: theme.ink,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {showLanguages && repo.languages?.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <p
            style={{
              margin: '0 0 8px',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: theme.muted,
            }}
          >
            Top languages
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {repo.languages.map((lang) => (
              <span
                key={lang.name}
                style={{
                  background: theme.accentSoft,
                  color: theme.accent,
                  borderRadius: 999,
                  padding: '4px 10px',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {lang.name} {lang.percent}%
              </span>
            ))}
          </div>
        </div>
      )}

      {showTopics && repo.topics?.length > 0 && (
        <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {repo.topics.map((topic) => (
            <span
              key={topic}
              style={{
                border: `1px solid ${theme.border}`,
                color: theme.muted,
                borderRadius: 999,
                padding: '3px 9px',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              #{topic}
            </span>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: isCompact ? 16 : 20,
          paddingTop: 14,
          borderTop: `1px solid ${theme.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 12, color: theme.muted, fontWeight: 500 }}>
          {repo.htmlUrl.replace(/^https?:\/\//, '')}
        </span>
        {repo.license ? (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: theme.accent,
              background: theme.accentSoft,
              borderRadius: 8,
              padding: '4px 8px',
            }}
          >
            {repo.license}
          </span>
        ) : null}
      </div>
    </div>
  )
}
