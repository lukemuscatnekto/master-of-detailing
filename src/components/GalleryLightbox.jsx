import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon'

export default function GalleryLightbox({ items, activeIndex, onClose, onNavigate }) {
  const closeRef = useRef(null)
  const active = items[activeIndex]
  const [imgSrc, setImgSrc] = useState(active?.src)
  const webpSrc = active?.src?.replace(/\.(jpe?g|png)$/i, '.webp')

  const goPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + items.length) % items.length)
  }, [activeIndex, items.length, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((activeIndex + 1) % items.length)
  }, [activeIndex, items.length, onNavigate])

  const touchStartX = useRef(null)

  const onTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const onTouchEnd = (event) => {
    if (touchStartX.current == null) return
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current
    if (Math.abs(delta) > 50) {
      if (delta < 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  useEffect(() => {
    if (active) setImgSrc(active.src)
  }, [active])

  useEffect(() => {
    if (activeIndex == null) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, goNext, goPrev, onClose])

  if (activeIndex == null || !active) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-900/95 p-3 pt-[max(3.5rem,env(safe-area-inset-top))] pb-[max(5rem,calc(4.5rem+env(safe-area-inset-bottom)))] sm:p-6 sm:pt-6 sm:pb-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-lightbox-caption"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-10 inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-gold-border text-cream hover:bg-gold/10 sm:right-6 sm:top-6"
        aria-label="Close gallery"
      >
        <span className="text-2xl leading-none" aria-hidden="true">
          &times;
        </span>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          goPrev()
        }}
        className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-border text-cream hover:bg-gold/10 sm:left-4 sm:flex"
        aria-label="Previous image"
      >
        <Icon name="arrowLeft" className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          goNext()
        }}
        className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-border text-cream hover:bg-gold/10 sm:right-4 sm:flex"
        aria-label="Next image"
      >
        <Icon name="arrowRight" className="h-5 w-5" />
      </button>

      <figure
        className="relative max-h-[85vh] w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {webpSrc ? (
          <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <img
              src={imgSrc}
              alt={active.alt}
              className="max-h-[min(62dvh,520px)] w-full rounded-xl border border-gold-border object-contain sm:max-h-[75vh]"
            />
          </picture>
        ) : (
          <img
            src={imgSrc}
            alt={active.alt}
            className="max-h-[min(62dvh,520px)] w-full rounded-xl border border-gold-border object-contain sm:max-h-[75vh]"
          />
        )}
        <figcaption id="gallery-lightbox-caption" className="mt-4 text-center">
          <p className="text-sm text-cream sm:text-base">{active.alt}</p>
          <p className="mt-1 text-xs uppercase tracking-widest2 text-gold">{active.category}</p>
          <p className="mt-3 text-xs text-cream-muted">
            {activeIndex + 1} / {items.length} &middot; Arrow keys to navigate &middot; Esc to close
          </p>
        </figcaption>
      </figure>

      <div className="absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-0 right-0 flex justify-center gap-3 px-3 sm:hidden">
        <button type="button" onClick={goPrev} className="btn-ghost min-h-[44px] px-5 py-2.5 text-xs" aria-label="Previous">
          Prev
        </button>
        <button type="button" onClick={goNext} className="btn-ghost min-h-[44px] px-5 py-2.5 text-xs" aria-label="Next">
          Next
        </button>
      </div>
    </div>
  )
}
