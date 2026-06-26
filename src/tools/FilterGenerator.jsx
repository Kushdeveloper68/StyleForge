import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Slider from '../components/Slider.jsx'
import Button from '../components/Button.jsx'
import { RotateCcw } from 'lucide-react'

const DEFAULTS = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  saturate: 100,
  sepia: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
}

const PREVIEW_BG = 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600'

export default function FilterGenerator() {
  const [f, setF] = useState(DEFAULTS)

  const update = (key, value) => setF((prev) => ({ ...prev, [key]: value }))
  const reset = () => setF(DEFAULTS)

  const filterValue = [
    `blur(${f.blur}px)`,
    `brightness(${f.brightness}%)`,
    `contrast(${f.contrast}%)`,
    `grayscale(${f.grayscale}%)`,
    `saturate(${f.saturate}%)`,
    `sepia(${f.sepia}%)`,
    `hue-rotate(${f.hueRotate}deg)`,
    `invert(${f.invert}%)`,
    `opacity(${f.opacity}%)`,
  ].join(' ')

  const code = `filter: ${filterValue};`

  const sampleContent = (style) => (
    <div
      className={`flex h-full w-full items-center justify-center ${PREVIEW_BG}`}
      style={style}
    >
      <span className="text-2xl font-bold text-white drop-shadow-lg">Preview</span>
    </div>
  )

  return (
    <ToolLayout
      toolId="filter"
      title="Filter Generator"
      description="Combine CSS filter functions and preview the result live."
      controls={
        <SectionCard title="Filters">
          <div className="space-y-4">
            <Slider label="Blur" value={f.blur} min={0} max={20} unit="px" onChange={(v) => update('blur', v)} />
            <Slider label="Brightness" value={f.brightness} min={0} max={200} unit="%" onChange={(v) => update('brightness', v)} />
            <Slider label="Contrast" value={f.contrast} min={0} max={200} unit="%" onChange={(v) => update('contrast', v)} />
            <Slider label="Saturate" value={f.saturate} min={0} max={300} unit="%" onChange={(v) => update('saturate', v)} />
            <Slider label="Grayscale" value={f.grayscale} min={0} max={100} unit="%" onChange={(v) => update('grayscale', v)} />
            <Slider label="Sepia" value={f.sepia} min={0} max={100} unit="%" onChange={(v) => update('sepia', v)} />
            <Slider label="Hue Rotate" value={f.hueRotate} min={0} max={360} unit="deg" onChange={(v) => update('hueRotate', v)} />
            <Slider label="Invert" value={f.invert} min={0} max={100} unit="%" onChange={(v) => update('invert', v)} />
            <Slider label="Opacity" value={f.opacity} min={0} max={100} unit="%" onChange={(v) => update('opacity', v)} />
          </div>
          <div className="mt-4">
            <Button onClick={reset} icon={RotateCcw}>Reset</Button>
          </div>
        </SectionCard>
      }
      preview={
        <BeforeAfterSlider
          height="h-80"
          before={sampleContent({})}
          after={sampleContent({ filter: filterValue })}
        />
      }
      code={<CodeBlock code={code} />}
    />
  )
}