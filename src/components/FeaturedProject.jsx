import { Fragment, lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { cta, featuredProject, siteFlags } from '../data/content'
import { isAssetPresent, verifyAsset } from '../utils/verifyAsset'
import AssetLoadNotice from './AssetLoadNotice'
import Icon from './Icon'
import Reveal from './Reveal'

const GalleryLightbox = lazy(() => import('./GalleryLightbox'))

function ProjectImage({ image, variant = 'supporting', onOpen }) {
  const isHero = variant === 'hero'
  const fitClass = image.objectFit === 'contain' ? 'object-contain' : 'object-cover'

  if (image.missing) {
    return (
      <span
        className={`featured-project-placeholder flex items-center justify-center ${
          isHero ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/3]'
        }`}
        aria-hidden="true"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(image.lightboxIndex)}
      className={`featured-project-media group relative w-full cursor-zoom-in text-left ${
        isHero ? 'featured-project-hero' : 'featured-project-thumb'
      }`}
      aria-label={`View larger: ${image.alt}`}
    >
      <picture className="block h-full w-full">
        {image.webp && <source srcSet={image.webp} type="image/webp" />}
        <img
          src={image.src}
          alt={image.alt}
          loading={isHero ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={isHero ? 'high' : 'auto'}
          className={`h-full w-full ${fitClass} transition-transform duration-500 motion-safe:group-hover:scale-[1.03]`}
          style={{ objectPosition: image.objectPosition ?? 'center center' }}
        />
      </picture>
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink-900/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        aria-hidden="true"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-ink-900/75 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold">
          <Icon name="sparkle" className="h-3 w-3" />
          View
        </span>
      </span>
    </button>
  )
}

export default function FeaturedProject() {
  const [ready, setReady] = useState(false)
  const [resolvedImages, setResolvedImages] = useState([])
  const [imagesUnavailable, setImagesUnavailable] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    if (!siteFlags.showFeaturedProject) {
      setResolvedImages([])
      setImagesUnavailable(false)
      setReady(true)
      return undefined
    }

    let cancelled = false

    ;(async () => {
      const checks = await Promise.all(
        featuredProject.images.map(async (image) => {
          const webpStatus = image.webp ? await verifyAsset(image.webp) : 'missing'
          const srcStatus = await verifyAsset(image.src)
          const present = isAssetPresent(webpStatus) || isAssetPresent(srcStatus)
          return { image, present }
        }),
      )

      let fallbackHeroPresent = false
      if (featuredProject.fallbackHeroSrc) {
        const fallbackStatus = await verifyAsset(featuredProject.fallbackHeroSrc)
        fallbackHeroPresent = isAssetPresent(fallbackStatus)
      }

      if (cancelled) return

      const mapped = checks.map(({ image, present }) => {
        const isHero = image.role === 'hero'
        let missing = !present

        if (isHero && !present && fallbackHeroPresent) {
          return {
            ...image,
            webp: undefined,
            src: featuredProject.fallbackHeroSrc,
            missing: false,
          }
        }

        return { ...image, missing }
      })

      setResolvedImages(mapped)
      setImagesUnavailable(mapped.every((image) => image.missing))
      setReady(true)
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const lightboxItems = useMemo(() => {
    return resolvedImages
      .filter((img) => !img.missing)
      .map((img) => ({
        src: img.src,
        alt: img.alt,
        category: featuredProject.eyebrow,
      }))
  }, [resolvedImages])

  const imagesWithIndex = useMemo(() => {
    let index = 0
    return resolvedImages.map((img) => {
      if (img.missing) return { ...img, lightboxIndex: null }
      const lightboxIndex = index
      index += 1
      return { ...img, lightboxIndex }
    })
  }, [resolvedImages])

  const hero = imagesWithIndex.find((img) => img.role === 'hero')
  const supporting = imagesWithIndex.filter((img) => img.role === 'supporting')

  if (!siteFlags.showFeaturedProject || !ready) return null

  const openLightbox = (index) => {
    if (index == null) return
    setLightboxIndex(index)
  }

  return (
    <section
      id="featured-project"
      aria-labelledby="featured-project-heading"
      className="section-pad relative overflow-hidden border-t border-white/[0.06]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-featured-project-silk"
        aria-hidden="true"
      />

      <div className="container-px relative">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-14 xl:gap-x-16">
          <div className="min-w-0 space-y-3 sm:space-y-4 lg:sticky lg:top-28">
            {imagesUnavailable && (
              <AssetLoadNotice>
                Featured project photos could not be loaded right now. The story below is still
                available — refresh the page or message Matthias on WhatsApp.
              </AssetLoadNotice>
            )}
            <Reveal>
              {hero && (
                <ProjectImage
                  image={hero}
                  variant="hero"
                  onOpen={openLightbox}
                />
              )}
            </Reveal>

            {supporting.length > 0 && (
              <Reveal delay={60} className="hidden min-w-0 lg:block">
                <ul className="grid grid-cols-3 gap-2 sm:gap-3">
                  {supporting.map((image) => (
                    <li key={image.id} className="min-w-0">
                      <ProjectImage image={image} onOpen={openLightbox} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <div className="mt-8 min-w-0 lg:mt-0">
            <Reveal delay={40}>
              <span className="eyebrow">
                <span className="h-px w-5 bg-gold" aria-hidden="true" />
                {featuredProject.eyebrow}
              </span>
              <h2
                id="featured-project-heading"
                className="heading-display mt-4 text-[1.8rem] leading-[0.98] sm:text-[2.5rem] lg:text-[2.6rem]"
              >
                {featuredProject.title}
              </h2>
              <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-gold/90 sm:text-base">
                {featuredProject.subtitle}
              </p>
              <span
                className="mt-6 block h-px w-16 bg-gradient-to-r from-gold/45 to-transparent"
                aria-hidden="true"
              />
            </Reveal>

            <Reveal delay={80} className="mt-6 sm:mt-8">
              {featuredProject.paragraphs.map((paragraph, idx) => (
                <Fragment key={paragraph.slice(0, 48)}>
                  <p
                    className={`max-w-[60ch] text-sm leading-relaxed text-cream-muted sm:text-[0.95rem] ${
                      idx > 0 ? 'mt-4' : ''
                    }`}
                  >
                    {paragraph}
                  </p>
                  {idx === 1 && featuredProject.pullQuote && (
                    <blockquote className="my-8 max-w-[60ch] border-l-2 border-gold pl-6 text-xl font-medium italic leading-snug text-gold sm:text-2xl">
                      {featuredProject.pullQuote}
                    </blockquote>
                  )}
                </Fragment>
              ))}
            </Reveal>

            <Reveal delay={120} className="mt-8 border-t border-white/[0.06] pt-6">
              <ul className="flex flex-wrap gap-2">
                {featuredProject.detailLabels.map((label) => (
                  <li
                    key={label}
                    className="rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-gold sm:text-[0.68rem]"
                    style={{ backgroundColor: 'rgba(212, 160, 23, 0.1)' }}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>

            {supporting.length > 0 && (
              <Reveal delay={140} className="mt-8 min-w-0 lg:hidden">
                <ul className="grid grid-cols-3 gap-2 min-[400px]:gap-3">
                  {supporting.map((image) => (
                    <li key={image.id} className="min-w-0">
                      <ProjectImage image={image} onOpen={openLightbox} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal delay={160} className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <a
                href={cta.whatsappBook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                <Icon name="whatsapp" filled className="h-4 w-4" />
                {featuredProject.cta.primaryLabel}
              </a>
              <a
                href={featuredProject.cta.secondaryHref}
                className="btn-ghost arrow-link w-full sm:w-auto"
              >
                {featuredProject.cta.secondaryLabel}
                <Icon name="arrowRight" className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      {lightboxIndex != null && (
        <Suspense fallback={null}>
          <GalleryLightbox
            items={lightboxItems}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        </Suspense>
      )}
    </section>
  )
}
