import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'

function hexToRgb(hex) {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  return {
    r: parseInt(h.substring(0, 2), 16) || 0,
    g: parseInt(h.substring(2, 4), 16) || 0,
    b: parseInt(h.substring(4, 6), 16) || 0,
  }
}

function luminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function contrastRatio(fg, bg) {
  const l1 = luminance(hexToRgb(fg))
  const l2 = luminance(hexToRgb(bg))
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (lighter + 0.05) / (darker + 0.05)
}

export default function ContrastChecker() {
  const [fg, setFg] = useState('#e6e8eb')
  const [bg, setBg] = useState('#0b0d10')

  const ratio = contrastRatio(fg, bg)
  const ratioStr = ratio.toFixed(2)

  const checks = [
    { label: 'AA — Normal text (4.5:1)', pass: ratio >= 4.5 },
    { label: 'AA — Large text (3:1)', pass: ratio >= 3 },
    { label: 'AAA — Normal text (7:1)', pass: ratio >= 7 },
    { label: 'AAA — Large text (4.5:1)', pass: ratio >= 4.5 },
  ]

  const code = `/* Contrast ratio: ${ratioStr}:1 */\ncolor: ${fg};\nbackground-color: ${bg};`

  return (
    <ToolLayout
      toolId="contrast"
      title="Color Contrast Checker"
      description="Check WCAG AA / AAA contrast compliance between text and background colors."
      controls={
        <SectionCard title="Colors">
          <div className="space-y-4">
            <ColorInput label="Text Color" value={fg} onChange={setFg} />
            <ColorInput label="Background Color" value={bg} onChange={setBg} />
          </div>

          <div className="mt-6 space-y-2">
            <div className="text-center">
              <span className="text-3xl font-bold text-text">{ratioStr}</span>
              <span className="ml-1 text-sm text-text-dim">: 1</span>
            </div>
            {checks.map((c) => (
              <div
                key={c.label}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${
                  c.pass ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-red-500/30 bg-red-500/10 text-red-400'
                }`}
              >
                <span>{c.label}</span>
                <span className="font-semibold">{c.pass ? 'Pass' : 'Fail'}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      }
      preview={
        <BeforeAfterSlider
          height="h-60"
          before={
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 bg-surface">
              <span className="text-2xl font-bold text-text-dim">The quick brown fox</span>
              <span className="text-sm text-text-dim">jumps over the lazy dog</span>
            </div>
          }
          after={
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6" style={{ background: bg }}>
              <span style={{ color: fg }} className="text-2xl font-bold">The quick brown fox</span>
              <span style={{ color: fg }} className="text-sm">jumps over the lazy dog</span>
            </div>
          }
        />
      }
      code={<CodeBlock code={code} />}
    />
  )
}