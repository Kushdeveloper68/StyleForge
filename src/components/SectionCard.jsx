export default function SectionCard({ title, children, className = '' }) {
  return (
    <div className={`rounded-xl border border-border bg-surface p-5 ${className}`}>
      {title && (
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-dim">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
