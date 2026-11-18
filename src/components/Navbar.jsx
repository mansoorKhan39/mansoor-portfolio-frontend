import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import HoverLinks from './HoverLinks'

const primaryLinks = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/skills', label: 'Skills' },
  { to: '/journey', label: 'Journey' },
]

const mobileAllLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/skills', label: 'Skills' },
  { to: '/journey', label: 'Journey' },
  { to: '/education', label: 'Education' },
  { to: '/resume', label: 'Resume' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  const isRouteActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname === to || location.pathname.startsWith(`${to}/`)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel border-b border-[var(--border)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="font-display font-bold text-base md:text-lg tracking-tight whitespace-nowrap shrink-0 transition-opacity hover:opacity-80"
          style={{ color: 'var(--text-primary)' }}
        >
          Mansoor Ali Khan
        </Link>

        {/* Zone 2: Clean single-line kinetic HoverLinks */}
        <div className="hidden lg:flex items-center gap-8">
          {primaryLinks.map(({ to, label }) => {
            const active = isRouteActive(to)
            return (
              <Link
                key={to}
                to={to}
                className="font-body text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1"
                style={{ color: active ? 'var(--accent)' : 'var(--text-primary)' }}
              >
                <HoverLinks text={label} />
              </Link>
            )
          })}
        </div>

        {/* Zone 3: 1 Primary CTA Action */}
        <div className="hidden lg:flex items-center shrink-0">
          <Link to="/contact" className="btn-primary text-xs py-2 px-5">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-2.5 rounded-xl border border-[var(--border)]"
            style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)' }}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden glass-panel border-b border-[var(--border)] px-6 py-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {mobileAllLinks.map(({ to, label }) => {
            const active = isRouteActive(to)
            return (
              <Link
                key={to}
                to={to}
                className="font-body text-sm font-medium py-2.5 px-3 rounded-lg transition-colors whitespace-nowrap"
                style={{
                  color: active ? 'var(--accent)' : 'var(--text-primary)',
                  backgroundColor: active ? 'var(--accent-soft)' : 'transparent',
                }}
              >
                {label}
              </Link>
            )
          })}
          <Link
            to="/contact"
            className="btn-primary text-xs py-2.5 px-4 w-fit col-span-2 sm:col-span-3 mt-2"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}
