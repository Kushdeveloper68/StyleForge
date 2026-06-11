export default function PreviewBox({ children, checkerboard = false, height = 'h-72', className = '', style }) {
  return (
    <div
      className={`flex ${height} items-center justify-center overflow-hidden rounded-xl border border-border ${
        checkerboard ? 'bg-checkerboard' : 'bg-surface'
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}