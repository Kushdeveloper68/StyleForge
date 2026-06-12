import { useState } from 'react'
import { Link, Unlink } from 'lucide-react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Slider from '../components/Slider.jsx'
import Button from '../components/Button.jsx'

export default function BorderRadiusGenerator() {
  const [linked, setLinked] = useState(true)
  const [radius, setRadius] = useState({ tl: 24, tr: 24, br: 24, bl: 24 })

  const updateCorner = (corner, value) => {
    if (linked) {
      setRadius({ tl: value, tr: value, br: value, bl: value })
    } else {
      setRadius((prev) => ({ ...prev, [corner]: value }))
    }
  }

  const code = `border-radius: ${radius.tl}px ${radius.tr}px ${radius.br}px ${radius.bl}px;`

  return (
    <ToolLayout
      title="Border Radius Generator"
      description="Fine-tune each corner individually or link them together."
      controls={
        <>
          <SectionCard title="Mode">
            <Button onClick={() => setLinked((p) => !p)} icon={linked ? Link : Unlink}>
              {linked ? 'Linked corners' : 'Independent corners'}
            </Button>
          </SectionCard>

          <SectionCard title="Corners">
            <div className="space-y-4">
              <Slider label="Top Left" value={radius.tl} min={0} max={200} unit="px" onChange={(v) => updateCorner('tl', v)} />
              <Slider label="Top Right" value={radius.tr} min={0} max={200} unit="px" onChange={(v) => updateCorner('tr', v)} />
              <Slider label="Bottom Right" value={radius.br} min={0} max={200} unit="px" onChange={(v) => updateCorner('br', v)} />
              <Slider label="Bottom Left" value={radius.bl} min={0} max={200} unit="px" onChange={(v) => updateCorner('bl', v)} />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox checkerboard>
          <div
            className="h-40 w-40 bg-gradient-to-br from-accent to-accent-2"
            style={{
              borderRadius: `${radius.tl}px ${radius.tr}px ${radius.br}px ${radius.bl}px`,
            }}
          />
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
