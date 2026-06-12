import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

const STYLES = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge']

export default function OutlineGenerator() {
  const [width, setWidth] = useState(3)
  const [style, setStyle] = useState('dashed')
  const [color, setColor] = useState('#22d3ee')
  const [offset, setOffset] = useState(4)
  const [radius, setRadius] = useState(12)

  const code = `outline: ${width}px ${style} ${color};\noutline-offset: ${offset}px;\nborder-radius: ${radius}px;`

  return (
    <ToolLayout
      title="Outline Generator"
      description="Outlines sit outside the border box and don't affect layout — great for focus states."
      controls={
        <>
          <SectionCard title="Outline">
            <div className="space-y-4">
              <Slider label="Width" value={width} min={0} max={20} unit="px" onChange={setWidth} />
              <Slider label="Offset" value={offset} min={-10} max={30} unit="px" onChange={setOffset} />
              <Slider label="Border Radius" value={radius} min={0} max={60} unit="px" onChange={setRadius} />
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
            className="h-32 w-32 bg-surface"
            style={{
              outline: `${width}px ${style} ${color}`,
              outlineOffset: `${offset}px`,
              borderRadius: `${radius}px`,
            }}
          />
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
