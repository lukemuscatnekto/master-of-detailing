/**
 * Collapsible block on phones; content stays expanded from lg breakpoint up.
 */
export default function MobileDisclosure({ title, children, className = '' }) {
  return (
    <details className={`mobile-disclosure group ${className}`}>
      <summary className="mobile-disclosure-summary">
        <span>{title}</span>
        <span className="mobile-disclosure-chevron" aria-hidden="true" />
      </summary>
      <div className="mobile-disclosure-panel">{children}</div>
    </details>
  )
}
