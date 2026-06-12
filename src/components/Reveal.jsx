import { useEffect, useRef, useState } from 'react'

const HIDDEN = {
  up: 'translate-y-8 opacity-0',
  left: '-translate-x-8 opacity-0',
  right: 'translate-x-8 opacity-0',
  scale: 'scale-[0.98] opacity-0',
}

const SHOWN = {
  up: 'translate-y-0 opacity-100',
  left: 'translate-x-0 opacity-100',
  right: 'translate-x-0 opacity-100',
  scale: 'scale-100 opacity-100',
}

/**
 * On-scroll reveal using IntersectionObserver (threshold 0.15).
 * Variants: up (default), left, right, scale. Respects prefers-reduced-motion
 * by appearing instantly.
 */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, variant = 'up', children }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }

    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? SHOWN[variant] : HIDDEN[variant]} ${className}`}
    >
      {children}
    </Tag>
  )
}
