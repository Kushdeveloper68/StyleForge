import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import Button from '../components/Button.jsx'
import { Shuffle } from 'lucide-react'

// Generates an organic blob border-radius value (8 corner percentages)
function randomBlobRadius() {
  const vals = Array.from({ length: 8 }, () => 30 + Math.floor(Math.random() * 40))
  return `${vals[0]}% ${vals[1]}% ${vals[2]}% ${vals[3]}% / ${vals[4]}% ${vals[5]}% ${vals[6]}% ${vals[7]}%`
}

export default function ShapeGenerator() {
  const [radius, setRadius] = useState(randomBlobRadius())
  const [color, setColor] = useState('#6366f1')
  const [size, setSize] = useState(220)

  const code = `width: ${size}px;\nheight: ${size}px;\nbackground: ${color};\nborder-radius: ${radius};`

  return (
    <ToolLayout
      title="Shape (Blob) Generator"
      description="Generate organic blob shapes using border-radius — randomize until it looks right."
      controls={
        <>
          <SectionCard title="Settings">
            <div className="space-y-4">
              <Slider label="Size" value={size} min={100} max={320} unit="px" onChange={setSize} />
              <ColorInput label="Color" value={color} onChange={setColor} />
            </div>
          </SectionCard>
          <SectionCard title="Shape">
            <Button onClick={() => setRadius(randomBlobRadius())} icon={Shuffle}>
              Randomize Blob
            </Button>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox checkerboard height="h-80">
          <div style={{ width: size, height: size, background: color, borderRadius: radius }} />
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
