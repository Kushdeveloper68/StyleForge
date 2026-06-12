import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'
import NumberInput from '../components/NumberInput.jsx'

const CURSORS = [
  'auto', 'default', 'pointer', 'text', 'move', 'grab', 'grabbing',
  'crosshair', 'wait', 'help', 'not-allowed', 'zoom-in', 'zoom-out',
  'col-resize', 'row-resize', 'ns-resize', 'ew-resize', 'all-scroll', 'none',
]

export default function CursorGenerator() {
  const [cursor, setCursor] = useState('pointer')
  const [useCustom, setUseCustom] = useState(false)
  const [hotspotX, setHotspotX] = useState(0)
  const [hotspotY, setHotspotY] = useState(0)
  const [imageUrl, setImageUrl] = useState('https://cdn-icons-png.flaticon.com/32/684/684908.png')

  const code = useCustom
    ? `cursor: url('${imageUrl}') ${hotspotX} ${hotspotY}, auto;`
    : `cursor: ${cursor};`

  return (
    <ToolLayout
      title="Cursor Generator"
      description="Preview built-in cursor types or build a custom image cursor with hotspot offsets."
      controls={
        <>
          <SectionCard title="Mode">
            <ToggleGroup
              options={[{ value: false, label: 'built-in' }, { value: true, label: 'custom image' }]}
              value={useCustom}
              onChange={setUseCustom}
            />
          </SectionCard>

          {!useCustom ? (
            <SectionCard title="Cursor Type">
              <div className="grid grid-cols-2 gap-2">
                {CURSORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCursor(c)}
                    className={`rounded-lg border px-3 py-2 text-left text-sm font-mono transition ${
                      cursor === c
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border bg-surface-2 text-text-dim hover:text-text'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </SectionCard>
          ) : (
            <SectionCard title="Custom Cursor">
              <div className="space-y-4">
                <div>
                  <span className="mb-2 block text-sm text-text-dim">Image URL</span>
                  <div className="rounded-lg border border-border bg-surface-2 px-3 py-1.5">
                    <input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-transparent font-mono text-sm text-text outline-none"
                      spellCheck={false}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <NumberInput label="Hotspot X" value={hotspotX} onChange={setHotspotX} />
                  <NumberInput label="Hotspot Y" value={hotspotY} onChange={setHotspotY} />
                </div>
              </div>
            </SectionCard>
          )}
        </>
      }
      preview={
        <PreviewBox height="h-80">
          <div
            className="flex h-full w-full items-center justify-center text-sm text-text-dim"
            style={{ cursor: useCustom ? `url('${imageUrl}') ${hotspotX} ${hotspotY}, auto` : cursor }}
          >
            Hover here to preview the cursor
          </div>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
