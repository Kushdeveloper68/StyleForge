import { useState, cloneElement, Children, isValidElement } from 'react'
import { Link2, Check } from 'lucide-react'

export default function ToolLayout({ title, description, controls, preview, code, toolId }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      const url = new URL(window.location.href)
      if (toolId) url.searchParams.set('tool', toolId)
      await navigator.clipboard.writeText(url.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  // Inject toolId + toolLabel into any direct CodeBlock child so every
  // tool gets save/export features without touching 36 individual files.
  const enhancedCode = code && isValidElement(code)
    ? cloneElement(code, {
        toolId: code.props.toolId ?? toolId,
        toolLabel: code.props.toolLabel ?? title,
      })
    : code

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {description && <p className="mt-1 text-sm text-text-dim">{description}</p>}
        </div>
        {toolId && (
          <button
            onClick={handleShare}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-text-dim transition hover:border-accent/50 hover:text-text"
          >
            {copied ? <Check size={13} /> : <Link2 size={13} />}
            {copied ? 'Link copied' : 'Share'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">{controls}</div>
        <div className="space-y-4">
          {preview}
          {enhancedCode}
        </div>
      </div>
    </div>
  )
}