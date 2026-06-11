import { useState } from 'react'
import { Plus, Trash2, Shuffle } from 'lucide-react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'
import Button from '../components/Button.jsx'

const randomHex = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')

let stopId = 0
const newStop = (color, position) => ({ id: ++stopId, color, position })

export default function GradientGenerator() {
  const [type, setType] = useState('linear')
  const [angle, setAngle] = useState(135)
  const [shape, setShape] = useState('circle')
  const [position, setPosition] = useState('center')
  const [stops, setStops] = useState([
    newStop('#6366f1', 0),
    newStop('#22d3ee', 100),
  ])

  const updateStop = (id, patch) =>
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))

  const addStop = () => {
    if (stops.length >= 6) return
    const last = stops[stops.length - 1]
    const pos = Math.min(100, last.position + 10)
    setStops((prev) => [...prev, newStop(randomHex(), pos)])
  }

  const removeStop = (id) => {
    if (stops.length <= 2) return
    setStops((prev) => prev.filter((s) => s.id !== id))
  }

  const randomize = () => {
    setStops((prev) =>
      prev.map((s) => ({ ...s, color: randomHex() }))
    )
    if (type === 'linear') setAngle(Math.floor(Math.random() * 360))
  }

  const stopsCss = [...stops]
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color} ${s.position}%`)
    .join(', ')

  let gradientCss
  if (type === 'linear') {
    gradientCss = `linear-gradient(${angle}deg, ${stopsCss})`
  } else if (type === 'radial') {
    gradientCss = `radial-gradient(${shape} at ${position}, ${stopsCss})`
  } else {
    gradientCss = `conic-gradient(from ${angle}deg at ${position}, ${stopsCss})`
  }

  const code = `background: ${gradientCss};`

  return (
    <ToolLayout
      title="Gradient Generator"
      description="Build linear, radial, and conic gradients with multiple color stops."
      controls={
        <>
          <SectionCard title="Type">
            <ToggleGroup
              options={['linear', 'radial', 'conic']}
              value={type}
              onChange={setType}
            />
          </SectionCard>

          {(type === 'linear' || type === 'conic') && (
            <SectionCard title="Angle">
              <Slider
                label="Angle"
                value={angle}
                min={0}
                max={360}
                unit="deg"
                onChange={setAngle}
              />
            </SectionCard>
          )}

          {type === 'radial' && (
            <SectionCard title="Shape">
              <ToggleGroup
                options={['circle', 'ellipse']}
                value={shape}
                onChange={setShape}
              />
            </SectionCard>
          )}

          {(type === 'radial' || type === 'conic') && (
            <SectionCard title="Position">
              <ToggleGroup
                options={[
                  { value: 'center', label: 'center' },
                  { value: 'top left', label: 'top left' },
                  { value: 'top right', label: 'top right' },
                  { value: 'bottom left', label: 'bottom left' },
                  { value: 'bottom right', label: 'bottom right' },
                ]}
                value={position}
                onChange={setPosition}
              />
            </SectionCard>
          )}

          <SectionCard title="Color Stops">
            <div className="space-y-3">
              {stops.map((stop) => (
                <div key={stop.id} className="flex items-end gap-2">
                  <div className="flex-1">
                    <ColorInput
                      value={stop.color}
                      onChange={(c) => updateStop(stop.id, { color: c })}
                    />
                  </div>
                  <div className="w-24">
                    <Slider
                      label="Pos"
                      value={stop.position}
                      min={0}
                      max={100}
                      unit="%"
                      onChange={(p) => updateStop(stop.id, { position: p })}
                    />
                  </div>
                  <button
                    onClick={() => removeStop(stop.id)}
                    disabled={stops.length <= 2}
                    className="mb-1 rounded-lg border border-border bg-surface-2 p-2 text-text-dim transition hover:text-red-400 disabled:opacity-30"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Button onClick={addStop} icon={Plus}>
                Add Stop
              </Button>
              <Button onClick={randomize} icon={Shuffle}>
                Randomize
              </Button>
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox>
          <div
            className="h-full w-full"
            style={{ background: gradientCss }}
          />
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}