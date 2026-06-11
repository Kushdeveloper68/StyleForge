import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import ToolLayout from '../components/ToolLayout.jsx'
import PreviewBox from '../components/PreviewBox.jsx'
import SectionCard from '../components/SectionCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ColorInput from '../components/ColorInput.jsx'
import Button from '../components/Button.jsx'

let varId = 0
const newVar = (name, value) => ({ id: ++varId, name, value })

export default function CssVariablesGenerator() {
  const [vars, setVars] = useState([
    newVar('color-primary', '#6366f1'),
    newVar('color-secondary', '#22d3ee'),
    newVar('color-bg', '#0b0d10'),
    newVar('color-surface', '#14171c'),
    newVar('color-text', '#e6e8eb'),
    newVar('radius-md', '12px'),
  ])

  const update = (id, patch) =>
    setVars((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)))

  const addVar = () => setVars((prev) => [...prev, newVar('new-token', '#ffffff')])
  const removeVar = (id) => setVars((prev) => prev.filter((v) => v.id !== id))

  const code = `:root {\n${vars.map((v) => `  --${v.name}: ${v.value};`).join('\n')}\n}`

  const isColor = (val) => /^#([0-9a-f]{3}){1,2}$/i.test(val)

  return (
    <ToolLayout
      title="CSS Variables Generator"
      description="Build a set of design tokens (colors, spacing, etc.) for :root."
      controls={
        <SectionCard title="Tokens">
          <div className="space-y-3">
            {vars.map((v) => (
              <div key={v.id} className="flex items-end gap-2">
                <div className="flex-1">
                  <span className="mb-2 block text-sm text-text-dim">Name</span>
                  <div className="flex items-center gap-1 rounded-lg border border-border bg-surface-2 px-3 py-1.5">
                    <span className="text-text-dim">--</span>
                    <input
                      value={v.name}
                      onChange={(e) => update(v.id, { name: e.target.value })}
                      className="w-full bg-transparent font-mono text-sm text-text outline-none"
                      spellCheck={false}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  {isColor(v.value) ? (
                    <ColorInput label="Value" value={v.value} onChange={(val) => update(v.id, { value: val })} />
                  ) : (
                    <>
                      <span className="mb-2 block text-sm text-text-dim">Value</span>
                      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5">
                        <input
                          value={v.value}
                          onChange={(e) => update(v.id, { value: e.target.value })}
                          className="w-full bg-transparent font-mono text-sm text-text outline-none"
                          spellCheck={false}
                        />
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={() => removeVar(v.id)}
                  className="mb-1 rounded-lg border border-border bg-surface-2 p-2 text-text-dim transition hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button onClick={addVar} icon={Plus}>Add Token</Button>
          </div>
        </SectionCard>
      }
      preview={
        <PreviewBox height="h-auto" className="flex-wrap gap-3 p-5">
          {vars.map((v) => (
            <div key={v.id} className="flex flex-col items-center gap-2">
              <div
                className="h-14 w-14 rounded-lg border border-border"
                style={{ background: isColor(v.value) ? v.value : 'var(--color-surface-2)' }}
              />
              <span className="font-mono text-xs text-text-dim">--{v.name}</span>
            </div>
          ))}
        </PreviewBox>
      }
      code={<CodeBlock code={code} />}
    />
  )
}