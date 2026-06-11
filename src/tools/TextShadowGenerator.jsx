import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

const PRESET_TEXT = ['Neon', '3D', 'Outline', 'Soft']

export default function TextShadowGenerator() {
  const [x, setX] = useState(2)
  const [y, setY] = useState(2)
  const [blur, setBlur] = useState(6)
  const [color, setColor] = useState('#22d3ee')
  const [alpha, setAlpha] = useState(80)
  const [bg, setBg] = useState('#0b0d10')
  const [preset, setPreset] = useState('Soft')

  const rgba = hexToRgba(color, alpha)

  let shadowCss
  if (preset === 'Neon') {
    shadowCss = `0 0 5px ${rgba}, 0 0 10px ${rgba}, 0 0 20px ${rgba}, 0 0 40px ${rgba}`
  } else if (preset === '3D') {
    shadowCss = Array.from({ length: 6 })
      .map((_, i) => `${i + 1}px ${i + 1}px 0 ${rgba}`)
      .join(', ')
  } else if (preset === 'Outline') {
    shadowCss = `-1px -1px 0 ${color}, 1px -1px 0 ${color}, -1px 1px 0 ${color}, 1px 1px 0 ${color}`
  } else {
    shadowCss = `${x}px ${y}px ${blur}px ${rgba}`
  }

  const code = `text-shadow: ${shadowCss};`

  return (
    <ToolLayout
      title="Text Shadow Generator"
      description="Create soft, neon, 3D, or outlined text shadow effects."
      controls={
        <>
          <SectionCard title="Style">
            <ToggleGroup options={PRESET_TEXT} value={preset} onChange={setPreset} />
          </SectionCard>

          {preset === 'Soft' && (
            <SectionCard title="Offset & Blur">
              <div className="space-y-4">
                <Slider label="Offset X" value={x} min={-30} max={30} unit="px" onChange={setX} />
                <Slider label="Offset Y" value={y} min={-30} max={30} unit="px" onChange={setY} />
                <Slider label="Blur" value={blur} min={0} max={50} unit="px" onChange={setBlur} />
                <Slider label="Opacity" value={alpha} min={0} max={100} unit="%" onChange={setAlpha} />
              </div>
            </SectionCard>
          )}

          <SectionCard title="Colors">
            <div className="space-y-4">
              <ColorInput label="Shadow Color" value={color} onChange={setColor} />
              <ColorInput label="Background" value={bg} onChange={setBg} />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-60" style={{ background: bg }}>
          <div className="flex h-full w-full items-center justify-center" style={{ background: bg }}>
            <span
              className="text-5xl font-extrabold text-white"
              style={{ textShadow: shadowCss }}
            >
              Aa
            </span>
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