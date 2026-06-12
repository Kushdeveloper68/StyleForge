import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import NumberInput from '../components/NumberInput.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

const RATIOS = {
  'Minor Second (1.067)': 1.067,
  'Major Second (1.125)': 1.125,
  'Minor Third (1.2)': 1.2,
  'Major Third (1.25)': 1.25,
  'Perfect Fourth (1.333)': 1.333,
  'Golden Ratio (1.618)': 1.618,
}

const STEPS = [
  { name: 'caption', step: -1 },
  { name: 'body', step: 0 },
  { name: 'h3', step: 2 },
  { name: 'h2', step: 3 },
  { name: 'h1', step: 4 },
]

export default function TypographyScaleGenerator() {
  const [base, setBase] = useState(16)
  const [ratioName, setRatioName] = useState('Major Third (1.25)')

  const ratio = RATIOS[ratioName]

  const scale = STEPS.map((s) => ({
    ...s,
    size: base * Math.pow(ratio, s.step),
    lineHeight: s.step >= 3 ? 1.2 : 1.5,
    weight: s.step >= 3 ? 700 : s.step === 2 ? 600 : 400,
  }))

  const code = `:root {\n${scale
    .map((s) => `  --font-${s.name}: ${s.size.toFixed(2)}px;`)
    .join('\n')}\n}\n\n${scale
    .map(
      (s) =>
        `.${s.name} {\n  font-size: var(--font-${s.name});\n  line-height: ${s.lineHeight};\n  font-weight: ${s.weight};\n}`
    )
    .join('\n\n')}`

  return (
    <ToolLayout
      title="Typography Scale Generator"
      description="Generate a modular type scale from a base size and ratio."
      controls={
        <>
          <SectionCard title="Base">
            <NumberInput label="Base font size (px)" value={base} onChange={setBase} />
          </SectionCard>
          <SectionCard title="Scale Ratio">
            <ToggleGroup options={Object.keys(RATIOS)} value={ratioName} onChange={setRatioName} />
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-auto" className="flex-col items-start gap-3 p-5">
          {[...scale].reverse().map((s) => (
            <div key={s.name} className="flex w-full items-baseline justify-between gap-4">
              <span
                style={{ fontSize: `${s.size}px`, lineHeight: s.lineHeight, fontWeight: s.weight }}
                className="truncate text-text"
              >
                {s.name}
              </span>
              <span className="shrink-0 font-mono text-xs text-text-dim">{s.size.toFixed(1)}px</span>
            </div>
          ))}
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
