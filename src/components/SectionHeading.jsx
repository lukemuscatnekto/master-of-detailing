import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, intro, align = 'left', headingId }) {
  const isCenter = align === 'center'
  return (
    <Reveal className={isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-5 bg-gold" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 id={headingId} className="heading-display mt-4 text-[1.8rem] sm:text-[2.5rem] lg:text-[3.25rem]">
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 max-w-[65ch] text-sm leading-relaxed text-cream-muted sm:text-base ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {intro}
        </p>
      )}
      <span
        className={`mt-6 block h-px w-20 bg-gradient-to-r from-gold to-transparent ${
          isCenter ? 'mx-auto' : ''
        }`}
        aria-hidden="true"
      />
    </Reveal>
  )
}
