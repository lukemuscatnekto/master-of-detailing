import { useEffect, useState } from 'react'
import { cta } from '../data/content'
import Icon from './Icon'

export default function MobileWhatsAppCTA() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setMenuOpen(root.dataset.mobileMenu === 'open')
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['data-mobile-menu'] })
    return () => observer.disconnect()
  }, [])

  if (menuOpen) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-border bg-ink-900/96 px-3 pt-3 backdrop-blur-md lg:hidden pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
      role="region"
      aria-label="Quick booking"
    >
      <a
        href={cta.whatsappBook}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary flex min-h-[48px] w-full justify-center py-3.5"
      >
        <Icon name="whatsapp" filled className="h-5 w-5" />
        {cta.labels.book}
      </a>
    </div>
  )
}
