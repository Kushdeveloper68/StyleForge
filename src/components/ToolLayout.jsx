export default function ToolLayout({ title, description, controls, preview, code }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-sm text-text-dim">{description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">{controls}</div>

        <div className="space-y-4">
          {preview}
          {code}
        </div>
      </div>
    </div>
  )
}
