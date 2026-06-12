/**
 * Reference data for gallery and before-and-after sections.
 * Mirrored in src/data/content.js — update both when adding new workshop photos.
 */

export const galleryCategories = [
  'All',
  'Exterior',
  'Interior',
  'Paint Correction',
  'Ceramic Coating',
  'Engine Bay',
]

export const galleryItems = [
  {
    src: '/photos/gallery/detailing-01.jpg',
    alt: 'Glossy black exterior panel reflecting studio light after detailing',
    category: 'Exterior',
    featured: true,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-02.jpg',
    alt: 'Front three-quarter view showing restored paint clarity',
    category: 'Paint Correction',
    featured: false,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-03.jpg',
    alt: 'Protected paint finish after ceramic coating application',
    category: 'Ceramic Coating',
    featured: false,
    angled: true,
  },
  {
    src: '/photos/gallery/detailing-04.jpg',
    alt: 'Refreshed leather interior with clean surfaces and trim',
    category: 'Interior',
    featured: false,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-05.jpg',
    alt: 'Detailed wheel and caliper after deep exterior work',
    category: 'Exterior',
    featured: false,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-06.jpg',
    alt: 'Side profile showing depth and clarity after paint correction',
    category: 'Paint Correction',
    featured: false,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-07.jpg',
    alt: 'Cleaned and dressed engine bay presentation',
    category: 'Engine Bay',
    featured: false,
    angled: false,
  },
  {
    src: '/photos/gallery/detailing-08.jpg',
    alt: 'Headlight and front-end finish after ceramic protection',
    category: 'Ceramic Coating',
    featured: false,
    angled: false,
  },
]

export const beforeAfterItems = [
  {
    before: '/photos/before-after/before-01.jpg',
    after: '/photos/before-after/after-01.jpg',
    title: 'Paint Correction',
    alt: 'Paint correction result showing improved clarity and gloss',
  },
  {
    before: '/photos/before-after/before-02.jpg',
    after: '/photos/before-after/after-02.jpg',
    title: 'Exterior Detail',
    alt: 'Exterior detail transformation with a cleaner, sharper finish',
  },
  {
    before: '/photos/before-after/before-03.jpg',
    after: '/photos/before-after/after-03.jpg',
    title: 'Interior Deep Clean',
    alt: 'Interior deep clean with refreshed cabin surfaces',
  },
  {
    before: '/photos/before-after/before-04.jpg',
    after: '/photos/before-after/after-04.jpg',
    title: 'Full Detail Finish',
    alt: 'Complete detail finish with restored presentation',
  },
]