export default function AssetLoadNotice({ children, className = '' }) {
  return (
    <p
      role="status"
      className={`rounded-lg border border-gold/20 bg-gold/[0.04] px-4 py-3 text-center text-sm leading-relaxed text-cream-muted ${className}`}
    >
      {children}
    </p>
  )
}
