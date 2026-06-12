export default function ColorInput({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm text-text-dim">{label}</span>}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-2 py-1.5">
        <label className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-md border border-border">
          <input
            type="color"
            value={toHex(value)}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -left-1 -top-1 h-10 w-10 cursor-pointer border-0 bg-transparent p-0"
          />
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-mono text-sm text-text outline-none"
          spellCheck={false}
        />
      </div>
    </div>
  )
}

// Ensure the native color input gets a valid hex (it can't render rgba)
function toHex(value) {
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    return '#' + value.slice(1).split('').map((c) => c + c).join('')
  }
  const m = value.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i)
  if (m) {
    const [, r, g, b] = m
    return (
      '#' +
      [r, g, b]
        .map((n) => Number(n).toString(16).padStart(2, '0'))
        .join('')
    )
  }
  return '#000000'
}
