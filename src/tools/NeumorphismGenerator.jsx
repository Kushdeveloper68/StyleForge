import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

export default function NeumorphismGenerator() {
  const [bg, setBg] = useState('#1c2027')
  const [distance, setDistance] = useState(20)
  const [blur, setBlur] = useState(40)
  const [intensity, setIntensity] = useState(15)
  const [radius, setRadius] = useState(24)
  const [mode, setMode] = useState('flat')

  const { light, dark } = shades(bg, intensity)

  const shadowOut = `${distance}px ${distance}px ${blur}px ${dark},\n  -${distance}px -${distance}px ${blur}px ${light}`
  const shadowIn = `inset ${distance}px ${distance}px ${blur}px ${dark},\n  inset -${distance}px -${distance}px ${blur}px ${light}`

  const shadow = mode === 'flat' ? shadowOut : shadowIn

  const code = `background: ${bg};\nborder-radius: ${radius}px;\nbox-shadow:\n  ${shadow};`

  return (
    <ToolLayout
      title="Neumorphism Generator"
      description="Soft UI elements with light and dark dual shadows."
      controls={
        <>
          <SectionCard title="Mode">
            <ToggleGroup
              options={[{ value: 'flat', label: 'raised' }, { value: 'pressed', label: 'pressed' }]}
              value={mode}
              onChange={setMode}
            />
          </SectionCard>

          <SectionCard title="Settings">
            <div className="space-y-4">
              <ColorInput label="Base Color" value={bg} onChange={setBg} />
              <Slider label="Distance" value={distance} min={0} max={50} unit="px" onChange={setDistance} />
              <Slider label="Blur" value={blur} min={0} max={100} unit="px" onChange={setBlur} />
              <Slider label="Intensity" value={intensity} min={5} max={40} unit="%" onChange={setIntensity} />
              <Slider label="Radius" value={radius} min={0} max={80} unit="px" onChange={setRadius} />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-80" className="" >
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: bg }}
          >
            <div
              className="h-40 w-40"
              style={{
                background: bg,
                borderRadius: `${radius}px`,
                boxShadow: shadow.replace(/\n\s*/g, ' '),
              }}
            />
          </div>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}

// Generates a lighter and darker shade of a base hex color
function shades(hex, pct) {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const r = parseInt(h.substring(0, 2), 16) || 0
  const g = parseInt(h.substring(2, 4), 16) || 0
  const b = parseInt(h.substring(4, 6), 16) || 0

  const factor = pct / 100
  const lighten = (c) => Math.min(255, Math.round(c + (255 - c) * factor))
  const darken = (c) => Math.max(0, Math.round(c * (1 - factor)))

  const toHex = (c) => c.toString(16).padStart(2, '0')

  const light = `#${toHex(lighten(r))}${toHex(lighten(g))}${toHex(lighten(b))}`
  const dark = `#${toHex(darken(r))}${toHex(darken(g))}${toHex(darken(b))}`

  return { light, dark }
}