import { useState, useRef, useCallback } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'
import Button from '../components/Button.jsx'
import { Play } from 'lucide-react'

const PRESETS = {
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
  'back-in': [0.36, 0, 0.66, -0.56],
  'back-out': [0.34, 1.56, 0.64, 1],
}

const SIZE = 240
const PAD = 20

export default function CubicBezierGenerator() {
  const [points, setPoints] = useState(PRESETS['ease-in-out'])
  const [animKey, setAnimKey] = useState(0)
  const svgRef = useRef(null)
  const dragging = useRef(null)

  const [x1, y1, x2, y2] = points

  const toSvg = (x, y) => ({
    x: PAD + x * SIZE,
    y: PAD + (1 - y) * SIZE,
  })
  const fromSvg = (px, py) => ({
    x: clamp((px - PAD) / SIZE, 0, 1),
    y: (PAD + SIZE - py) / SIZE, // y can go beyond 0-1
  })

  const p1 = toSvg(x1, y1)
  const p2 = toSvg(x2, y2)

  const handlePointerMove = useCallback((e) => {
    if (!dragging.current || !svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    const { x, y } = fromSvg(px, py)
    const yClamped = clamp(y, -1, 2)

    setPoints((prev) => {
      const next = [...prev]
      if (dragging.current === 'p1') {
        next[0] = round(x)
        next[1] = round(yClamped)
      } else {
        next[2] = round(x)
        next[3] = round(yClamped)
      }
      return next
    })
  }, [])

  const startDrag = (which) => (e) => {
    e.preventDefault()
    dragging.current = which
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDrag)
  }

  const stopDrag = () => {
    dragging.current = null
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', stopDrag)
  }

  const bezierStr = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
  const code = `transition-timing-function: ${bezierStr};\n/* or */\nanimation-timing-function: ${bezierStr};`

  const total = SIZE + PAD * 2

  return (
    <ToolLayout
      title="Cubic Bezier Generator"
      description="Drag the handles to design a custom easing curve."
      controls={
        <>
          <SectionCard title="Presets">
            <ToggleGroup
              options={Object.keys(PRESETS)}
              value="custom"
              onChange={(p) => setPoints(PRESETS[p])}
            />
          </SectionCard>

          <SectionCard title="Curve Editor">
            <svg
              ref={svgRef}
              width="100%"
              viewBox={`0 0 ${total} ${total}`}
              className="rounded-lg bg-surface-2 touch-none select-none"
            >
              {/* grid */}
              <rect x={PAD} y={PAD} width={SIZE} height={SIZE} fill="none" stroke="var(--color-border)" strokeWidth="1" />
              {/* curve */}
              <path
                d={`M ${PAD} ${PAD + SIZE} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${PAD + SIZE} ${PAD}`}
                fill="none"
                stroke="var(--color-accent-2)"
                strokeWidth="2"
              />
              {/* control lines */}
              <line x1={PAD} y1={PAD + SIZE} x2={p1.x} y2={p1.y} stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4" />
              <line x1={PAD + SIZE} y1={PAD} x2={p2.x} y2={p2.y} stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4" />
              {/* handles */}
              <circle cx={p1.x} cy={p1.y} r="7" fill="var(--color-accent)" stroke="white" strokeWidth="2" className="cursor-grab" onPointerDown={startDrag('p1')} />
              <circle cx={p2.x} cy={p2.y} r="7" fill="var(--color-accent)" stroke="white" strokeWidth="2" className="cursor-grab" onPointerDown={startDrag('p2')} />
            </svg>
            <div className="mt-3 text-center font-mono text-sm text-text-dim">{bezierStr}</div>
          </SectionCard>

          <SectionCard title="Preview">
            <Button onClick={() => setAnimKey((k) => k + 1)} icon={Play}>
              Play animation
            </Button>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-40">
          <div className="relative h-2 w-full max-w-sm rounded-full bg-surface-2">
            <div
              key={animKey}
              className="absolute -top-2 h-6 w-6 rounded-full bg-gradient-to-br from-accent to-accent-2"
              style={{
                animation: `bezier-move 1.6s ${bezierStr} forwards`,
              }}
            />
          </div>
          <style>{`
            @keyframes bezier-move {
              from { left: 0%; transform: translateX(0); }
              to { left: 100%; transform: translateX(-100%); }
            }
          `}</style>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}
function round(v) {
  return Math.round(v * 100) / 100
}
