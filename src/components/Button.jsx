export default function Button({ children, onClick, variant = 'default', icon: Icon, className = '' }) {
  const base = 'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition'
  const variants = {
    default: 'border border-border bg-surface-2 text-text-dim hover:border-accent/50 hover:text-text',
    accent: 'bg-accent text-white hover:bg-accent/90',
  }
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {Icon && <Icon size={14} />}
      {children}
    </button>
  )
}