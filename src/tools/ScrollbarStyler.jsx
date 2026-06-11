import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'

export default function ScrollbarStyler() {
  const [width, setWidth] = useState(10)
  const [trackColor, setTrackColor] = useState('#14171c')
  const [thumbColor, setThumbColor] = useState('#6366f1')
  const [thumbHover, setThumbHover] = useState('#22d3ee')
  const [radius, setRadius] = useState(8)

  const code = `/* Webkit browsers */\n::-webkit-scrollbar {\n  width: ${width}px;\n  height: ${width}px;\n}\n::-webkit-scrollbar-track {\n  background: ${trackColor};\n}\n::-webkit-scrollbar-thumb {\n  background: ${thumbColor};\n  border-radius: ${radius}px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: ${thumbHover};\n}\n\n/* Firefox */\n* {\n  scrollbar-width: thin;\n  scrollbar-color: ${thumbColor} ${trackColor};\n}`

  const scopedCss = `
    .scrollbar-preview::-webkit-scrollbar {
      width: ${width}px;
      height: ${width}px;
    }
    .scrollbar-preview::-webkit-scrollbar-track {
      background: ${trackColor};
    }
    .scrollbar-preview::-webkit-scrollbar-thumb {
      background: ${thumbColor};
      border-radius: ${radius}px;
    }
    .scrollbar-preview::-webkit-scrollbar-thumb:hover {
      background: ${thumbHover};
    }
    .scrollbar-preview {
      scrollbar-width: thin;
      scrollbar-color: ${thumbColor} ${trackColor};
    }
  `

  return (
    <ToolLayout
      title="Scrollbar Styler"
      description="Customize scrollbar track, thumb, and width with cross-browser CSS."
      controls={
        <SectionCard title="Settings">
          <div className="space-y-4">
            <Slider label="Width" value={width} min={4} max={24} unit="px" onChange={setWidth} />
            <Slider label="Thumb Radius" value={radius} min={0} max={20} unit="px" onChange={setRadius} />
            <ColorInput label="Track Color" value={trackColor} onChange={setTrackColor} />
            <ColorInput label="Thumb Color" value={thumbColor} onChange={setThumbColor} />
            <ColorInput label="Thumb Hover Color" value={thumbHover} onChange={setThumbHover} />
          </div>
        </SectionCard>
      }
      preview={
        <PreviewBox height="h-80" className="p-0">
          <style>{scopedCss}</style>
          <div className="scrollbar-preview h-full w-full overflow-auto p-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="mb-3 rounded-lg border border-border bg-surface-2 p-3 text-sm text-text-dim">
                Scrollable content row {i + 1}
              </div>
            ))}
          </div>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}