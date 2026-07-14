const SEARCH_URL = 'https://api.github.com/search/issues'

/**
 * Build a GitHub issue search query from dashboard filters.
 * @see https://docs.github.com/en/rest/search/search#search-issues-and-pull-requests
 */
export function buildSearchQuery({
  query,
  labels,
  language,
  minStars,
  includePRs = false,
}) {
  const parts = ['is:open', 'is:issue']

  if (!includePRs) {
    parts.push('type:issue')
  }

  const trimmed = query?.trim()
  if (trimmed) {
    parts.push(trimmed)
  }

  const activeLabels = (labels || []).filter(Boolean)
  activeLabels.forEach((label) => {
    parts.push(`label:"${label}"`)
  })

  if (language && language !== 'any') {
    parts.push(`language:${language}`)
  }

  const stars = Number(minStars)
  if (!Number.isNaN(stars) && stars > 0) {
    parts.push(`stars:>=${stars}`)
  }

  return parts.join(' ')
}

export async function searchIssues(filters, { page = 1, perPage = 12 } = {}) {
  const q = buildSearchQuery(filters)
  const params = new URLSearchParams({
    q,
    sort: 'created',
    order: 'desc',
    page: String(page),
    per_page: String(perPage),
  })

  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${SEARCH_URL}?${params}`, { headers })

  if (response.status === 403 || response.status === 429) {
    const reset = response.headers.get('X-RateLimit-Reset')
    const resetTime = reset
      ? new Date(Number(reset) * 1000).toLocaleTimeString()
      : null
    const err = new Error(
      resetTime
        ? `GitHub API rate limit reached. Try again after ${resetTime}, or add a VITE_GITHUB_TOKEN.`
        : 'GitHub API rate limit reached. Add a personal access token in .env as VITE_GITHUB_TOKEN for higher limits.'
    )
    err.code = 'RATE_LIMIT'
    throw err
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const err = new Error(
      body.message || `GitHub API error (${response.status})`
    )
    err.code = 'API_ERROR'
    err.status = response.status
    throw err
  }

  const data = await response.json()

  const items = (data.items || []).map((issue) => {
    const repoUrl =
      issue.repository_url ||
      issue.html_url?.replace(/\/issues\/\d+$/, '') ||
      ''
    const repoFullName = repoUrl
      ? repoUrl.replace('https://api.github.com/repos/', '')
      : 'unknown/repo'

    return {
      id: issue.id,
      number: issue.number,
      title: issue.title,
      body: issue.body || '',
      htmlUrl: issue.html_url,
      state: issue.state,
      comments: issue.comments,
      createdAt: issue.created_at,
      updatedAt: issue.updated_at,
      labels: (issue.labels || []).map((l) =>
        typeof l === 'string'
          ? { name: l, color: '2d8a66' }
          : { name: l.name, color: l.color || '2d8a66' }
      ),
      user: {
        login: issue.user?.login || 'unknown',
        avatarUrl: issue.user?.avatar_url || '',
      },
      repoFullName,
      repoUrl: `https://github.com/${repoFullName}`,
    }
  })

  return {
    totalCount: data.total_count || 0,
    incompleteResults: Boolean(data.incomplete_results),
    items,
    query: q,
  }
}
