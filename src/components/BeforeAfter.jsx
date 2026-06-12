import { lazy, Suspense } from 'react'
import { beforeAfterItems, copy } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const BeforeAfterSlider = lazy(() => import('./BeforeAfterSlider'))

export default function BeforeAfter() {
  return (
    <section id="before-after" className="section-pad border-t border-white/[0.06] bg-ink-800/30">
      <div className="container-px">
        <SectionHeading
          eyebrow="Results"
          title="Before and After"
          intro={copy.beforeAfterIntro}
          align="center"
        />

        <ul className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 lg:mt-14 lg:grid-cols-2">
          {beforeAfterItems.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 60}>
                <article className="overflow-hidden rounded-2xl bg-ink-800/60">
                  <div className="border-b border-white/[0.06] px-4 py-3 sm:px-6 sm:py-4">
                    <h3 className="heading-display text-base text-cream sm:text-lg">{item.title}</h3>
                  </div>

                  <div className="p-3 sm:p-5">
                    <Suspense
                      fallback={<div className="aspect-[4/3] w-full rounded-lg bg-graphite-600" />}
                    >
                      <BeforeAfterSlider
                        before={item.before}
                        after={item.after}
                        beforeAlt={`Before: ${item.alt}`}
                        afterAlt={`After: ${item.alt}`}
                      />
                    </Suspense>
                  </div>

                  <p className="border-t border-white/[0.06] px-4 py-2.5 text-center text-sm leading-snug text-gray-400 sm:px-6 sm:py-3">
                    {item.alt}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
