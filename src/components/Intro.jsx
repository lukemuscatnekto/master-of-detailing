import { copy } from '../data/content'
import useParallax from '../hooks/useParallax'
import Reveal from './Reveal'

export default function Intro() {
  const watermarkRef = useParallax(0.08, 40)

  return (
    <section id="intro" className="relative overflow-hidden border-b border-white/[0.06] bg-ink-800/40 py-8 sm:py-11">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          ref={watermarkRef}
          className="select-none font-display text-[16rem] font-bold leading-none text-white/[0.02] will-change-transform sm:text-[22rem]"
        >
          M
        </span>
      </div>
      <div className="container-px relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{copy.intro.eyebrow}</p>
          <h2 className="heading-display mt-3 text-2xl text-cream sm:text-3xl">{copy.intro.heading}</h2>
          <p className="mx-auto mt-4 max-w-[65ch] text-sm leading-relaxed text-cream-muted sm:text-base">
            {copy.intro.body}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
