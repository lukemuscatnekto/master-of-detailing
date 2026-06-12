import { business } from '../data/content'

const sizeClasses = {
  nav: 'h-auto max-h-[34px] w-auto max-w-[148px] object-contain object-left sm:max-h-[42px] sm:max-w-[200px] md:max-h-[48px] md:max-w-[230px]',
  footer: 'h-auto max-h-[64px] w-auto max-w-[260px] object-contain sm:max-h-[70px] sm:max-w-[300px]',
}

const logoWebp = business.logoSrc.replace(/\.png$/i, '.webp')

export default function Logo({ variant = 'nav', className = '' }) {
  return (
    <picture>
      <source srcSet={logoWebp} type="image/webp" />
      <img
        src={business.logoSrc}
        alt={business.logoAlt}
        width={variant === 'nav' ? 230 : 300}
        height={variant === 'nav' ? 48 : 70}
        className={`block ${sizeClasses[variant]} ${className}`}
        decoding="async"
        fetchPriority={variant === 'nav' ? 'high' : 'auto'}
      />
    </picture>
  )
}
