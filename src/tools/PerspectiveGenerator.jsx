import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

export default function PerspectiveGenerator() {
  const [perspective, setPerspective] = useState(1000)
  const [origin, setOrigin] = useState('center')
  const [rotateX, setRotateX] = useState(15)
  const [rotateY, setRotateY] = useState(-20)
  const [translateZ, setTranslateZ] = useState(0)

  const code = `.container {\n  perspective: ${perspective}px;\n  perspective-origin: ${origin};\n}\n\n.card {\n  transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px);\n  transform-style: preserve-3d;\n}`

  return (
    <ToolLayout
      title="Perspective Generator"
      description="Create 3D card and product mockup tilt effects with CSS perspective."
      controls={
        <>
          <SectionCard title="Container Perspective">
            <div className="space-y-4">
              <Slider label="Perspective" value={perspective} min={200} max={2500} step={50} unit="px" onChange={setPerspective} />
              <ToggleGroup
                label="perspective-origin"
                options={['center', 'top', 'bottom', 'left', 'right']}
                value={origin}
                onChange={setOrigin}
              />
            </div>
          </SectionCard>

          <SectionCard title="Card Transform">
            <div className="space-y-4">
              <Slider label="Rotate X" value={rotateX} min={-60} max={60} unit="deg" onChange={setRotateX} />
              <Slider label="Rotate Y" value={rotateY} min={-60} max={60} unit="deg" onChange={setRotateY} />
              <Slider label="Translate Z" value={translateZ} min={-100} max={100} unit="px" onChange={setTranslateZ} />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-80" style={{ perspective: `${perspective}px`, perspectiveOrigin: origin }}>
          <div
            className="flex h-44 w-72 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-accent to-accent-2 text-sm font-semibold text-white shadow-2xl"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.2s ease',
            }}
          >
            3D Card
          </div>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
