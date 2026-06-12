import { business, cta, protectionAftercare, showProtectionAftercare } from '../data/content'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Contact() {
  return (
    <section id="contact" className="section-pad scroll-mt-24 relative border-t border-gold-border/40 bg-ink-800/60">
      <div className="pointer-events-none absolute inset-0 bg-silk-gold opacity-40" aria-hidden="true" />
      <div className="container-px relative">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Contact"
          intro="The fastest way to reach Matthias is WhatsApp. Send your vehicle details and we will reply as soon as we can."
          align="center"
        />

        <Reveal className="mx-auto mt-12 max-w-2xl lg:mt-14">
          <div className="card-surface overflow-hidden shadow-panel">
            <div className="border-b border-gold-border bg-gold/5 px-5 py-8 text-center sm:px-10">
              <a
                href={cta.whatsappBook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mx-auto"
              >
                <Icon name="whatsapp" filled className="h-5 w-5" />
                {cta.labels.book}
              </a>
              {showProtectionAftercare && (
                <p className="mt-4">
                  <a
                    href={protectionAftercare.autoGraph.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gold transition-colors hover:text-cream"
                  >
                    {protectionAftercare.autoGraph.contactLinkLabel}
                  </a>
                </p>
              )}
            </div>

            <ul className="divide-y divide-gold-border [&_.contact-row:hover]:bg-white/[0.02] [&_.contact-row:hover_svg]:text-gold [&_.contact-row_svg]:transition-colors">
              <li className="contact-row group flex items-start gap-4 px-5 py-5 sm:px-8 transition-colors">
                <Icon name="whatsapp" filled className="mt-0.5 h-5 w-5 shrink-0 text-gold/70" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest2 text-cream-muted">WhatsApp</p>
                  <a
                    href={cta.whatsappBook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-base font-medium text-cream transition-colors hover:text-gold"
                  >
                    {business.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="contact-row group flex items-start gap-4 px-5 py-5 sm:px-8 transition-colors">
                <Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-gold/70" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest2 text-cream-muted">Email</p>
                  <a
                    href={`mailto:${business.email}`}
                    className="mt-1 block break-all text-base font-medium text-cream transition-colors hover:text-gold"
                  >
                    {business.email}
                  </a>
                </div>
              </li>
              <li className="contact-row group flex items-start gap-4 px-5 py-5 sm:px-8 transition-colors">
                <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-gold/70" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest2 text-cream-muted">Location</p>
                  <p className="mt-1 text-base text-cream">{business.location}</p>
                  <p className="mt-1 text-sm text-cream-muted">{business.workshopType}</p>
                </div>
              </li>
              <li className="contact-row group flex items-start gap-4 px-5 py-5 sm:px-8 transition-colors">
                <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-gold/70" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest2 text-cream-muted">Availability</p>
                  <p className="mt-1 text-base text-cream">{business.openingHours}</p>
                </div>
              </li>
              <li className="contact-row group flex items-start gap-4 px-5 py-5 sm:px-8 transition-colors">
                <Icon name="instagram" className="mt-0.5 h-5 w-5 shrink-0 text-gold/70" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest2 text-cream-muted">Instagram</p>
                  <a
                    href={business.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-base font-medium text-cream transition-colors hover:text-gold"
                  >
                    {business.instagramHandle}
                  </a>
                </div>
              </li>
              <li className="contact-row group flex items-start gap-4 px-5 py-5 sm:px-8 transition-colors">
                <Icon name="facebook" filled className="mt-0.5 h-5 w-5 shrink-0 text-gold/70" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest2 text-cream-muted">Facebook</p>
                  <a
                    href={business.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-base font-medium text-cream transition-colors hover:text-gold"
                  >
                    Master of Detailing on Facebook
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
