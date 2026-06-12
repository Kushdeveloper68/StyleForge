import { useState, useMemo } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

function parseGradient(input) {
  const trimmed = input.trim()
  const typeMatch = trimmed.match(/^(linear|radial|conic)-gradient\((.*)\)$/s)
  if (!typeMatch) return null

  const type = typeMatch[1]
  const inner = typeMatch[2]

  // split top-level commas (avoid splitting inside nested parens, e.g. rgba())
  const parts = []
  let depth = 0
  let current = ''
  for (const ch of inner) {
    if (ch === '(') depth++
    if (ch === ')') depth--
    if (ch === ',' && depth === 0) {
      parts.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  if (current.trim()) parts.push(current.trim())

  let direction = null
  let stops = parts

  if (parts.length && /deg|to (top|bottom|left|right)|circle|ellipse|at |from /.test(parts[0])) {
    direction = parts[0]
    stops = parts.slice(1)
  }

  const parsedStops = stops.map((s) => {
    const match = s.match(/^(.*?)(\s+(-?[\d.]+%|[\d.]+(px|deg)))?$/)
    return {
      raw: s,
      color: match ? match[1].trim() : s,
      position: match ? match[3] || null : null,
    }
  })

  return { type, direction, stops: parsedStops }
}

export default function GradientAnalyzer() {
  const [input, setInput] = useState('linear-gradient(135deg, #6366f1 0%, #22d3ee 50%, #ec4899 100%)')

  const parsed = useMemo(() => parseGradient(input), [input])

  const code = parsed
    ? `Type: ${parsed.type}\nDirection: ${parsed.direction ?? 'default'}\n\nColor stops:\n${parsed.stops
        .map((s, i) => `  ${i + 1}. ${s.color}${s.position ? `  @ ${s.position}` : ''}`)
        .join('\n')}`
    : 'Could not parse — make sure it starts with linear-gradient(), radial-gradient(), or conic-gradient().'

  return (
    <ToolLayout
      title="Gradient Analyzer"
      description="Paste any CSS gradient and break it down into type, direction, and color stops."
      controls={
        <SectionCard title="Gradient CSS">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            spellCheck={false}
            className="w-full resize-none rounded-lg border border-border bg-surface-2 p-3 font-mono text-sm text-text outline-none focus:border-accent/50"
          />
        </SectionCard>
      }
      preview={
        <PreviewBox>
          <div className="h-full w-full" style={{ background: parsed ? input : 'transparent' }} />
        </PreviewBox>
      }
      code={<CodeBlock code={code} language="analysis" />}
    />
  )
}
