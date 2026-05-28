import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/50' : ''}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-xl tracking-tight text-white hover:text-brand-400 transition-colors">
          <span className="text-brand-400">&lt;</span>
          <span className="gradient-text">MAK</span>
          <span className="text-brand-400">/&gt;</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-body text-sm font-medium transition-colors relative group ${location.pathname === to ? 'text-brand-400' : 'text-slate-400 hover:text-white'}`}
            >
              {label}
              <span className={`absolute -bottom-0.5 left-0 h-px bg-brand-400 transition-all duration-300 ${location.pathname === to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
          <a href="https://github.com/mansoorKhan39" target="_blank" rel="noreferrer" className="btn-primary text-sm py-2 px-4">
            GitHub
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-400 hover:text-white transition-colors">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#080c14]/95 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex flex-col gap-4">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className={`font-body text-sm font-medium py-2 transition-colors ${location.pathname === to ? 'text-brand-400' : 'text-slate-400'}`}>
              {label}
            </Link>
          ))}
          <a href="https://github.com/mansoorKhan39" target="_blank" rel="noreferrer" className="btn-primary text-sm py-2 w-fit">GitHub</a>
        </div>
      )}
    </header>
  )
}
