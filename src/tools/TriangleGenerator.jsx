import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

const DIRECTIONS = ['up', 'down', 'left', 'right']

export default function TriangleGenerator() {
  const [direction, setDirection] = useState('up')
  const [size, setSize] = useState(60)
  const [color, setColor] = useState('#6366f1')

  const borders = {
    up: {
      borderWidth: `0 ${size}px ${size}px ${size}px`,
      borderColor: `transparent transparent ${color} transparent`,
    },
    down: {
      borderWidth: `${size}px ${size}px 0 ${size}px`,
      borderColor: `${color} transparent transparent transparent`,
    },
    left: {
      borderWidth: `${size}px ${size}px ${size}px 0`,
      borderColor: `transparent ${color} transparent transparent`,
    },
    right: {
      borderWidth: `${size}px 0 ${size}px ${size}px`,
      borderColor: `transparent transparent transparent ${color}`,
    },
  }

  const b = borders[direction]

  const code = `width: 0;\nheight: 0;\nborder-style: solid;\nborder-width: ${b.borderWidth};\nborder-color: ${b.borderColor};`

  return (
    <ToolLayout
      title="Triangle Generator"
      description="Pure CSS triangles using border tricks."
      controls={
        <>
          <SectionCard title="Direction">
            <ToggleGroup options={DIRECTIONS} value={direction} onChange={setDirection} />
          </SectionCard>
          <SectionCard title="Settings">
            <div className="space-y-4">
              <Slider label="Size" value={size} min={10} max={150} unit="px" onChange={setSize} />
              <ColorInput label="Color" value={color} onChange={setColor} />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox checkerboard>
          <div
            style={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: b.borderWidth,
              borderColor: b.borderColor,
            }}
          />
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}