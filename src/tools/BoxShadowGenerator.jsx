import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'
import Button from '../components/Button.jsx'

let layerId = 0
const newLayer = () => ({
  id: ++layerId,
  x: 0,
  y: 10,
  blur: 25,
  spread: -5,
  color: '#000000',
  alpha: 35,
  inset: false,
})

export default function BoxShadowGenerator() {
  const [layers, setLayers] = useState([newLayer()])
  const [activeIdx, setActiveIdx] = useState(0)
  const [bg, setBg] = useState('#1c2027')

  const update = (id, patch) =>
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))

  const addLayer = () => {
    if (layers.length >= 5) return
    setLayers((prev) => [...prev, newLayer()])
    setActiveIdx(layers.length)
  }

  const removeLayer = (idx) => {
    if (layers.length <= 1) return
    setLayers((prev) => prev.filter((_, i) => i !== idx))
    setActiveIdx((prev) => Math.max(0, prev - (idx <= prev ? 1 : 0)))
  }

  const layerToCss = (l) =>
    `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${hexToRgba(l.color, l.alpha)}`

  const shadowCss = layers.map(layerToCss).join(',\n  ')
  const code = `box-shadow:\n  ${shadowCss};`

  const active = layers[activeIdx] ?? layers[0]

  return (
    <ToolLayout
      title="Box Shadow Generator"
      description="Stack multiple shadow layers for soft, realistic depth effects."
      controls={
        <>
          <SectionCard title="Layers">
            <div className="mb-3 flex flex-wrap gap-2">
              {layers.map((l, idx) => (
                <button
                  key={l.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                    idx === activeIdx
                      ? 'bg-accent text-white'
                      : 'bg-surface-2 text-text-dim hover:text-text'
                  }`}
                >
                  Layer {idx + 1}
                  {layers.length > 1 && (
                    <Trash2
                      size={12}
                      onClick={(e) => {
                        e.stopPropagation()
                        removeLayer(idx)
                      }}
                      className="hover:text-red-300"
                    />
                  )}
                </button>
              ))}
            </div>
            <Button onClick={addLayer} icon={Plus}>
              Add Layer
            </Button>
          </SectionCard>

          <SectionCard title={`Layer ${activeIdx + 1} Settings`}>
            <div className="space-y-4">
              <Slider label="Offset X" value={active.x} min={-50} max={50} unit="px" onChange={(v) => update(active.id, { x: v })} />
              <Slider label="Offset Y" value={active.y} min={-50} max={50} unit="px" onChange={(v) => update(active.id, { y: v })} />
              <Slider label="Blur" value={active.blur} min={0} max={100} unit="px" onChange={(v) => update(active.id, { blur: v })} />
              <Slider label="Spread" value={active.spread} min={-50} max={50} unit="px" onChange={(v) => update(active.id, { spread: v })} />
              <Slider label="Opacity" value={active.alpha} min={0} max={100} unit="%" onChange={(v) => update(active.id, { alpha: v })} />
              <ColorInput label="Color" value={active.color} onChange={(v) => update(active.id, { color: v })} />
              <ToggleGroup
                label="Position"
                options={[{ value: false, label: 'outset' }, { value: true, label: 'inset' }]}
                value={active.inset}
                onChange={(v) => update(active.id, { inset: v })}
              />
            </div>
          </SectionCard>

          <SectionCard title="Preview Background">
            <ColorInput value={bg} onChange={setBg} />
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox checkerboard>
          <div
            className="h-32 w-32 rounded-2xl"
            style={{ background: bg, boxShadow: shadowCss.replace(/\n\s*/g, ' ') }}
          />
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
