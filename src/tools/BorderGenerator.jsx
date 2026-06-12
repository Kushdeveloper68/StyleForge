import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

const STYLES = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge']

export default function BorderGenerator() {
  const [width, setWidth] = useState(4)
  const [style, setStyle] = useState('solid')
  const [color, setColor] = useState('#6366f1')
  const [radius, setRadius] = useState(16)

  const code = `border: ${width}px ${style} ${color};\nborder-radius: ${radius}px;`

  return (
    <ToolLayout
      title="Border Generator"
      description="Style borders with width, type, color, and rounded corners."
      controls={
        <>
          <SectionCard title="Border">
            <div className="space-y-4">
              <Slider label="Width" value={width} min={0} max={20} unit="px" onChange={setWidth} />
              <Slider label="Radius" value={radius} min={0} max={100} unit="px" onChange={setRadius} />
              <ColorInput label="Color" value={color} onChange={setColor} />
            </div>
          </SectionCard>

          <SectionCard title="Style">
            <ToggleGroup options={STYLES} value={style} onChange={setStyle} />
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox checkerboard>
          <div
            className="h-40 w-40 bg-surface"
            style={{
              border: `${width}px ${style} ${color}`,
              borderRadius: `${radius}px`,
            }}
          />
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
