import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'
import DiceButton from '../components/DiceButton.jsx'
import { randomizers } from '../utils/randomizers.js'

const STYLES = ['minimal', 'glass', 'neumorphism', 'neon', 'brutalist']

function shades(hex, pct) {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map(c => c + c).join('')
  const r = parseInt(h.substring(0, 2), 16) || 0
  const g = parseInt(h.substring(2, 4), 16) || 0
  const b = parseInt(h.substring(4, 6), 16) || 0
  const f = pct / 100
  const lighten = c => Math.min(255, Math.round(c + (255 - c) * f))
  const darken  = c => Math.max(0, Math.round(c * (1 - f)))
  const toHex   = c => c.toString(16).padStart(2, '0')
  return {
    light: `#${toHex(lighten(r))}${toHex(lighten(g))}${toHex(lighten(b))}`,
    dark:  `#${toHex(darken(r))}${toHex(darken(g))}${toHex(darken(b))}`,
  }
}

export default function CardBuilder() {
  const [style, setStyle]   = useState('glass')
  const [bg, setBg]         = useState('#1c2027')
  const [accent, setAccent] = useState('#6366f1')
  const [radius, setRadius] = useState(20)
  const [padding, setPadding] = useState(24)
  const [width, setWidth]   = useState(280)

  let cardStyle = {}
  let cssLines  = []

  const base = { width: `${width}px`, padding: `${padding}px`, borderRadius: `${radius}px` }
  cssLines.push(`width: ${width}px;`, `padding: ${padding}px;`, `border-radius: ${radius}px;`)

  switch (style) {
    case 'minimal':
      cardStyle = { ...base, background: bg, border: '1px solid var(--color-border)' }
      cssLines.push(`background: ${bg};`, `border: 1px solid #262b33;`)
      break
    case 'glass':
      cardStyle = {
        ...base,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }
      cssLines.push(
        `background: rgba(255, 255, 255, 0.08);`,
        `border: 1px solid rgba(255, 255, 255, 0.15);`,
        `backdrop-filter: blur(16px);`,
        `-webkit-backdrop-filter: blur(16px);`,
      )
      break
    case 'neumorphism': {
      const { light, dark } = shades(bg, 15)
      cardStyle = { ...base, background: bg, boxShadow: `20px 20px 40px ${dark}, -20px -20px 40px ${light}` }
      cssLines.push(`background: ${bg};`, `box-shadow: 20px 20px 40px ${dark}, -20px -20px 40px ${light};`)
      break
    }
    case 'neon':
      cardStyle = {
        ...base, background: '#0b0d10',
        border: `2px solid ${accent}`,
        boxShadow: `0 0 20px ${accent}66, inset 0 0 20px ${accent}22`,
      }
      cssLines.push(`background: #0b0d10;`, `border: 2px solid ${accent};`, `box-shadow: 0 0 20px ${accent}66, inset 0 0 20px ${accent}22;`)
      break
    case 'brutalist':
      cardStyle = { ...base, background: bg, border: `3px solid ${accent}`, boxShadow: `8px 8px 0 ${accent}`, borderRadius: '0px' }
      cssLines = [`width: ${width}px;`, `padding: ${padding}px;`, `border-radius: 0px;`, `background: ${bg};`, `border: 3px solid ${accent};`, `box-shadow: 8px 8px 0 ${accent};`]
      break
    default: break
  }

  const code = `.card {\n  ${cssLines.join('\n  ')}\n}`

  return (
    <ToolLayout
      toolId="card-builder"
      title="Card Builder"
      description="Combine shadows, glass, neumorphism, and borders into a ready-to-use card style."
      controls={
        <>
          <SectionCard title="Style">
            <ToggleGroup options={STYLES} value={style} onChange={setStyle} />
            <div className="mt-3">
              <DiceButton onClick={() => {
                const r = randomizers.cardStudio()
                setAccent(r.color1)
                setBg('#1c2027')
                setRadius(r.radius)
              }} />
            </div>
          </SectionCard>
          <SectionCard title="Colors">
            <div className="space-y-4">
              <ColorInput label="Background" value={bg} onChange={setBg} />
              {(style === 'neon' || style === 'brutalist') && (
                <ColorInput label="Accent" value={accent} onChange={setAccent} />
              )}
            </div>
          </SectionCard>
          <SectionCard title="Dimensions">
            <div className="space-y-4">
              <Slider label="Width"   value={width}   min={160} max={400} unit="px" onChange={setWidth} />
              <Slider label="Padding" value={padding} min={8}   max={48}  unit="px" onChange={setPadding} />
              {style !== 'neumorphism' && style !== 'brutalist' && (
                <Slider label="Radius" value={radius} min={0} max={48} unit="px" onChange={setRadius} />
              )}
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-80" className={style === 'glass' || style === 'neon' ? 'bg-gradient-to-br from-accent/30 via-purple-500/20 to-accent-2/30' : ''}>
          <div style={cardStyle} className="flex flex-col gap-3 text-white">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-accent-2" />
            <div className="text-base font-semibold text-text">Card Title</div>
            <div className="text-sm text-text-dim">A reusable card component built from combined CSS effects.</div>
          </div>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}