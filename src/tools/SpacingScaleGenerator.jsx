import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import NumberInput from '../components/NumberInput.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

const SCALES = {
  '4px base': [4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
  '8px base': [8, 16, 24, 32, 40, 48, 64, 80, 96, 128],
  'Fibonacci-ish': [4, 8, 12, 20, 32, 52, 84, 136],
}

export default function SpacingScaleGenerator() {
  const [preset, setPreset] = useState('4px base')
  const [base, setBase] = useState(16)

  const values = SCALES[preset]

  const code = `:root {\n${values.map((v, i) => `  --space-${i + 1}: ${v}px;`).join('\n')}\n}`

  return (
    <ToolLayout
      title="Spacing Scale Generator"
      description="Build a consistent spacing scale as CSS variables for your design system."
      controls={
        <>
          <SectionCard title="Preset Scale">
            <ToggleGroup options={Object.keys(SCALES)} value={preset} onChange={setPreset} />
          </SectionCard>
          <SectionCard title="Reference">
            <NumberInput label="Root font size (px)" value={base} onChange={setBase} />
            <p className="mt-3 text-xs text-text-dim">
              Used only for the rem reference column below.
            </p>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-auto" className="flex-col items-stretch gap-2 p-4">
          {values.map((v, i) => (
            <div key={v} className="flex items-center gap-3">
              <span className="w-16 font-mono text-xs text-text-dim">--space-{i + 1}</span>
              <span className="w-16 font-mono text-xs text-text-dim">{v}px / {(v / base).toFixed(3)}rem</span>
              <div className="h-4 rounded bg-gradient-to-r from-accent to-accent-2" style={{ width: `${v}px` }} />
            </div>
          ))}
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
