import { lazy, Suspense, useMemo, useState } from 'react'
import { copy, galleryCategories, galleryItems } from '../data/content'
import useParallax from '../hooks/useParallax'
import LazyImage from './LazyImage'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const GalleryLightbox = lazy(() => import('./GalleryLightbox'))

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryItems
    return galleryItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const openLightbox = (index) => setLightboxIndex(index)
  const headingRef = useParallax(0.05, 26)

  return (
    <section id="gallery" className="section-pad border-y border-white/[0.06] bg-ink-800/50">
      <div className="container-px">
        <div ref={headingRef} className="will-change-transform">
          <SectionHeading
            eyebrow="Our Work"
            title="Gallery"
            intro={copy.galleryIntro}
            align="center"
          />
        </div>

        <Reveal className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:mt-10 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`min-h-[44px] shrink-0 snap-start rounded-full border px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-wider transition-colors sm:px-4 sm:text-xs ${
                activeCategory === category
                  ? 'border-gold bg-gold text-ink-900'
                  : 'border-gold-border text-cream-muted hover:border-gold hover:text-cream'
              }`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </Reveal>

        <ul
          key={activeCategory}
          className="mt-8 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:mt-12 lg:gap-5 motion-safe:animate-fade-up"
        >
          {filteredItems.map((item, index) => {
            const globalIndex = galleryItems.indexOf(item)
            const isFeatured = item.featured && activeCategory === 'All'
            const isClassicFeature = /detailing-05\./.test(item.src)

            return (
              <li
                key={item.src}
                className={isFeatured ? 'min-[400px]:col-span-2 md:col-span-2 lg:col-span-2' : ''}
              >
                <Reveal delay={index * 40} variant="scale">
                  <button
                    type="button"
                    onClick={() => openLightbox(globalIndex)}
                    className={`gallery-tile group relative w-full cursor-zoom-in overflow-hidden rounded-xl border border-gold-border bg-ink-700 text-left ${
                      isFeatured ? 'aspect-[16/10] md:aspect-[21/9]' : 'aspect-[4/5]'
                    } ${item.angled ? 'md:-rotate-1' : ''}`}
                    aria-label={`View image: ${item.alt}`}
                  >
                    <LazyImage
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full"
                      imgClassName="object-cover"
                    />
                    {isClassicFeature && (
                      <span className="absolute left-3 top-3 z-10 rounded-full border border-gold/40 bg-ink-900/75 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-gold">
                        Featured
                      </span>
                    )}
                    <span className="absolute inset-0 bg-gradient-to-t from-ink-900/75 via-transparent to-transparent transition-opacity duration-300 group-hover:from-ink-900/85" />
                    <span className="gallery-tile-label absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <span className="text-[0.6rem] font-semibold uppercase tracking-widest2 text-gold sm:text-xs">
                        {item.category}
                      </span>
                    </span>
                  </button>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>

      {lightboxIndex != null && (
        <Suspense fallback={null}>
          <GalleryLightbox
            items={galleryItems}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        </Suspense>
      )}
    </section>
  )
}
