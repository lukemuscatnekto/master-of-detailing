import { useEffect, useState } from 'react'
import { testimonials } from '../data/content'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import SectionHeading from './SectionHeading'

const ROTATE_MS = 6000

export default function Testimonials() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduced || paused || testimonials.length < 2) return undefined
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [reduced, paused])

  const active = testimonials[index]

  return (
    <section id="testimonials" className="section-pad">
      <div className="container-px">
        <SectionHeading
          eyebrow="Client Feedback"
          title="Testimonials"
          intro="Genuine recommendations shared on Facebook."
          align="center"
        />

        <div
          className="mx-auto mt-10 max-w-2xl sm:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <blockquote
            key={index}
            aria-live="polite"
            className={`card-surface relative flex min-h-[15rem] flex-col overflow-hidden p-6 sm:min-h-[16rem] sm:p-10 ${
              reduced ? '' : 'motion-safe:animate-fade-up'
            }`}
          >
            <span
              className={`heading-display pointer-events-none absolute -right-1 -top-8 select-none text-[7rem] leading-none text-gold/10 sm:text-[9rem] ${
                reduced ? '' : 'quote-mark-in'
              }`}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="relative flex-1 text-base leading-relaxed text-cream sm:text-lg">{active.quote}</p>
            <footer className="relative mt-6 border-t border-gold-border pt-4">
              <cite className="not-italic">
                <span className="block text-base font-semibold text-cream sm:text-lg">{active.name}</span>
                <span className="mt-1 block text-xs font-normal text-cream-muted">{active.source}</span>
              </cite>
            </footer>
          </blockquote>

          {testimonials.length > 1 && (
            <div className="mt-6 flex justify-center gap-2.5">
              {testimonials.map((item, dotIndex) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`Show testimonial ${dotIndex + 1}: ${item.name}`}
                  aria-current={dotIndex === index ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    dotIndex === index ? 'w-6 bg-gold' : 'w-2 bg-cream-muted/40 hover:bg-cream-muted/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
