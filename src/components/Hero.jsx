import { useEffect, useState } from 'react'
import { copy, cta, images } from '../data/content'
import useParallax from '../hooks/useParallax'
import Icon from './Icon'
import QuoteForm from './QuoteForm'
import Reveal from './Reveal'

export default function Hero() {
  const [showCue, setShowCue] = useState(true)
  const parallaxRef = useParallax(0.18, 60)

  useEffect(() => {
    const onScroll = () => setShowCue(window.scrollY < 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="home"
      className="hero-section relative min-h-[min(88svh,600px)] overflow-hidden pt-[calc(var(--header-height)+env(safe-area-inset-top,0px))] sm:min-h-[640px] lg:min-h-[760px]"
      aria-label={images.hero.alt}
    >
      <div className="absolute inset-0 overflow-hidden bg-ink-900" aria-hidden="true">
        {/* Static image: mobile background + desktop poster/fallback (also shown under reduced motion) */}
        <div ref={parallaxRef} className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform">
          <picture>
            <source srcSet="/photos/hero/hero-main.webp" type="image/webp" />
            <img
              src="/photos/hero/hero-main.png"
              alt=""
              fetchPriority="high"
              decoding="async"
              className="hero-img hero-kenburns h-full w-full object-cover"
            />
          </picture>
        </div>

        {/* Tablet/desktop cinematic video (md+ only); hidden when reduced motion is preferred */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/photos/hero/hero-main.png"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 hidden h-full w-full object-cover [object-position:center_center] md:block motion-reduce:hidden"
        >
          <source src="/videos/master-of-detailing-hero-desktop.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay-lateral pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-overlay-bottom pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-px relative z-10 flex min-h-[calc(min(88svh,600px)-var(--header-height))] items-center py-5 pb-7 sm:min-h-[calc(640px-var(--header-height))] sm:py-8 sm:pb-10 lg:min-h-[calc(760px-var(--header-height))] lg:py-12">
        <div className="flex w-full flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:items-center lg:gap-x-10 xl:gap-x-14">
          <div className="order-1 max-w-xl">
            <Reveal delay={300}>
              <p className="eyebrow flex-wrap">
                <span className="h-px w-5 shrink-0 bg-gold" aria-hidden="true" />
                {copy.heroEyebrow}
              </p>
            </Reveal>

            <Reveal delay={500}>
              <h1 className="heading-display mt-3 text-[1.7rem] leading-[0.95] sm:mt-5 sm:text-5xl md:text-6xl lg:text-[3.5rem]">
                Precision.
                <br />
                Passion.
                <br />
                <span className="text-gold">Perfection.</span>
              </h1>
            </Reveal>

            <Reveal delay={700}>
              <p className="mt-3 hidden max-w-lg text-sm leading-relaxed text-cream-muted sm:mt-5 sm:block sm:text-base lg:text-lg">
                {copy.heroParagraph}
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream-muted sm:hidden">
                {copy.heroParagraphMobile}
              </p>
            </Reveal>

            <Reveal delay={800}>
              <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 border-b border-gold/25 pb-3 sm:mt-5">
                <Icon name="clock" className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <p className="text-base font-medium leading-snug text-cream">{copy.heroAvailability}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={850} className="order-2 w-full lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <QuoteForm />
          </Reveal>

          <Reveal delay={900} className="order-3 max-w-xl lg:col-start-1 lg:row-start-2">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <a
                href={cta.whatsappBook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                <Icon name="whatsapp" filled className="h-4 w-4" />
                {cta.labels.book}
              </a>
              <a href="#services" className="btn-ghost arrow-link w-full sm:w-auto">
                Explore Our Services
                <Icon name="arrowRight" className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        aria-label="Scroll to learn more"
        className={`absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-cream-muted transition-opacity duration-500 sm:flex ${
          showCue ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em]">Scroll</span>
        <svg className="scroll-cue h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className="gold-rule relative z-10" aria-hidden="true" />
    </section>
  )
}
