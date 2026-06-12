import { copy, cta, services, showProtectionAftercare } from '../data/content'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const FEATURED_EYEBROWS = ['Protection & finish', 'Paint restoration']

function FeaturedServicePanel({ service, eyebrow, delay, showProtectionLink = false }) {
  return (
    <Reveal delay={delay}>
      <article className="service-featured lift-card flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold sm:text-xs">
            {eyebrow}
          </p>
          <Icon name={service.icon} className="h-5 w-5 shrink-0 text-gold/70" aria-hidden="true" />
        </div>
        <h3 className="heading-display mt-4 text-xl leading-tight text-cream sm:text-2xl lg:text-[1.65rem]">
          {service.title}
        </h3>
        <span className="mt-4 block h-px w-12 bg-gradient-to-r from-gold/60 to-transparent" aria-hidden="true" />
        <p className="mt-4 max-w-md flex-1 text-sm leading-relaxed text-cream-muted normal-case tracking-normal">
          {service.description}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={cta.whatsappEnquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-gold w-full sm:w-auto"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            {cta.labels.serviceEnquire}
          </a>
          {showProtectionLink && (
            <a
              href="#protection-aftercare"
              className="arrow-link inline-flex min-h-[44px] items-center justify-center text-xs font-medium text-gold transition-colors hover:text-cream"
            >
              View Protection Options
              <Icon name="arrowRight" className="ml-1 h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  )
}

function SupportingServiceRow({ service, delay }) {
  return (
    <Reveal delay={delay}>
      <article className="service-support-row group">
        <Icon name={service.icon} className="mt-0.5 h-4 w-4 shrink-0 text-gold/75" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream sm:text-base">
            {service.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-cream-muted normal-case tracking-normal">
            {service.description}
          </p>
        </div>
        <a
          href={cta.whatsappEnquiry}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-link mt-1 inline-flex shrink-0 items-center gap-1 self-start text-xs font-medium text-gold transition-colors hover:text-cream sm:mt-0.5"
          aria-label={`${cta.labels.serviceEnquire} — ${service.title}`}
        >
          <span className="sr-only sm:not-sr-only">{cta.labels.serviceEnquire}</span>
          <Icon name="arrowRight" className="h-4 w-4" />
        </a>
      </article>
    </Reveal>
  )
}

function AdvisoryServiceRow({ service, delay }) {
  return (
    <Reveal delay={delay}>
      <article className="service-advisory flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center text-gold">
            <Icon name="whatsapp" className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream sm:text-base">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream-muted normal-case tracking-normal">
              {service.description}
            </p>
          </div>
        </div>
        <a
          href={cta.whatsappEnquiry}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-gold shrink-0 w-full sm:w-auto"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          {cta.labels.serviceEnquire}
        </a>
      </article>
    </Reveal>
  )
}

export default function Services() {
  const featured = services.slice(0, 2)
  const supporting = services.slice(2, 5)
  const advisory = services[5]

  return (
    <section
      id="services"
      className="section-pad relative overflow-hidden border-t border-white/[0.06]"
    >
      <div className="pointer-events-none absolute inset-0 bg-services-silk" aria-hidden="true" />

      <div className="container-px relative">
        <SectionHeading eyebrow="Services" title="Detailing Services" intro={copy.servicesIntro} />

        <div className="mt-8 space-y-8 sm:mt-14 sm:space-y-10 lg:mt-16 lg:space-y-12">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {featured.map((service, index) => (
              <li key={service.title}>
                <FeaturedServicePanel
                  service={service}
                  eyebrow={FEATURED_EYEBROWS[index]}
                  delay={index * 60}
                  showProtectionLink={showProtectionAftercare && index === 0}
                />
              </li>
            ))}
          </ul>

          <div>
            <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cream-muted sm:text-xs">
              Additional services
            </p>
            <ul className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10">
              {supporting.map((service, index) => (
                <li key={service.title} className="min-w-0">
                  <SupportingServiceRow service={service} delay={120 + index * 40} />
                </li>
              ))}
            </ul>
            <div className="mt-6 lg:mt-8">
              <AdvisoryServiceRow service={advisory} delay={280} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
