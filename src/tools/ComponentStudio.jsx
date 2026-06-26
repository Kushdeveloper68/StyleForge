import { useState, useCallback } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp, Wand2, GripVertical } from 'lucide-react'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'
import DiceButton from '../components/DiceButton.jsx'
import { randomizers } from '../utils/randomizers.js'

// ──────────────────────────────────────────────────────
// Effect definitions
// ──────────────────────────────────────────────────────
const EFFECT_TYPES = [
  'Gradient Background',
  'Solid Background',
  'Box Shadow',
  'Border',
  'Border Radius',
  'Glass Effect',
  'Text Shadow',
  'Transform',
  'Filter',
  'Animation',
]

function defaultEffect(type) {
  const base = { id: Date.now().toString(36) + Math.random().toString(36).slice(2), type, enabled: true }
  switch (type) {
    case 'Gradient Background': return { ...base, angle: 135, color1: '#6366f1', color2: '#22d3ee' }
    case 'Solid Background': return { ...base, color: '#1c2027' }
    case 'Box Shadow': return { ...base, x: 0, y: 12, blur: 30, spread: -8, color: '#000000', alpha: 40, inset: false }
    case 'Border': return { ...base, width: 2, style: 'solid', color: '#6366f1', radius: 16 }
    case 'Border Radius': return { ...base, tl: 16, tr: 16, br: 16, bl: 16 }
    case 'Glass Effect': return { ...base, blur: 12, opacity: 15, tint: '#ffffff' }
    case 'Text Shadow': return { ...base, x: 0, y: 0, blur: 12, color: '#22d3ee', alpha: 80 }
    case 'Transform': return { ...base, translateX: 0, translateY: 0, rotate: 0, scaleX: 1, scaleY: 1 }
    case 'Filter': return { ...base, blur: 0, brightness: 100, contrast: 100, saturate: 100, grayscale: 0 }
    case 'Animation': return { ...base, name: 'pulse', duration: 2, timing: 'ease-in-out', iteration: 'infinite' }
    default: return base
  }
}

function effectToCSS(effect) {
  if (!effect.enabled) return {}
  switch (effect.type) {
    case 'Gradient Background':
      return { background: `linear-gradient(${effect.angle}deg, ${effect.color1}, ${effect.color2})` }
    case 'Solid Background':
      return { backgroundColor: effect.color }
    case 'Box Shadow':
      return { boxShadow: `${effect.inset ? 'inset ' : ''}${effect.x}px ${effect.y}px ${effect.blur}px ${effect.spread}px ${hexToRgba(effect.color, effect.alpha)}` }
    case 'Border':
      return { border: `${effect.width}px ${effect.style} ${effect.color}`, borderRadius: `${effect.radius}px` }
    case 'Border Radius':
      return { borderRadius: `${effect.tl}px ${effect.tr}px ${effect.br}px ${effect.bl}px` }
    case 'Glass Effect':
      return {
        background: hexToRgba(effect.tint, effect.opacity),
        backdropFilter: `blur(${effect.blur}px)`,
        WebkitBackdropFilter: `blur(${effect.blur}px)`,
        border: `1px solid ${hexToRgba('#ffffff', 20)}`,
      }
    case 'Text Shadow':
      return { textShadow: `${effect.x}px ${effect.y}px ${effect.blur}px ${hexToRgba(effect.color, effect.alpha)}` }
    case 'Transform':
      return { transform: `translate(${effect.translateX}px, ${effect.translateY}px) rotate(${effect.rotate}deg) scale(${effect.scaleX}, ${effect.scaleY})` }
    case 'Filter':
      return { filter: `blur(${effect.blur}px) brightness(${effect.brightness}%) contrast(${effect.contrast}%) saturate(${effect.saturate}%) grayscale(${effect.grayscale}%)` }
    case 'Animation':
      return { animation: `${effect.name} ${effect.duration}s ${effect.timing} ${effect.iteration}` }
    default: return {}
  }
}

function mergeStyles(effects) {
  const merged = {}
  for (const e of effects) {
    if (!e.enabled) continue
    const styles = effectToCSS(e)
    for (const [k, v] of Object.entries(styles)) {
      merged[k] = v
    }
  }
  return merged
}

function stylesToCSS(styleObj) {
  const toKebab = (s) => s.replace(/([A-Z])/g, '-$1').toLowerCase()
  return Object.entries(styleObj)
    .map(([k, v]) => `  ${toKebab(k)}: ${v};`)
    .join('\n')
}

// ──────────────────────────────────────────────────────
// Effect Editor sub-components
// ──────────────────────────────────────────────────────
function EffectEditor({ effect, onChange }) {
  const u = (patch) => onChange({ ...effect, ...patch })

  switch (effect.type) {
    case 'Gradient Background':
      return (
        <div className="space-y-3">
          <Slider label="Angle" value={effect.angle} min={0} max={360} unit="deg" onChange={(v) => u({ angle: v })} />
          <div className="grid grid-cols-2 gap-2">
            <ColorInput label="Color 1" value={effect.color1} onChange={(v) => u({ color1: v })} />
            <ColorInput label="Color 2" value={effect.color2} onChange={(v) => u({ color2: v })} />
          </div>
        </div>
      )
    case 'Solid Background':
      return <ColorInput label="Color" value={effect.color} onChange={(v) => u({ color: v })} />
    case 'Box Shadow':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Slider label="X" value={effect.x} min={-50} max={50} unit="px" onChange={(v) => u({ x: v })} />
            <Slider label="Y" value={effect.y} min={-50} max={50} unit="px" onChange={(v) => u({ y: v })} />
          </div>
          <Slider label="Blur" value={effect.blur} min={0} max={100} unit="px" onChange={(v) => u({ blur: v })} />
          <Slider label="Spread" value={effect.spread} min={-50} max={50} unit="px" onChange={(v) => u({ spread: v })} />
          <Slider label="Opacity" value={effect.alpha} min={0} max={100} unit="%" onChange={(v) => u({ alpha: v })} />
          <ColorInput label="Color" value={effect.color} onChange={(v) => u({ color: v })} />
          <ToggleGroup options={[{ value: false, label: 'outset' }, { value: true, label: 'inset' }]} value={effect.inset} onChange={(v) => u({ inset: v })} />
        </div>
      )
    case 'Border':
      return (
        <div className="space-y-3">
          <Slider label="Width" value={effect.width} min={0} max={12} unit="px" onChange={(v) => u({ width: v })} />
          <Slider label="Radius" value={effect.radius} min={0} max={60} unit="px" onChange={(v) => u({ radius: v })} />
          <ColorInput label="Color" value={effect.color} onChange={(v) => u({ color: v })} />
          <ToggleGroup label="Style" options={['solid', 'dashed', 'dotted', 'double']} value={effect.style} onChange={(v) => u({ style: v })} />
        </div>
      )
    case 'Border Radius':
      return (
        <div className="space-y-3">
          <Slider label="Top Left" value={effect.tl} min={0} max={100} unit="px" onChange={(v) => u({ tl: v })} />
          <Slider label="Top Right" value={effect.tr} min={0} max={100} unit="px" onChange={(v) => u({ tr: v })} />
          <Slider label="Bottom Right" value={effect.br} min={0} max={100} unit="px" onChange={(v) => u({ br: v })} />
          <Slider label="Bottom Left" value={effect.bl} min={0} max={100} unit="px" onChange={(v) => u({ bl: v })} />
        </div>
      )
    case 'Glass Effect':
      return (
        <div className="space-y-3">
          <Slider label="Blur" value={effect.blur} min={0} max={40} unit="px" onChange={(v) => u({ blur: v })} />
          <Slider label="Tint Opacity" value={effect.opacity} min={0} max={80} unit="%" onChange={(v) => u({ opacity: v })} />
          <ColorInput label="Tint Color" value={effect.tint} onChange={(v) => u({ tint: v })} />
        </div>
      )
    case 'Text Shadow':
      return (
        <div className="space-y-3">
          <Slider label="Blur" value={effect.blur} min={0} max={40} unit="px" onChange={(v) => u({ blur: v })} />
          <Slider label="Opacity" value={effect.alpha} min={0} max={100} unit="%" onChange={(v) => u({ alpha: v })} />
          <ColorInput label="Color" value={effect.color} onChange={(v) => u({ color: v })} />
        </div>
      )
    case 'Transform':
      return (
        <div className="space-y-3">
          <Slider label="Translate X" value={effect.translateX} min={-100} max={100} unit="px" onChange={(v) => u({ translateX: v })} />
          <Slider label="Translate Y" value={effect.translateY} min={-100} max={100} unit="px" onChange={(v) => u({ translateY: v })} />
          <Slider label="Rotate" value={effect.rotate} min={-180} max={180} unit="deg" onChange={(v) => u({ rotate: v })} />
          <Slider label="Scale X" value={effect.scaleX} min={0.1} max={2} step={0.05} onChange={(v) => u({ scaleX: v })} />
          <Slider label="Scale Y" value={effect.scaleY} min={0.1} max={2} step={0.05} onChange={(v) => u({ scaleY: v })} />
        </div>
      )
    case 'Filter':
      return (
        <div className="space-y-3">
          <Slider label="Blur" value={effect.blur} min={0} max={20} unit="px" onChange={(v) => u({ blur: v })} />
          <Slider label="Brightness" value={effect.brightness} min={0} max={200} unit="%" onChange={(v) => u({ brightness: v })} />
          <Slider label="Contrast" value={effect.contrast} min={0} max={200} unit="%" onChange={(v) => u({ contrast: v })} />
          <Slider label="Saturate" value={effect.saturate} min={0} max={300} unit="%" onChange={(v) => u({ saturate: v })} />
          <Slider label="Grayscale" value={effect.grayscale} min={0} max={100} unit="%" onChange={(v) => u({ grayscale: v })} />
        </div>
      )
    case 'Animation':
      return (
        <div className="space-y-3">
          <ToggleGroup label="Preset" options={['bounce', 'pulse', 'spin', 'fade', 'slideIn']} value={effect.name} onChange={(v) => u({ name: v })} />
          <Slider label="Duration" value={effect.duration} min={0.2} max={5} step={0.1} unit="s" onChange={(v) => u({ duration: v })} />
          <ToggleGroup
            label="iteration"
            options={[{ value: '1', label: '1' }, { value: '3', label: '3' }, { value: 'infinite', label: '∞' }]}
            value={effect.iteration}
            onChange={(v) => u({ iteration: v })}
          />
        </div>
      )
    default: return null
  }
}

// ──────────────────────────────────────────────────────
// Main Component Studio
// ──────────────────────────────────────────────────────
const ANIMATION_KEYFRAMES = {
  bounce: '@keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)} }',
  pulse: '@keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.08)} }',
  spin: '@keyframes spin { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }',
  fade: '@keyframes fade { from{opacity:0}to{opacity:1} }',
  slideIn: '@keyframes slideIn { from{transform:translateX(-60px);opacity:0}to{transform:translateX(0);opacity:1} }',
}

export default function ComponentStudio() {
  const [effects, setEffects] = useState([
    defaultEffect('Gradient Background'),
    defaultEffect('Border Radius'),
    defaultEffect('Box Shadow'),
  ])
  const [expandedId, setExpandedId] = useState(null)
  const [previewText, setPreviewText] = useState('Component')
  const [previewSize, setPreviewSize] = useState('card')
  const [addingType, setAddingType] = useState(EFFECT_TYPES[0])

  const updateEffect = useCallback((id, patch) =>
    setEffects((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e))), [])

  const removeEffect = useCallback((id) =>
    setEffects((prev) => prev.filter((e) => e.id !== id)), [])

  const addEffect = () => {
    const e = defaultEffect(addingType)
    setEffects((prev) => [...prev, e])
    setExpandedId(e.id)
  }

  const toggleEnabled = (id) =>
    setEffects((prev) => prev.map((e) => (e.id === id ? { ...e, enabled: !e.enabled } : e)))

  const combinedStyle = mergeStyles(effects)
  const cssBody = stylesToCSS(combinedStyle)

  const animEffect = effects.find((e) => e.type === 'Animation' && e.enabled)
  const keyframeCss = animEffect ? ANIMATION_KEYFRAMES[animEffect.name] ?? '' : ''

  const fullCss = keyframeCss
    ? `${keyframeCss}\n\n.component {\n${cssBody}\n}`
    : `.component {\n${cssBody}\n}`

  const sizeClass = previewSize === 'card'
    ? 'h-32 w-60'
    : previewSize === 'button'
      ? 'h-12 w-36'
      : 'h-48 w-48'

  const glassEffect = effects.find(e => e.type === 'Glass Effect' && e.enabled)
  const previewWrapperClass = glassEffect
    ? 'bg-gradient-to-br from-accent/40 via-purple-500/30 to-accent-2/40'
    : ''

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Component Studio</h2>
            <p className="mt-1 text-sm text-text-dim">
              Stack multiple CSS effects on one element and export a single combined CSS block.
            </p>
          </div>
          <DiceButton
            label="Random combo"
            onClick={() => {
              const r = randomizers.gradient()
              setEffects([
                { ...defaultEffect('Gradient Background'), color1: r.stops[0].color, color2: r.stops[1].color, angle: r.angle },
                { ...defaultEffect('Border Radius'), tl: 20, tr: 20, br: 20, bl: 20 },
                { ...defaultEffect('Box Shadow'), ...randomizers.boxShadow() },
              ])
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
        {/* ── Controls ── */}
        <div className="space-y-4">
          {/* Effect list */}
          <SectionCard title={`Active Effects (${effects.length})`}>
            <div className="space-y-2">
              {effects.map((effect) => (
                <div
                  key={effect.id}
                  className={`rounded-xl border transition ${effect.enabled ? 'border-border' : 'border-border/40 opacity-50'}`}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-2 px-3 py-2.5">
                    <GripVertical size={14} className="text-text-dim/40 cursor-grab" />
                    {/* enabled toggle */}
                    <button
                      onClick={() => toggleEnabled(effect.id)}
                      className={`h-4 w-4 shrink-0 rounded border transition ${effect.enabled ? 'border-accent bg-accent' : 'border-border bg-surface-2'}`}
                    >
                      {effect.enabled && (
                        <svg viewBox="0 0 10 10" fill="none" className="h-full w-full p-0.5">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span className="flex-1 text-sm font-medium text-text">{effect.type}</span>
                    <button
                      onClick={() => setExpandedId(expandedId === effect.id ? null : effect.id)}
                      className="rounded p-1 text-text-dim hover:text-text"
                    >
                      {expandedId === effect.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    <button
                      onClick={() => removeEffect(effect.id)}
                      className="rounded p-1 text-text-dim hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Expanded editor */}
                  {expandedId === effect.id && (
                    <div className="border-t border-border bg-surface-2/50 px-3 py-3">
                      <EffectEditor
                        effect={effect}
                        onChange={(updated) => updateEffect(effect.id, updated)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Add effect */}
          <SectionCard title="Add Effect">
            <div className="flex gap-2">
              <select
                value={addingType}
                onChange={(e) => setAddingType(e.target.value)}
                className="flex-1 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm text-text outline-none focus:border-accent/50"
              >
                {EFFECT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button
                onClick={addEffect}
                className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white transition hover:bg-accent/90"
              >
                <Plus size={14} />
                Add
              </button>
            </div>
          </SectionCard>

          {/* Preview settings */}
          <SectionCard title="Preview">
            <div className="space-y-3">
              <ToggleGroup
                label="Element size"
                options={[{ value: 'button', label: 'Button' }, { value: 'card', label: 'Card' }, { value: 'box', label: 'Box' }]}
                value={previewSize}
                onChange={setPreviewSize}
              />
              <div>
                <span className="mb-2 block text-sm text-text-dim">Preview text</span>
                <div className="rounded-lg border border-border bg-surface-2 px-3 py-1.5">
                  <input
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    className="w-full bg-transparent text-sm text-text outline-none"
                    maxLength={32}
                  />
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ── Preview + Code ── */}
        <div className="space-y-4">
          {keyframeCss && <style>{keyframeCss}</style>}

          <PreviewBox height="h-80" className={previewWrapperClass}>
            <div
              className={`${sizeClass} flex items-center justify-center text-sm font-semibold text-white`}
              style={combinedStyle}
            >
              {previewText}
            </div>
          </PreviewBox>

          <CodeBlock code={fullCss} toolId="component-studio" toolLabel="Component Studio" />
        </div>
      </div>
    </div>
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