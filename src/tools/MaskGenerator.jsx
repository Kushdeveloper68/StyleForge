import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

const TYPES = ['circle', 'gradient-fade', 'ellipse']
const IMG = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600'

export default function MaskGenerator() {
  const [type, setType] = useState('circle')
  const [size, setSize] = useState(60)
  const [direction, setDirection] = useState('to bottom')

  let maskValue
  if (type === 'circle') {
    maskValue = `radial-gradient(circle at center, black ${size}%, transparent 100%)`
  } else if (type === 'ellipse') {
    maskValue = `radial-gradient(ellipse at center, black ${size}%, transparent 100%)`
  } else {
    maskValue = `linear-gradient(${direction}, black ${size}%, transparent 100%)`
  }

  const code = `mask-image: ${maskValue};\n-webkit-mask-image: ${maskValue};\nmask-size: cover;\n-webkit-mask-size: cover;`

  return (
    <ToolLayout
      title="Mask Generator"
      description="Use gradient and shape masks to fade or crop images and elements."
      controls={
        <>
          <SectionCard title="Mask Type">
            <ToggleGroup options={TYPES} value={type} onChange={setType} />
          </SectionCard>

          <SectionCard title="Settings">
            <div className="space-y-4">
              <Slider label="Visible Area" value={size} min={0} max={100} unit="%" onChange={setSize} />
              {type === 'gradient-fade' && (
                <ToggleGroup
                  label="direction"
                  options={['to bottom', 'to top', 'to right', 'to left']}
                  value={direction}
                  onChange={setDirection}
                />
              )}
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox checkerboard height="h-80">
          <div
            className="h-64 w-64 bg-cover bg-center"
            style={{
              backgroundImage: `url(${IMG})`,
              maskImage: maskValue,
              WebkitMaskImage: maskValue,
              maskSize: 'cover',
              WebkitMaskSize: 'cover',
            }}
          />
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
