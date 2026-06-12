export default function NumberInput({ label, value, onChange, min, max, step = 1, unit = '' }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm text-text-dim">{label}</span>}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full bg-transparent font-mono text-sm text-text outline-none"
        />
        {unit && <span className="text-xs text-text-dim">{unit}</span>}
      </div>
    </div>
  )
}
