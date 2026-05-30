import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon, FileText } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { dark, toggle } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border)]' : ''}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-xl tracking-tight hover:text-brand-400 transition-colors" style={{color: 'var(--text-primary)'}}>
          <span className="text-brand-400">&lt;</span>
          <span className="gradient-text">MAK</span>
          <span className="text-brand-400">/&gt;</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`font-body text-sm font-medium transition-colors relative group ${location.pathname === to ? 'text-brand-400' : 'hover:text-[var(--text-primary)]'}`}
              style={{ color: location.pathname === to ? undefined : 'var(--text-muted)' }}
            >
              {label}
              <span className={`absolute -bottom-0.5 left-0 h-px bg-brand-400 transition-all duration-300 ${location.pathname === to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}

          {/* Dark/Light toggle */}
          <button onClick={toggle}
            className="p-2 rounded-lg border border-[var(--border)] hover:border-brand-500/50 transition-all"
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {dark ? <Sun size={16} className="text-brand-400" /> : <Moon size={16} className="text-slate-600" />}
          </button>

          <a href="https://github.com/mansoorKhan39" target="_blank" rel="noreferrer" className="btn-primary text-sm py-2 px-4">
            GitHub
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggle} className="p-2 rounded-lg border border-[var(--border)] transition-all">
            {dark ? <Sun size={16} className="text-brand-400" /> : <Moon size={16} className="text-slate-600" />}
          </button>
          <button onClick={() => setOpen(!open)} style={{color: 'var(--text-muted)'}}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden backdrop-blur-md border-b border-[var(--border)] px-6 py-4 flex flex-col gap-4"
          style={{ backgroundColor: 'var(--bg-primary)' }}>
          {links.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`font-body text-sm font-medium py-2 transition-colors ${location.pathname === to ? 'text-brand-400' : ''}`}
              style={{ color: location.pathname === to ? undefined : 'var(--text-muted)' }}
            >
              {label}
            </Link>
          ))}
          <a href="https://github.com/mansoorKhan39" target="_blank" rel="noreferrer" className="btn-primary text-sm py-2 w-fit">GitHub</a>
        </div>
      )}
    </header>
  )
}
