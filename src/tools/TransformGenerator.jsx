import { useState } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Slider from '../components/Slider.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'

export default function TransformGenerator() {
  const [mode, setMode] = useState('2d')

  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const [translateZ, setTranslateZ] = useState(0)
  const [scaleX, setScaleX] = useState(1)
  const [scaleY, setScaleY] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [rotateZ, setRotateZ] = useState(0)
  const [skewX, setSkewX] = useState(0)
  const [skewY, setSkewY] = useState(0)
  const [perspective, setPerspective] = useState(800)

  let transformValue
  if (mode === '2d') {
    transformValue = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scaleX}, ${scaleY}) skew(${skewX}deg, ${skewY}deg)`
  } else {
    transformValue = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scaleX}, ${scaleY})`
  }

  const code =
    mode === '2d'
      ? `transform: ${transformValue};`
      : `perspective: ${perspective}px;\ntransform: ${transformValue};\ntransform-style: preserve-3d;`

  return (
    <ToolLayout
      title="Transform Generator"
      description="Build translate, rotate, scale, skew, and 3D transform combinations."
      controls={
        <>
          <SectionCard title="Mode">
            <ToggleGroup options={['2d', '3d']} value={mode} onChange={setMode} />
          </SectionCard>

          <SectionCard title="Translate">
            <div className="space-y-4">
              <Slider label="Translate X" value={translateX} min={-200} max={200} unit="px" onChange={setTranslateX} />
              <Slider label="Translate Y" value={translateY} min={-200} max={200} unit="px" onChange={setTranslateY} />
              {mode === '3d' && (
                <Slider label="Translate Z" value={translateZ} min={-200} max={200} unit="px" onChange={setTranslateZ} />
              )}
            </div>
          </SectionCard>

          <SectionCard title="Rotate">
            <div className="space-y-4">
              {mode === '2d' ? (
                <Slider label="Rotate" value={rotate} min={-180} max={180} unit="deg" onChange={setRotate} />
              ) : (
                <>
                  <Slider label="Rotate X" value={rotateX} min={-180} max={180} unit="deg" onChange={setRotateX} />
                  <Slider label="Rotate Y" value={rotateY} min={-180} max={180} unit="deg" onChange={setRotateY} />
                  <Slider label="Rotate Z" value={rotateZ} min={-180} max={180} unit="deg" onChange={setRotateZ} />
                  <Slider label="Perspective" value={perspective} min={200} max={2000} step={50} unit="px" onChange={setPerspective} />
                </>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Scale & Skew">
            <div className="space-y-4">
              <Slider label="Scale X" value={scaleX} min={0.1} max={2} step={0.05} onChange={setScaleX} />
              <Slider label="Scale Y" value={scaleY} min={0.1} max={2} step={0.05} onChange={setScaleY} />
              {mode === '2d' && (
                <>
                  <Slider label="Skew X" value={skewX} min={-60} max={60} unit="deg" onChange={setSkewX} />
                  <Slider label="Skew Y" value={skewY} min={-60} max={60} unit="deg" onChange={setSkewY} />
                </>
              )}
            </div>
          </SectionCard>
        </>
      }
      preview={
        <PreviewBox height="h-80" style={mode === '3d' ? { perspective: `${perspective}px` } : undefined}>
          <div
            className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-sm font-semibold text-white"
            style={{ transform: transformValue, transformStyle: mode === '3d' ? 'preserve-3d' : undefined }}
          >
            transform
          </div>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
