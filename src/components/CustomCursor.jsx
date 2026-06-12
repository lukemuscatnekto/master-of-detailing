import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const CLICKABLE = 'a, button, [role="button"], input, label, summary, .cursor-pointer'

export default function CustomCursor() {
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const ringRef = useRef(null)
  const [mode, setMode] = useState('default') // 'default' | 'clickable' | 'view'

  useEffect(() => {
    if (reduced) {
      setEnabled(false)
      return undefined
    }
    const finePointer = window.matchMedia?.('(pointer: fine)').matches
    if (!finePointer) {
      setEnabled(false)
      return undefined
    }
    setEnabled(true)
    return undefined
  }, [reduced])

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor')
      return undefined
    }

    document.body.classList.add('has-custom-cursor')

    const ring = ringRef.current
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...target }
    let frame

    const lerp = (a, b, n) => a + (b - a) * n

    const render = () => {
      pos.x = lerp(pos.x, target.x, 0.15)
      pos.y = lerp(pos.y, target.y, 0.15)
      if (ring) ring.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)

    const onMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      const el = event.target instanceof Element ? event.target : null
      if (el?.closest('img, [data-cursor="view"]')) setMode('view')
      else if (el?.closest(CLICKABLE)) setMode('clickable')
      else setMode('default')
    }

    const onLeave = () => {
      if (ring) ring.style.opacity = '0'
    }
    const onEnter = () => {
      if (ring) ring.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [enabled])

  if (!enabled) return null

  const isExpanded = mode === 'clickable' || mode === 'view'

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="cursor-ring transition-[width,height,background-color,border-color] duration-200 ease-out"
      style={{
        width: isExpanded ? 40 : 9,
        height: isExpanded ? 40 : 9,
        backgroundColor: isExpanded ? 'transparent' : '#F0A000',
        border: isExpanded ? '1px solid rgba(240,160,0,0.9)' : '1px solid transparent',
      }}
    >
      {mode === 'view' && (
        <span className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-gold">
          View
        </span>
      )}
    </div>
  )
}
