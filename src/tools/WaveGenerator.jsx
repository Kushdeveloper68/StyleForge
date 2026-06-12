import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

const WIDTH = 1200
const HEIGHT = 200

function buildPath(amplitude, frequency, flip) {
  const points = []
  const steps = frequency * 2
  for (let i = 0; i <= steps; i++) {
    const x = (WIDTH / steps) * i
    const y = HEIGHT / 2 + (i % 2 === 0 ? -amplitude : amplitude)
    points.push(`${x},${y}`)
  }
  let d = `M0,${HEIGHT} L0,${points[0].split(',')[1]} `
  d += points.map((p, i) => {
    if (i === 0) return ''
    const [px, py] = p.split(',')
    return `Q${(WIDTH / (points.length - 1)) * (i - 0.5)},${HEIGHT / 2} ${px},${py} `
  }).join('')
  d += `L${WIDTH},${HEIGHT} Z`

  return flip ? d : d
}

export default function WaveGenerator() {
  const [amplitude, setAmplitude] = useState(40)
  const [frequency, setFrequency] = useState(4)
  const [color, setColor] = useState('#6366f1')
  const [position, setPosition] = useState('bottom')

  const path = buildPath(amplitude, frequency, position === 'top')
  const transform = position === 'top' ? 'scale(1, -1) translate(0, -200)' : ''

  const svg = `<svg viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="display:block;width:100%;height:150px;">\n  <path d="${path}" fill="${color}" ${transform ? `transform="${transform}"` : ''} />\n</svg>`

  const code = `${svg}\n\n/* Wrapper CSS */\n.wave-divider svg {\n  display: block;\n  width: 100%;\n  height: 150px;\n}`

  return (
    <ToolLayout
      title="Wave Generator"
      description="Create SVG wave shapes for hero sections and content separators."
      controls={
        <>
          <SectionCard title="Wave Shape">
            <div className="space-y-4">
              <Slider label="Amplitude" value={amplitude} min={5} max={90} unit="px" onChange={setAmplitude} />
              <Slider label="Frequency" value={frequency} min={1} max={10} onChange={setFrequency} />
            </div>
          </SectionCard>
          <SectionCard title="Style">
            <div className="space-y-4">
              <ColorInput label="Fill Color" value={color} onChange={setColor} />
              <ToggleGroup label="position" options={['bottom', 'top']} value={position} onChange={setPosition} />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-60" className="bg-surface-2 p-0">
          <div className="flex h-full w-full items-end" dangerouslySetInnerHTML={{ __html: svg }} />
        </PreviewBox>
      }
      code={<CodeBlock code={code} language="svg + css" />}
    />
  )
}
