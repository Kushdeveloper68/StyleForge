import { useState, useRef, useCallback } from 'react'

export default function BeforeAfterSlider({ before, after, height = 'h-72', label = true }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  const handlePointerDown = (e) => {
    dragging.current = true
    updatePosition(e.clientX)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const handlePointerMove = useCallback((e) => {
    if (!dragging.current) return
    updatePosition(e.clientX)
  }, [updatePosition])

  const handlePointerUp = useCallback(() => {
    dragging.current = false
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }, [handlePointerMove])

  return (
    <div
      ref={containerRef}
      className={`relative ${height} overflow-hidden rounded-xl border border-border select-none touch-none`}
      style={{ cursor: 'col-resize' }}
    >
      {/* AFTER (full width, behind) */}
      <div className="absolute inset-0">{after}</div>

      {/* BEFORE (clipped to left portion) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {before}
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl"
        style={{ left: `${position}%` }}
        onPointerDown={handlePointerDown}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5 8L2 5M2 5L5 2M2 5H14M11 8L14 5M14 5L11 2M14 5H2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Labels */}
      {label && (
        <>
          <span className="absolute bottom-3 left-3 z-10 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            Before
          </span>
          <span className="absolute bottom-3 right-3 z-10 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            After
          </span>
        </>
      )}
    </div>
  )
}