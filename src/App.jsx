import { lazy, Suspense, useEffect } from 'react'
import { siteFlags } from './data/content'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Services from './components/Services'
import Pricing from './components/Pricing'
import ProtectionAftercare from './components/ProtectionAftercare'
import Gallery from './components/Gallery'
import FeaturedProject from './components/FeaturedProject'
import BeforeAfter from './components/BeforeAfter'
import WorkshopVideos from './components/WorkshopVideos'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MobileWhatsAppCTA from './components/MobileWhatsAppCTA'
import BackToTop from './components/BackToTop'
import Loader from './components/Loader'

const CustomCursor = lazy(() => import('./components/CustomCursor'))

export default function App() {
  useEffect(() => {
    document.body.classList.add('has-mobile-cta')
    return () => document.body.classList.remove('has-mobile-cta')
  }, [])

  // On desktop, route wa.me links to WhatsApp Web (intercept survives re-renders).
  useEffect(() => {
    const ua = navigator.userAgent || ''
    const isMobile = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(ua)
    if (isMobile) return undefined

    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="https://wa.me/"]')
      if (!link) return
      event.preventDefault()
      try {
        const url = new URL(link.href)
        const phone = url.pathname.replace(/\//g, '')
        const text = url.searchParams.get('text')
        const web = `https://web.whatsapp.com/send?phone=${phone}${
          text ? `&text=${encodeURIComponent(text)}` : ''
        }`
        window.open(web, '_blank', 'noopener,noreferrer')
      } catch {
        window.open(link.href, '_blank', 'noopener,noreferrer')
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <Loader />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-ink-900"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Intro />
        <Services />
        <Pricing />
        <ProtectionAftercare />
        {siteFlags.showGallery && <Gallery />}
        {siteFlags.showFeaturedProject && <FeaturedProject />}
        {siteFlags.showBeforeAfter && <BeforeAfter />}
        <WorkshopVideos />
        <WhyUs />
        <Process />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <MobileWhatsAppCTA />
      <BackToTop />
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      <div className="grain-overlay" aria-hidden="true" />
    </>
  )
}
