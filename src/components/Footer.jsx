import { business, cta, navLinks } from '../data/content'
import Icon from './Icon'
import Logo from './Logo'

const socials = [
  { name: 'instagram', label: 'Instagram', url: business.instagramUrl },
  { name: 'facebook', label: 'Facebook', url: business.facebookUrl, filled: true },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-gold-border bg-ink-900 pt-20 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] sm:pt-24 lg:pb-16">
      <span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
        aria-hidden="true"
      />
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <div className="mb-6">
              <Logo variant="footer" />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-cream-muted">
              Luxury car detailing by {business.owner}. {business.workshopType} in {business.location}.
            </p>
            <div className="mt-10 space-y-1">
              <p className="text-xs text-cream-muted/80">
                &copy; {year} {business.name}. All rights reserved.
              </p>
              <p className="text-xs text-cream-muted/70">
                {business.owner} &middot; {business.location} &middot; {business.workshopType}
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="Footer">
              <h3 className="text-xs font-semibold uppercase tracking-widest2 text-gold">Explore</h3>
              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-cream-muted transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest2 text-gold">Connect</h3>
              <ul className="mt-5 space-y-3 text-sm text-cream-muted">
                <li>
                  <a
                    href={cta.whatsappBook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    {business.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${business.email}`}
                    className="break-all transition-colors hover:text-gold"
                  >
                    {business.email}
                  </a>
                </li>
                <li>{business.location}</li>
              </ul>

              <div className="mt-6 flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-border text-gold transition-colors hover:bg-gold hover:text-ink-900"
                  >
                    <Icon name={social.name} filled={social.filled} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/[0.06] pt-6 text-center text-[0.65rem] leading-relaxed tracking-wide text-cream-muted/65 sm:mt-12 sm:text-xs">
          Website designed &amp; built by{' '}
          <span className="font-medium text-gold/85">FORM &amp; SIGNAL</span>
        </p>
      </div>
    </footer>
  )
}
