export default function ToggleGroup({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm text-text-dim">{label}</span>}
      <div className="flex flex-wrap gap-1.5 rounded-lg border border-border bg-surface-2 p-1">
        {options.map((opt) => {
          const optValue = typeof opt === 'string' ? opt : opt.value
          const optLabel = typeof opt === 'string' ? opt : opt.label
          const active = value === optValue
          return (
            <button
              key={optValue}
              onClick={() => onChange(optValue)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition ${
                active
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-dim hover:bg-surface hover:text-text'
              }`}
            >
              {optLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}
