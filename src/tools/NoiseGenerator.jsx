import { useState, useEffect, useRef } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Slider from '../components/Slider.jsx'
import ColorInput from '../components/ColorInput.jsx'

export default function NoiseGenerator() {
  const [opacity, setOpacity] = useState(15)
  const [density, setDensity] = useState(100)
  const [bg, setBg] = useState('#0b0d10')
  const [dataUrl, setDataUrl] = useState('')
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = 200
    canvas.height = 200
    const ctx = canvas.getContext('2d')
    const imageData = ctx.createImageData(200, 200)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255
      const show = Math.random() * 100 < density
      imageData.data[i] = v
      imageData.data[i + 1] = v
      imageData.data[i + 2] = v
      imageData.data[i + 3] = show ? 255 : 0
    }
    ctx.putImageData(imageData, 0, 0)
    setDataUrl(canvas.toDataURL())
  }, [density])

  const code = `background-color: ${bg};\nbackground-image: url("${dataUrl.slice(0, 40)}...");\n/* full data URL included below */\nopacity-of-noise-layer: ${opacity}%;\n\n/* Recommended usage as an overlay */\n.noisy::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background-image: url("<paste-generated-data-url-here>");\n  opacity: ${(opacity / 100).toFixed(2)};\n  mix-blend-mode: overlay;\n  pointer-events: none;\n}`

  return (
    <ToolLayout
      title="Noise / Grain Generator"
      description="Generate a tileable grain texture for premium-feeling backgrounds."
      controls={
        <SectionCard title="Settings">
          <div className="space-y-4">
            <Slider label="Opacity" value={opacity} min={0} max={100} unit="%" onChange={setOpacity} />
            <Slider label="Density" value={density} min={5} max={100} unit="%" onChange={setDensity} />
            <ColorInput label="Base Background" value={bg} onChange={setBg} />
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </SectionCard>
      }
      preview={
        <PreviewBox height="h-80">
          <div
            className="relative h-full w-full"
            style={{ background: bg }}
          >
            {dataUrl && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${dataUrl})`,
                  backgroundSize: '200px 200px',
                  opacity: opacity / 100,
                  mixBlendMode: 'overlay',
                }}
              />
            )}
            <div className="relative z-10 flex h-full items-center justify-center text-sm font-medium text-white">
              Grain overlay preview
            </div>
          </div>
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}
