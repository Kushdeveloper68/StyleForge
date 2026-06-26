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

const STYLES = ['solid', 'gradient', 'outline', 'glass', 'neon']

export default function ButtonGenerator() {
  const [style, setStyle] = useState('gradient')
  const [color1, setColor1] = useState('#6366f1')
  const [color2, setColor2] = useState('#22d3ee')
  const [radius, setRadius] = useState(10)
  const [paddingX, setPaddingX] = useState(24)
  const [paddingY, setPaddingY] = useState(12)
  const [shadow, setShadow] = useState(true)

  let baseCss = ''
  let hoverCss = ''

  switch (style) {
    case 'solid':
      baseCss = `background-color: ${color1};\ncolor: #ffffff;\nborder: none;`
      hoverCss = `background-color: ${color2};`
      break
    case 'gradient':
      baseCss = `background: linear-gradient(135deg, ${color1}, ${color2});\ncolor: #ffffff;\nborder: none;`
      hoverCss = `filter: brightness(1.1);`
      break
    case 'outline':
      baseCss = `background: transparent;\ncolor: ${color1};\nborder: 2px solid ${color1};`
      hoverCss = `background: ${color1};\ncolor: #ffffff;`
      break
    case 'glass':
      baseCss = `background: rgba(255, 255, 255, 0.1);\ncolor: #ffffff;\nborder: 1px solid rgba(255, 255, 255, 0.2);\nbackdrop-filter: blur(10px);`
      hoverCss = `background: rgba(255, 255, 255, 0.2);`
      break
    case 'neon':
      baseCss = `background: transparent;\ncolor: ${color1};\nborder: 2px solid ${color1};\ntext-shadow: 0 0 8px ${color1};\nbox-shadow: 0 0 10px ${color1}66, inset 0 0 10px ${color1}33;`
      hoverCss = `box-shadow: 0 0 20px ${color1}, inset 0 0 15px ${color1}66;`
      break
    default:
      break
  }

  const shadowCss = shadow ? `\nbox-shadow: 0 8px 20px -8px ${color1}99;` : ''

  const code = `.btn {\n  padding: ${paddingY}px ${paddingX}px;\n  border-radius: ${radius}px;\n  font-weight: 600;\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  ${baseCss.split('\n').join('\n  ')}${shadowCss}\n}\n\n.btn:hover {\n  ${hoverCss.split('\n').join('\n  ')}\n  transform: translateY(-2px);\n}`

  const previewStyle = (() => {
    const s = {
      padding: `${paddingY}px ${paddingX}px`,
      borderRadius: `${radius}px`,
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: 'none',
    }
    switch (style) {
      case 'solid':
        return { ...s, backgroundColor: color1, color: '#fff' }
      case 'gradient':
        return { ...s, background: `linear-gradient(135deg, ${color1}, ${color2})`, color: '#fff', boxShadow: shadow ? `0 8px 20px -8px ${color1}99` : 'none' }
      case 'outline':
        return { ...s, background: 'transparent', color: color1, border: `2px solid ${color1}` }
      case 'glass':
        return { ...s, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }
      case 'neon':
        return { ...s, background: 'transparent', color: color1, border: `2px solid ${color1}`, textShadow: `0 0 8px ${color1}`, boxShadow: `0 0 10px ${color1}66, inset 0 0 10px ${color1}33` }
      default:
        return s
    }
  })()

  return (
    <ToolLayout
      title="Button Generator"
      description="Generate solid, gradient, outline, glass, or neon buttons with hover states."
      controls={
        <>
          <SectionCard title="Style">
            <ToggleGroup options={STYLES} value={style} onChange={setStyle} />
            <div className="mt-3">
              <DiceButton onClick={() => {
                const r = randomizers.button()
                setStyle(r.style)
                setColor1(r.color1)
                setColor2(r.color2)
                setRadius(r.radius)
              }} />
            </div>
          </SectionCard>
          <SectionCard title="Colors">
            <div className="space-y-4">
              <ColorInput label={style === 'gradient' ? 'Color 1' : 'Color'} value={color1} onChange={setColor1} />
              {style === 'gradient' && <ColorInput label="Color 2" value={color2} onChange={setColor2} />}
            </div>
          </SectionCard>
          <SectionCard title="Shape">
            <div className="space-y-4">
              <Slider label="Border Radius" value={radius} min={0} max={40} unit="px" onChange={setRadius} />
              <Slider label="Padding X" value={paddingX} min={8} max={48} unit="px" onChange={setPaddingX} />
              <Slider label="Padding Y" value={paddingY} min={4} max={24} unit="px" onChange={setPaddingY} />
              <ToggleGroup
                label="shadow"
                options={[{ value: true, label: 'on' }, { value: false, label: 'off' }]}
                value={shadow}
                onChange={setShadow}
              />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-60" className={style === 'glass' || style === 'neon' ? 'bg-gradient-to-br from-accent/30 via-purple-500/20 to-accent-2/30' : ''}>
          <button style={previewStyle} className="hover:-translate-y-0.5">
            Click me
          </button>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}