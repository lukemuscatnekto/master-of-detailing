import { useRef, useState } from 'react'

export default function BeforeAfterSlider({ before, after, beforeAlt, afterAlt }) {
  const [position, setPosition] = useState(50)
  const [interacted, setInteracted] = useState(false)
  const lastVibrate = useRef(0)

  const handleChange = (event) => {
    const value = Number(event.target.value)
    setPosition(value)
    if (!interacted) setInteracted(true)
    const now = Date.now()
    if (typeof navigator !== 'undefined' && navigator.vibrate && now - lastVibrate.current > 120) {
      navigator.vibrate(3)
      lastVibrate.current = now
    }
  }

  return (
    <div className="group relative aspect-[4/3] w-full select-none overflow-hidden rounded-xl">
      <img
        src={after}
        alt={afterAlt}
        loading="lazy"
        decoding="async"
        draggable="false"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={before}
        alt={beforeAlt}
        loading="lazy"
        decoding="async"
        draggable="false"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      <span
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-gold/80"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold bg-ink-900/90 text-gold shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" />
          </svg>
        </span>
      </span>

      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-ink-900/70 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-cream-muted/80">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-ink-900/70 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold/80">
        After
      </span>

      <span
        className={`pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink-900/70 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-gray-400 transition-opacity duration-500 ${
          interacted ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        Drag to compare
      </span>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={handleChange}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 z-20 m-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 [&::-webkit-slider-thumb]:h-11 [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:appearance-none"
      />
    </div>
  )
}
