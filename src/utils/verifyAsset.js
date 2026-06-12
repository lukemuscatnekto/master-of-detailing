/**
 * Resilient static-asset verification for section gating.
 *
 * Strategy:
 * 1. Try HEAD (fast, no body download).
 * 2. Fall back to a 1-byte Range GET when HEAD is blocked or inconclusive.
 * 3. Treat inconclusive results as present (fail-open) so production hosts that
 *    mishandle HEAD do not hide entire sections.
 * 4. Only treat confirmed 404/410 responses as missing.
 */

export const AssetStatus = {
  AVAILABLE: 'available',
  MISSING: 'missing',
  UNKNOWN: 'unknown',
}

const MEDIA_PATH = /\.(webp|jpe?g|png|gif|svg|mp4|webm)(\?|$)/i

function isConfirmedMissing(status) {
  return status === 404 || status === 410
}

/** Some dev servers and SPA hosts return index.html with 200 for missing static files. */
function isSpaHtmlFallback(response, src) {
  if (!MEDIA_PATH.test(src)) return false
  const type = (response.headers.get('content-type') || '').toLowerCase()
  return type.includes('text/html')
}

async function probeHead(src) {
  const response = await fetch(src, { method: 'HEAD', cache: 'no-store' })
  if (response.ok) {
    if (isSpaHtmlFallback(response, src)) return AssetStatus.MISSING
    return AssetStatus.AVAILABLE
  }
  if (isConfirmedMissing(response.status)) return AssetStatus.MISSING
  return AssetStatus.UNKNOWN
}

async function probeRangeGet(src) {
  const response = await fetch(src, {
    method: 'GET',
    headers: { Range: 'bytes=0-0' },
    cache: 'no-store',
  })
  if (response.ok || response.status === 206) {
    if (isSpaHtmlFallback(response, src)) return AssetStatus.MISSING
    return AssetStatus.AVAILABLE
  }
  if (isConfirmedMissing(response.status)) return AssetStatus.MISSING
  return AssetStatus.UNKNOWN
}

/**
 * @param {string | null | undefined} src
 * @returns {Promise<'available' | 'missing' | 'unknown'>}
 */
export async function verifyAsset(src) {
  if (!src) return AssetStatus.MISSING

  try {
    const headStatus = await probeHead(src)
    if (headStatus !== AssetStatus.UNKNOWN) return headStatus
  } catch {
    /* fall through to Range GET */
  }

  try {
    const getStatus = await probeRangeGet(src)
    if (getStatus !== AssetStatus.UNKNOWN) return getStatus
  } catch {
    /* fall through to fail-open */
  }

  return AssetStatus.UNKNOWN
}

/** Present for rendering — includes optimistic unknown results. */
export function isAssetPresent(status) {
  return status === AssetStatus.AVAILABLE || status === AssetStatus.UNKNOWN
}

/** Confirmed absent — only explicit 404/410 after both probes. */
export function isAssetMissing(status) {
  return status === AssetStatus.MISSING
}
