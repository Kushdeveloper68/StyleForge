import { Dice5 } from 'lucide-react'

export default function DiceButton({ onClick, label = 'Surprise me', className = '' }) {
  return (
    <button
      onClick={onClick}
      title="Randomize values"
      className={`flex items-center gap-1.5 rounded-lg border border-dashed border-accent/40 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/10 hover:border-accent/70 ${className}`}
    >
      <Dice5 size={14} />
      {label}
    </button>
  )
}