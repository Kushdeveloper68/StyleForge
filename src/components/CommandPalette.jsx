import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { CATEGORIES } from '../utils/tools.js'

function getAllTools() {
  return CATEGORIES.flatMap(cat => cat.tools.map(t => ({ ...t, category: cat.name })))
}

export default function CommandPalette({ open, onClose, onSelect }) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef(null)
  const allTools = getAllTools()

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIdx(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const results = query.trim()
    ? allTools.filter(t =>
        t.label.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase())
      )
    : allTools

  useEffect(() => { setActiveIdx(0) }, [query])

  useEffect(() => {
    if (!open) return
    const handler = e => {
      if (e.key === 'Escape') { onClose() }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
      else if (e.key === 'Enter') {
        e.preventDefault()
        const item = results[activeIdx]
        if (item) { onSelect(item.id); onClose() }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, results, activeIdx, onSelect, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[12vh]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search size={16} className="shrink-0 text-text-dim" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search tools…"
            className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-dim"
            spellCheck={false}
          />
          <kbd className="shrink-0 rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] text-text-dim">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-text-dim">No tools found.</p>
          )}
          {results.map((tool, idx) => {
            const Icon = tool.icon
            return (
              <button
                key={tool.id}
                onClick={() => { onSelect(tool.id); onClose() }}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  idx === activeIdx
                    ? 'bg-accent/15 text-accent'
                    : 'text-text-dim hover:bg-surface-2 hover:text-text'
                }`}
              >
                <Icon size={15} className="shrink-0" />
                <span className="flex-1 font-medium">{tool.label}</span>
                <span className="text-xs text-text-dim/60">{tool.category}</span>
              </button>
            )
          })}
        </div>

        <div className="border-t border-border px-4 py-2 text-[10px] text-text-dim">
          <span className="mr-3">↑↓ navigate</span>
          <span className="mr-3">↵ select</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  )
}