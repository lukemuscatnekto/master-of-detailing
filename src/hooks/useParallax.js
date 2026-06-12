import { useEffect, useRef } from 'react'

/**
 * Subtle scroll parallax. Translates the element on the Y axis relative to its
 * position in the viewport. Desktop + fine-pointer only, disabled for
 * prefers-reduced-motion. rAF-throttled. `max` clamps the offset (px) so the
 * element never reveals gaps.
 */
export default function useParallax(speed = 0.2, max = 60) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia?.('(pointer: fine)').matches
    if (reduced || !finePointer) return undefined

    let frame = null

    const update = () => {
      frame = null
      const rect = el.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elementCenter = rect.top + rect.height / 2
      const delta = (viewportCenter - elementCenter) * speed
      const clamped = Math.max(-max, Math.min(max, delta))
      el.style.transform = `translate3d(0, ${clamped.toFixed(2)}px, 0)`
    }

    const onScroll = () => {
      if (frame == null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (frame != null) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      el.style.transform = ''
    }
  }, [speed, max])

  return ref
}
