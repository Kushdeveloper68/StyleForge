import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import ToolLayout from '../components/ToolLayout.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import NumberInput from '../components/NumberInput.jsx'
import Button from '../components/Button.jsx'

let bpId = 0
const newBp = (name, width) => ({ id: ++bpId, name, width })

export default function BreakpointGenerator() {
  const [breakpoints, setBreakpoints] = useState([
    newBp('mobile', 480),
    newBp('tablet', 768),
    newBp('desktop', 1280),
  ])

  const update = (id, patch) =>
    setBreakpoints((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)))

  const addBp = () => setBreakpoints((prev) => [...prev, newBp('new', 1024)])
  const removeBp = (id) => setBreakpoints((prev) => prev.filter((b) => b.id !== id))

  const sorted = [...breakpoints].sort((a, b) => a.width - b.width)

  const code = sorted
    .map(
      (b) => `@media (max-width: ${b.width}px) {\n  /* ${b.name} styles */\n}`
    )
    .join('\n\n')

  return (
    <ToolLayout
      title="Responsive Breakpoint Generator"
      description="Define named breakpoints and get ready-to-use media query blocks."
      controls={
        <SectionCard title="Breakpoints">
          <div className="space-y-3">
            {breakpoints.map((b) => (
              <div key={b.id} className="flex items-end gap-2">
                <div className="flex-1">
                  <span className="mb-2 block text-sm text-text-dim">Name</span>
                  <div className="rounded-lg border border-border bg-surface-2 px-3 py-1.5">
                    <input
                      value={b.name}
                      onChange={(e) => update(b.id, { name: e.target.value })}
                      className="w-full bg-transparent font-mono text-sm text-text outline-none"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <NumberInput label="Max-width" value={b.width} onChange={(v) => update(b.id, { width: v })} unit="px" />
                </div>
                <button
                  onClick={() => removeBp(b.id)}
                  className="mb-1 rounded-lg border border-border bg-surface-2 p-2 text-text-dim transition hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button onClick={addBp} icon={Plus}>Add Breakpoint</Button>
          </div>
        </SectionCard>
      }
      preview={null}
      code={<CodeBlock code={code} />}
    />
  )
}
