import { useState } from 'react'

function webpFromSrc(src) {
  if (!src || /\.webp$/i.test(src)) return null
  return src.replace(/\.(png|jpe?g)$/i, '.webp')
}

/**
 * Canonical site image component. Lazy-loads with WebP preferred, shows a dark
 * placeholder while loading, and renders an "Image unavailable" message on
 * error instead of the browser's broken-image icon.
 */
export default function LazyImage({
  src,
  webpSrc,
  fallback,
  alt,
  className = '',
  imgClassName = '',
  eager = false,
}) {
  const [resolvedSrc, setResolvedSrc] = useState(src)
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  const webp = webpSrc ?? webpFromSrc(resolvedSrc)

  const handleError = () => {
    if (fallback && resolvedSrc !== fallback) {
      setResolvedSrc(fallback)
      setLoaded(false)
      return
    }
    setErrored(true)
  }

  if (errored) {
    return (
      <span
        className={`flex items-center justify-center bg-graphite-600 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="px-3 text-center text-xs text-gray-500">Image unavailable</span>
      </span>
    )
  }

  const imgProps = {
    alt,
    loading: eager ? 'eager' : 'lazy',
    decoding: 'async',
    fetchPriority: eager ? 'high' : 'auto',
    onLoad: () => setLoaded(true),
    onError: handleError,
    className: `h-full w-full object-cover transition-opacity duration-500 ease-out ${
      loaded ? 'opacity-100' : 'opacity-0'
    } ${imgClassName}`,
  }

  return (
    <span className={`block overflow-hidden bg-graphite-600 ${className}`}>
      {webp ? (
        <picture>
          <source srcSet={webp} type="image/webp" />
          <img src={resolvedSrc} {...imgProps} />
        </picture>
      ) : (
        <img src={resolvedSrc} {...imgProps} />
      )}
    </span>
  )
}
