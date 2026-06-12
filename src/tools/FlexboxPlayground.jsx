import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'
import Slider from '../components/Slider.jsx'

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse']
const JUSTIFY = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']
const ALIGN = ['stretch', 'flex-start', 'center', 'flex-end', 'baseline']
const WRAP = ['nowrap', 'wrap', 'wrap-reverse']

export default function FlexboxPlayground() {
  const [direction, setDirection] = useState('row')
  const [justify, setJustify] = useState('flex-start')
  const [align, setAlign] = useState('stretch')
  const [wrap, setWrap] = useState('nowrap')
  const [gap, setGap] = useState(12)
  const [items, setItems] = useState(4)

  const code = `display: flex;\nflex-direction: ${direction};\njustify-content: ${justify};\nalign-items: ${align};\nflex-wrap: ${wrap};\ngap: ${gap}px;`

  return (
    <ToolLayout
      title="Flexbox Playground"
      description="Visually experiment with flex container properties."
      controls={
        <>
          <SectionCard title="Direction & Wrap">
            <div className="space-y-4">
              <ToggleGroup label="flex-direction" options={DIRECTIONS} value={direction} onChange={setDirection} />
              <ToggleGroup label="flex-wrap" options={WRAP} value={wrap} onChange={setWrap} />
            </div>
          </SectionCard>

          <SectionCard title="Alignment">
            <div className="space-y-4">
              <ToggleGroup label="justify-content" options={JUSTIFY} value={justify} onChange={setJustify} />
              <ToggleGroup label="align-items" options={ALIGN} value={align} onChange={setAlign} />
            </div>
          </SectionCard>

          <SectionCard title="Layout">
            <div className="space-y-4">
              <Slider label="Gap" value={gap} min={0} max={48} unit="px" onChange={setGap} />
              <Slider label="Items" value={items} min={1} max={10} onChange={setItems} />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-80" className="p-4">
          <div
            className="h-full w-full"
            style={{
              display: 'flex',
              flexDirection: direction,
              justifyContent: justify,
              alignItems: align,
              flexWrap: wrap,
              gap: `${gap}px`,
            }}
          >
            {Array.from({ length: items }).map((_, i) => (
              <div
                key={i}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-semibold text-white"
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
