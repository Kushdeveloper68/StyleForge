import { useState, useMemo } from 'react'
import { Check, Copy, Bookmark } from 'lucide-react'
import { FORMATS, formatCode } from '../utils/exportFormats.js'
import { useSavedStyles } from '../context/SavedStylesContext.jsx'

export default function CodeBlock({
  code,
  language = 'css',
  toolId = null,
  toolLabel = null,
  previewStyle = null,
}) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [format, setFormat] = useState('CSS')
  const { saveStyle } = useSavedStyles()

  const showFormatToggle = language === 'css'
  const activeFormats = showFormatToggle ? FORMATS : ['CSS']

  const displayCode = useMemo(() => {
    if (!showFormatToggle || format === 'CSS') return code
    try {
      return formatCode(code, format, toolId ?? 'component')
    } catch {
      return '// Conversion error'
    }
  }, [code, format, showFormatToggle, toolId])

  const displayLanguage = useMemo(() => {
    if (!showFormatToggle) return language
    const map = { CSS: 'css', React: 'jsx', Tailwind: 'js', SCSS: 'scss' }
    return map[format] ?? language
  }, [format, showFormatToggle, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  const handleSave = () => {
    if (!toolId) return
    saveStyle(toolId, toolLabel ?? toolId, code, previewStyle)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-2 gap-2 flex-wrap">
        {/* Format tabs */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-text-dim hidden sm:block">
            {displayLanguage}
          </span>
          {showFormatToggle && (
            <div className="flex rounded-md border border-border bg-surface-2 p-0.5">
              {activeFormats.map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`rounded px-2 py-0.5 text-[11px] font-semibold tracking-wide transition ${
                    format === f
                      ? 'bg-accent text-white'
                      : 'text-text-dim hover:text-text'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {toolId && (
            <button
              onClick={handleSave}
              title="Save this style"
              className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition ${
                saved
                  ? 'border-accent/40 bg-accent/10 text-accent'
                  : 'border-border bg-surface-2 text-text-dim hover:border-accent/40 hover:text-accent'
              }`}
            >
              <Bookmark size={12} />
              {saved ? 'Saved!' : 'Save'}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-text-dim transition hover:border-accent/50 hover:text-text"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <pre className="max-h-72 overflow-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-text whitespace-pre-wrap break-all">
          {displayCode}
        </code>
      </pre>
    </div>
  )
}