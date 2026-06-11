import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const PALETTES = [
  { name: 'Sunset', css: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
  { name: 'Ocean', css: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)' },
  { name: 'Mojito', css: 'linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)' },
  { name: 'Royal', css: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)' },
  { name: 'Peach', css: 'linear-gradient(135deg, #ed4264 0%, #ffedbc 100%)' },
  { name: 'Cosmic', css: 'linear-gradient(135deg, #ff00cc 0%, #333399 100%)' },
  { name: 'Lush', css: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)' },
  { name: 'Mango', css: 'linear-gradient(135deg, #ffe259 0%, #ffa751 100%)' },
  { name: 'Velvet', css: 'linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)' },
  { name: 'Midnight', css: 'linear-gradient(135deg, #232526 0%, #414345 100%)' },
  { name: 'Aqua Marine', css: 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)' },
  { name: 'Flame', css: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)' },
  { name: 'Lavender', css: 'linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)' },
  { name: 'Frost', css: 'linear-gradient(135deg, #000428 0%, #004e92 100%)' },
  { name: 'Candy', css: 'linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)' },
  { name: 'Emerald', css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
]

export default function GradientPalette() {
  const [selected, setSelected] = useState(PALETTES[0])

  const code = `background: ${selected.css};`

  return (
    <ToolLayout
      title="Gradient Palette"
      description="A curated collection of ready-made gradients. Click to preview."
      controls={
        <SectionCard title="Palettes">
          <div className="grid grid-cols-2 gap-3">
            {PALETTES.map((p) => (
              <button
                key={p.name}
                onClick={() => setSelected(p)}
                className={`group overflow-hidden rounded-lg border transition ${
                  selected.name === p.name ? 'border-accent' : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="h-14 w-full" style={{ background: p.css }} />
                <div className="bg-surface-2 px-2 py-1.5 text-left text-xs font-medium text-text-dim group-hover:text-text">
                  {p.name}
                </div>
              </button>
            ))}
          </div>
        </SectionCard>
      }
      preview={
        <PreviewBox>
          <div className="h-full w-full" style={{ background: selected.css }} />
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}