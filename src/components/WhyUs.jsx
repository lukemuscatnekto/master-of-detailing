import { copy, whyUs } from '../data/content'
import Icon from './Icon'
import Reveal from './Reveal'

export default function WhyUs() {
  const headingLines = copy.whyUs.headingLines ?? [copy.whyUs.heading]

  return (
    <section
      id="why-us"
      className="section-pad relative overflow-hidden border-t border-white/[0.06]"
    >
      <div className="pointer-events-none absolute inset-0 bg-why-us-silk" aria-hidden="true" />

      <div className="container-px relative">
        <div className="lg:grid lg:grid-cols-[minmax(0,42%)_1fr] lg:items-start lg:gap-x-14 xl:gap-x-16">
          <Reveal className="max-w-lg lg:sticky lg:top-28">
            <span className="eyebrow">
              <span className="h-px w-5 bg-gold" aria-hidden="true" />
              {copy.whyUs.eyebrow}
            </span>
            <h2 className="heading-display mt-4 text-[1.8rem] leading-[0.98] sm:text-[2.5rem] lg:text-[2.9rem]">
              {headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-cream-muted sm:text-base">
              {copy.whyUs.intro}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-cream-muted/90 sm:text-sm">
              {copy.whyUs.supportingNote}
            </p>
            <span
              className="mt-6 block h-px w-16 bg-gradient-to-r from-gold/50 to-transparent lg:hidden"
              aria-hidden="true"
            />
          </Reveal>

          <ul className="mt-10 min-w-0 lg:mt-0" aria-label="Why choose Master of Detailing">
            {whyUs.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={80 + index * 50}>
                  <article className="why-value-row group">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center text-gold/85">
                      <Icon name={item.icon} className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-cream-muted normal-case tracking-normal">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
