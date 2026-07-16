/**
 * Parse owner/repo from common GitHub URL shapes.
 * Supports:
 * - https://github.com/owner/repo
 * - https://github.com/owner/repo.git
 * - github.com/owner/repo
 * - owner/repo
 */
export function parseGitHubRepo(input) {
  const raw = String(input || '').trim()
  if (!raw) return null

  const cleaned = raw
    .replace(/^git\+/i, '')
    .replace(/\.git$/i, '')
    .replace(/\/$/, '')

  const patterns = [
    /^https?:\/\/(?:www\.)?github\.com\/([^/\s]+)\/([^/\s#?]+)/i,
    /^(?:www\.)?github\.com\/([^/\s]+)\/([^/\s#?]+)/i,
    /^([^/\s]+)\/([^/\s#?]+)$/,
  ]

  for (const pattern of patterns) {
    const match = cleaned.match(pattern)
    if (match) {
      return {
        owner: match[1],
        repo: match[2],
      }
    }
  }

  return null
}

export function formatCount(n) {
  const num = Number(n) || 0
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`
  return String(num)
}

export async function fetchRepoData(owner, repo) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const [repoRes, langRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers }),
    fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers }),
  ])

  if (repoRes.status === 404) {
    throw new Error('Repository not found. Check the URL or make sure it is public.')
  }

  if (repoRes.status === 403) {
    throw new Error(
      'GitHub API rate limit reached. Try again later or add VITE_GITHUB_TOKEN in .env.'
    )
  }

  if (!repoRes.ok) {
    throw new Error(`GitHub API error (${repoRes.status}). Please try again.`)
  }

  const repoJson = await repoRes.json()
  const languagesJson = langRes.ok ? await langRes.json() : {}

  const languageEntries = Object.entries(languagesJson)
  const totalBytes = languageEntries.reduce((sum, [, bytes]) => sum + bytes, 0)
  const languages = languageEntries
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, bytes]) => ({
      name,
      percent: totalBytes ? Math.round((bytes / totalBytes) * 100) : 0,
    }))

  return {
    name: repoJson.name,
    fullName: repoJson.full_name,
    description: repoJson.description || 'No description provided.',
    stars: repoJson.stargazers_count ?? 0,
    forks: repoJson.forks_count ?? 0,
    watchers: repoJson.watchers_count ?? 0,
    openIssues: repoJson.open_issues_count ?? 0,
    language: repoJson.language || languages[0]?.name || 'N/A',
    languages,
    homepage: repoJson.homepage || '',
    htmlUrl: repoJson.html_url,
    owner: {
      login: repoJson.owner?.login || owner,
      avatarUrl: repoJson.owner?.avatar_url || '',
    },
    topics: Array.isArray(repoJson.topics) ? repoJson.topics.slice(0, 6) : [],
    license: repoJson.license?.spdx_id || repoJson.license?.name || '',
    updatedAt: repoJson.updated_at,
  }
}
