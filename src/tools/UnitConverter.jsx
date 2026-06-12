import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import NumberInput from '../components/NumberInput.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

export default function UnitConverter() {
  const [value, setValue] = useState(16)
  const [unit, setUnit] = useState('px')
  const [base, setBase] = useState(16) // root font size
  const [viewport, setViewport] = useState(1440)

  const px = (() => {
    switch (unit) {
      case 'px': return value
      case 'rem': return value * base
      case 'em': return value * base
      case 'vw': return (value / 100) * viewport
      case 'vh': return (value / 100) * 800
      case 'pt': return value * (96 / 72)
      default: return value
    }
  })()

  const conversions = [
    { unit: 'px', value: px },
    { unit: 'rem', value: px / base },
    { unit: 'em', value: px / base },
    { unit: 'pt', value: px * (72 / 96) },
    { unit: 'vw', value: (px / viewport) * 100 },
    { unit: 'vh', value: (px / 800) * 100 },
  ]

  const code = conversions
    .map((c) => `${format(c.value)}${c.unit}`)
    .join('  =  ')

  return (
    <ToolLayout
      title="CSS Unit Converter"
      description="Convert between px, rem, em, vw, vh, and pt instantly."
      controls={
        <>
          <SectionCard title="Input">
            <div className="space-y-4">
              <NumberInput label="Value" value={value} onChange={setValue} step={0.5} />
              <ToggleGroup options={['px', 'rem', 'em', 'vw', 'vh', 'pt']} value={unit} onChange={setUnit} />
            </div>
          </SectionCard>
          <SectionCard title="Context">
            <div className="space-y-4">
              <NumberInput label="Root font size (px)" value={base} onChange={setBase} />
              <NumberInput label="Viewport width (px)" value={viewport} onChange={setViewport} />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <SectionCard title="Conversions">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {conversions.map((c) => (
              <div key={c.unit} className="rounded-lg border border-border bg-surface-2 px-3 py-3 text-center">
                <div className="font-mono text-lg font-semibold text-text">{format(c.value)}</div>
                <div className="text-xs uppercase tracking-wider text-text-dim">{c.unit}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      }
      code={<CodeBlock code={code} />}
    />
  )
}

function format(n) {
  return Math.round(n * 1000) / 1000
}
