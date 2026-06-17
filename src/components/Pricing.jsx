import {
  getWhatsAppPackageUrl,
  getWhatsAppSpecialistUrl,
  pricingCopy,
  pricingPackages,
  specialistPricingServices,
} from '../data/content'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function IncludedList({ items, footnote }) {
  return (
    <div className="mt-4">
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-cream-muted">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {footnote && (
        <p className="mt-3 border-l border-gold/25 pl-3 text-xs leading-relaxed text-cream-muted/80">
          {footnote}
        </p>
      )}
    </div>
  )
}

function PackageCard({ pkg, delay }) {
  const isFeatured = pkg.featured

  return (
    <Reveal delay={delay}>
      <article
        className={`flex h-full flex-col rounded-2xl border bg-ink-800/80 p-6 sm:p-7 ${
          isFeatured
            ? 'border-gold/40 shadow-[0_0_36px_rgba(240,160,0,0.14)] ring-1 ring-gold/20'
            : 'border-white/[0.08]'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] sm:text-[0.68rem] ${
              isFeatured ? 'bg-gold text-ink-900' : 'border border-gold-border text-gold'
            }`}
          >
            {pkg.badge}
          </span>
        </div>

        <h3 className="heading-display mt-5 text-xl leading-tight text-cream sm:text-2xl">{pkg.name}</h3>
        <span className="mt-4 block h-px w-12 bg-gradient-to-r from-gold/60 to-transparent" aria-hidden="true" />

        <p className="mt-4 font-display text-2xl font-semibold tracking-tight text-gold sm:text-[1.75rem]">
          {pkg.price}
        </p>
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-cream-muted">{pkg.duration}</p>

        <p className="mt-4 text-sm leading-relaxed text-cream-muted">{pkg.description}</p>

        {pkg.introLine && (
          <p className="mt-5 text-sm font-medium text-cream">{pkg.introLine}</p>
        )}

        <div className="flex-1">
          <IncludedList items={pkg.included} footnote={pkg.footnote} />
        </div>

        <a
          href={getWhatsAppPackageUrl(pkg)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 w-full ${isFeatured ? 'btn-primary' : 'btn-ghost-gold'}`}
        >
          <Icon name="whatsapp" filled={isFeatured} className="h-4 w-4" />
          {pkg.ctaLabel}
        </a>
      </article>
    </Reveal>
  )
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="section-pad relative overflow-hidden border-t border-white/[0.06]"
    >
      <div className="pointer-events-none absolute inset-0 bg-services-silk" aria-hidden="true" />

      <div className="container-px relative">
        <SectionHeading
          eyebrow={pricingCopy.eyebrow}
          title={pricingCopy.title}
          intro={pricingCopy.intro}
          align="center"
          headingId="pricing-heading"
        />

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {pricingPackages.map((pkg, index) => (
            <li key={pkg.id} className="min-w-0">
              <PackageCard pkg={pkg} delay={index * 60} />
            </li>
          ))}
        </ul>

        <Reveal delay={180} className="mx-auto mt-12 max-w-3xl sm:mt-16">
          <div className="rounded-2xl border border-white/[0.08] bg-ink-800/60 px-5 py-6 sm:px-7 sm:py-8">
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-cream sm:text-lg">
              {pricingCopy.specialistTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream-muted">{pricingCopy.specialistIntro}</p>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              {specialistPricingServices.map((service) => (
                <li key={service}>
                  <a
                    href={getWhatsAppSpecialistUrl(service)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gold-border bg-ink-900/70 px-3.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-cream transition-colors hover:border-gold hover:bg-gold/5 hover:text-gold sm:px-4 sm:text-xs"
                  >
                    <span className="normal-case tracking-normal text-cream-muted">{service}</span>
                    <span className="text-gold">— POR</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-cream-muted/80 sm:text-sm">
            {pricingCopy.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  )
}