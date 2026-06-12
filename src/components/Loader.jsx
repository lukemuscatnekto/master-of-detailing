import { useEffect, useState } from 'react'
import Logo from './Logo'

const SESSION_KEY = 'mod-loaded'

export default function Loader() {
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
    try {
      return !sessionStorage.getItem(SESSION_KEY)
    } catch {
      return false
    }
  })
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!active) return undefined
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const fadeTimer = setTimeout(() => setLeaving(true), 1500)
    const removeTimer = setTimeout(() => {
      setActive(false)
      document.body.style.overflow = prevOverflow
    }, 2000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      document.body.style.overflow = prevOverflow
    }
  }, [active])

  if (!active) return null

  return (
    <div
      className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-ink-900 transition-opacity duration-500 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="loader-mark flex flex-col items-center">
        <Logo variant="footer" />
        <svg
          className="mt-5"
          width="160"
          height="6"
          viewBox="0 0 160 6"
          fill="none"
          aria-hidden="true"
        >
          <line
            className="loader-line"
            x1="2"
            y1="3"
            x2="158"
            y2="3"
            stroke="#F0A000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
