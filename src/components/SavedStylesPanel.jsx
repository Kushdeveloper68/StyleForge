import { useState } from 'react'
import { Bookmark, Trash2, X, Copy, Check, Search } from 'lucide-react'
import { useSavedStyles } from '../context/SavedStylesContext.jsx'

export default function SavedStylesPanel({ open, onClose }) {
  const { saved, removeStyle, clearAll } = useSavedStyles()
  const [query, setQuery] = useState('')
  const [copiedId, setCopiedId] = useState(null)

  const filtered = saved.filter(
    (s) =>
      s.toolLabel.toLowerCase().includes(query.toLowerCase()) ||
      s.css.toLowerCase().includes(query.toLowerCase())
  )

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.css)
      setCopiedId(item.id)
      setTimeout(() => setCopiedId(null), 1500)
    } catch {}
  }

  const timeAgo = (ts) => {
    const diff = Date.now() - ts
    if (diff < 60_000) return 'just now'
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`
    return `${Math.floor(diff / 86_400_000)}d ago`
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <aside className="relative flex h-full w-full max-w-sm flex-col border-l border-border bg-surface shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Bookmark size={17} className="text-accent" />
            <span className="font-semibold tracking-tight">Saved Styles</span>
            {saved.length > 0 && (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                {saved.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {saved.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-text-dim transition hover:text-red-400"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg border border-border bg-surface-2 p-1.5 text-text-dim transition hover:text-text"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Search */}
        {saved.length > 0 && (
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5">
              <Search size={13} className="text-text-dim" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search saved styles..."
                className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-dim"
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <Bookmark size={32} className="text-text-dim/30" />
              <p className="text-sm text-text-dim">
                {saved.length === 0
                  ? 'No saved styles yet.\nHit the save icon on any tool.'
                  : 'No results for your search.'}
              </p>
            </div>
          )}

          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl border border-border bg-surface-2 p-3 transition hover:border-accent/30"
            >
              {/* preview swatch */}
              {item.previewStyle && (
                <div
                  className="mb-3 h-12 w-full rounded-lg border border-border"
                  style={item.previewStyle}
                />
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-text">{item.toolLabel}</div>
                  <div className="mt-0.5 text-[10px] text-text-dim">{timeAgo(item.savedAt)}</div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(item)}
                    className="rounded-md border border-border bg-surface p-1.5 text-text-dim transition hover:text-text"
                    title="Copy CSS"
                  >
                    {copiedId === item.id ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                  <button
                    onClick={() => removeStyle(item.id)}
                    className="rounded-md border border-border bg-surface p-1.5 text-text-dim transition hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <pre className="mt-2 max-h-24 overflow-auto rounded-lg bg-bg p-2 font-mono text-[10px] text-text-dim leading-relaxed">
                {item.css}
              </pre>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}