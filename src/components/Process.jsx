import { copy, cta, process } from '../data/content'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Process() {
  return (
    <section id="process" className="section-pad bg-ink-800/30">
      <div className="container-px">
        <SectionHeading
          eyebrow={copy.process.eyebrow}
          title={copy.process.heading}
          intro={copy.process.intro}
          align="center"
        />

        <ol className="relative mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          <span
            className="pointer-events-none absolute bottom-6 left-[1.25rem] top-6 w-px bg-gold/30 lg:hidden"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.6rem] hidden h-px bg-gold/30 lg:block"
            aria-hidden="true"
          />
          {process.map((step, index) => (
            <li key={step.step}>
              <Reveal delay={index * 70}>
                <article className="process-step-mobile relative">
                  <span className="relative z-10 w-10 shrink-0 text-center font-display text-[2rem] font-semibold tabular-nums leading-none text-gold/80 sm:text-[2.25rem] lg:mb-3 lg:block lg:w-auto">
                    {step.step}
                  </span>
                  <div className="min-w-0 flex-1 lg:flex-none">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cream sm:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream-muted normal-case tracking-normal">
                      {step.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-8 text-center sm:mt-12 lg:mt-14">
          <a
            href={cta.whatsappBook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto"
          >
            <Icon name="whatsapp" filled className="h-4 w-4" />
            {cta.labels.book}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
