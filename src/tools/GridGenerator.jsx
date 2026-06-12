import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

const JUSTIFY = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
const ALIGN = ['start', 'center', 'end', 'stretch']

export default function GridGenerator() {
  const [cols, setCols] = useState(3)
  const [rows, setRows] = useState(2)
  const [gap, setGap] = useState(12)
  const [justify, setJustify] = useState('stretch')
  const [align, setAlign] = useState('stretch')

  const code = `display: grid;\ngrid-template-columns: repeat(${cols}, 1fr);\ngrid-template-rows: repeat(${rows}, 1fr);\ngap: ${gap}px;\njustify-items: ${justify};\nalign-items: ${align};`

  return (
    <ToolLayout
      title="Grid Generator"
      description="Configure CSS grid columns, rows, gap, and item alignment."
      controls={
        <>
          <SectionCard title="Structure">
            <div className="space-y-4">
              <Slider label="Columns" value={cols} min={1} max={8} onChange={setCols} />
              <Slider label="Rows" value={rows} min={1} max={6} onChange={setRows} />
              <Slider label="Gap" value={gap} min={0} max={48} unit="px" onChange={setGap} />
            </div>
          </SectionCard>

          <SectionCard title="Item Alignment">
            <div className="space-y-4">
              <ToggleGroup label="justify-items" options={JUSTIFY} value={justify} onChange={setJustify} />
              <ToggleGroup label="align-items" options={ALIGN} value={align} onChange={setAlign} />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-80" className="p-4">
          <div
            className="h-full w-full"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gap: `${gap}px`,
              justifyItems: justify,
              alignItems: align,
            }}
          >
            {Array.from({ length: cols * rows }).map((_, i) => (
              <div
                key={i}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-xs font-semibold text-white"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
