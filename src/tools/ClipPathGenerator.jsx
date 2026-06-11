import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const PRESETS = [
  { name: 'Triangle', value: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
  { name: 'Trapezoid', value: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' },
  { name: 'Parallelogram', value: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' },
  { name: 'Rhombus', value: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
  { name: 'Pentagon', value: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
  { name: 'Hexagon', value: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
  { name: 'Octagon', value: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' },
  { name: 'Star', value: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' },
  { name: 'Cross', value: 'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)' },
  { name: 'Message', value: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)' },
  { name: 'Close (X)', value: 'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)' },
  { name: 'Frame', value: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%, 20% 20%, 20% 80%, 80% 80%, 80% 20%, 0% 20%)' },
  { name: 'Circle', value: 'circle(50% at 50% 50%)' },
  { name: 'Ellipse', value: 'ellipse(50% 35% at 50% 50%)' },
]

export default function ClipPathGenerator() {
  const [value, setValue] = useState(PRESETS[5].value)

  const code = `clip-path: ${value};`

  return (
    <ToolLayout
      title="Clip Path Generator"
      description="Pick a shape preset and copy the clip-path CSS instantly."
      controls={
        <SectionCard title="Presets">
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setValue(p.value)}
                className={`rounded-lg border px-3 py-2 text-left text-sm font-medium transition ${
                  value === p.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-surface-2 text-text-dim hover:text-text'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </SectionCard>
      }
      preview={
        <PreviewBox checkerboard>
          <div
            className="h-48 w-48 bg-gradient-to-br from-accent to-accent-2"
            style={{ clipPath: value }}
          />
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}