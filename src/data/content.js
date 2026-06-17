/**
 * Single source of truth for site content.
 *
 * LOGO: Set business.logoSrc to a transparent PNG/SVG when supplied.
 * GALLERY / RESULTS: Local paths under /public/photos/
 * HERO: WebP preferred with PNG fallback under /photos/hero/.
 */

export const siteFlags = {
  showGallery: true,
  showFeaturedProject: true,
  showBeforeAfter: true,
  showWorkshopVideos: true,
}

export const business = {
  name: 'Master of Detailing',
  brandLine: 'By Matthias',
  owner: 'Matthias Scerri',
  location: 'Msida, Malta',
  phoneDisplay: '+356 7979 7939',
  whatsappNumber: '35679797939',
  email: 'masterofdetailingmalta@gmail.com',
  openingHours: 'Available after 4 PM on weekdays and all day Saturday',
  workshopType: 'Workshop-only service',
  instagramHandle: '@master_of_detailing_mlt',
  instagramUrl: 'https://www.instagram.com/master_of_detailing_mlt/?hl=en',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61572537325996',
  logoSrc: '/logo/master-of-detailing-logo-cropped.png',
  logoAlt: 'Master of Detailing by Matthias logo',
}

export const whatsappUrl =
  'https://wa.me/35679797939?text=Hi%20Master%20of%20Detailing%2C%20I%20would%20like%20to%20enquire%20about%20a%20detailing%20package%20for%20my%20vehicle.'

export const cta = {
  whatsappBook: whatsappUrl,
  whatsappEnquiry: whatsappUrl,
  labels: {
    book: 'Book on WhatsApp',
    enquiry: 'Start Your Enquiry',
    appointment: 'Message Us for an Appointment',
    serviceEnquire: 'Enquire on WhatsApp',
    sendPhotos: 'Send Photos on WhatsApp',
  },
}

export const SERVICE_OPTIONS = [
  'Exterior Wash',
  'Interior Clean',
  'Exterior Wash + Interior Clean',
  'Full Detail',
  'Paint Correction + Ceramic Coating',
  'Paint Correction + Wax Protection',
  'Not Sure Yet',
]

export function getWhatsAppQuoteUrl(car, service) {
  const text = [
    "Hi Matthias, I'd like a quote for detailing.",
    `Car: ${car.trim()}`,
    `Service: ${service}`,
    '',
    'I can send photos if needed.',
  ].join('\n')

  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export function openWhatsAppChat(url) {
  const ua = navigator.userAgent || ''
  const isMobile = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(ua)

  if (!isMobile) {
    try {
      const parsed = new URL(url)
      const phone = parsed.pathname.replace(/\//g, '')
      const message = parsed.searchParams.get('text')
      const web = `https://web.whatsapp.com/send?phone=${phone}${
        message ? `&text=${encodeURIComponent(message)}` : ''
      }`
      window.open(web, '_blank', 'noopener,noreferrer')
      return
    } catch {
      /* fall through to wa.me */
    }
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

export const pricingCopy = {
  eyebrow: 'Packages',
  title: 'Detailing Packages',
  intro:
    'Professional interior and exterior detailing packages designed around your vehicle’s condition, size, and required level of care.',
  specialistTitle: 'Specialist Services',
  specialistIntro:
    'Paint correction, ceramic coating, paint correction with ceramic coating, paint correction with wax protection, and other specialist detailing services are priced on request after inspecting the vehicle or reviewing photos.',
  disclaimer:
    'All prices are starting from and may vary depending on vehicle size, condition, and level of soiling.',
}

export const pricingPackages = [
  {
    id: 'basic',
    name: 'Basic Detail',
    badge: 'Essential Refresh',
    price: 'Starting From €65',
    duration: 'Minimum of 4.5 hours',
    description:
      'A complete interior and exterior refresh designed to bring your vehicle back to a clean, presentable standard.',
    introLine: null,
    included: [
      'Interior vacuuming and blow out',
      'Interior panel cleaning',
      'Interior glass cleaning',
      'Exterior hand wash',
      'Wheel and rim cleaning',
      'Wheel arch cleaning',
      'Exterior glass cleaning',
      'Tyre dressing',
    ],
    footnote: null,
    ctaLabel: 'Request Basic Detail Quote',
    featured: false,
  },
  {
    id: 'standard',
    name: 'Standard Detail',
    badge: 'Most Popular',
    price: 'Starting From €230',
    duration: 'Minimum of 6.5 hours',
    description:
      'A deeper clean for customers who want improved interior hygiene, freshness, and attention to hard-to-reach areas.',
    introLine: 'Everything included in the Basic Detail, plus:',
    included: [
      'Steam cleaning of interior surfaces',
      'Interior sanitisation and disinfection',
      'Deep cleaning of hard-to-reach areas',
      'Enhanced interior freshness and hygiene',
    ],
    footnote: null,
    ctaLabel: 'Request Standard Detail Quote',
    featured: true,
  },
  {
    id: 'deep',
    name: 'Deep Detail',
    badge: 'Premium Reset',
    price: 'Starting From €350',
    duration: 'Minimum of 8.5 hours',
    description:
      'A full deep-clean package for vehicles that need a more intensive reset inside and out.',
    introLine: 'Everything included in the Standard Detail, plus:',
    included: [
      'Deep cleaning of seats, fabric or leather',
      '3-month protective treatment applied to the exterior',
      'Odour elimination fogger treatment for the cabin and air-conditioning system',
    ],
    footnote:
      'The fogger treatment circulates through the cabin and air-conditioning system to help neutralise stubborn odours deep within upholstery, headliners, and vents.',
    ctaLabel: 'Request Deep Detail Quote',
    featured: false,
  },
]

export const specialistPricingServices = [
  'Paint Correction',
  'Ceramic Coating',
  'Paint Correction + Ceramic Coating',
  'Paint Correction + Wax Protection',
  'Other Specialist Services',
]

export function getWhatsAppPackageUrl(pkg) {
  const text = [
    `Hi Matthias, I'd like a quote for ${pkg.name}.`,
    `Package: ${pkg.name}`,
    `Starting price: ${pkg.price}`,
    `Minimum time: ${pkg.duration}`,
    '',
    'I can send photos of the vehicle if needed.',
  ].join('\n')

  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export function getWhatsAppSpecialistUrl(serviceName) {
  const text = [
    `Hi Matthias, I'd like a quote for ${serviceName}.`,
    `Service: ${serviceName}`,
    '',
    'I can send photos of the vehicle if needed.',
  ].join('\n')

  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(text)}`
}

const allNavLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery', requiresGallery: true },
  { label: 'Results', href: '#before-after', requiresBeforeAfter: true },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export const navLinks = allNavLinks.filter((link) => {
  if (link.requiresGallery && !siteFlags.showGallery) return false
  if (link.requiresBeforeAfter && !siteFlags.showBeforeAfter) return false
  return true
})

export const copy = {
  heroEyebrow: 'Workshop-based detailing · Msida, Malta',
  heroParagraph:
    'Paint correction, ceramic coating, interior deep cleaning and exterior detailing — carried out by appointment at our workshop in Msida.',
  heroParagraphMobile:
    'Paint correction, ceramic coating and interior detailing — by appointment at our Msida workshop.',
  heroAvailability: 'Weekdays after 4 PM · Saturdays all day',
  intro: {
    eyebrow: 'Detailing done properly',
    heading: 'A workshop service built around your car',
    body: 'Master of Detailing is a workshop-based service in Msida, run by Matthias Scerri. Each vehicle is assessed before the booking so the work matches the condition of the car and the finish the owner wants to achieve.',
    supporting: 'By appointment only.',
  },
  servicesIntro: 'By appointment at the Msida workshop.',
  whyUs: {
    eyebrow: 'Why Master of Detailing',
    heading: 'Care, time and attention to detail',
    headingLines: ['Care, time and', 'attention to detail'],
    intro:
      'This is not a rushed wash service. The work is carried out by appointment at the Msida workshop, with the time and attention each vehicle needs.',
    supportingNote: 'Workshop-based · By appointment · Msida, Malta',
  },
  process: {
    eyebrow: 'How to book',
    heading: 'Book your detail in four steps',
    intro: 'Send a WhatsApp message with your vehicle details and Matthias will guide you from there.',
  },
  galleryIntro: 'A closer look at the vehicles treated at Master of Detailing.',
  beforeAfterIntro: 'Selected before-and-after results from recent workshop work.',
}

export const images = {
  hero: {
    src: '/photos/hero/hero-main.png',
    alt: 'Luxury vehicle after professional detailing at Master of Detailing, Msida Malta',
  },
}

export const galleryCategories = ['All', 'Exterior', 'Interior', 'Engine Bay']

export const galleryItems = [
  {
    src: '/photos/gallery/detailing-03.jpg',
    alt: 'Blue BMW finished exterior — front view in the Msida workshop',
    category: 'Exterior',
    featured: true,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-04.jpg',
    alt: 'Blue BMW finished exterior — rear three-quarter in the workshop',
    category: 'Exterior',
    featured: false,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-05.jpg',
    alt: 'Classic two-tone Ford Zephyr estate after exterior detailing',
    category: 'Exterior',
    featured: false,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-06.jpg',
    alt: 'Porsche Cayenne cabin with refreshed red and black leather interior',
    category: 'Interior',
    featured: false,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-07.jpg',
    alt: 'Fabric seat interior deep clean showing refreshed cushion panels',
    category: 'Interior',
    featured: false,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-08.jpg',
    alt: 'Cleaned and dressed Peugeot engine bay after engine bay detail',
    category: 'Engine Bay',
    featured: false,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-01.jpg',
    alt: 'Mercedes-AMG finished exterior — front three-quarter in the workshop',
    category: 'Exterior',
    featured: false,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-02.jpg',
    alt: 'Mercedes-AMG finished exterior — rear three-quarter in the workshop',
    category: 'Exterior',
    featured: false,
    angled: false,
  },
]

export const featuredProject = {
  id: 'ford-zephyr',
  eyebrow: 'FEATURED CLASSIC',
  title: 'Ford Zephyr Mk II Estate',
  subtitle:
    'A rare 1960s classic carefully revived with a full paint correction and premium wax finish.',
  paragraphs: [
    'This stunning 1960s Ford Zephyr Mk II Estate is believed to be one of only 56 known registered examples remaining in the world today, making it an exceptionally rare and irreplaceable piece of automotive history.',
    'Powered by its iconic 2.4L straight-six engine and preserved with remarkable originality throughout the years, this Zephyr represents an era of craftsmanship that simply no longer exists. From the elegant two-tone finish to the timeless chrome details, every inch of this car carries history and character.',
    'We had the genuine privilege of carrying out a full paint correction on this priceless classic, carefully restoring depth, clarity and gloss back into the paintwork while preserving the authenticity that makes this vehicle so special.',
    'To complete the process, the Zephyr was treated with a premium wax, enhancing the richness of the finish and giving this rare classic the deep glow it truly deserves.',
    'Working on a vehicle like this goes far beyond detailing — it is about preserving a piece of motoring history for future generations.',
  ],
  pullQuote: 'One of only 56 known registered examples remaining in the world today.',
  detailLabels: [
    'Full Paint Correction',
    'Premium Wax Finish',
    'Rare Classic Vehicle',
    'Workshop Detailed in Msida',
  ],
  cta: {
    primaryLabel: 'Book on WhatsApp',
    secondaryLabel: 'View Recent Work',
    secondaryHref: '#before-after',
  },
  /** Used only when dedicated hero asset is not yet on disk */
  fallbackHeroSrc: '/photos/gallery/detailing-05.jpg',
  images: [
    {
      id: 'hero',
      src: '/photos/featured/ford-zephyr/zephyr-04-full-car.jpg',
      webp: '/photos/featured/ford-zephyr/zephyr-04-full-car.webp',
      alt: 'Ford Zephyr full exterior in workshop',
      role: 'hero',
      objectPosition: 'center 55%',
    },
    {
      id: 'dashboard',
      src: '/photos/featured/ford-zephyr/zephyr-01-dashboard.jpg',
      webp: '/photos/featured/ford-zephyr/zephyr-01-dashboard.webp',
      alt: 'Ford Zephyr dashboard detail',
      role: 'supporting',
      objectPosition: 'center center',
      objectFit: 'cover',
    },
    {
      id: 'badge',
      src: '/photos/featured/ford-zephyr/zephyr-02-side-badge.jpg',
      webp: '/photos/featured/ford-zephyr/zephyr-02-side-badge.webp',
      alt: 'Ford Zephyr side badge close-up',
      role: 'supporting',
      objectPosition: 'center center',
      objectFit: 'cover',
    },
    {
      id: 'bonnet',
      src: '/photos/featured/ford-zephyr/zephyr-03-front-bonnet.jpg',
      webp: '/photos/featured/ford-zephyr/zephyr-03-front-bonnet.webp',
      alt: 'Ford Zephyr bonnet and front emblem detail',
      role: 'supporting',
      objectPosition: 'center 40%',
      objectFit: 'cover',
    },
  ],
}

export const beforeAfterItems = [
  {
    before: '/photos/before-after/before-01.jpg',
    after: '/photos/before-after/after-01.jpg',
    title: 'Interior Floor Deep Clean',
    alt: 'Interior floor area before and after a thorough deep clean.',
  },
  {
    before: '/photos/before-after/before-02.jpg',
    after: '/photos/before-after/after-02.jpg',
    title: 'Engine Bay Detail',
    alt: 'Engine bay before and after careful cleaning and finishing.',
  },
  {
    before: '/photos/before-after/before-03.jpg',
    after: '/photos/before-after/after-03.jpg',
    title: 'Interior Centre-Console Clean',
    alt: 'Centre-console area before and after interior detailing.',
  },
  {
    before: '/photos/before-after/before-04.jpg',
    after: '/photos/before-after/after-04.jpg',
    title: 'Paintwork Finish',
    alt: 'Close-up paintwork result showing a cleaner and more refined finish.',
    slider: true,
  },
]

/** Workshop Video Showcase — .web.mp4 derivatives; originals kept as backups. */
export const workshopVideos = [
  {
    id: 'graphene-ceramic-coating',
    title: 'Graphene Ceramic Coating',
    subtitle: 'Full paint correction with 4-year graphene protection',
    category: 'Ceramic Coating',
    src: '/videos/ceramic-coating/graphene-ceramic-coating-full-paint-correction-01.web.mp4',
    poster: '/videos/posters/graphene-ceramic-coating.webp',
    orientation: 'portrait',
    duration: '0:34',
    description:
      'Full paint correction topped off with a 4-year graphene ceramic coating on the paint and 2-year ceramic protection on trims and front fender wells.',
    featured: true,
  },
  {
    id: 'wet-sanding-classic-paint',
    title: 'Deep Scratch Removal',
    subtitle: 'Wet sanding on original 1985 paintwork',
    category: 'Paint Correction',
    src: '/videos/paint-correction/deep-scratch-removal-wet-sanding-classic-paint-1985-01.web.mp4',
    poster: '/videos/posters/deep-scratch-removal.webp',
    orientation: 'landscape',
    duration: '0:19',
    description:
      'Deep scratch removal during paint correction on original 1985 paintwork that required careful wet sanding.',
  },
  {
    id: 'paint-correction-wax',
    title: 'Paint Correction and Wax Finish',
    subtitle: 'Full correction topped off with 8-month protection',
    category: 'Paint Correction',
    src: '/videos/paint-correction/full-paint-correction-superior-wax-8-months-01.web.mp4',
    poster: '/videos/posters/paint-correction-wax.webp',
    orientation: 'portrait',
    duration: '0:24',
    description:
      'Full paint correction followed by a premium wax finish designed to provide up to 8 months of protection.',
  },
  {
    id: 'interior-wet-vac',
    title: 'Interior Deep Clean',
    subtitle: 'Seat wet vac and protection wash',
    category: 'Interior',
    src: '/videos/interiors/full-deep-clean-seat-wet-vac-protection-wash-01.web.mp4',
    poster: '/videos/posters/interior-wet-vac.webp',
    orientation: 'portrait',
    duration: '0:16',
    description:
      'Full interior deep clean including seat wet-vac treatment, topped off with a 2-month protection wash.',
  },
  {
    id: 'interior-seat-wash',
    title: 'Interior Seat Wash',
    subtitle: 'Full cabin deep clean',
    category: 'Interior',
    src: '/videos/interiors/full-interior-deep-clean-seat-wash-01.web.mp4',
    poster: '/videos/posters/interior-seat-wash.webp',
    orientation: 'portrait',
    duration: '0:14',
    description:
      'A full interior deep clean with focused seat washing and careful cabin detailing.',
  },
]

export const workshopVideosCopy = {
  eyebrow: 'INSIDE THE WORKSHOP',
  heading: 'SEE THE WORK BEHIND THE FINISH',
  intro:
    'A closer look at the correction, protection and deep-cleaning work carried out at the Master of Detailing workshop in Msida.',
  ctaHeading: 'Want to know what your car needs?',
  ctaBody: 'Send a few photos on WhatsApp and Matthias will recommend the right service.',
  ctaLabel: 'Message Us on WhatsApp',
}


export const services = [
  {
    title: 'Polish and Ceramic Coating',
    description:
      'Improve gloss and protect the finish with careful polishing and professionally applied ceramic coating.',
    icon: 'shield',
  },
  {
    title: 'Paint Correction',
    description:
      'Reduce visible swirl marks, light scratches and paint imperfections to restore clarity and depth.',
    icon: 'sparkle',
  },
  {
    title: 'Deep Exterior Detail',
    description: 'A thorough exterior clean and finish for a sharper, better-presented vehicle.',
    icon: 'droplet',
  },
  {
    title: 'Interior Deep Cleaning',
    description: 'Detailed cleaning for seats, surfaces and harder-to-reach areas inside the cabin.',
    icon: 'seat',
  },
  {
    title: 'Engine Bay Detail',
    description: 'Careful cleaning and finishing of the engine bay for a cleaner overall presentation.',
    icon: 'engine',
  },
  {
    title: 'Not Sure What Your Car Needs?',
    description: 'Send photos of your vehicle on WhatsApp and Matthias will recommend the right service.',
    icon: 'wrench',
  },
]

export const showProtectionAftercare = true

export const protectionAftercare = {
  eyebrow: 'CERAMIC PROTECTION & AFTERCARE',
  headingLines: ['PROTECT THE FINISH.', 'MAINTAIN THE RESULT.'],
  intro:
    'Professional ceramic coatings are applied at the Msida workshop. Aftercare products are available for ongoing maintenance and protection.',

  featuredTiers: [
    {
      id: 'zvizzer-paint-ceramic-3-year',
      tier: 'ESSENTIAL',
      duration: '30–36 MONTHS',
      mileage: 'UP TO 30,000 KM',
      brand: 'ZviZZer',
      title: 'Paint Ceramic Coating',
      image: '/products/ceramic-coatings/zvizzer-paint-ceramic-coat-3-year.webp',
      imageAlt: 'ZviZZer Paint Ceramic Coat professional detailing product',
      description:
        'A professional paint-protection option designed to improve gloss, simplify maintenance and provide durable ceramic protection.',
      ctaLabel: 'Ask About Paint Ceramic',
    },
    {
      id: 'zvizzer-graphene-4-year',
      tier: 'ADVANCED',
      duration: '42–48 MONTHS',
      mileage: 'UP TO 40,000 KM',
      brand: 'ZviZZer',
      title: 'Graphene Ceramic Coating',
      image: '/products/ceramic-coatings/zvizzer-graphene-ceramic-coat-4-year.webp',
      imageAlt: 'ZviZZer Graphene Ceramic Coat professional detailing product',
      description:
        'A graphene-enhanced coating for owners looking for longer-lasting protection, strong gloss and easier ongoing care.',
      ctaLabel: 'Ask About Graphene Coating',
      recommended: true,
    },
    {
      id: 'angelwax-nebula-5-year',
      tier: 'SIGNATURE',
      duration: 'UP TO 5 YEARS',
      mileage: '',
      brand: 'Angelwax',
      title: 'Dark Star NEBULA',
      image: '/products/ceramic-coatings/angelwax-nebula-graphene-ceramic-coating-5-year.webp',
      imageAlt: 'Angelwax Dark Star Nebula graphene ceramic coating product',
      description:
        'A professional-grade graphene coating focused on exceptional gloss, slickness and long-term paint protection.',
      ctaLabel: 'Ask About Dark Star Nebula',
    },
  ],

  professionalAlternatives: [
    {
      id: 'angelwax-genesis',
      title: 'Angelwax Enigma Genesis',
      duration: 'Up to 5 years',
      description:
        'Premium single-layer professional coating focused on gloss, hydrophobic performance and easier maintenance.',
    },
    {
      id: 'angelwax-solaris',
      title: 'Angelwax Enigma Solaris',
      duration: 'Up to 3 years',
      description:
        'Professional ceramic coating designed to enhance paint depth and provide durable hydrophobic protection.',
    },
    {
      id: 'angelwax-legacy',
      title: 'Angelwax Enigma Legacy',
      duration: 'Up to 1 year',
      description:
        'Titanium-infused coating designed to improve gloss, clarity and everyday protection.',
    },
  ],

  surfaceAddOns: [
    {
      id: 'wheel-caliper',
      title: 'Wheel & Caliper Protection',
      description:
        'Long-term protection designed to make brake dust and road grime easier to remove.',
      icon: 'wheel',
    },
    {
      id: 'glass',
      title: 'Ceramic Glass Coating',
      description:
        'Up to 2 years of hydrophobic glass protection designed to improve wet-weather visibility.',
      icon: 'glass',
    },
    {
      id: 'trim',
      title: 'Trim Protection',
      description:
        'Long-term ceramic protection designed to restore colour depth and protect exterior trim.',
      icon: 'shield',
    },
  ],

  autoGraph: {
    heading: 'AFTERCARE PRODUCTS NOW AVAILABLE',
    intro:
      'Auto Graph Detailing products and accessories are now available at Master of Detailing. Message Matthias for prices, recommendations and advice on choosing the right products for your vehicle.',
    whatsappUrl:
      'https://wa.me/35679797939?text=Hi%20Master%20of%20Detailing%2C%20I%20would%20like%20to%20ask%20about%20the%20Auto%20Graph%20Detailing%20products%20you%20have%20in%20stock.',
    contactLinkLabel: 'Ask about Auto Graph Detailing products',
    panels: [
      {
        id: 'wheel-care',
        label: 'WHEEL CARE',
        title: 'Wheel Care',
        description:
          'Rim cleaner and wheel-care products for easier brake-dust removal and routine maintenance.',
        image: '/products/auto-graph/auto-graph-rim-cleaner-stock.webp',
        imageAlt:
          'Auto Graph Detailing Rim Cleaner bottle displayed with other workshop-care products',
      },
      {
        id: 'interior-care',
        label: 'INTERIOR CARE',
        title: 'Interior Care',
        description:
          'Leather protect and interior-care products to keep surfaces clean and properly maintained.',
        image: '/products/auto-graph/auto-graph-leather-protect-stock.webp',
        imageAlt:
          'Auto Graph Detailing Leather Protect bottle displayed with other interior-care products',
      },
      {
        id: 'exterior-care',
        label: 'EXTERIOR CARE',
        title: 'Exterior Care',
        description:
          'Traffic film remover and exterior-care products for everyday maintenance and a cleaner finish.',
        image: '/products/auto-graph/auto-graph-traffic-film-remover-stock.webp',
        imageAlt:
          'Auto Graph Detailing Traffic Film Remover bottle displayed with other exterior-care products',
      },
    ],
  },

  advisory: {
    title: 'Not sure which protection option suits your car?',
    description:
      'Send a few photos on WhatsApp and Matthias will recommend the right coating and aftercare products for your vehicle.',
    ctaLabel: 'Send Photos on WhatsApp',
  },
}

export const whyUs = [
  {
    title: 'By Appointment',
    description:
      'Each vehicle is booked into the workshop so the work can be carried out properly without rushing.',
    icon: 'clock',
  },
  {
    title: 'Workshop-Based Service',
    description: 'All detailing is carried out at the Msida workshop in a controlled environment.',
    icon: 'building',
  },
  {
    title: 'Advice Before Booking',
    description: 'Send photos of your car on WhatsApp and receive a recommendation based on its condition.',
    icon: 'clipboard',
  },
  {
    title: 'Attention to the Finish',
    description:
      'The goal is a cleaner, sharper and better-presented vehicle, with careful attention to the small details.',
    icon: 'target',
  },
]

export const process = [
  {
    step: '01',
    title: 'Send Your Car Details',
    description: 'Message us on WhatsApp with your vehicle model and the service you are interested in.',
  },
  {
    step: '02',
    title: 'Share Photos',
    description: 'Send a few photos so Matthias can understand the condition of the vehicle.',
  },
  {
    step: '03',
    title: 'Confirm the Booking',
    description: 'Arrange a suitable workshop appointment after 4 PM on a weekday or during Saturday.',
  },
  {
    step: '04',
    title: 'Collect Your Car',
    description: 'Return to collect your vehicle once the agreed detailing work is complete.',
  },
]

export const testimonials = [
  {
    quote: 'Impeccable attention to detail, highly recommended.',
    name: 'Jonathan Zammit',
    source: 'Facebook recommendation',
  },
  {
    quote:
      'I tried many car washes in over 30 years and without any doubt this is the best of the best. Been bringing my car here for over a year now and the quality keeps getting better when with others it starts going down. Highly recommended. The best in Malta 👍',
    name: 'Pamela Borg',
    source: 'Facebook recommendation',
  },
]
