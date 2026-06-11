import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'
import Button from '../components/Button.jsx'
import { RotateCw } from 'lucide-react'

const PRESETS = {
  bounce: {
    keyframes: `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-30px); }\n}`,
    name: 'bounce',
  },
  pulse: {
    keyframes: `@keyframes pulse {\n  0%, 100% { transform: scale(1); opacity: 1; }\n  50% { transform: scale(1.1); opacity: 0.7; }\n}`,
    name: 'pulse',
  },
  spin: {
    keyframes: `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`,
    name: 'spin',
  },
  shake: {
    keyframes: `@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  25% { transform: translateX(-10px); }\n  75% { transform: translateX(10px); }\n}`,
    name: 'shake',
  },
  fade: {
    keyframes: `@keyframes fade {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}`,
    name: 'fade',
  },
  slideIn: {
    keyframes: `@keyframes slideIn {\n  from { transform: translateX(-100%); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}`,
    name: 'slideIn',
  },
}

const TIMING = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']
const DIRECTION = ['normal', 'reverse', 'alternate', 'alternate-reverse']

export default function AnimationGenerator() {
  const [preset, setPreset] = useState('bounce')
  const [duration, setDuration] = useState(1)
  const [timing, setTiming] = useState('ease-in-out')
  const [delay, setDelay] = useState(0)
  const [iteration, setIteration] = useState('infinite')
  const [direction, setDirection] = useState('normal')
  const [replayKey, setReplayKey] = useState(0)

  const { keyframes, name } = PRESETS[preset]

  const animationCss = `animation: ${name} ${duration}s ${timing} ${delay}s ${iteration} ${direction};`
  const code = `${keyframes}\n\n.element {\n  ${animationCss}\n}`

  return (
    <ToolLayout
      title="Animation Generator"
      description="Pick a keyframe preset, tune timing, and copy ready-to-use CSS."
      controls={
        <>
          <SectionCard title="Preset">
            <ToggleGroup
              options={Object.keys(PRESETS)}
              value={preset}
              onChange={setPreset}
            />
          </SectionCard>

          <SectionCard title="Timing">
            <div className="space-y-4">
              <Slider label="Duration" value={duration} min={0.1} max={5} step={0.1} unit="s" onChange={setDuration} />
              <Slider label="Delay" value={delay} min={0} max={5} step={0.1} unit="s" onChange={setDelay} />
              <ToggleGroup label="timing-function" options={TIMING} value={timing} onChange={setTiming} />
              <ToggleGroup label="direction" options={DIRECTION} value={direction} onChange={setDirection} />
              <ToggleGroup
                label="iteration-count"
                options={[
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: 'infinite', label: 'infinite' },
                ]}
                value={iteration}
                onChange={setIteration}
              />
            </div>
          </SectionCard>

          <SectionCard title="Replay">
            <Button onClick={() => setReplayKey((k) => k + 1)} icon={RotateCw}>
              Replay animation
            </Button>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-80">
          <style>{keyframes}</style>
          <div
            key={replayKey}
            className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-accent-2"
            style={{
              animation: `${name} ${duration}s ${timing} ${delay}s ${iteration} ${direction}`,
            }}
          />
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}