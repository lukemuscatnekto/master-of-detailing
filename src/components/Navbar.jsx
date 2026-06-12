import { useEffect, useRef, useState } from 'react'
import { business, cta, navLinks } from '../data/content'
import Logo from './Logo'
import Icon from './Icon'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [pastFold, setPastFold] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const menuToggleRef = useRef(null)
  const pendingNavRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      setPastFold(window.scrollY > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['home', ...navLinks.map((l) => l.href.replace('#', ''))]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const scrollY = window.scrollY
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverflow = document.body.style.overflow
    document.documentElement.dataset.mobileMenu = 'open'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      pendingNavRef.current = null
      setOpen(false)
      requestAnimationFrame(() => menuToggleRef.current?.focus())
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)

      const pendingHash = pendingNavRef.current
      pendingNavRef.current = null
      delete document.documentElement.dataset.mobileMenu
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow

      requestAnimationFrame(() => {
        if (pendingHash?.startsWith('#')) {
          window.location.hash = pendingHash
          return
        }
        window.scrollTo(0, scrollY)
      })
    }
  }, [open])

  const ctaRevealed = pastFold || open

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-gold-border bg-ink-900/80 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-black/55 via-black/25 to-transparent backdrop-blur-0'
      }`}
    >
      <nav
        className="container-px relative z-50 grid h-14 max-w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:h-16 lg:grid-cols-[auto_1fr_auto] lg:gap-8"
        aria-label="Primary"
      >
        <a href="#home" className="min-w-0 shrink justify-self-start pr-1" aria-label={`${business.name} home`}>
          <Logo variant="nav" />
        </a>

        <ul className="hidden items-center justify-center gap-6 lg:flex">
          {navLinks.filter((link) => !link.hideOnDesktop).map((link) => {
            const isActive = `#${activeId}` === link.href
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:text-gold ${
                    isActive ? 'text-gold after:w-full' : 'text-cream-muted after:w-0'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
          <a
            href={cta.whatsappBook}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={ctaRevealed ? 0 : -1}
            aria-hidden={ctaRevealed ? undefined : 'true'}
            className={`btn-primary btn-nav hidden min-h-[44px] text-xs transition-all duration-300 sm:inline-flex lg:text-sm ${
              ctaRevealed ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
            }`}
          >
            <Icon name="whatsapp" filled className="h-4 w-4" />
            <span className="hidden xl:inline">{cta.labels.book}</span>
            <span className="xl:hidden">WhatsApp</span>
          </a>

          <a
            href={cta.whatsappBook}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={ctaRevealed ? 0 : -1}
            aria-hidden={ctaRevealed ? undefined : 'true'}
            className={`btn-primary inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-0 transition-all duration-300 sm:hidden ${
              ctaRevealed ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
            }`}
            aria-label={cta.labels.book}
          >
            <Icon name="whatsapp" filled className="h-4 w-4" />
          </a>

          <button
            ref={menuToggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-gold-border text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>
    </header>

    <div
      id="mobile-menu"
      aria-hidden={!open}
      inert={open ? undefined : ''}
      className={`fixed inset-0 z-40 flex flex-col bg-ink-900/98 backdrop-blur-md transition-transform duration-300 ease-out lg:hidden ${
        open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
      }`}
    >
      <div className="h-[calc(var(--header-height)+env(safe-area-inset-top,0px))]" />
      <ul className="container-px flex flex-1 flex-col gap-1 overflow-y-auto py-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={(event) => {
                if (link.href.startsWith('#')) {
                  event.preventDefault()
                  pendingNavRef.current = link.href
                }
                setOpen(false)
              }}
              className="flex min-h-[56px] items-center rounded-lg px-3 font-display text-2xl font-semibold uppercase tracking-tight text-cream transition-colors hover:bg-gold/5 hover:text-gold"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="container-px pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2">
        <a
          href={cta.whatsappBook}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="btn-primary w-full"
        >
          <Icon name="whatsapp" filled className="h-4 w-4" />
          {cta.labels.book}
        </a>
      </div>
    </div>
    </>
  )
}
