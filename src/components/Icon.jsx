/**
 * Lightweight inline icon set. Stroke-based, currentColor, premium and minimal.
 * Usage: <Icon name="shield" className="h-6 w-6" />
 */
const paths = {
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6l7-3z" />
      <path d="M9.2 12.2l1.9 1.9 3.7-3.9" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.8 4.9L18.7 9.7l-4.9 1.8L12 16.4l-1.8-4.9L5.3 9.7l4.9-1.8z" />
      <path d="M18.5 14.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 3.5c3.2 3.4 5.5 6.2 5.5 9.2A5.5 5.5 0 0 1 12 18.2a5.5 5.5 0 0 1-5.5-5.5c0-3 2.3-5.8 5.5-9.2z" />
      <path d="M9.4 13.2a2.6 2.6 0 0 0 2.6 2.6" />
    </>
  ),
  seat: (
    <>
      <path d="M7 4h6a3 3 0 0 1 3 3v6H10a3 3 0 0 1-3-3z" />
      <path d="M16 13h2a2 2 0 0 1 2 2v3" />
      <path d="M7 13v5" />
      <path d="M5 20h14" />
    </>
  ),
  engine: (
    <>
      <path d="M5 11h2V8h5v3h3l3 3h1v4h-2v-2h-2.5L16 18H8a3 3 0 0 1-3-3z" />
      <path d="M9 8V6h4" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.7 6.3a3.5 3.5 0 0 0-4.6 4.3L4 16.7 7.3 20l6.1-6.1a3.5 3.5 0 0 0 4.3-4.6l-2.1 2.1-2.1-.6-.6-2.1z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
    </>
  ),
  building: (
    <>
      <path d="M5 20V6l7-3 7 3v14" />
      <path d="M5 20h14" />
      <path d="M9 10h2M13 10h2M9 14h2M13 14h2" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="2" />
      <path d="M9 4.5a3 3 0 0 1 6 0" />
      <path d="M9 11l1.5 1.5L13 10M9 15.5h6" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5L8 21l4-2 4 2-1-7.5" />
      <path d="M12 7v2.2l1.6 1" />
    </>
  ),
  whatsapp: (
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  wheel: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 5v3M12 16v3M5 12h3M16 12h3" />
    </>
  ),
  glass: (
    <>
      <path d="M5 8h14l-2 12H7L5 8z" />
      <path d="M8 8V6h8v2" />
    </>
  ),
  play: (
    <>
      <path d="M9 7.5v9l8-4.5-8-4.5z" fill="currentColor" stroke="none" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 18l-6-6 6-6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  facebook: (
    <path d="M14 8h2.5V5h-3c-2.8 0-4.5 1.7-4.5 4.6V12H7v3h2v8h3v-8h2.6l.4-3H12v-2.4c0-.9.2-1.3 1.3-1.3z" />
  ),
}

export default function Icon({ name, className = 'h-6 w-6', filled = false, ...rest }) {
  const node = paths[name]
  if (!node) return null
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {node}
    </svg>
  )
}
