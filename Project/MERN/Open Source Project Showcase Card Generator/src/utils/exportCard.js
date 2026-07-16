import { toPng, toSvg } from 'html-to-image'

function slugify(name) {
  return String(name || 'repo-card')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function downloadBlob(dataUrl, filename) {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}

export async function exportCardPng(node, repoName) {
  if (!node) throw new Error('Card preview is not ready.')
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: null,
  })
  downloadBlob(dataUrl, `${slugify(repoName)}-showcase.png`)
}

export async function exportCardSvg(node, repoName) {
  if (!node) throw new Error('Card preview is not ready.')
  const dataUrl = await toSvg(node, {
    cacheBust: true,
    backgroundColor: null,
  })
  downloadBlob(dataUrl, `${slugify(repoName)}-showcase.svg`)
}
