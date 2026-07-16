import { useState } from 'react'

export default function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-tide)] hover:text-[var(--color-tide)]"
    >
      {copied ? 'Copied!' : label}
    </button>
  )
}
