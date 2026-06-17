import { useId, useState } from 'react'
import { getWhatsAppQuoteUrl, openWhatsAppChat, SERVICE_OPTIONS } from '../data/content'
import Icon from './Icon'

const fieldClass =
  'min-h-[44px] w-full rounded-lg border border-white/[0.08] bg-ink-900/80 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream-muted/45 transition-colors focus:border-gold/45 focus:outline-none focus:ring-2 focus:ring-gold/25'

function validateField(value) {
  return value.trim().length > 0
}

export default function QuoteForm() {
  const formId = useId()
  const carId = `${formId}-car`
  const locationId = `${formId}-location`
  const serviceId = `${formId}-service`

  const [car, setCar] = useState('')
  const [location, setLocation] = useState('')
  const [service, setService] = useState('')
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitError('')

    const nextErrors = {
      car: validateField(car) ? '' : 'Enter your car make and model.',
      location: validateField(location) ? '' : 'Enter your location in Malta.',
      service: validateField(service) ? '' : 'Select the service you need.',
    }

    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      setSubmitError('Please complete all fields to get your quote.')
      return
    }

    openWhatsAppChat(getWhatsAppQuoteUrl(car, location, service))
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="quote-form-card rounded-2xl border border-gold-border bg-ink-800/85 p-5 shadow-panel backdrop-blur-sm sm:p-6"
      aria-labelledby={`${formId}-heading`}
    >
      <h2
        id={`${formId}-heading`}
        className="heading-display text-lg leading-tight text-cream sm:text-xl"
      >
        Get a Free Quote
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-cream-muted">
        Tell us your car model, location, and the service you need.
        <span className="mt-1 block">We&apos;ll reply on WhatsApp with a clear quote.</span>
      </p>

      <p className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-gold/80 sm:text-xs">
        No obligation · Fast reply · Premium detailing in Malta
      </p>

      <div
        role="alert"
        aria-live="polite"
        className={`mt-4 text-xs text-gold ${submitError ? 'block' : 'sr-only'}`}
      >
        {submitError}
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor={carId} className="text-xs font-semibold uppercase tracking-widest2 text-cream-muted">
            Car Make / Model
          </label>
          <input
            id={carId}
            name="car"
            type="text"
            value={car}
            onChange={(event) => {
              setCar(event.target.value)
              if (errors.car) setErrors((prev) => ({ ...prev, car: '' }))
            }}
            placeholder="e.g. BMW 1 Series, Toyota Yaris, Porsche 911"
            autoComplete="off"
            className={`${fieldClass} mt-2 ${errors.car ? 'border-gold/50' : ''}`}
            aria-invalid={errors.car ? 'true' : undefined}
            aria-describedby={errors.car ? `${carId}-error` : undefined}
          />
          {errors.car && (
            <p id={`${carId}-error`} className="mt-1.5 text-xs text-gold">
              {errors.car}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={locationId}
            className="text-xs font-semibold uppercase tracking-widest2 text-cream-muted"
          >
            Location in Malta
          </label>
          <input
            id={locationId}
            name="location"
            type="text"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value)
              if (errors.location) setErrors((prev) => ({ ...prev, location: '' }))
            }}
            placeholder="e.g. Mosta, Sliema, Bugibba"
            autoComplete="off"
            className={`${fieldClass} mt-2 ${errors.location ? 'border-gold/50' : ''}`}
            aria-invalid={errors.location ? 'true' : undefined}
            aria-describedby={errors.location ? `${locationId}-error` : undefined}
          />
          {errors.location && (
            <p id={`${locationId}-error`} className="mt-1.5 text-xs text-gold">
              {errors.location}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={serviceId}
            className="text-xs font-semibold uppercase tracking-widest2 text-cream-muted"
          >
            Service Needed
          </label>
          <div className="relative mt-2">
            <select
              id={serviceId}
              name="service"
              value={service}
              onChange={(event) => {
                setService(event.target.value)
                if (errors.service) setErrors((prev) => ({ ...prev, service: '' }))
              }}
              className={`${fieldClass} appearance-none pr-10 ${errors.service ? 'border-gold/50' : ''} ${
                service ? 'text-cream' : 'text-cream-muted/45'
              }`}
              aria-invalid={errors.service ? 'true' : undefined}
              aria-describedby={errors.service ? `${serviceId}-error` : undefined}
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-ink-900 text-cream">
                  {option}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gold/70"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          {errors.service && (
            <p id={`${serviceId}-error`} className="mt-1.5 text-xs text-gold">
              {errors.service}
            </p>
          )}
        </div>
      </div>

      <button type="submit" className="btn-primary mt-5 w-full">
        <Icon name="whatsapp" filled className="h-4 w-4" />
        Get My Free Quote
      </button>

      <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-cream-muted/75 sm:text-xs">
        WhatsApp opens next — send photos for a more accurate quote.
      </p>
    </form>
  )
}
