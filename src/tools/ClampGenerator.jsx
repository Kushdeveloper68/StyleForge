import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import NumberInput from '../components/NumberInput.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

export default function ClampGenerator() {
  const [property, setProperty] = useState('font-size')
  const [minPx, setMinPx] = useState(16)
  const [maxPx, setMaxPx] = useState(32)
  const [minVw, setMinVw] = useState(320)
  const [maxVw, setMaxVw] = useState(1280)

  // Calculate the preferred value: slope * 100vw + intercept (in rem)
  const slope = (maxPx - minPx) / (maxVw - minVw)
  const intercept = minPx - slope * minVw
  const slopeVw = (slope * 100).toFixed(4)
  const interceptRem = (intercept / 16).toFixed(4)

  const preferred = `${slopeVw}vw + ${interceptRem}rem`
  const minRem = (minPx / 16).toFixed(3)
  const maxRem = (maxPx / 16).toFixed(3)

  const clampValue = `clamp(${minRem}rem, ${preferred}, ${maxRem}rem)`
  const code = `${property}: ${clampValue};`

  // preview size scaled down for display
  const previewSize = Math.min(Math.max(minPx, 16), 60)

  return (
    <ToolLayout
      title="Clamp Generator"
      description="Generate fluid clamp() values that scale smoothly between a min and max viewport."
      controls={
        <>
          <SectionCard title="Property">
            <ToggleGroup
              options={['font-size', 'padding', 'gap', 'width', 'margin']}
              value={property}
              onChange={setProperty}
            />
          </SectionCard>

          <SectionCard title="Value Range">
            <div className="grid grid-cols-2 gap-3">
              <NumberInput label="Min value (px)" value={minPx} onChange={setMinPx} />
              <NumberInput label="Max value (px)" value={maxPx} onChange={setMaxPx} />
            </div>
          </SectionCard>

          <SectionCard title="Viewport Range">
            <div className="grid grid-cols-2 gap-3">
              <NumberInput label="Min viewport (px)" value={minVw} onChange={setMinVw} />
              <NumberInput label="Max viewport (px)" value={maxVw} onChange={setMaxVw} />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-40">
          <span
            className="font-bold text-text"
            style={{ fontSize: `${previewSize}px`, lineHeight: 1.2 }}
          >
            Fluid text
          </span>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
