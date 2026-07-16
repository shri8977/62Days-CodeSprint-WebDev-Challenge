export const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'c',
  'cpp',
  'csharp',
  'go',
  'rust',
  'php',
  'ruby',
  'html',
  'css',
  'sql',
  'bash',
  'json',
  'yaml',
  'markdown',
  'plaintext',
]

export function shareUrl(shareId) {
  if (!shareId) return ''
  return `${window.location.origin}/s/${shareId}`
}
