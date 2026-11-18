import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, FileText, ArrowUpRight } from 'lucide-react'
import { PERSONAL_PROFILE } from '../data/portfolioData'
import HoverLinks from './HoverLinks'

export default function SocialRail() {
  return (
    <>
      {/* Fixed Bottom-Left Social Rail (Only on ultra-wide screens to prevent content overlap) */}
      <aside
        className="hidden 2xl:flex fixed left-6 bottom-8 z-30 flex-col items-center gap-3 p-2 rounded-2xl border border-[var(--border)] bg-[#110d14]/70 backdrop-blur-md shadow-2xl"
        aria-label="Social links"
      >
        <a
          href={PERSONAL_PROFILE.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Profile"
          className="p-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[#1a1322] transition-all"
        >
          <Github size={16} />
        </a>
        <a
          href={PERSONAL_PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn Profile"
          className="p-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[#1a1322] transition-all"
        >
          <Linkedin size={16} />
        </a>
        <a
          href={`mailto:${PERSONAL_PROFILE.email}`}
          aria-label="Send Email"
          className="p-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[#1a1322] transition-all"
        >
          <Mail size={16} />
        </a>
      </aside>

      {/* Fixed Bottom-Right Resume Action (Only on ultra-wide screens) */}
      <div className="hidden 2xl:flex fixed right-6 bottom-8 z-30 items-center">
        <Link
          to="/resume"
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[var(--border)] bg-[#110d14]/70 backdrop-blur-md shadow-2xl hover:border-[var(--accent)]/50 text-xs font-mono uppercase tracking-wider transition-all"
          style={{ color: 'var(--text-primary)' }}
        >
          <FileText size={14} style={{ color: 'var(--accent)' }} />
          <HoverLinks text="RESUME" />
          <ArrowUpRight size={13} style={{ color: 'var(--accent)' }} />
        </Link>
      </div>
    </>
  )
}
