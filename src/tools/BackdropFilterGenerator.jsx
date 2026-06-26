import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Slider from '../components/Slider.jsx'

export default function BackdropFilterGenerator() {
  const [blur, setBlur] = useState(10)
  const [brightness, setBrightness] = useState(100)
  const [saturate, setSaturate] = useState(150)
  const [contrast, setContrast] = useState(100)

  const value = `blur(${blur}px) brightness(${brightness}%) saturate(${saturate}%) contrast(${contrast}%)`
  const code = `backdrop-filter: ${value};\n-webkit-backdrop-filter: ${value};`

  return (
    <ToolLayout
      toolId="backdrop-filter"
      title="Backdrop Filter Generator"
      description="Apply blur and color adjustments to whatever sits behind an element."
      controls={
        <SectionCard title="Settings">
          <div className="space-y-4">
            <Slider label="Blur" value={blur} min={0} max={40} unit="px" onChange={setBlur} />
            <Slider label="Brightness" value={brightness} min={0} max={200} unit="%" onChange={setBrightness} />
            <Slider label="Saturate" value={saturate} min={0} max={300} unit="%" onChange={setSaturate} />
            <Slider label="Contrast" value={contrast} min={0} max={200} unit="%" onChange={setContrast} />
          </div>
        </SectionCard>
      }
      preview={
        <BeforeAfterSlider
          height="h-80"
          before={
            <div
              className="flex h-full w-full items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/60 via-purple-500/60 to-accent-2/60" />
              <div className="relative z-10 flex h-32 w-56 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-sm font-medium text-white">
                No backdrop filter
              </div>
            </div>
          }
          after={
            <div
              className="flex h-full w-full items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/60 via-purple-500/60 to-accent-2/60" />
              <div
                className="relative z-10 flex h-32 w-56 items-center justify-center rounded-2xl border border-white/30 text-sm font-medium text-white"
                style={{ backdropFilter: value, WebkitBackdropFilter: value, background: 'rgba(255,255,255,0.1)' }}
              >
                Backdrop filter applied
              </div>
            </div>
          }
        />
      }
      code={<CodeBlock code={code} />}
    />
  )
}