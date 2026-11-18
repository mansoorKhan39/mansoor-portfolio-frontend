import { Link } from 'react-router-dom'
import { ArrowUpRight, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { PERSONAL_PROFILE } from '../data/portfolioData'

export default function Footer() {
  const { dark, toggle } = useTheme()

  return (
    <footer
      className="relative z-10 border-t border-[var(--border)] py-10"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <p className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
            {PERSONAL_PROFILE.name}
          </p>
          <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
            {PERSONAL_PROFILE.degree} ({PERSONAL_PROFILE.semester}) · {PERSONAL_PROFILE.university} ·{' '}
            {PERSONAL_PROFILE.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-mono">
          <Link to="/education" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>
            Education
          </Link>
          <Link to="/resume" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>
            Resume
          </Link>
          <a
            href={PERSONAL_PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--text-muted)' }}
          >
            GitHub <ArrowUpRight size={12} />
          </a>
          <a
            href={PERSONAL_PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--text-muted)' }}
          >
            LinkedIn <ArrowUpRight size={12} />
          </a>
          <a
            href={PERSONAL_PROFILE.existingPortfolio}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--text-muted)' }}
          >
            Previous Portfolio <ArrowUpRight size={12} />
          </a>
          <Link to="/admin" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-dim)' }}>
            Admin
          </Link>
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
            style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)' }}
            aria-label={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {dark ? <Sun size={12} /> : <Moon size={12} />}
            <span>{dark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
