/**
 * Generates WebP companions for key site imagery (originals kept as fallbacks).
 * Run: node scripts/optimize-images.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')

const targets = [
  { input: 'photos/hero/hero-main.png', quality: 82 },
  { input: 'logo/master-of-detailing-logo-cropped.png', quality: 85 },
  ...[
    'detailing-01',
    'detailing-02',
    'detailing-03',
    'detailing-04',
    'detailing-05',
    'detailing-06',
    'detailing-07',
    'detailing-08',
  ].map((name) => ({ input: `photos/gallery/${name}.jpg`, quality: 80 })),
  ...['before-01', 'before-02', 'before-03', 'before-04', 'after-01', 'after-02', 'after-03', 'after-04'].map(
    (name) => ({ input: `photos/before-after/${name}.jpg`, quality: 80 }),
  ),
  ...[
    'graphene-ceramic-coating',
    'deep-scratch-removal',
    'paint-correction-wax',
    'interior-wet-vac',
    'interior-seat-wash',
  ].map((name) => ({ input: `videos/posters/${name}.jpg`, quality: 82 })),
  ...[
    'zvizzer-paint-ceramic-coat-3-year',
    'zvizzer-graphene-ceramic-coat-4-year',
    'angelwax-nebula-graphene-ceramic-coating-5-year',
  ].map((name) => ({
    input: `products/ceramic-coatings/${name}.png`,
    quality: 82,
    outExt: '.webp',
  })),
  ...[
    'auto-graph-rim-cleaner-stock',
    'auto-graph-leather-protect-stock',
    'auto-graph-traffic-film-remover-stock',
  ].map((name) => ({
    input: `products/auto-graph/${name}.png`,
    quality: 82,
    outExt: '.webp',
  })),
]

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.error('Install sharp first: npm install --no-save sharp')
  process.exit(1)
}

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`
}

let created = 0
let skipped = 0

for (const { input, quality, outExt = '.webp' } of targets) {
  const inPath = path.join(publicDir, input)
  if (!fs.existsSync(inPath)) {
    console.warn(`skip missing: ${input}`)
    skipped += 1
    continue
  }

  const base = input.replace(/\.(png|jpe?g)$/i, '')
  const outPath = path.join(publicDir, `${base}${outExt}`)
  const inputStat = fs.statSync(inPath)

  await sharp(inPath)
    .webp({ quality, effort: 6 })
    .toFile(outPath)

  const outStat = fs.statSync(outPath)
  const saved = inputStat.size - outStat.size
  const pct = Math.round((saved / inputStat.size) * 100)
  console.log(
    `${input} → ${base}${outExt} | ${formatKb(inputStat.size)} → ${formatKb(outStat.size)} (${pct >= 0 ? `-${pct}%` : `+${Math.abs(pct)}%`})`,
  )
  created += 1
}

console.log(`\nDone. ${created} WebP file(s) written, ${skipped} skipped.`)
