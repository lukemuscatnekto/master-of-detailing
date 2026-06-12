/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#050505',
          800: '#101010',
          700: '#1A1A1A',
        },
        graphite: {
          600: '#1A1A1A',
          500: '#242424',
          400: '#2E2E2E',
        },
        cream: {
          DEFAULT: '#F5F5F5',
          muted: '#B8B8B8',
        },
        gold: {
          DEFAULT: '#F0A000',
          deep: '#B87900',
          border: 'rgba(240, 160, 0, 0.22)',
        },
      },
      fontFamily: {
        display: ['"Oswald"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        gold: '0 16px 40px -20px rgba(240, 160, 0, 0.35)',
        panel: '0 24px 48px -24px rgba(0, 0, 0, 0.85)',
      },
      backgroundImage: {
        'silk-gold':
          'radial-gradient(110% 90% at 15% 0%, rgba(240,160,0,0.12) 0%, transparent 55%), radial-gradient(90% 80% at 95% 100%, rgba(184,121,0,0.1) 0%, transparent 50%)',
        'spotlight-silk':
          'radial-gradient(80% 65% at 8% 18%, rgba(240,160,0,0.07) 0%, transparent 52%), radial-gradient(70% 55% at 92% 78%, rgba(184,121,0,0.05) 0%, transparent 50%), linear-gradient(180deg, #050505 0%, #0a0a0a 45%, #050505 100%)',
        'services-silk':
          'radial-gradient(50% 40% at 0% 0%, rgba(240,160,0,0.05) 0%, transparent 55%), linear-gradient(180deg, rgba(16,16,16,0.96) 0%, rgba(5,5,5,1) 100%)',
        'why-us-silk':
          'linear-gradient(180deg, rgba(5,5,5,1) 0%, rgba(14,14,14,0.98) 45%, rgba(5,5,5,1) 100%)',
        'workshop-videos-silk':
          'radial-gradient(circle at 15% 35%, rgba(240,160,0,0.055) 0%, transparent 34%), linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(5,5,5,1) 100%)',
        'protection-aftercare-silk':
          'radial-gradient(circle at 18% 18%, rgba(240,160,0,0.06) 0%, transparent 34%), radial-gradient(circle at 82% 72%, rgba(240,160,0,0.04) 0%, transparent 32%), linear-gradient(180deg, rgba(15,15,15,1) 0%, rgba(5,5,5,1) 100%)',
        'featured-project-silk':
          'radial-gradient(55% 45% at 100% 0%, rgba(240,160,0,0.06) 0%, transparent 50%), linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(5,5,5,1) 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
