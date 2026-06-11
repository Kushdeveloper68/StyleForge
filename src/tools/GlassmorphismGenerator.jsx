import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'

export default function GlassmorphismGenerator() {
  const [blur, setBlur] = useState(12)
  const [opacity, setOpacity] = useState(20)
  const [tint, setTint] = useState('#ffffff')
  const [borderOpacity, setBorderOpacity] = useState(30)
  const [radius, setRadius] = useState(20)

  const bgRgba = hexToRgba(tint, opacity)
  const borderRgba = hexToRgba('#ffffff', borderOpacity)

  const code = `background: ${bgRgba};\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: 1px solid ${borderRgba};\nborder-radius: ${radius}px;`

  return (
    <ToolLayout
      title="Glassmorphism Generator"
      description="Frosted-glass cards with backdrop blur and translucent tint."
      controls={
        <SectionCard title="Settings">
          <div className="space-y-4">
            <Slider label="Blur" value={blur} min={0} max={40} unit="px" onChange={setBlur} />
            <Slider label="Tint Opacity" value={opacity} min={0} max={100} unit="%" onChange={setOpacity} />
            <ColorInput label="Tint Color" value={tint} onChange={setTint} />
            <Slider label="Border Opacity" value={borderOpacity} min={0} max={100} unit="%" onChange={setBorderOpacity} />
            <Slider label="Radius" value={radius} min={0} max={60} unit="px" onChange={setRadius} />
          </div>
        </SectionCard>
      }
      preview={
        <PreviewBox height="h-80" className="relative bg-gradient-to-br from-accent via-purple-500 to-accent-2">
          <div
            className="flex h-40 w-64 items-center justify-center text-center text-sm font-medium text-white"
            style={{
              background: bgRgba,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              border: `1px solid ${borderRgba}`,
              borderRadius: `${radius}px`,
            }}
          >
            Glass card
          </div>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}

function hexToRgba(hex, alphaPct) {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const r = parseInt(h.substring(0, 2), 16) || 0
  const g = parseInt(h.substring(2, 4), 16) || 0
  const b = parseInt(h.substring(4, 6), 16) || 0
  return `rgba(${r}, ${g}, ${b}, ${(alphaPct / 100).toFixed(2)})`
}