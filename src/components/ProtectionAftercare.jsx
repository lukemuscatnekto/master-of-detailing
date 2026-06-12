import { useEffect, useState } from 'react'
import { cta, protectionAftercare, showProtectionAftercare } from '../data/content'
import Icon from './Icon'
import MobileDisclosure from './MobileDisclosure'
import Reveal from './Reveal'

async function imageAvailable(src) {
  try {
    const res = await fetch(src, { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

function FeaturedTier({ tier, delay }) {
  const isRecommended = tier.recommended

  return (
    <Reveal delay={delay}>
      <article
        className={`coating-tier lift-card ${isRecommended ? 'coating-tier-recommended lg:-mt-1 lg:mb-1' : ''}`}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold sm:text-xs">
            {tier.tier}
          </p>
          {isRecommended && (
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold/90">
              Recommended
            </span>
          )}
        </div>
        <p className="mt-2 font-display text-xs uppercase tracking-wide text-cream sm:text-sm">
          {tier.duration}
        </p>
        {tier.mileage ? (
          <p className="mt-1 text-[0.65rem] uppercase tracking-[0.1em] text-cream-muted sm:text-xs">
            {tier.mileage}
          </p>
        ) : null}

        <div className="coating-product-panel mt-4">
          <img
            src={tier.image}
            alt={tier.imageAlt}
            loading="lazy"
            decoding="async"
            className="coating-product-image mx-auto max-h-32 w-full max-w-[200px] object-contain sm:max-h-40 sm:max-w-[220px]"
          />
        </div>

        <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cream-muted">
          {tier.brand}
        </p>
        <h3 className="heading-display mt-1 text-lg leading-tight text-cream sm:text-xl">
          {tier.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-muted normal-case tracking-normal">
          {tier.description}
        </p>
        <a
          href={cta.whatsappEnquiry}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-link mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-xs font-medium text-gold transition-colors hover:text-cream"
        >
          {tier.ctaLabel}
          <Icon name="arrowRight" className="h-3.5 w-3.5" />
        </a>
      </article>
    </Reveal>
  )
}

function AftercarePanel({ panel, delay, whatsappUrl }) {
  return (
    <Reveal delay={delay}>
      <article className="aftercare-panel lift-card group flex h-full flex-col">
        <div className="relative flex min-h-[140px] items-center justify-center overflow-hidden bg-ink-900 px-3 py-4 sm:aspect-[4/5] sm:min-h-0 sm:max-h-none sm:px-0 sm:py-0">
          <img
            src={panel.image}
            alt={panel.imageAlt}
            loading="lazy"
            decoding="async"
            className="max-h-28 w-full max-w-[180px] object-contain sm:absolute sm:inset-0 sm:max-h-none sm:max-w-none sm:object-cover sm:object-[center_35%]"
          />
          <div className="aftercare-panel-overlay absolute inset-0 hidden sm:block" aria-hidden="true" />
          <div className="relative p-4 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-transparent">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold sm:text-xs">
              {panel.label}
            </p>
            <h3 className="heading-display mt-2 text-base leading-tight text-cream sm:text-lg">
              {panel.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream-muted/95 normal-case tracking-normal">
              {panel.description}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-xs font-medium text-gold transition-colors hover:text-cream"
            >
              View Product Range
              <Icon name="arrowRight" className="ml-1 h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function ProtectionAftercare() {
  const [visibleTiers, setVisibleTiers] = useState(null)
  const [visiblePanels, setVisiblePanels] = useState(null)

  useEffect(() => {
    if (!showProtectionAftercare) {
      setVisibleTiers([])
      setVisiblePanels([])
      return undefined
    }

    let cancelled = false

    ;(async () => {
      const tierChecks = await Promise.all(
        protectionAftercare.featuredTiers.map(async (tier) => ({
          tier,
          ok: tier.image ? await imageAvailable(tier.image) : false,
        })),
      )
      const panelChecks = await Promise.all(
        protectionAftercare.autoGraph.panels.map(async (panel) => ({
          panel,
          ok: panel.image ? await imageAvailable(panel.image) : false,
        })),
      )

      if (cancelled) return

      setVisibleTiers(tierChecks.filter(({ ok }) => ok).map(({ tier }) => tier))
      setVisiblePanels(panelChecks.filter(({ ok }) => ok).map(({ panel }) => panel))
    })()

    return () => {
      cancelled = true
    }
  }, [])

  if (!showProtectionAftercare) return null
  if (visibleTiers === null) return null
  if (visibleTiers.length === 0) return null

  const { autoGraph, advisory } = protectionAftercare

  return (
    <section
      id="protection-aftercare"
      aria-labelledby="protection-aftercare-heading"
      className="section-pad relative overflow-hidden border-t border-white/[0.06]"
    >
      <div className="pointer-events-none absolute inset-0 bg-protection-aftercare-silk" aria-hidden="true" />

      <div className="container-px relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">
            <span className="h-px w-5 bg-gold" aria-hidden="true" />
            {protectionAftercare.eyebrow}
          </span>
          <h2
            id="protection-aftercare-heading"
            className="heading-display mt-4 text-[1.8rem] leading-[0.98] sm:text-[2.5rem] lg:text-[3.25rem]"
          >
            {protectionAftercare.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-cream-muted sm:text-base">
            {protectionAftercare.intro}
          </p>
          <span
            className="mt-6 block h-px w-20 bg-gradient-to-r from-gold/50 to-transparent"
            aria-hidden="true"
          />
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3 md:gap-5 lg:mt-14 lg:items-stretch">
          {visibleTiers.map((tier, index) => (
            <li key={tier.id} className="min-w-0">
              <FeaturedTier tier={tier} delay={index * 60} />
            </li>
          ))}
        </ul>

        <div className="mt-10 lg:mt-16">
          <MobileDisclosure title="Other professional coating options">
            <ul className="min-w-0 lg:mt-5">
              {protectionAftercare.professionalAlternatives.map((item, index) => (
                <li key={item.id}>
                  <Reveal delay={40 + index * 40}>
                    <article className="coating-alt-row group flex-col gap-3 sm:flex-row sm:items-start">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-cream sm:text-base">
                            {item.title}
                          </h4>
                          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-gold/90">
                            {item.duration}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-cream-muted normal-case tracking-normal">
                          {item.description}
                        </p>
                      </div>
                      <a
                        href={cta.whatsappEnquiry}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="arrow-link inline-flex min-h-[44px] shrink-0 items-center gap-1 self-start text-xs font-medium text-gold transition-colors hover:text-cream"
                        aria-label={`${cta.labels.serviceEnquire} — ${item.title}`}
                      >
                        <span className="sm:not-sr-only">{cta.labels.serviceEnquire}</span>
                        <Icon name="arrowRight" className="h-4 w-4" />
                      </a>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </MobileDisclosure>
        </div>

        <div className="mt-6 lg:mt-14">
          <MobileDisclosure title="Additional surface protection">
            <ul className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-6 lg:mt-5">
              {protectionAftercare.surfaceAddOns.map((item, index) => (
                <li key={item.id} className="min-w-0">
                  <Reveal delay={60 + index * 40}>
                    <article className="coating-addon md:border-t-0 md:border-l-0 md:pt-0 md:pl-0">
                      <Icon name={item.icon} className="h-4 w-4 text-gold/80" aria-hidden="true" />
                      <h4 className="mt-3 font-display text-sm font-semibold uppercase tracking-wide text-cream">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-cream-muted normal-case tracking-normal">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </MobileDisclosure>
        </div>

        {visiblePanels && visiblePanels.length > 0 && (
          <div className="mt-14 border-t border-white/[0.06] pt-10 lg:mt-16 lg:pt-12">
            <Reveal className="max-w-2xl">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream sm:text-base">
                {autoGraph.heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-muted sm:text-base">
                {autoGraph.intro}
              </p>
            </Reveal>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-5">
              {visiblePanels.map((panel, index) => (
                <li key={panel.id} className="min-w-0">
                  <AftercarePanel
                    panel={panel}
                    delay={80 + index * 50}
                    whatsappUrl={autoGraph.whatsappUrl}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <Reveal delay={120} className="mt-12 border border-gold/15 bg-gold/[0.03] px-5 py-6 text-center sm:mt-14 sm:px-8 sm:py-8">
          <h3 className="heading-display text-lg text-cream sm:text-xl">{advisory.title}</h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cream-muted sm:text-base">
            {advisory.description}
          </p>
          <a
            href={cta.whatsappEnquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 w-full sm:mx-auto sm:w-auto"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            {advisory.ctaLabel}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
