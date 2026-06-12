import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

const PATTERNS = ['stripes', 'dots', 'checkerboard', 'grid', 'diagonal-lines', 'zigzag']

export default function PatternGenerator() {
  const [pattern, setPattern] = useState('stripes')
  const [bg, setBg] = useState('#0b0d10')
  const [fg, setFg] = useState('#6366f1')
  const [size, setSize] = useState(20)

  let backgroundCss = ''

  switch (pattern) {
    case 'stripes':
      backgroundCss = `repeating-linear-gradient(45deg, ${fg} 0, ${fg} ${size / 2}px, ${bg} ${size / 2}px, ${bg} ${size}px)`
      break
    case 'dots':
      backgroundCss = `radial-gradient(${fg} ${size / 6}px, ${bg} ${size / 6}px)`
      break
    case 'checkerboard':
      backgroundCss = `linear-gradient(45deg, ${fg} 25%, transparent 25%, transparent 75%, ${fg} 75%, ${fg}),\n  linear-gradient(45deg, ${fg} 25%, ${bg} 25%, ${bg} 75%, ${fg} 75%, ${fg})`
      break
    case 'grid':
      backgroundCss = `linear-gradient(${fg} 1px, transparent 1px),\n  linear-gradient(90deg, ${fg} 1px, ${bg} 1px)`
      break
    case 'diagonal-lines':
      backgroundCss = `repeating-linear-gradient(-45deg, ${fg}, ${fg} 1px, ${bg} 1px, ${bg} ${size}px)`
      break
    case 'zigzag':
      backgroundCss = `linear-gradient(135deg, ${fg} 25%, transparent 25%) 0 0,\n  linear-gradient(225deg, ${fg} 25%, transparent 25%) 0 0,\n  linear-gradient(315deg, ${fg} 25%, transparent 25%) 0 0,\n  linear-gradient(45deg, ${fg} 25%, ${bg} 25%) 0 0`
      break
    default:
      backgroundCss = bg
  }

  const sizeCss =
    pattern === 'checkerboard' || pattern === 'zigzag'
      ? `${size}px ${size}px`
      : pattern === 'grid'
        ? `${size}px ${size}px, ${size}px ${size}px`
        : pattern === 'dots'
          ? `${size}px ${size}px`
          : `${size}px ${size}px`

  const code = `background-color: ${bg};\nbackground-image: ${backgroundCss};\nbackground-size: ${sizeCss};`

  return (
    <ToolLayout
      title="Pattern Generator"
      description="Generate repeating CSS background patterns for sections and cards."
      controls={
        <>
          <SectionCard title="Pattern Type">
            <ToggleGroup options={PATTERNS} value={pattern} onChange={setPattern} />
          </SectionCard>
          <SectionCard title="Settings">
            <div className="space-y-4">
              <Slider label="Size" value={size} min={4} max={60} unit="px" onChange={setSize} />
              <ColorInput label="Foreground" value={fg} onChange={setFg} />
              <ColorInput label="Background" value={bg} onChange={setBg} />
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-80">
          <div
            className="h-full w-full"
            style={{
              backgroundColor: bg,
              backgroundImage: backgroundCss,
              backgroundSize: sizeCss,
            }}
          />
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
