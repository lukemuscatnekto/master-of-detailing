/**
 * Creates web-optimized MP4 derivatives (originals kept). Updates only when smaller.
 * Run: node scripts/optimize-videos.mjs
 */
import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')

const videos = [
  'videos/ceramic-coating/graphene-ceramic-coating-full-paint-correction-01.mp4',
  'videos/paint-correction/full-paint-correction-superior-wax-8-months-01.mp4',
  'videos/paint-correction/deep-scratch-removal-wet-sanding-classic-paint-1985-01.mp4',
  'videos/interiors/full-deep-clean-seat-wet-vac-protection-wash-01.mp4',
  'videos/interiors/full-interior-deep-clean-seat-wash-01.mp4',
]

let ffmpegPath = 'ffmpeg'
try {
  const mod = await import('ffmpeg-static')
  if (mod.default) ffmpegPath = mod.default
} catch {
  // use system ffmpeg if available
}

function runFfmpeg(args) {
  const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' })
  return result.status === 0
}

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

let optimized = 0
let kept = 0

for (const rel of videos) {
  const input = path.join(publicDir, rel)
  if (!fs.existsSync(input)) {
    console.warn(`missing: ${rel}`)
    continue
  }

  const parsed = path.parse(rel)
  const outRel = path.join(parsed.dir, `${parsed.name}.web${parsed.ext}`)
  const output = path.join(publicDir, outRel)
  const inSize = fs.statSync(input).size

  if (fs.existsSync(output)) fs.unlinkSync(output)

  const ok = runFfmpeg([
    '-y',
    '-i',
    input,
    '-c:v',
    'libx264',
    '-crf',
    '22',
    '-preset',
    'slow',
    '-movflags',
    '+faststart',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-pix_fmt',
    'yuv420p',
    output,
  ])

  if (!ok || !fs.existsSync(output)) {
    console.warn(`encode failed: ${rel}`)
    continue
  }

  const outSize = fs.statSync(output).size
  const saved = inSize - outSize
  const pct = Math.round((saved / inSize) * 100)

  if (outSize < inSize * 0.92) {
    console.log(`${rel} → ${outRel} | ${formatMb(inSize)} → ${formatMb(outSize)} (-${pct}%)`)
    optimized += 1
  } else {
    fs.unlinkSync(output)
    console.log(`${rel}: kept original (derivative not smaller enough)`)
    kept += 1
  }
}

console.log(`\nDone. ${optimized} optimized derivative(s), ${kept} skipped.`)
